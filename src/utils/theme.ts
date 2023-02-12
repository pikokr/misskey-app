import React from 'react'
import { cherryLight } from '../../themes/l-cherry'
import { light } from '../../themes/light'
import tinycolor from 'tinycolor2'
import { deepClone } from './clone'
import { dark } from '../../themes/dark'

export type ThemeColor = keyof (typeof light)['props']

export interface MiTheme {
  id: string
  name: string
  author: string
  desc?: string
  base?: 'dark' | 'light'
  props: Record<ThemeColor, string>
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends Record<ThemeColor, string> {}
}

// TODO
export const useCurrentTheme = (): MiTheme => {
  return React.useMemo(() => {
    const theme: MiTheme = cherryLight as MiTheme

    const _theme = deepClone(theme as any) as MiTheme

    if (_theme.base) {
      const base = [light, dark].find(x => x.id === _theme.base)
      if (base) {
        _theme.props = Object.assign({}, base.props, _theme.props)
      }
    }

    const props = compile(_theme)

    _theme.props = props

    return _theme
  }, [])
}

export const useThemeData = (): Record<ThemeColor, string> => {
  const currentTheme = useCurrentTheme()

  return currentTheme.props
}

function compile(theme: MiTheme): Record<ThemeColor, string> {
  function getColor(val: string): tinycolor.Instance {
    // ref (prop)
    if (val[0] === '@') {
      return getColor(theme.props[val.slice(1) as ThemeColor])
    }

    // ref (const)
    else if (val[0] === '$') {
      return getColor(theme.props[val as ThemeColor])
    }

    // func
    else if (val[0] === ':') {
      const parts = val.split('<')
      const func = parts.shift()!.slice(1)
      const arg = parseFloat(parts.shift()!)
      const color = getColor(parts.join('<'))

      switch (func) {
        case 'darken':
          return color.darken(arg)
        case 'lighten':
          return color.lighten(arg)
        case 'alpha':
          return color.setAlpha(arg)
        case 'hue':
          return color.spin(arg)
        case 'saturate':
          return color.saturate(arg)
      }
    }

    // other case
    return tinycolor(val)
  }

  const props: Record<ThemeColor, string> = {} as Record<ThemeColor, string>

  for (const [k, v] of Object.entries(theme.props)) {
    if (k.startsWith('$')) {
      continue
    } // ignore const

    props[k as ThemeColor] = v.startsWith('"')
      ? v.replace(/^"\s*/, '')
      : genValue(getColor(v))
  }

  return props
}

function genValue(c: tinycolor.Instance): string {
  return c.toRgbString()
}
