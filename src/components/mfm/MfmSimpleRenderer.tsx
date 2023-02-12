import { MfmSimpleNode } from 'mfm-js'
import React from 'react'
import styled from 'styled-components/native'
import { MkUnicodeEmoji } from './MkUnicodeEmoji'

const MfmSimpleText = styled.Text`
  color: ${({ theme }) => theme.fg};
`

const renderMfmNode = (node: MfmSimpleNode, index: number): React.ReactNode => {
  switch (node.type) {
    case 'text':
      return <MfmSimpleText key={index}>{node.props.text}</MfmSimpleText>
    case 'unicodeEmoji':
      return <MkUnicodeEmoji key={index} code={node.props.emoji} />
    default:
      return <React.Fragment key={index} />
  }
}

export const MfmSimpleRenderer: React.FC<{
  nodes: MfmSimpleNode[]
  emojiHost: string
}> = ({ nodes, emojiHost }) => {
  const content = React.useMemo(() => {
    return nodes.map((x, i) => {
      return renderMfmNode(x, i)
    })
  }, [nodes])

  return <>{content}</>
}
