import db from "~/db";
import { transactionLogsTable } from "~/db/schema";
import uuid from "react-native-uuid";


export default async function logTransaction(
  tableName: string, 
  operations: 'CREATE' | 'UPDATE' | 'DELETE', 
  recordId: string) 
  {
  await db.insert(transactionLogsTable).values({
    id: uuid.v4(),
    table_name: tableName,
    operations,
    record_id: recordId,
  })

}