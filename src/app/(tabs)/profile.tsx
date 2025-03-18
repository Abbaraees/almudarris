import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Button, Switch, Divider } from "react-native-paper";
import { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Profile Header */}
      <View className="items-center mt-4">
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          className="w-24 h-24 rounded-full border-2 border-green-500"
        />
        <Text className="text-xl font-semibold mt-2">John Doe</Text>
        <Text className="text-gray-500">Teacher</Text>
        <Button mode="contained" className="mt-2 bg-green-500">
          Edit Profile
        </Button>
      </View>

      {/* Stats Section */}
      <View className="bg-white p-4 rounded-xl mt-6 shadow-md">
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-lg font-bold">120</Text>
            <Text className="text-gray-500">Students</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold">45</Text>
            <Text className="text-gray-500">Sessions</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold">90%</Text>
            <Text className="text-gray-500">Completion</Text>
          </View>
        </View>
      </View>

      {/* Settings Section */}
      <View className="bg-white p-4 rounded-xl mt-6 shadow-md">
        <TouchableOpacity className="flex-row items-center py-3">
          <Feather name="lock" size={20} className="text-gray-700" />
          <Text className="ml-3 text-base">Change Password</Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity className="flex-row items-center py-3">
          <Feather name="cloud" size={20} className="text-gray-700" />
          <Text className="ml-3 text-base">Backup & Restore</Text>
        </TouchableOpacity>
        <Divider />
        <View className="flex-row items-center justify-between py-3">
          <View className="flex-row items-center">
            <MaterialIcons name="dark-mode" size={20} className="text-gray-700" />
            <Text className="ml-3 text-base">Dark Mode</Text>
          </View>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
        <Divider />
        <TouchableOpacity className="flex-row items-center py-3">
          <Feather name="help-circle" size={20} className="text-gray-700" />
          <Text className="ml-3 text-base">Help & Support</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <Button
        mode="contained"
        className="mt-6 bg-red-500"
        onPress={() => console.log("Logging Out")}
        buttonColor="#ef4444"
      >
        Logout
      </Button>
    </View>
  );
};

export default ProfileScreen;
