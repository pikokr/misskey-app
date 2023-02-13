import { MfmInline, MfmNode, parse } from 'mfm-js'
import React, { PropsWithChildren } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { MkUnicodeEmoji } from './MkUnicodeEmoji'
import { MkCustomEmoji } from './MkCustomEmoji'
import { Note } from '../../types/note'
import { MfmSimpleRenderer } from './MfmSimpleRenderer'
import { ThemeColor } from '../../utils/theme'
import { IconExternalLink } from 'tabler-icons-react-native'
import { Linking, StyleProp, Text, View } from 'react-native'

const MfmSimpleText = styled.Text<{ size: number; color: ThemeColor }>`
  color: ${({ theme, color }) => theme[color]};
  font-size: ${({ size }) => size}px;
`

const LinkContainer = styled.TouchableNativeFeedback``

const LinkText = styled.Text<{ size: number }>`
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.link}px;
`

const IconContainer = styled.View<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

const LinkIcon = styled(IconExternalLink)`
  top: ${({ size }) => (size as number) / 4}px;
  position: absolute;
`

const Link: React.FC<
  PropsWithChildren<{
    href: string
    size: number
  }>
> = ({ href, size, children }) => {
  const theme = useTheme()

  const open = React.useCallback(() => {
    Linking.openURL(href).then(() => console.log('open url'))
  }, [href])

  return (
    <LinkContainer onPress={open}>
      <LinkText size={size}>
        {children}
        <IconContainer size={size}>
          <LinkIcon color={theme.link} size={size} />
        </IconContainer>
      </LinkText>
    </LinkContainer>
  )
}

const renderMfmNode = (
  node: MfmNode,
  fontSize: number,
  emojis: Note['emojis'],
  textColor: ThemeColor,
  additionalStyles: StyleProp<any>,
): React.ReactNode => {
  switch (node.type) {
    case 'text':
      return (
        <MfmSimpleText size={fontSize} color={textColor}>
          {node.props.text}
        </MfmSimpleText>
      )
    case 'unicodeEmoji':
      return <MkUnicodeEmoji code={node.props.emoji} size={fontSize} />
    case 'emojiCode':
      return (
        <MkCustomEmoji
          name={node.props.name}
          size={fontSize}
          url={emojis[node.props.name]}
        />
      )
    case 'url':
      return (
        <Link href={node.props.url} size={fontSize}>
          <LinkText size={fontSize}>{node.props.url}</LinkText>
        </Link>
      )
    case 'link':
      return (
        <Link href={node.props.url} size={fontSize}>
          <MfmInlineRenderer
            textColor="link"
            emojis={emojis}
            fontSize={fontSize}
            nodes={node.children}
          />
        </Link>
      )
    case 'center':
      return (
        <View>
          <MfmInlineRenderer
            textColor={textColor}
            emojis={emojis}
            fontSize={fontSize}
            nodes={node.children}
            additionalStyles={{ textAlign: 'center' }}
          />
        </View>
      )
    case 'small':
      return (
        <MfmInlineRenderer
          textColor={textColor}
          emojis={emojis}
          fontSize={fontSize}
          nodes={node.children}
          additionalStyles={{
            fontSize: 12,
          }}
        />
      )
    case 'bold':
      return (
        <MfmInlineRenderer
          additionalStyles={[
            additionalStyles,
            {
              fontWeight: 'bold',
            },
          ]}
          textColor={textColor}
          fontSize={fontSize}
          nodes={node.children}
          emojis={emojis}
        />
      )
    case 'italic':
      return (
        <MfmInlineRenderer
          textColor={textColor}
          emojis={emojis}
          fontSize={fontSize}
          nodes={node.children}
          additionalStyles={{
            fontStyle: 'italic',
          }}
        />
      )
    case 'strike':
      return (
        <MfmInlineRenderer
          textColor={textColor}
          emojis={emojis}
          fontSize={fontSize}
          nodes={node.children}
          additionalStyles={{
            textDecorationLine: 'line-through',
          }}
        />
      )
    case 'blockCode':
    case 'fn':
    case 'mathInline':
    case 'mathBlock':
    case 'inlineCode':
    case 'hashtag':
    case 'mention':
    case 'plain':
    case 'quote':
    case 'search':
    default:
      return (
        <MfmSimpleText size={fontSize} color={textColor}>
          {node.type}
        </MfmSimpleText>
      )
  }
}

