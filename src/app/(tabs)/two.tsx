import { router, Stack } from 'expo-router';
import { Button } from 'react-native-paper';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import authStore from '~/stores/AuthStore';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Container>
        <Button mode="contained" onPress={() => {
          authStore.logout()
          router.replace('/auth/login')
        }}>
          Sign Out
        </Button>
      </Container>
    </>
  );
}
