import { eq } from "drizzle-orm";
import db from "~/db";
import { transactionLogsTable } from "~/db/schema";
import { supabase } from "./supabase";
import authStore from "~/stores/AuthStore";
import { tableConfigs } from "./TableConfig";


export async function syncWithSupabase() {
  try {
    const unsyncedLogs = await db.select()
      .from(transactionLogsTable)
      .where(eq(transactionLogsTable.synched, false));

    console.log("Unsynced", unsyncedLogs);

    if (unsyncedLogs.length === 0) {
      return { status: 'success', message: 'All records are already synced' };
    }

    let failedCount = 0;

    for (const log of unsyncedLogs) {
      const config = tableConfigs[log.table_name];
      if (!config) {
        console.warn(`No config found for table: ${log.table_name}, skipping...`);
        continue;
      }

      const { localTable, remoteTable, primaryKey } = config;

      // Fetch the actual record data from the local database
      const record = await db.select()
        .from(localTable)
        .where(eq(localTable[primaryKey], log.record_id));

      // If no record is found, skip this log
      if (!record || record.length === 0) {
        console.warn(`Record with ID ${log.record_id} not found locally, skipping...`);
        continue;
      }

      let error = null;

      if (log.operations === 'CREATE') {
        const { error: insertError } = await supabase
          .from(remoteTable)
          .insert({...record[0], teacher_id: authStore.profile?.id ?? ''})
          .single();
        error = insertError;
      } else if (log.operations === 'UPDATE') {
        const { error: updateError } = await supabase
          .from(remoteTable)
          .update(record[0])
          .eq(primaryKey, log.record_id)
          .select();
        error = updateError;
      } else if (log.operations === 'DELETE') {
        const { error: deleteError } = await supabase
          .from(remoteTable)
          .delete()
          .eq(primaryKey, log.record_id)
          .select();
        error = deleteError;
      }

      if (error) {
        console.error(`Failed to sync log ${log.id}:`, error);
        failedCount++;
      } 
      else {
        // Mark log as synced if successful
        await db.update(transactionLogsTable)
          .set({ synched: true })
          .where(eq(transactionLogsTable.id, log.id));
      }
    }

    const remainingUnsyncedLogs = await db.select()
      .from(transactionLogsTable)
      .where(eq(transactionLogsTable.synched, false));

    if (remainingUnsyncedLogs.length > 0) {
      return { 
        status: 'partial_success', 
        message: `${remainingUnsyncedLogs.length} logs failed to sync.`, 
        failedCount 
      };
    }

    // delete all synched transactions
    await db.delete(transactionLogsTable).where(eq(transactionLogsTable.synched, true))

    return { status: 'success', message: 'All logs successfully synced' };

  } catch (err) {
    console.error('Unexpected error in syncWithSupabase:', err);
    return { status: 'error', message: 'An unexpected error occurred', error: err };
  }
}