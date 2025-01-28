import { View, Text, Pressable } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Container } from '~/components/Container'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'
import studentStore from '~/stores/domain/StudentStore'
import { Student } from '~/types'
import { IconButton } from 'react-native-paper'
import StudentDetailUIState from '~/stores/ui/StudentDetailUIState'
import { observer } from 'mobx-react'

const StudentDetail = () => {
  const { id } = useLocalSearchParams()
  const [uiState, _] = useState(new StudentDetailUIState())

  useFocusEffect(useCallback(() => {
    if (typeof id === 'string') {
      console.log("AAAAAAA")
      uiState.loadStudent(id)
    }
  }, [id]))


  const handleNavigation = (feature) => {
    router.push(`/students/${id}/${feature}`)
  }

  return (
    <>
      <Container>
        {uiState.student ? (
          <View>
            <Stack.Screen options={{ headerTitle: uiState.student ? uiState.student.name : 'Not Found' }} />
            <View className=" items-center p-4 bg-green-100 rounded-lg mb-4 shadow-md">
                
                <MaterialCommunityIcons name='account-circle' size={128} color={'#15803d'}/>
                <Text className="text-2xl font-bold">{uiState.student.name}</Text>
                <View className='flex-row gap-8'>
                  <IconButton icon={'delete'} iconColor='orange' size={32} />
                  <IconButton icon={'pencil'} iconColor='green' size={32} />
                </View>
              
            </View>
            <View className="flex-row flex-wrap justify-between">
              <Pressable className="w-[48%] p-4 my-2 bg-white rounded-lg items-center justify-center shadow-md" onPress={() => handleNavigation('attendance')}>
                <MaterialCommunityIcons name="calendar" size={32} color="green" />
                <Text className="mt-2 text-lg font-bold">Attendance</Text>
              </Pressable>
              <Pressable className="w-[48%] p-4 my-2 bg-white rounded-lg items-center justify-center shadow-md" onPress={() => handleNavigation('assessments')}>
                <MaterialCommunityIcons name="clipboard-text" size={32} color="green" />
                <Text className="mt-2 text-lg font-bold">Assessments</Text>
              </Pressable>
              {/* Add more cards as needed */}
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl text-green-600">No student found</Text>
          </View>
        )}
      </Container>
    </>
  )
}

export default observer(StudentDetail)