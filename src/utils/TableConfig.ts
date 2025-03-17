import { attendanceTable, studentsTable } from "~/db/schema";

interface TableConfig {
  localTable: any;
  remoteTable: "students" | "attendance" | "assessments" | "profiles" | "student_assessments";
  primaryKey: string;
}

export const tableConfigs: Record<string, TableConfig> = {
  students: {
    localTable: studentsTable,
    remoteTable: 'students',
    primaryKey: 'id',
  },
  attendance: {
    localTable: attendanceTable,
    remoteTable: 'attendance',
    primaryKey: 'id',
  },
  // Add more tables here as needed
};