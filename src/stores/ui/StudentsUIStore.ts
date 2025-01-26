import { makeAutoObservable } from "mobx"
import uuid from 'react-native-uuid'

import { Student } from "~/types"
import StudentStore from "../domain/StudentStore"


class StudentsUIStore {
  filteredStudents: Student[] = []
  newStudentName = ''
  newStudentGender: 'male' | 'female' = 'male'
  isAdding = false
  search = ''
  studentStore: StudentStore = new StudentStore()

  constructor() {
    makeAutoObservable(this)
    this.filterStudents()
  }

  setNewStudentName = (name: string) => this.newStudentName = name
  setNewStudentGender = (gender: 'male' | 'female') => this.newStudentGender = gender
  toggleDialog = () => this.isAdding = !this.isAdding
  setSearch = (search: string) => {
    this.search = search
    this.filterStudents()
  }

  filterStudents = () => {
    this.filteredStudents = this.studentStore.students.filter((student) => {
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
