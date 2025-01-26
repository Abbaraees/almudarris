import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Button, Modal, Portal, RadioButton, TextInput } from 'react-native-paper'
import studentsUIStore from '~/stores/ui/StudentsUIStore'
import { observer } from 'mobx-react'


type AddStudentDialogPropsType = {
  onDone: () => void,
  onDismiss: () => void,
  onNameChange: (name: string) => void,
  onGenderChange: (gender: string) => void
}


const AddStudentDialog = ({onDone, onDismiss, onNameChange, onGenderChange}: AddStudentDialogPropsType) => {
  return (
    <Portal>
      <Modal visible>
        <View className='w-10/12 bg-white p-4 rounded-lg self-center'>
          <Text className='text-lg text-center mb-6'>Add New Student</Text>
          <TextInput
            label='Full Name'
            placeholder='Enter full name'
            mode='outlined'
            onChangeText={onNameChange}
            style={{marginBottom: 8, width: '100%'}}
          />
          <Text className='text-lg'>Gender</Text>
          <View className='flex flex-row gap-2 my-2'>
            <Pressable 
              onPress={() => onGenderChange('male')}
              className='flex flex-row items-center'
            >
              <RadioButton
                value='male'
                onPress={() => onGenderChange('male')}
                status={studentsUIStore.newStudentGender == 'male' ? 'checked' : 'unchecked'}
              />
              <Text>Male</Text>
            </Pressable>

            <Pressable 
              onPress={() => onGenderChange('female')}
              className='flex flex-row items-center'
            >
              <RadioButton
                value='female'
                status={studentsUIStore.newStudentGender == 'female' ? 'checked' : 'unchecked'}
                onPress={() => onGenderChange('female')}
              />
              <Text>Female</Text>
            </Pressable>
          </View>
          <Button onPress={onDone} mode='contained'>
            <Text>ADD</Text>
          </Button>
          <Button onPress={onDismiss} mode='outlined' style={{marginTop: 8}}>
            <Text>CANCEL</Text>
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default observer(AddStudentDialog)