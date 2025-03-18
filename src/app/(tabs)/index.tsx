import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import authStore from "~/stores/AuthStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import dayjs from "dayjs";

const screenWidth = Dimensions.get("window").width;

type Action = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  color: string;
  route: string;
}

export default function Dashboard() {
  const { profile } = authStore;
  const router = useRouter();

  const [attendanceStats, setAttendanceStats] = useState({
    present: 45,
    absent: 10,
    late: 5,
  });

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        data: [20, 30, 25, 35, 40],
      },
    ],
  };

  const todayAttendanceStats = [
    {
      name: "Present",
      population: attendanceStats.present,
      color: "#059669",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Absent",
      population: attendanceStats.absent,
      color: "#DC2626",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Late",
      population: attendanceStats.late,
      color: "#D97706",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const actions: Action[] = [
    { icon: "account-group", label: "Students", color: "#4F46E5", route: 'students' }, // Indigo
    { icon: "calendar-check", label: "Attendance", color: "#059669", route: 'attendance' }, // Green
    { icon: "chart-box", label: "Reports", color: "#D97706", route: '' }, // Amber
    { icon: "notebook-check", label: "Assessments", color: "#7C3AED", route: '' }, // Purple
    { icon: "book-open", label: "Subjects", color: "#DC2626", route: '' }, // Red
    { icon: "calendar", label: "Schedule", color: "#2563EB", route: '' }, // Blue
    { icon: "chat", label: "Messages", color: "#0D9488", route: '' }, // Teal
    { icon: "cog", label: "Settings", color: "#6B7280", route: 'profile' }, // Gray
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Header Section */}
      <Text className="text-2xl font-bold text-gray-800">
        Good Morning, {profile?.full_name}!
      </Text>
      <Text className="text-md text-gray-600 mb-4">
        {profile?.school_name} - {profile?.class_name}
      </Text>
      <Text className="text-gray-600 mb-4">Today's Date: {dayjs(new Date()).format('DD MMMM, YYYY')}</Text>

      {/* Attendance Chart */}
      <Text className="text-lg font-semibold text-gray-800 mb-2">Today's Attendance Chart</Text>
      <PieChart
        data={todayAttendanceStats}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#f00",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => "#6B7280",
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      {/* Attendance Trends */}
      <Text className="text-lg font-semibold text-gray-800 mb-2">Weekly Attendance Trends</Text>
      <BarChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: () => "#6B7280",
          barPercentage: 0.5,
        }}
        style={{ borderRadius: 8 }}
      />

      {/* Actions */}
      {/* Quick Actions Grid */}
      <Text className="text-lg font-semibold text-gray-800 mb-2">Quick Actions</Text>
      <View className="flex-row flex-wrap bg-green-100 rounded-md mb-10">
        {actions.map((item, index) => (
          <TouchableOpacity key={index} className="w-1/4 items-center p-3" onPress={() => item.color && router.navigate(item.route)}>
            <View className="bg-white p-3 rounded-xl shadow-sm mb-1">
              <MaterialCommunityIcons name={item.icon} size={32} color={item.color} />
            </View>
            <Text className="text-sm text-gray-700 mt-1 font-medium">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
