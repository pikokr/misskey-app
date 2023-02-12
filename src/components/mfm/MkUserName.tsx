import React from 'react'
import styled from 'styled-components/native'
import * as mfm from 'mfm-js'
import { MfmSimpleRenderer } from './MfmSimpleRenderer'

const Components = {
  Container: styled.Text`
    color: ${({ theme }) => theme.fg};
    font-size: 16px;
    font-weight: bold;
  `,
}

export const MkUserName: React.FC<{ text: string; host: string }> = ({
  text,
  host,
}) => {
  const data = React.useMemo(() => mfm.parseSimple(text), [text])

  return (
    <Components.Container>
      <MfmSimpleRenderer emojiHost={host} nodes={data} />
    </Components.Container>
  )
}
