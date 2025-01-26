import { makeAutoObservable } from "mobx"


class StudentsUIStore {
  students = []
  newStudentName = ''
  newStudentGender = ''
  isAdding = false

  constructor() {
    makeAutoObservable(this)
  }

  setNewStudentName = (name: string) => this.newStudentName = name
  setNewStudentGender = (gender: string) => this.newStudentGender = gender
  toggleDialog = () => this.isAdding = !this.isAdding

  saveStudent = () => {

  }

  hideDialog = () => {
    this.toggleDialog()
    this.setNewStudentGender('male')
    this.setNewStudentName('')
  }
}

const studentsUIStore = new StudentsUIStore()
export default studentsUIStore
