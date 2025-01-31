import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Button, Modal, Portal, RadioButton, TextInput } from 'react-native-paper'
import { observer } from 'mobx-react'


type AddStudentDialogPropsType = {
  onDone: () => void,
  onDismiss: () => void,
  onNameChange: (name: string) => void,
  onGenderChange: (gender: 'male' | 'female') => void,
  name?: string,
  gender?: string,
  isUpdating?: boolean
}

const AddStudentDialog = ({onDone, onDismiss, onNameChange, onGenderChange, isUpdating, name, gender}: AddStudentDialogPropsType) => {
  return (
    <Portal>
      <Modal visible>
        <View className='w-[90%] bg-white p-4 rounded-lg self-center'>
          <Text className='text-lg text-center mb-6'>{isUpdating ? 'Update Student Info' : `Add New Student`}</Text>
          <TextInput
            value={name}
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
                status={gender == 'male' ? 'checked' : 'unchecked'}
              />
              <Text>Male</Text>
            </Pressable>

            <Pressable 
              onPress={() => onGenderChange('female')}
              className='flex flex-row items-center'
            >
              <RadioButton
                value='female'
                status={gender == 'female' ? 'checked' : 'unchecked'}
                onPress={() => onGenderChange('female')}
              />
              <Text>Female</Text>
            </Pressable>
          </View>
          <Button onPress={onDone} mode='contained'>
            <Text>{isUpdating ? 'UPDATE' : 'ADD'}</Text>
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