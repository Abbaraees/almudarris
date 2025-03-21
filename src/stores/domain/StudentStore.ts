import { makeAutoObservable } from "mobx";
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "~/db/students";

import { Tables } from "~/types";


class StudentStore {
  students: Tables<'students'>[] = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchStudents()
  }

  fetchStudents = async () => {
    const students = await getStudents();
    this.students = students;
  }

  async addStudent(name: string, gender: 'male' | 'female', teacher_id: string) {
    try {
      
      const result = await createStudent(name, gender, teacher_id);
      result && await this.fetchStudents();
    } catch (error) {
      
    }
    
  }

  async deleteStudent(id: string) {
    const result = await deleteStudent(id);
    if (result) {
      await this.fetchStudents()
      return true
    }

    return false

  }

  async updateStudent(id: string, name: string, gender: string) {
    const result = await updateStudent(id, name, gender)
    if (result) {
      await this.fetchStudents()
      return true
    }

    return false
  }

  get studentCount() {
    return this.students.length;
  }

  async findStudent(id: string) {
    const student  = await getStudent(id)
    if (student) {
      return student[0]
    }
    return null;
  }
}

const studentStore = new StudentStore();
export default studentStore;