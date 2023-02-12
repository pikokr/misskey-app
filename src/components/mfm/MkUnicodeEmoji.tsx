import React from 'react'
import { toCodePoints } from 'twemoji-parser'
import { SvgUri } from 'react-native-svg'
import styled from 'styled-components/native'

const Container = styled.View<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

const Content = styled(SvgUri)<{ size: number }>`
  top: ${({ size }) => size / 4}px;
  position: absolute;
`

export const MkUnicodeEmoji: React.FC<{ code: string; size: number }> = ({
  code,
  size,
}) => {
  const url = React.useMemo(
    () =>
      `https://cdn.jsdelivr.net/npm/twemoji@11.3.0/2/svg/${toCodePoints(
        code,
      ).join('-')}.svg`,
    [code],
  )

  return (
    <Container size={size}>
      <Content uri={url} size={size} width={size} height={size} />
    </Container>
  )
}
