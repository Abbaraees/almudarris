import { Student } from "~/types";
import studentStore from "../domain/StudentStore";
import { makeAutoObservable } from "mobx";

export default class StudentDetailUIState {
  student: Student | undefined
  isDeleting = false
  isUpdating = false

  constructor() {
    makeAutoObservable(this)
  }

  loadStudent = (id: string) => {
    console.log("student")
    const student = studentStore.getStudent(id)
    this.student = student
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