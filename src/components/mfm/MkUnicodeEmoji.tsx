import React from 'react'
import { parse } from 'twemoji-parser'
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
  const url = React.useMemo(() => parse(code)[0].url, [code])

  const [isErrored, setIsErrored] = React.useState(false)

  return (
    <Container size={size}>
      {isErrored ? (
        <Content
          uri={url}
          size={size}
          width={size}
          height={size}
          onError={() => setIsErrored(true)}
        />
      ) : (
        <FallbackContainer size={size}>
          <FallbackContent size={size}>{code}</FallbackContent>
        </FallbackContainer>
      )}
    </Container>
  )
}
