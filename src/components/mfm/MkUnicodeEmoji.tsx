import React from 'react'
import { toCodePoints } from 'twemoji-parser'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'

const EmojiImg = styled(FastImage)`
  width: 24px;
  height: 24px;
`

export const MkUnicodeEmoji: React.FC<{ code: string }> = ({ code }) => {
  const url = React.useMemo(
    () =>
      `https://cdn.jsdelivr.net/npm/twemoji@11.3.0/2/svg/${toCodePoints(
        code,
      ).join('-')}.svg`,
    [code],
  )

  console.log(url)

  return (
    <EmojiImg
      source={{
        uri: url,
      }}
    />
  )
}
