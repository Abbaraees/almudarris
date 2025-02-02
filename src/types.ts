import { Database } from "./database.types";

export type Student = {
  id: string;
  name: string;
  gender: 'male' | 'female';
};

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
Database['public']['Tables'][T]['Update'];

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];


export type Attendance = {
  id: string,
  student_name: string,
  date: string,
  session: string,
  student_id: string,
  status: string,
  completeness?: number
}