import { useEffect } from 'react';
import '../../global.css';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import theme from '~/constants/Theme';
import appConfig from '~/stores/AppConfigStore';
import db from '~/db';
import migrations from '~/../drizzle/migrations';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

const queryClient = new QueryClient()


export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations)
  if (success) {
    console.log('Successfully migrated database')
  } else if (error) {
    console.error('Failed to migrate database', error)
  }

  useEffect(() => {
    appConfig.initialize()
  }, [])


  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='auth' />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name='students' />
            <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
          </Stack>
        </GestureHandlerRootView>
      </PaperProvider>
    </QueryClientProvider>
  );
}
