import authStore from "~/stores/AuthStore"
import { supabase } from "./supabase"
import db from "~/db"
import { studentsTable } from "~/db/schema"
import studentStore from "~/stores/domain/StudentStore";


export const fetchDataFromSupabase = async () => {
  try {
    // Fetch data from Supabase
    const { data: supabaseData, error } = await supabase
      .from('students')
      .select()
      .eq('teacher_id', authStore.profile?.id ?? '');

    if (error) {
      console.error('Supabase fetch error:', error);
      return { status: 'error', message: 'Failed to fetch data from Supabase', error };
    }

    // Fetch local SQLite data
    const localData = await db.select().from(studentsTable);

    // Convert local data IDs into a Set for faster lookup
    const localIds = new Set(localData.map(l => l.id));

    // Filter records that are missing locally
    const missingRecords = supabaseData.filter(data => !localIds.has(data.id));

    // Insert missing records into local database
    if (missingRecords.length > 0) {
      await db.insert(studentsTable).values(missingRecords);
    }

    const message = `Synced ${missingRecords.length} new records from Supabase`;
    studentStore.fetchStudents()
    console.log(message);

    return { status: 'success', message };
  } catch (err) {
    console.error('Error in fetchDataFromSupabase:', err);
    return { status: 'error', message: 'An unexpected error occurred', error: err };
  }
};
