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

const FallbackContainer = styled.View<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: absolute;
`

const FallbackContent = styled.Text<{ size: number }>`
  font-size: ${({ size }) => size}px;
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

export const MkUnicodeEmoji: React.FC<{ code: string; size: number }> = ({
  code,
  size,
}) => {
  const url = React.useMemo(
    () =>
      `https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/${toCodePoints(
        code,
      ).join('-')}.svg`,
    [code],
  )

  const [isErrored, setIsErrored] = React.useState(false)

  return (
    <Container size={size}>
      {isErrored ? (
        <FallbackContainer size={size}>
          <FallbackContent size={size}>{code}</FallbackContent>
        </FallbackContainer>
      ) : (
        <Content
          uri={url}
          size={size}
          width={size}
          height={size}
          onError={() => setIsErrored(true)}
        />
      )}
    </Container>
  )
}
