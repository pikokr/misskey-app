import { MfmNode, parse } from 'mfm-js'
import React from 'react'
import styled from 'styled-components/native'
import { MkUnicodeEmoji } from './MkUnicodeEmoji'
import { MkCustomEmoji } from './MkCustomEmoji'
import { Note } from '../../types/note'
import { Text } from 'react-native'

const MfmSimpleText = styled.Text<{ size: number }>`
  color: ${({ theme }) => theme.fg};
  font-size: ${({ size }) => size}px;
`

const renderMfmNode = (
  node: MfmNode,
  index: number,
  fontSize: number,
  emojis: Note['emojis'],
): React.ReactNode => {
  switch (node.type) {
    case 'text':
      return (
        <MfmSimpleText size={fontSize} key={index}>
          {node.props.text}
        </MfmSimpleText>
      )
    case 'unicodeEmoji':
      return (
        <MkUnicodeEmoji key={index} code={node.props.emoji} size={fontSize} />
      )
    case 'emojiCode':
      return (
        <MkCustomEmoji
          name={node.props.name}
          key={index}
          size={fontSize}
          url={emojis[node.props.name]}
        />
      )
    default:
      return (
        <MfmSimpleText size={fontSize} key={index}>
          {node.type}
        </MfmSimpleText>
      )
  }
}

export const MfmRenderer: React.FC<{
  content: string
  emojis: Note['emojis']
  fontSize?: number
}> = ({ content, emojis, fontSize = 16 }) => {
  console.log(content)

  const result = React.useMemo(() => {
    return parse(content).map((x, i) => {
      return renderMfmNode(x, i, fontSize, emojis)
    })
  }, [content, fontSize, emojis])

  return <>{result}</>
}
