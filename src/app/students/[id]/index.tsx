import { View, Text, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, IconButton } from 'react-native-paper'
import { observer } from 'mobx-react'

import { Container } from '~/components/Container'
import studentStore from '~/stores/domain/StudentStore'
import { Tables } from '~/types'
import studentDetailUIState from '~/stores/ui/StudentDetailUIState'
import AddStudentDialog from '~/components/AddStudentDialog'
import DeleteRecordModal from '~/components/DeleteRecordModal'


const StudentDetail = () => {
  const { id } = useLocalSearchParams()
  const [student, setStudent] = useState<Tables<'students'>|null>()

  useFocusEffect(useCallback(() => {
    if (typeof id === 'string') {
      studentDetailUIState.loadStudent(id)
      loadStudent()
    }
  }, [id, studentDetailUIState.isUpdating]))

  const loadStudent = () => {
    const student = studentStore.students.filter(student => student.id == id)
    if (student) {
      setStudent(student[0])
    } else {
      setStudent(null)
    }
  }

  const handleNavigation = (feature: string) => {
    router.push(`/students/${id}/${feature}`)
  }

  return (
    <>
      <Container>
        {
        student === undefined ? (
          <View className='flex items-center justify-center'>
            <ActivityIndicator size={'large'} animating />
          </View>
        ) :
        student ? (
          <View>
            <Stack.Screen options={{ headerTitle: student ? student.name : 'Not Found' }} />
            <View className=" items-center p-4 bg-gray-100 rounded-lg mb-4 shadow-md">
                
                <MaterialCommunityIcons name='account-circle' size={128} color={'#4b5563'}/>
                <Text className="text-2xl font-bold">{student.name}</Text>
                <View className='flex-row gap-8'>
                  <IconButton onPress={studentDetailUIState.toggleDeleteDialog} icon={'delete'} iconColor='#dc2626' size={32} />
                  <IconButton onPress={studentDetailUIState.toggleUpdateDialog} icon={'pencil'} iconColor='#16a34a' size={32} />
                </View>
              
            </View>
            <View className="flex-row flex-wrap justify-between">
              <Pressable className="w-[48%] p-4 my-2 bg-green-100 rounded-lg items-center justify-center shadow-md" onPress={() => handleNavigation('attendance')}>
                <MaterialCommunityIcons name="calendar" size={32} color="#16a34a" />
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
        {studentDetailUIState.isUpdating && (
          <AddStudentDialog
            onDismiss={studentDetailUIState.toggleUpdateDialog}
            onDone={studentDetailUIState.handleUpdate}
            onGenderChange={studentDetailUIState.setGender}
            onNameChange={studentDetailUIState.setName}
            name={studentDetailUIState.name}
            gender={studentDetailUIState.gender}
            isUpdating
          />
        )}
        { studentDetailUIState.isDeleting && (
          <DeleteRecordModal
            recordName={student?.name ?? ''}
            onAccept={studentDetailUIState.handleDelete}
            onReject={studentDetailUIState.toggleDeleteDialog}
          />
        )}
      </Container>
    </>
  )
}

export default observer(StudentDetail)