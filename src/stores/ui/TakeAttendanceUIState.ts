import { and, eq } from "drizzle-orm";
import { makeAutoObservable } from "mobx";
import uuid from 'react-native-uuid'

import db from "~/db";
import { attendanceTable } from "~/db/schema";
import { Attendance } from "~/types";
import studentStore from "../domain/StudentStore";
import attendanceStore from "../domain/AttendanceStore";
import authStore from "../AuthStore";


export default class TakeAttendanceUIState {
  attendance: Attendance[] = []
  filteredAttendance: Attendance[] = []
  date = ''
  session = ''
  isModalVisible = false
  selectedStudent: Attendance | null = null
  status = 'NEW'
  saving = false
  modify = false

  constructor(date: string, session: string) {
    makeAutoObservable(this)

    this.date = date
    this.session = session
    this.loadAttendance(date, session)
  }


  filterAttendance = (filter: string) => {
    this.filteredAttendance = this.attendance
      .filter(attendance => attendance.student_name.toLowerCase().includes(filter.toLowerCase()))
  }

  loadAttendance = async (date: string, session: string) => {
    const savedAttendance = await db
      .select()
      .from(attendanceTable)
      .where(and(eq(attendanceTable.session, session), eq(attendanceTable.date, date)))

    console.log(`Date: ${date}, Session: ${session}`)
    console.log(savedAttendance)
      
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
    this.filterAttendance('')
  }

  markAttendance = (studentId: string, status: string, completeness: number) => {
    this.closeModal()
    const updatedAttendance = this.attendance.map(attendance => attendance.student_id === studentId ? {...attendance, status, completeness} : attendance)
    this.attendance = updatedAttendance
    this.filterAttendance('')
    this.modify = true
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
    if (!this.modify) {
      return
    }
    this.saving = true
    if (this.status == 'NEW' && this.modify) {
      try {
        for (const attendance of this.attendance) {
          const { student_id, status, completeness, date, session,} = attendance
          const result = await attendanceStore.saveAttendance(student_id, status, completeness ?? 0, date, session, authStore.profile?.id ?? '')
        }
      } catch (error) {
        console.log(error)
      }
    }
    else {
      for (let record of this.attendance) {
        try {
          const result = await attendanceStore.updateAttendance(record.id, record.status, record.completeness ?? 0)
        } catch (error) {
          console.log(error)
        }
      }
    }
    this.saving = false
  }
}

