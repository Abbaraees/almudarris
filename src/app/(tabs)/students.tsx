import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'
import { Container } from '~/components/Container'
import { Button, Checkbox, FAB, Modal, Portal, RadioButton, TextInput } from 'react-native-paper'
import { router } from 'expo-router'
import studentsUIStore from '~/stores/ui/StudentsUIStore'
import { observer } from 'mobx-react'
import AddStudentDialog from '~/components/AddStudentDialog'

const students = () => {
  return (
    <Container>
      <TextInput
        label='Search for students'
        mode='outlined'
        style={{marginBottom: 8, width: '80%', marginLeft: 'auto'}}
      />
      <FlatList
        data={Array(20).fill(0)}
        renderItem={({index}) => (
          <Pressable key={index} className='py-4 border-b border-gray-400'>
            <Text className='text-lg'>Student {index + 1}</Text>
          </Pressable>
        )}
      />
      <FAB
        icon='plus'
        onPress={studentsUIStore.toggleDialog}
        style={{position: 'absolute', bottom: 16, right: 16, backgroundColor: 'green'}}
        color='white'
      />
      {
        studentsUIStore.isAdding && (
          <AddStudentDialog
            onDone={studentsUIStore.saveStudent}
            onDismiss={studentsUIStore.hideDialog}
            onNameChange={studentsUIStore.setNewStudentName}
            onGenderChange={studentsUIStore.setNewStudentGender}
          />
        )
      }
      
      
    </Container>
  )
}

export default observer(students)