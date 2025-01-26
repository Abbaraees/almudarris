import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { IconProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon'


type MenuItemPropsType = {
  title: string,
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'],
  onPress: () => void
}
const MenuItem = ({title, icon, onPress}: MenuItemPropsType) => {
  return (
    <Pressable 
      onPress={onPress}
      className='bg-green-100 gap-2 p-3 items-center rounded-md shadow-md' 
      style={{width: '30%'}}
    >
      <MaterialCommunityIcons
        name={icon} 
        size={48} 
        color={'green'}
      />
      <Text className='text-center'>{title}</Text>
    </Pressable>
  )
}

export default MenuItem