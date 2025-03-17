import authStore from "~/stores/AuthStore"
import { supabase } from "./supabase"
import db from "~/db"
import { tableConfigs } from "./TableConfig";
import { eq } from "drizzle-orm";

export const fetchDataFromSupabase = async () => {
  const tables = ['students', 'attendance']
  let newRecords = 0;

  for (let table of tables) {
    const config = tableConfigs[table]
    if (!config) {
      console.warn(`No config found for table: ${table}, skipping...`);
      continue;
    }

    const { localTable, remoteTable, primaryKey } = config;

    try {
      // Fetch data from Supabase
      const { data: remoteData, error } = await supabase
        .from(remoteTable)
        .select()
        .eq('teacher_id', authStore.profile?.id ?? '');
  
      if (error) {
        console.error('Supabase fetch error:', error);
        continue; // Log the error and continue with the next table
      }
  
      // Fetch local SQLite data
      const localData = await db.select().from(localTable);

      // Compare and sync data
      const remoteIds = new Set(remoteData.map(item => item[primaryKey]));
      const localIds = new Set(localData.map(item => item[primaryKey]));

      // Records to insert (exist in remote but not in local)
      const toInsert = remoteData.filter(item => !localIds.has(item[primaryKey]));

      // Records to update (exist in both)
      const toUpdate = remoteData.filter(item => localIds.has(item[primaryKey]));

      // Records to delete (exist in local but not in remote)
      const toDelete = localData.filter(item => !remoteIds.has(item[primaryKey]));

      // Perform operations
      if (toInsert.length > 0) {
        await db.insert(localTable).values(toInsert);
        newRecords += toInsert.length;
      }

      for (const item of toUpdate) {
        await db
          .update(localTable)
          .set(item)
          .where(eq(localTable[primaryKey], item[primaryKey]));
      }

      for (const item of toDelete) {
        await db
          .delete(localTable)
          .where(eq(localTable[primaryKey], item[primaryKey]));
      }

    } catch (err) {
      console.error(`Error syncing table ${table}:`, err);
      continue; // Log the error and continue with the next table
    }
  }

  return { status: 'success', message: `${newRecords} new records synced` };
}