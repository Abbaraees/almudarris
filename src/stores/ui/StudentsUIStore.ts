import { makeAutoObservable } from "mobx"

import { Tables } from "~/types"
import studentStore  from "../domain/StudentStore"
import authStore from "../AuthStore"


class StudentsUIStore {
  filteredStudents: Tables<'students'>[] = []
  newStudentName = ''
  newStudentGender: 'male' | 'female' = 'male'
  isAdding = false
  search = ''
  students: Tables<'students'>[] = []

  constructor() {
    makeAutoObservable(this)

    this.filterStudents()
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
    this.filteredStudents = studentStore.students.filter((student) => {
      return student.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
    })
  }

  saveStudent = () => {
    studentStore.addStudent(this.newStudentName, this.newStudentGender, authStore.profile?.id ?? '')

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
