import { Student, Tables } from "~/types";
import studentStore from "../domain/StudentStore";
import { makeAutoObservable, computed } from "mobx";

class StudentDetailUIState {
  student: Tables<'students'> | undefined | null
  isDeleting = false
  isUpdating = false
  name = ''
  gender = ''

  constructor() {
    makeAutoObservable(this)
  }

  loadStudent = async (id: string) => {
    const student = studentStore.students.filter(student => student.id == id)
    this.name = student[0].name
    this.gender = student[0].gender
    
    this.student = student[0]
  }

  showUpdateDialog = () => {
    this.isUpdating = true
  }

  hideUpdateDialog = () => {
    this.isUpdating = false
  }

  handleUpdate = async () => {
    const result = await studentStore.updateStudent(this.student?.id ?? '', this.name, this.gender)
    if (result) {
      this.loadStudent(this.student?.id ?? '')
    }
    this.hideUpdateDialog()
  }

  showDeleteDialog = () => {

  }

  hideDeleDialog = () => {

  }

  handleDelete = () => {

  }

  setName = (name: string) => this.name = name
  setGender = (gender: string) => this.gender = gender
}

const studentDetailUIState = new StudentDetailUIState()
export default studentDetailUIState