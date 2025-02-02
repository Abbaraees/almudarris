import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, Portal } from 'react-native-paper'
import { observer } from 'mobx-react'


type TakeAttendanceModalPropsType = {
  studentId: string,
  studentName: string,
  studentStatus: string,
  studentCompleteness: number,
  onAccept: (studentName: string, status: string, completeness: number) => void,
  onReject: () => void
}

const TakeAttendanceModal = ({studentId, studentName, studentStatus, studentCompleteness, onAccept, onReject}: TakeAttendanceModalPropsType) => {
  const [status, setStatus] = useState(studentStatus)
  const [completeness, setCompleteness] = useState(studentCompleteness)
  return (
    <Portal>
      <Modal visible onDismiss={onReject}>
        <View className="bg-white p-6 rounded-lg mx-4">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Mark Attendance for {studentName}
          </Text>
          {/* Attendance Options */}
          <View className="flex-row justify-around mb-4 flex-wrap gap-2">
            <Button 
              mode={status == 'PRESENT' ? 'contained' : 'outlined'} 
              className="bg-green-500"
              onPress={() => setStatus('PRESENT')}
            >Present</Button>
            <Button 
              mode={status == 'LATE' ? 'contained' : 'outlined'} 
              className="bg-yellow-500"
              onPress={() => setStatus('LATE')}
            >Late</Button>
            <Button 
              mode={status == 'EXCUSE' ? 'contained' : 'outlined'} 
              className="bg-yellow-500"
              onPress={() => setStatus('EXCUSE')}
            >Excuse</Button>
            <Button onPress={() => setStatus('Absent')} mode={status == 'Absent' ? 'contained' : 'outlined'} className="bg-red-500">Absent</Button>
          </View>
          {/* Completeness (Uniform, etc.) */}
          <View className="mb-4">
            <Text className="text-lg font-medium text-gray-700 mb-2">
              Completeness
            </Text>
            <Button onPress={() => setCompleteness(30)} mode={completeness == 30 ? 'contained' : 'outlined'} className="mb-2">Excellent</Button>
            <Button onPress={() => setCompleteness(20)} mode={completeness == 20 ? 'contained' : 'outlined'} className="mb-2">Good</Button>
            <Button onPress={() => setCompleteness(10)} mode={completeness == 10 ? 'contained' : 'outlined'} className="mb-2">Fair</Button>
            <Button onPress={() => setCompleteness(5)} mode={completeness == 5 ? 'contained' : 'outlined'} className="mb-2">Poor</Button>
            <Button onPress={() => setCompleteness(0)} mode={completeness == 0 ? 'contained' : 'outlined'}>Not Complete</Button>
          </View>
          <Button mode="contained" onPress={() => {onAccept(studentId, status, completeness)}}>
            Save
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default observer(TakeAttendanceModal)