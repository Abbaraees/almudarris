import { View, Text, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Avatar, Button, Checkbox, Modal, Portal, TextInput } from 'react-native-paper'
import { SignupUIStore } from '~/stores/ui/SignupUIStore'
import { observer } from 'mobx-react'
import AlertBox from '~/components/AlertBox'
import authStore from '~/stores/AuthStore'

const signup = () => {
  const [store, _] = useState(new SignupUIStore())

  return (
    <KeyboardAvoidingView
      behavior='padding'
      className='flex flex-1 bg-white  items-center p-4'
    >
      {store.signupError && (
        <AlertBox 
          title='Signup Failed' 
          message={store.errorMessage}
          onDismiss={store.clearError}
        />
      )}
      { authStore.isAuthenticating && (
        <Portal>
          <Modal visible>
            <ActivityIndicator animating={true} size='large' />
          </Modal>
        </Portal>
      )}
      <Text className='text-green-700 text-2xl mt-1 font-semibold'>Create New Account</Text>
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
          value={store.email}
          onChangeText={store.setEmail}
          placeholder='Enter your email'
          label="Email"
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
        <TextInput
          value={store.password}
          onChangeText={store.setPassword}
          placeholder='Enter Your Login Password'
          label="Password"
          mode='outlined'
          secureTextEntry
        />
        <TextInput
          value={store.confirmPassword}
          onChangeText={store.setConfirmPassword}
          placeholder='Repeat Your Login Password'
          label="Confirm Login Password"
          mode='outlined'
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