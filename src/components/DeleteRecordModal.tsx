import { View, Text, } from 'react-native'
import React from 'react'
import { Portal, Modal, Button  } from 'react-native-paper'


export type DeleteRecordModalPropsType = {
  recordName: string,
  onAccept: () => void,
  onReject: () => void
}


const DeleteRecordModal = ({recordName, onAccept, onReject}: DeleteRecordModalPropsType) => {
  return (
    <Portal>
      <Modal visible>
        <View className='w-[90%] bg-white rounded-md p-4 self-center items-center'>
          <Text className='text-lg text-red-600 font-semibold my-4'>Confirm Delete</Text>
          <Text className='font-semibold'>Are you sure you want to delete: {recordName}</Text>
          <View className='flex-row gap-12 my-4'>
            <Button mode='contained' onPress={onAccept}>
              Yes
            </Button>
            <Button mode='outlined' onPress={onReject}>
              No
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  )
}

export default DeleteRecordModal