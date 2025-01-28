import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, Portal } from 'react-native-paper'

const AlertBox = ({title, message, onDismiss}: {title: string, message: string, onDismiss: () => void}) => {
  const [visible, setVisible] = useState(true)
  return (
    <Portal>
      <Modal visible={visible}>
        <View className='w-2/3 bg-white rounded-lg p-4 gap-4 items-center self-center space-y-4'>
          <Text className='text-lg'>{title}</Text>
          <Text className='text-lg'>{message}</Text>
          <Button onPress={onDismiss} style={{width: '100%'}}>Close</Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default AlertBox