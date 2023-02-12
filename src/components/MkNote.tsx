import React from 'react'
import { Note } from '../types/note'
import { Text } from 'react-native'
import styled, { css } from 'styled-components/native'

const Components = {
  Container: styled.View<{ divider: boolean }>`
    background-color: ${({ theme }) => theme.panel};
    padding: 24px;
    ${({ divider }) =>
      divider
        ? css`
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: ${({ theme }) => theme.divider};
          `
        : ''}
  `,
}

export const MkNote: React.FC<{ note: Note; divider?: boolean }> = ({
  note,
  divider = false,
}) => {
  return (
    <Components.Container divider={divider}>
      <Text>{note.user.name}</Text>
      <Text>{note.user.username}</Text>
      <Text>{note.user.host}</Text>
      {note.cw ? <Text>{note.cw} - CW</Text> : <Text>{note.text}</Text>}
    </Components.Container>
  )
}
