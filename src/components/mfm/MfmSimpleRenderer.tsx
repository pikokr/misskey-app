import { MfmSimpleNode } from 'mfm-js'
import React from 'react'
import styled from 'styled-components/native'
import { MkUnicodeEmoji } from './MkUnicodeEmoji'
import { MkCustomEmoji } from './MkCustomEmoji'
import { Note } from '../../types/note'

const MfmSimpleText = styled.Text<{ size: number }>`
  color: ${({ theme }) => theme.fg};
  font-size: ${({ size }) => size}px;
`

const renderMfmNode = (
  node: MfmSimpleNode,
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
          key={index}
          size={fontSize}
          url={emojis[node.props.name]}
        />
      )
    default:
      return <React.Fragment key={index} />
  }
}

export const MfmSimpleRenderer: React.FC<{
  nodes: MfmSimpleNode[]
  emojis: Note['emojis']
  fontSize?: number
}> = ({ nodes, emojis, fontSize = 16 }) => {
  const content = React.useMemo(() => {
    return nodes.map((x, i) => {
      return renderMfmNode(x, i, fontSize, emojis)
    })
  }, [nodes, fontSize, emojis])

  return <>{content}</>
}
