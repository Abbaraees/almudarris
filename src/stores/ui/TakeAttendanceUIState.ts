import { and, eq } from "drizzle-orm";
import { makeAutoObservable } from "mobx";
import uuid from 'react-native-uuid'

import db from "~/db";
import { attendanceTable } from "~/db/schema";
import { Attendance } from "~/types";
import studentStore from "../domain/StudentStore";


export default class TakeAttendanceUIState {
  attendance: Attendance[] = []
  date = ''
  session = ''
  isModalVisible = false
  selectedStudent: Attendance | null = null
  status = 'NEW'
  saving = false

  constructor(date: string, session: string) {
    makeAutoObservable(this)
    this.logAttendance()

    this.date = date
    this.session = session
    this.loadAttendance(date, session)
  }

  loadAttendance = async (date: string, session: string) => {
    const savedAttendance = await db
      .select()
      .from(attendanceTable)
      .where(and(eq(attendanceTable.session, session), eq(attendanceTable.date, date)))
      
    if (savedAttendance.length > 0) {
      this.status = 'EXISTING'
      const formatedAttendance = await Promise.all(
        savedAttendance.map(async (attendance) => {
          const student = await studentStore.findStudent(attendance.student_id);
          return { ...attendance, student_name: student?.name ?? '' };
        })
      );
      this.attendance = formatedAttendance;
      
    } else {
      const newAttendance = studentStore.students.map((student) => ({
        id: uuid.v4(),
        student_id: student.id, 
        student_name: student.name, 
        date: this.date,
        session: this.session,
        status: '',
      }))

      this.attendance = newAttendance
    }
  }

  logAttendance = async () => {
    const attendance = await db.select().from(attendanceTable)
    console.log(attendance)
  }

  markAttendance = (studentId: string, status: string, completeness: number) => {
    this.closeModal()
    const updatedAttendance = this.attendance.map(attendance => attendance.student_id === studentId ? {...attendance, status, completeness} : attendance)
    this.attendance = updatedAttendance
  }

  openModal(student: Attendance) {
    this.isModalVisible = true
    this.selectedStudent = student
  }

  closeModal = () => {
    this.isModalVisible = false
    this.selectedStudent = null
  }

  saveAttendance = async () => {
    this.saving = true
    if (this.status == 'NEW') {
      try {
        const result = await db.insert(attendanceTable).values(this.attendance)
        console.log("new attendance saved", result)
      } catch (error) {
        console.log(error)
      }
    }
    else {
      for (let record of this.attendance) {
        try {
          const result = await db.update(attendanceTable).set(record).where(eq(attendanceTable.id, record.id))
          console.log("existing attendance updated", result)
        } catch (error) {
          console.log(error)
        }
      }
    }
    this.saving = false
  }
}

