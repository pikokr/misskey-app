import React from 'react'
import styled from 'styled-components/native'
import * as mfm from 'mfm-js'
import { MfmSimpleRenderer } from './MfmSimpleRenderer'
import { Note } from '../../types/note'

const Components = {
  Container: styled.Text`
    color: ${({ theme }) => theme.fg};
    font-size: 16px;
    font-weight: bold;
    justify-content: center;
  `,
}

export const MkUserName: React.FC<{
  text: string
  host: string
  emojis: Note['emojis']
}> = ({ text, emojis }) => {
  const data = React.useMemo(() => mfm.parseSimple(text), [text])

  return (
    <Components.Container>
      <MfmSimpleRenderer emojis={emojis} nodes={data} />
    </Components.Container>
  )
}
