import { View, Text, Image } from 'react-native'
import React from 'react'
import { Redirect, Stack, router } from 'expo-router'
import { Button } from 'react-native-paper'

const index = () => {
  const alreadySignedUp = true
  
  return (
    <>
      <Stack.Screen options={{headerShown: false}} />
      <View className='flex flex-1 bg-white items-center justify-center p-4'>
        <Image 
          source={require('@assets/images/teacher.png')}
          className='w-6/12'  
          style={{height: 200}}
          resizeMode='center' 
        />
        <Text className='text-center text-green-700 text-2xl font-semibold'>Al-Mudarris (The Teacher)</Text>
        <Text className='text-orange-700 text-lg'>Your Easy-to-use Class Management App</Text>
        <Button 
          mode='contained' 
          className='mt-24 w-full'
          onPress={() => router.push('/auth/signup')}
        >
          Get Started
        </Button>
        <Button 
          mode='elevated' 
          className='mt-4 w-full'
          onPress={() => router.push('/auth/login')}
        >
          Login
        </Button>
      </View>
    </>
  )
}

export default index