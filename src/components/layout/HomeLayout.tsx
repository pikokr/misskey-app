import React from 'react'
import { Text, View } from 'react-native'
import { Outlet } from 'react-router-native'

export const HomeLayout = () => {
  return (
    <View>
      <Text>Test</Text>
      <Outlet />
    </View>
  )
}
