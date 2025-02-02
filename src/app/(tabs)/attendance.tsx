import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Container } from '~/components/Container'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { Button, Modal, Portal } from 'react-native-paper'
import { router } from 'expo-router'

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [showModal, setShowModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState(dayjs())

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'))
  }

  const pickDay = (day: number) => {
    setShowModal(true)
    setSelectedDay(currentDate.set('date', day))
  }

  const navigateToAttendance = (session: string) => {
    setShowModal(false)
    router.push(`/attendance/take-attendance?date=${selectedDay.toDate().toDateString()}&session=${session}`)
  }

  const daysInMonth = currentDate.daysInMonth()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <Container>
      <ScrollView>
        <View className="flex-row justify-between items-center p-4 bg-gray-200 rounded-lg mb-4">
          <MaterialCommunityIcons name="chevron-left" size={32} onPress={handlePrevMonth} />
          <Text className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</Text>
          <MaterialCommunityIcons name="chevron-right" size={32} onPress={handleNextMonth} />
        </View>
        <View className="flex-row flex-wrap justify-between">
          {daysArray.map((day) => (
            <Pressable onPress={() => {pickDay(day)}} key={day} className="w-[22%] p-4 m-[1%] bg-white rounded-lg items-center justify-center shadow-md">
              <Text className="text-lg font-bold">{day}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {showModal && (
        <Portal>
          <Modal visible onDismiss={() => setShowModal(false)}>
            <View className='w-[90%] bg-white self-center p-4 gap-4 rounded-md items-center'>
              <Text className='text-lg text-green-700 font-bold text-center'>Select Session</Text>
              <Text className="text-xl font-bold">{selectedDay.format('dddd DD MMMM YYYY')}</Text>
              <View className='flex-row gap-8'>
                <Button mode='contained' onPress={() => navigateToAttendance('MORNING')}>Morning</Button>
                <Button mode='outlined' onPress={() => navigateToAttendance('EVENING')}>Evening</Button>
              </View>
            </View>
          </Modal>
        </Portal>
      )}
    </Container>
  )
}

export default Attendance