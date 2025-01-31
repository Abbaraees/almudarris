import { Tables } from "~/types";
import studentStore from "../domain/StudentStore";
import { makeAutoObservable } from "mobx";
import { router } from "expo-router";

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

  toggleUpdateDialog = () => this.isUpdating = !this.isUpdating

  handleUpdate = async () => {
    const result = await studentStore.updateStudent(this.student?.id ?? '', this.name, this.gender)
    if (result) {
      this.loadStudent(this.student?.id ?? '')
    }
    this.toggleUpdateDialog()
  }

  toggleDeleteDialog = () => {
    this.isDeleting = !this.isDeleting
  }

  handleDelete = async () => {
    this.toggleDeleteDialog()
    const result = await studentStore.deleteStudent(this.student?.id ?? '')
    if (result) {
      router.replace('/(tabs)/students')
    }
  }

  setName = (name: string) => this.name = name
  setGender = (gender: string) => this.gender = gender
}

const studentDetailUIState = new StudentDetailUIState()
export default studentDetailUIState