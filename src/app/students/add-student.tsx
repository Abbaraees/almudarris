import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Container } from '~/components/Container'
import { Avatar, Checkbox, Divider, TextInput } from 'react-native-paper'

const AddStudents = () => {
  return (
    <Container>
      <View className='flex justify-center my-2'>
        <Avatar.Icon size={128} icon='account' style={{backgroundColor: 'lightgray'}}/>
        <Divider className='w-full my-5'/>
        <Text className='text-lg mb-6'>Student Information</Text>
        <TextInput
          label='Full Name'
          placeholder='Enter full name'
          mode='outlined'
          style={{marginBottom: 8, width: '100%'}}
        />
          <Text>Gender</Text>
        <View className='flex flex-row justify-between'>
          <Pressable className='flex flex-row items-center'>
            <Checkbox status='checked'/>
            <Text>Male</Text>
          </Pressable>

          <Pressable className='flex flex-row items-center'>
            <Checkbox status='checked'/>
            <Text>Female</Text>
          </Pressable>
        </View>
      </View>
    </Container>
  )
}

export default AddStudents