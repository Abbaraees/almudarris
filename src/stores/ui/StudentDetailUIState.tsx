import { Student, Tables } from "~/types";
import studentStore from "../domain/StudentStore";
import { makeAutoObservable } from "mobx";

class StudentDetailUIState {
  student: Tables<'students'> | undefined | null
  isDeleting = false
  isUpdating = false

  constructor() {
    makeAutoObservable(this)
  }

  loadStudent = async (id: string) => {
    const student = studentStore.students.filter(student => student.id == id)
    console.log(student)
    this.student = student[0]
  }

  showUpdateDialog = () => {

  }

  hideUpdateDialog = () => {

  }
  handleUpdate = () => {

  }

  showDeleteDialog = () => {

  }

  hideDeleDialog = () => {

  }

  handleDelete = () => {

  }
}

const studentDetailUIState = new StudentDetailUIState()
export default studentDetailUIState