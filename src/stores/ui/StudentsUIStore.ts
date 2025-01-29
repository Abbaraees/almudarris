import { makeAutoObservable } from "mobx"
import uuid from 'react-native-uuid'

import { Student, Tables } from "~/types"
import studentStore  from "../domain/StudentStore"


class StudentsUIStore {
  filteredStudents: Tables<'students'>[] = []
  newStudentName = ''
  newStudentGender: 'male' | 'female' = 'male'
  isAdding = false
  search = ''
  studentStore = studentStore
  students: Tables<'students'>[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setStudents = (students: Tables<'students'>[]) => this.students = students
  setNewStudentName = (name: string) => this.newStudentName = name
  setNewStudentGender = (gender: 'male' | 'female') => this.newStudentGender = gender
  toggleDialog = () => this.isAdding = !this.isAdding
  setSearch = (search: string) => {
    this.search = search
    this.filterStudents()
  }

  filterStudents = () => {
    this.filteredStudents = this.students.filter((student) => {
      return student.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
    })
  }

  saveStudent = () => {
    this.studentStore.addStudent({
      id: uuid.v4(),
      name: this.newStudentName,
      gender: this.newStudentGender
    })

    this.hideDialog()

  }

  hideDialog = () => {
    this.toggleDialog()
    this.setNewStudentGender('male')
    this.setNewStudentName('')
    this.filterStudents()
  }
}

const studentsUIStore = new StudentsUIStore()
export default studentsUIStore
