import { router, Stack } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";
import { Button, Modal, Portal, ActivityIndicator } from "react-native-paper";

import { Container } from "~/components/Container";
import authStore from "~/stores/AuthStore";
import { fetchDataFromSupabase } from "~/utils/fetchData";
import { syncWithSupabase } from "~/utils/syncService";

export default function Home() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [syncError, setSyncError] = useState(false);
  const [message, setMessage] = useState("");

  const handleAction = async (action: () => Promise<{ status: string; message: string }>) => {
    setShowOverlay(true);
    setIsSyncing(true);

    const { status, message } = await action();
    setSyncError(status !== "success");
    setMessage(message);
    
    setIsSyncing(false);
  };

  const hideModal = () => {
    setShowOverlay(false);
    setMessage("");
    setSyncError(false);
    setIsSyncing(true)
  };

  return (
    <>
      <Stack.Screen options={{ title: "Profile" }} />
      <Container>
        <Button mode="outlined" onPress={() => handleAction(fetchDataFromSupabase)} className="my-3">
          Fetch Data
        </Button>
        <Button mode="outlined" onPress={() => handleAction(syncWithSupabase)} className="my-3">
          Upload Data
        </Button>
        <Button
          className="my-3"
          mode="contained"
          onPress={() => {
            authStore.logout();
            router.replace("/auth/login");
          }}
        >
          Sign Out
        </Button>
      </Container>

      <Portal>
        <Modal visible={showOverlay} onDismiss={hideModal}>
          <View className="bg-white w-[80%] self-center items-center p-4 gap-4 rounded-md shadow-md">
            {isSyncing ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <Text className={`text-lg ${syncError ? "text-red-600" : "text-green-700"}`}>
                  {syncError ? "An Error Occurred. Try Again Later" : "Data Synced Successfully"}
                </Text>
                <Text className="text-lg">{message}</Text>
                <Button onPress={hideModal}>Close</Button>
              </>
            )}
          </View>
        </Modal>
      </Portal>
    </>
  );
}
