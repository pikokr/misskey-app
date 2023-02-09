import React from 'react'
import { cherryLight } from '../../themes/l-cherry'

export type ThemeColor =
  | 'accent'
  | 'bg'
  | 'fg'
  | 'panel'
  | 'renote'
  | 'link'
  | 'mention'
  | 'hashtag'
  | 'divider'
  | 'inputBorderHover'

export interface MiTheme {
  id: string

  name: string
  author: string

  props: Record<ThemeColor, string>
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends Record<ThemeColor, string> {}
}

export const useThemeData = (): MiTheme => {
  const currentTheme = cherryLight

  const themeData = React.useMemo(() => {
    const entries = Object.entries(currentTheme.props)

    for (const entry of entries) {
      if (entry[1].startsWith('@')) {
        entry[1] = currentTheme.props[entry[1].slice(1) as ThemeColor]
      }
    }

    return {
      ...currentTheme,
      props: Object.fromEntries(entries) as MiTheme['props'],
    }
  }, [currentTheme])

  return themeData
}
