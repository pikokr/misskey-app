import React from 'react'
import { Note } from '../types/note'
import { Text } from 'react-native'
import styled, { css, useTheme } from 'styled-components/native'
import { MkAvatar } from './MkAvatar'
import { useSelectedAccount } from '../utils/accounts'

const Components = {
  Container: styled.View<{ divider: boolean }>`
    background-color: ${({ theme }) => theme.bg};
    padding: 24px;
    flex-direction: row;
    gap: 16px;
    ${({ divider }) =>
      divider
        ? css`
            border-bottom-width: 1px;
            border-bottom-color: ${({ theme }) => theme.divider};
          `
        : ''}
  `,
  Content: styled.View`
    flex-grow: 1;
    width: 0;
  `,
  UsernameContainer: styled.View`
    gap: 2px;
  `,
  Username: styled.Text`
    color: ${({ theme }) => theme.fg};
    font-size: 16px;
    font-weight: bold;
  `,
  HandleContainer: styled.Text`
    color: ${({ theme }) => theme.fg};
    align-items: center;
    flex-direction: row;
  `,
  HandleHost: styled.Text`
    color: ${({ theme }) =>
      theme.fg.replace('rgb', 'rgba').replace(')', ', 0.5)')}; // Opacity
  `,
}

export const MkNote: React.FC<{ note: Note; divider?: boolean }> = ({
  note,
  divider = false,
}) => {
  const account = useSelectedAccount()

  const theme = useTheme()

  return (
    <Components.Container divider={divider}>
      <MkAvatar src={note.user.avatarUrl} size={48} />
      <Components.Content>
        <Components.UsernameContainer>
          <Components.Username>{note.user.name}</Components.Username>
          <Components.HandleContainer>
            <Text>{note.user.username}</Text>
            <Components.HandleHost>
              @{note.user.host ?? account.host}
            </Components.HandleHost>
          </Components.HandleContainer>
        </Components.UsernameContainer>
        <Text>TODO</Text>
      </Components.Content>
    </Components.Container>
  )
}
