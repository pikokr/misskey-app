import React from 'react'
import styled from 'styled-components/native'
import { MiTextInput } from '../../components/MiTextInput'

const Components = {
  Background: styled.SafeAreaView`
    background-color: ${({ theme }) => theme.bg};
    height: 100%;
  `,
  Container: styled.View`
    padding: 48px;
    width: 100%;
    height: 100%;

    flex: 1;
    justify-content: center;
    align-items: center;
  `,
}

export const LoginPage: React.FC = () => {
  return (
    <Components.Background>
      <Components.Container>
        <MiTextInput label="Instance address" />
      </Components.Container>
    </Components.Background>
  )
}
