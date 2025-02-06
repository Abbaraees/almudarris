import { View, Text, Pressable, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { Container } from '~/components/Container'
import { ActivityIndicator, Button, Checkbox, FAB, Modal, Portal, RadioButton, TextInput } from 'react-native-paper'
import { router, useFocusEffect } from 'expo-router'
import studentsUIStore from '~/stores/ui/StudentsUIStore'
import { observer } from 'mobx-react'
import AddStudentDialog from '~/components/AddStudentDialog'
import { useInsertStudent, useStudentList } from '../../api/students'
import authStore from '~/stores/AuthStore'
import studentStore from '~/stores/domain/StudentStore'

const students = () => {

  // const { mutate: insertStudent, isPending: isAdding } = useInsertStudent()
  // const { profile } = authStore

  useFocusEffect(useCallback(() => {
   studentsUIStore.filterStudents()
  }, []))

  return (
    <Container>
      <TextInput
        label='Search for students'
        mode='outlined'
        style={{marginBottom: 8, width: '80%', marginLeft: 'auto'}}
        onChangeText={studentsUIStore.setSearch}
      />
      {/* { isAdding && (
        <Portal>
          <Modal visible>
            <ActivityIndicator animating size={'large'} color='green' />
          </Modal>
        </Portal>
      )} */}
      {
        // isLoading ? (
        //   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //     <ActivityIndicator size='large' color='green' animating/>
        //   </View>
        // ) : 

        // error ? (
        //   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //     <Text className='text-2xl text-red-700'>{error.message}</Text>
        //     <Button onPress={useStudentList} mode='contained'>Retry</Button>
        //   </View>
        // ) : 
      
        studentsUIStore.filteredStudents.length > 0 ? (
          <FlatList
          data={studentStore.students}
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
            gender={studentsUIStore.newStudentGender}
          />
        )
      }
      
      
    </Container>
  )
}

export default observer(students)