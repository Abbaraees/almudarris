import { Stack } from 'expo-router';
import { View, Image, Text, StyleSheet } from 'react-native';

import { Container } from '~/components/Container';
import appConfig from '~/stores/AppConfigStore';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Dashboard' }} />
      <Container>
        <View className='w-full bg-green-500 flex-row justify-between p-2 rounded-lg'>
          <View className='justify-center gap-2'>
            <Text className='text-white font-semibold'>{appConfig.fullname}</Text>
            <Text className='text-white font-semibold'>Ansarul Islam | Class 1</Text>
          </View>
          <Image
            source={require('@assets/images/teacher.png')}
            style={styles.image}
          />
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