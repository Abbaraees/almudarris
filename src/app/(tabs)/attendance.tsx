import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Container } from '~/components/Container'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'))
  }

  const daysInMonth = currentDate.daysInMonth()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <Container>
      <View className="flex-row justify-between items-center p-4 bg-gray-200 rounded-lg mb-4">
        <MaterialCommunityIcons name="chevron-left" size={32} onPress={handlePrevMonth} />
        <Text className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</Text>
        <MaterialCommunityIcons name="chevron-right" size={32} onPress={handleNextMonth} />
      </View>
      <View className="flex-row flex-wrap justify-between">
        {daysArray.map((day) => (
          <Pressable key={day} className="w-[22%] p-4 m-[1%] bg-white rounded-lg items-center justify-center shadow-md">
            <Text className="text-lg font-bold">{day}</Text>
          </Pressable>
        ))}
      </View>
    </Container>
  )
}

export default Attendance