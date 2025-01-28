import { router, Stack } from 'expo-router';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { Container } from '~/components/Container';
import appConfig from '~/stores/AppConfigStore';
import MenuItem from '~/components/MenuItem';
import React from 'react';
import authStore from '~/stores/AuthStore';
import { observer } from 'mobx-react';

function Home() {
  
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerTitle: 'Al-Mudarris (The Teacher)' }} />
      <Container>
        <View className='w-full bg-green-700 flex-row justify-between px-2 py-4 rounded-lg shadow-sm'>
          <View className='justify-center gap-2 w-[70%]'>
            <Text className='text-xl text-white font-semibold'>{authStore.profile?.full_name}</Text>
            <Text className='text text-white'>{authStore.profile?.school_name} | {authStore.profile?.class_name}</Text>
          </View>
          <Image
            source={require('@assets/images/teacher.png')}
            style={styles.image}
          />
        </View>

        <View className='mt-4 bg-gray-100 p-2 rounded-md'>
          <Text className='text-2xl font-semibold my-2'>Menu</Text>
          <View className='flex flex-row my-1 justify-between'>
            <MenuItem
              title='Students'
              icon='account-multiple'
              onPress={() => {router.push('/(tabs)/students')}}
            />
            <MenuItem
              title='Attendance'
              icon='calendar'
              onPress={() => {router.push('/(tabs)/attendance')}}
            />
            <MenuItem
              title='Assessments'
              icon='book-outline'
              onPress={() => {}}
            />

            
          </View>
        </View>
      </Container>
    </>
  );
}

export default observer(Home);

const styles = StyleSheet.create({

  image: {
    width: 80,
    height: 80,
    borderRadius: 40  
  },
})