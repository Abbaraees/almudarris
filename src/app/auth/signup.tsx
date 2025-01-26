import { View, Text, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button, Checkbox, TextInput } from 'react-native-paper'
import { SignupUIStore } from '~/stores/ui/SignupUIStore'
import { observer } from 'mobx-react'

const signup = () => {
  const [store, _] = useState(new SignupUIStore())

  return (
    <KeyboardAvoidingView
      behavior='padding'
      className='flex flex-1 bg-white  items-center p-4'
    >
      <Text className='text-green-700 text-2xl mt-1 font-semibold'>Setup your Device</Text>
      <Avatar.Image
        source={require('@assets/images/teacher.png')}
        size={150}
        className='mt-8'
      />
      <View className='w-full mt-10 flex gap-4'>
        <TextInput
          value={store.teacherName}
          onChangeText={store.setTeacherName}
          placeholder='Enter Your Full Name'
          label="Full Name"
          mode='outlined'
        />
        <TextInput
          value={store.username}
          onChangeText={store.setUsername}
          placeholder='Enter Your Username'
          label="Username"
          mode='outlined'
        />
        
        <TextInput
          value={store.schoolName}
          onChangeText={store.setSchoolName}
          placeholder='Enter Your School Name'
          label="School Name"
          mode='outlined'
        />
        <TextInput
          value={store.className}
          onChangeText={store.setClassName}
          placeholder='Enter Your Class Name'
          label="Class Name"
          mode='outlined'
        />
        <Pressable
          className='flex-row items-center'
          onPress={store.togglePassword}
        >
          <Checkbox
            status={store.enablePassword ? 'checked' : 'unchecked'}
          />
          <Text>Enable password-based login</Text>
        </Pressable>
        <TextInput
          value={store.password}
          onChangeText={store.setPassword}
          placeholder='Enter Your Login Password'
          label="Password"
          mode='outlined'
          disabled={!store.enablePassword}
          secureTextEntry
        />
        <TextInput
          value={store.confirmPassword}
          onChangeText={store.setConfirmPassword}
          placeholder='Repeat Your Login Password'
          label="Confirm Login Password"
          mode='outlined'
          disabled={!store.enablePassword}
          secureTextEntry
        />
        <Button
          mode='contained'
          className='mt-6'
          onPress={store.signup}
        >
          Get Started
        </Button>
        
      </View>
    </KeyboardAvoidingView>
  )
}

export default observer(signup)