import React from 'react'
import { User } from '../../types/user'
import styled from 'styled-components/native'
import { MkProfileTopArea } from './MkProfileTopArea'
import { Text } from 'react-native'

const Components = {
  Container: styled.ScrollView`
    width: 100%;
    height: 100%;
  `,
}

export const MkProfileContent: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Components.Container>
      <MkProfileTopArea user={user} />
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
      <Text>sans</Text>
    </Components.Container>
  )
}
