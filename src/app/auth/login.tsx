import { View, Text, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { observer } from 'mobx-react'
import { LoginUIStore } from '~/stores/ui/LoginUIStore'
import { router } from 'expo-router'
import AlertBox from '~/components/AlertBox'
import appConfig from '~/stores/AppConfigStore'

const login = () => {
  const [store, _] = useState(new LoginUIStore())

  if (store.loginSuccess) {
    router.push('/(drawer)/(tabs)')
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
     className='flex flex-1 bg-white justify-center items-center p-4'
    >
      {(store.loginError && store.errorMessage) && (
        <AlertBox 
          title='Login Failed' 
          message={store.errorMessage}
          onDismiss={store.clearError}
        />
      )}
      <Text className='text-green-700 text-xl font-semibold'>Enter Your Password to Proceed</Text>
      <Avatar.Image
        source={require('@assets/images/teacher.png')}
        size={150}
        className='mt-8'
      />
      <View className='w-full mt-10 flex gap-4'>
        <TextInput
          value={appConfig.username}
          label="Username"
          mode='outlined'
          disabled
        />
        
        <TextInput
          value={store.password}
          onChangeText={store.setPassword}
          placeholder='Enter Your Login Password'
          label="Login Password"
          mode='outlined'
          secureTextEntry
        />
        <Button
          mode='contained'
          className='mt'
          onPress={store.login}
        >
          Login
        </Button>
        
      </View>
    </KeyboardAvoidingView>
  )
}

export default observer(login)