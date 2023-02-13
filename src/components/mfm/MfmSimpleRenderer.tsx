import { MfmSimpleNode } from 'mfm-js'
import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { MkUnicodeEmoji } from './MkUnicodeEmoji'
import { MkCustomEmoji } from './MkCustomEmoji'
import { Note } from '../../types/note'
import { ThemeColor } from '../../utils/theme'

const MfmSimpleText = styled.Text<{ size: number; color: string }>`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size}px;
`

const renderMfmNode = (
  node: MfmSimpleNode,
  index: number,
  fontSize: number,
  emojis: Note['emojis'],
  textColor: string,
): React.ReactNode => {
  switch (node.type) {
    case 'text':
      return (
        <MfmSimpleText color={textColor} size={fontSize} key={index}>
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
      return <React.Fragment key={index} />
  }
}

export const MfmSimpleRenderer: React.FC<{
  nodes: MfmSimpleNode[]
  emojis: Note['emojis']
  fontSize?: number
  textColor?: ThemeColor
}> = ({ nodes, textColor = 'fg', emojis, fontSize = 16 }) => {
  const theme = useTheme()

  let color = theme[textColor]

  const content = React.useMemo(() => {
    return nodes.map((x, i) => {
      return renderMfmNode(x, i, fontSize, emojis, color)
    })
  }, [nodes, fontSize, emojis, color])

  return <>{content}</>
}
