import { makeAutoObservable } from "mobx";
import uuid from 'react-native-uuid';
import { createStudent, getStudent, getStudents } from "~/db/students";

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
      result && this.fetchStudents();
    } catch (error) {
      
    }
    
  }

  removeStudent(id: string) {
    this.students = this.students.filter((student) => student.id !== id);
  }

  updateStudent(id: string) {
    
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