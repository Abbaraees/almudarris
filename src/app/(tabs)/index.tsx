import { router, Stack } from 'expo-router';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { Surface } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Container } from '~/components/Container';
import appConfig from '~/stores/AppConfigStore';
import MenuItem from '~/components/MenuItem';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Al-Mudarris (The Teacher)' }} />
      <Container>
        <View className='w-full bg-green-700 flex-row justify-between px-2 py-4 rounded-lg shadow-sm'>
          <View className='justify-center gap-2'>
            <Text className='text-xl text-white font-semibold'>{appConfig.fullname}</Text>
            <Text className='text-lg text-white font-semibold'>Ansarul Islam | Class 1</Text>
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
              onPress={() => {}}
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

const styles = StyleSheet.create({

  image: {
    width: 80,
    height: 80,
    borderRadius: 40  
  },
})