const renderMfmInlineNode = (
  node: MfmInline,
  index: number,
  fontSize: number,
  emojis: Note['emojis'],
  textColor: ThemeColor,
  additionalStyles?: StyleProp<any>,
): React.ReactNode => {
  switch (node.type) {
    case 'text':
      return (
        <MfmSimpleText
          size={fontSize}
          key={index}
          color={textColor}
          style={additionalStyles}>
          {node.props.text}
        </MfmSimpleText>
      )
    case 'plain':
      return (
        <MfmSimpleRenderer
          additionalStyles={additionalStyles}
          textColor={textColor}
          fontSize={fontSize}
          nodes={node.children}
          key={index}
          emojis={emojis}
        />
      )
    case 'bold':
      return (
        <MfmInlineRenderer
          additionalStyles={[
            additionalStyles,
            {
              fontWeight: 'bold',
            },
          ]}
          textColor={textColor}
          fontSize={fontSize}
          nodes={node.children}
          key={index}
          emojis={emojis}
        />
      )
    case 'small':
      return (
        <MfmInlineRenderer
          key={index}
          textColor={textColor}
          emojis={emojis}
          fontSize={fontSize}
          nodes={node.children}
        />
      )
    case 'italic':
      return (
        <MfmInlineRenderer
          key={index}
          textColor={textColor}
          emojis={emojis}
          fontSize={fontSize}
          nodes={node.children}
          additionalStyles={{
            fontStyle: 'italic',
          }}
        />
      )
    case 'strike':
    case 'mention':
    case 'inlineCode':
    case 'link':
    case 'mathInline':
    case 'hashtag':
    case 'fn':
    case 'emojiCode':
    case 'unicodeEmoji':
    case 'url':
    default:
      return (
        <MfmSimpleText size={fontSize} key={index} color={textColor}>
          {node.type}
        </MfmSimpleText>
      )
  }
}

const MfmInlineRenderer: React.FC<{
  nodes: MfmInline[]
  emojis: Note['emojis']
  fontSize: number
  textColor: ThemeColor
  additionalStyles?: StyleProp<any>
}> = ({ nodes, textColor, fontSize, emojis, additionalStyles }) => {
  const result = React.useMemo(() => {
    return nodes.map((x, i) => {
      return renderMfmInlineNode(
        x,
        i,
        fontSize,
        emojis,
        textColor,
        additionalStyles,
      )
    })
  }, [nodes, fontSize, emojis, textColor, additionalStyles])

  return <>{result}</>
}

export const MfmRenderer: React.FC<{
  content: string
  emojis: Note['emojis']
  fontSize?: number
  textColor?: ThemeColor
}> = ({ content, emojis, textColor = 'fg', fontSize = 16 }) => {
  const result = React.useMemo(() => {
    return parse(content)
  }, [content])

  return (
    <MfmRendererNative
      emojis={emojis}
      nodes={result}
      fontSize={fontSize}
      textColor={textColor}
    />
  )
}

export const MfmRendererNative: React.FC<{
  nodes: MfmNode[]
  emojis: Note['emojis']
  fontSize: number
  textColor: ThemeColor
  additionalStyles?: StyleProp<any>
}> = ({ nodes, emojis, fontSize, textColor, additionalStyles }) => {
  const result = React.useMemo(() => {
    const elements: React.ReactNode[] = []

    let current: React.ReactNode[] = []

    nodes.forEach((x, i) => {
      const rendered = renderMfmNode(
        x,
        fontSize,
        emojis,
        textColor,
        additionalStyles,
      )

      if (x.type === 'center') {
        if (current.length) {
          elements.push(<Text key={elements.length}>{current}</Text>)
        }

        elements.push(
          <React.Fragment key={elements.length}>{rendered}</React.Fragment>,
        )

        current = []

        return
      }

      current.push(<React.Fragment key={i}>{rendered}</React.Fragment>)
    })

    elements.push(<Text key={elements.length}>{current}</Text>)

    return elements
  }, [nodes, fontSize, emojis, textColor, additionalStyles])

  return <View>{result}</View>
}
