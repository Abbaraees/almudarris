import { eq } from "drizzle-orm"
import db from "."
import { studentsTable } from "./schema"
import logTransaction from "~/utils/transactionLogger"

export async function createStudent(name: string, gender: 'male' | 'female', teacher_id: string) {
  try {
    const result = await db.insert(studentsTable).values({
      name,
      gender,
      teacher_id
    }).returning()

    await logTransaction('students', 'CREATE', result[0].id)
  } catch (error) {
    console.log(error)
    return false
  }

  return true
}

export async function updateStudent(id: string, name: string, gender: 'male' | 'female') {
  try {
    const result = await db.update(studentsTable).set({
      name,
      gender
    }).where(eq(studentsTable.id, id)).returning()
    await logTransaction('students', 'UPDATE', result[0].id)
  } catch (error) {
    console.log(error)
    return false
  }

  return true
}

export async function deleteStudent(id: string) {
  try {
    await db.delete(studentsTable).where(eq(studentsTable.id, id))
    await logTransaction('students', 'DELETE', id)
  } catch (error) {
    console.log(error)
    return false
  }

  return true
}

export async function getStudents() {
  return await db.select().from(studentsTable)
}

export async function getStudent(id: string) {
  return await db.select().from(studentsTable).where(eq(studentsTable.id, id))
}