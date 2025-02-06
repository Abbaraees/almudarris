import { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Button, ActivityIndicator, Portal, Modal, TextInput } from "react-native-paper";
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import dayjs from "dayjs";
import TakeAttendanceModal from "~/components/TakeAttendanceModal";
import TakeAttendanceUIState from "~/stores/ui/TakeAttendanceUIState";
import { observer } from "mobx-react";

function StudentList() {
  const { date: dateArg, session: sessionArg } = useLocalSearchParams();
  const date = typeof dateArg === 'string' ? dateArg : dateArg[0]
  const session = typeof sessionArg === 'string' ? sessionArg : sessionArg[0]

  const [takeAttendanceUIState, _] = useState(new TakeAttendanceUIState(date, session))
  const navigation = useNavigation()

  useFocusEffect(useCallback(() => {
    takeAttendanceUIState.loadAttendance(date, session)
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
      takeAttendanceUIState.saveAttendance()
      console.log("Back Pressed")
      navigation.dispatch(e.data.action)
    })

    return () => {
      navigation.removeListener('beforeRemove', (e) => {
        console.log("Removed")
      })
    }

  }, [date, session]))



  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-semibold text-center text-gray-800 mb-4">
        {session.toLocaleUpperCase()} Attendance - {dayjs(date).format('dddd DD MMMM, YYYY')}
      </Text>
      <TextInput
        mode="outlined"
        placeholder="Search for a student"
        onChangeText={takeAttendanceUIState.filterAttendance}
        style={{marginVertical: 8, width: '80%', marginLeft: 'auto'}}
      />
        
      { takeAttendanceUIState.attendance.length > 0 ? (
        <FlatList
          data={takeAttendanceUIState.filteredAttendance}
          // keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white rounded-lg p-4 shadow-md mb-3 flex-row justify-between items-center"
              onPress={() => takeAttendanceUIState.openModal(item)}
            >
              <Text className="text-lg font-medium text-gray-700">
                {item.student_name}
              </Text>
              <Text
                className={`text-sm font-bold px-3 py-1 rounded-full ${
                  item.status === "PRESENT"
                    ? "bg-green-200 text-green-700"
                    : item.status === "LATE"
                    ? "bg-yellow-200 text-yellow-700"
                    : item.status == 'EXCUSE'
                    ? "bg-gray-200 text-gray-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {item.status}
              </Text>
            </TouchableOpacity>
          )}
        />)
        : (
          <View className="items-center">
            <ActivityIndicator size='large' animating />
          </View>
        )
        }
      <Button mode="contained" onPress={takeAttendanceUIState.saveAttendance}>Save</Button>
      
      {/* Mark Attendance Modal */}
      {(takeAttendanceUIState.isModalVisible && takeAttendanceUIState.selectedStudent) && (
        <TakeAttendanceModal
          studentId={takeAttendanceUIState.selectedStudent.student_id}
          studentName={takeAttendanceUIState.selectedStudent.student_name}
          studentStatus={takeAttendanceUIState.selectedStudent.status}
          studentCompleteness={takeAttendanceUIState.selectedStudent.completeness ?? 0}
          onAccept={takeAttendanceUIState.markAttendance}
          onReject={takeAttendanceUIState.closeModal}
        />
      )}

      {takeAttendanceUIState.saving && (
        <Portal>
          <Modal visible>
              <ActivityIndicator size={'large'} animating />
          </Modal>
        </Portal>
      )}
    </View>
  );
}


export default observer(StudentList)