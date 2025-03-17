import { eq } from "drizzle-orm";
import { makeAutoObservable } from "mobx";
import db from "~/db";
import { attendanceTable } from "~/db/schema";
import { Attendance, Tables } from "~/types";
import logTransaction from "~/utils/transactionLogger";

class AttendanceStore {
  attendance: Tables<'attendance'>[] = []

  constructor() {
    makeAutoObservable(this)

    this.loadAttendance()
  }

  loadAttendance = async () => {
    const attendance = await db.select().from(attendanceTable)
    this.attendance = attendance
  }

  saveAttendance = async (student_id: string, status: string, completeness: number, date: string, session: string, teacher_id: string) => {
    try {
      const result = await db.insert(attendanceTable).values({student_id, status, completeness, date, session, teacher_id}).returning()
      logTransaction('attendance', 'CREATE', result[0].id)
    } catch (error) {
      return {status: 'error', message: 'An error occured', error}
    }
    
    this.loadAttendance()

    return {status: 'success', message: 'Attendance Added Successfully'}
  }

  updateAttendance = async (attendanceId: string, status: string, completeness: number) => {
    try {
      await db
        .update(attendanceTable)
        .set({status, completeness})
        .where(eq(attendanceTable.id, attendanceId))

      logTransaction('attendance', 'UPDATE', attendanceId)
    } catch (error) {
      return {status: 'error', message: 'An error occured', error}
    }

    this.loadAttendance()
    
    return {status: 'success', message: 'Attendance Updated Successfully'}
  }

  getDayAttendance = (day: string, session: string) => {
    return this.attendance.filter(attendance => attendance.date === day && attendance.session === session )
  }

}


const attendanceStore = new AttendanceStore()
export default attendanceStore