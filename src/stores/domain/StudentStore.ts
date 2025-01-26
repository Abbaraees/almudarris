import { makeAutoObservable } from "mobx";
import uuid from 'react-native-uuid';

import { Student } from "~/types";


export default class StudentStore {
  students: Student[] = [
    {id: uuid.v4(), name: 'Muhammad Lawal', gender: 'male'}
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addStudent(student: Student) {
    this.students = [...this.students, student];
  }

  removeStudent(id: string) {
    this.students = this.students.filter((student) => student.id !== id);
  }

  get studentCount() {
    return this.students.length;
  }
}