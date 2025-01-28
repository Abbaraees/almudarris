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
        onChangeText={studentsUIStore.setSearch}
      />
      { studentsUIStore.filteredStudents.length > 0 ? (
        <FlatList
        data={studentsUIStore.filteredStudents}
        renderItem={({item}) => (
          <Pressable 
            key={item.id} 
            className='py-4 border-b border-gray-400'
            onPress={() => router.push(`/students/${item.id}`)}
          >
            <Text className='text-lg'>{item.name}</Text>
          </Pressable>
        )}
      />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text className='text-2xl text-green-700 '>No students found</Text>
        </View>
      )}
      
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