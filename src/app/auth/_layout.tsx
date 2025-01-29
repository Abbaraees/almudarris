import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import authStore from '~/stores/AuthStore'

const _layout = () => {
  if (authStore.profile) {
    return <Redirect href={'/(tabs)'} />
  }
  return (
    <Stack screenOptions={{headerShown: false}}/>
  )
}

export default _layout