import React from 'react'
import { Text } from 'react-native'
import { Outlet } from 'react-router-native'
import styled from 'styled-components/native'
import { HomeBottomNavigation } from './Footer'

const Components = {
  Root: styled.View`
    width: 100%;
    height: 100%;

    background-color: ${({ theme }) => theme.bg};
  `,
  Content: styled.View`
    flex-grow: 1;
    height: 0;

    width: 100%;
  `,
  Footer: styled.View`
    width: 100%;
  `,
}

export const HomeLayout = () => {
  return (
    <Components.Root>
      <Components.Content>
        <Outlet />
      </Components.Content>
      <Components.Footer>
        <HomeBottomNavigation />
      </Components.Footer>
    </Components.Root>
  )
}
