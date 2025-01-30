import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import uuid from 'react-native-uuid';


export const studentsTable = sqliteTable('students', {
  id: text().primaryKey().$defaultFn(() => uuid.v4()),
  name: text().notNull(),
  gender: text().notNull(),
  teacher_id: text(),
  created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
})


export const transactionLogsTable = sqliteTable('transaction_logs', {
  id: text().primaryKey().$defaultFn(() => uuid.v4()),
  table_name: text().notNull(),
  operations: text().notNull(),
  record_id: text().notNull(),
  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  synched: integer({mode: 'boolean'}).default(false), 
})