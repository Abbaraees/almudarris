import { eq } from "drizzle-orm";
import db from "~/db";
import { transactionLogsTable, studentsTable } from "~/db/schema";
import { supabase } from "./supabase";

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
      let record;
      let success = true;

      // Fetch the actual record data from the local database
      if (log.table_name === 'students') {
        record = await db.select()
          .from(studentsTable)
          .where(eq(studentsTable.id, log.record_id));
      }

      // If no record is found, skip this log
      if (!record || record.length === 0) {
        console.warn(`Record with ID ${log.record_id} not found locally, skipping...`);
        continue;
      }

      let error = null;

      if (log.operations === 'CREATE') {
        const { error: insertError } = await supabase
          .from(log.table_name)
          .insert(record[0])
          .single();
        error = insertError;
      } else if (log.operations === 'UPDATE') {
        const { error: updateError } = await supabase
          .from(log.table_name)
          .update(record[0])
          .eq('id', log.record_id)
          .select();
        error = updateError;
      } else if (log.operations === 'DELETE') {
        const { error: deleteError } = await supabase
          .from(log.table_name)
          .delete()
          .eq('id', log.record_id)
          .select();
        error = deleteError;
      }

      if (error) {
        console.error(`Failed to sync log ${log.id}:`, error);
        success = false;
        failedCount++;
      }

      // Mark log as synced if successful
      if (success) {
        await db.update(transactionLogsTable)
          .set({ synched: true })
          .where(eq(transactionLogsTable.id, log.id));
        console.log("Synced:", log.id);
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

    return { status: 'success', message: 'All logs successfully synced' };

  } catch (err) {
    console.error('Unexpected error in syncWithSupabase:', err);
    return { status: 'error', message: 'An unexpected error occurred', error: err };
  }
}
