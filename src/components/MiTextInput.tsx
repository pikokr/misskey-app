import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { KeyboardTypeOptions, TextInputProps } from 'react-native/types'
import styled, { useTheme } from 'styled-components/native'

const Input = styled.TextInput<{ noPadding?: boolean }>`
  width: 100%;
  padding: 0 ${({ noPadding }) => (noPadding ? '0' : '12px')};
  font-size: 16px;
  height: 100%;
  color: ${({ theme }) => theme.accent};
`

const Label = styled.Text`
  font-size: 13.6px;
  padding-bottom: 8px;
  color: ${({ theme }) => theme.accent};
`

const InputContainer = styled(Animated.View)`
  height: 33px;
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  width: 100%;
  background: ${({ theme }) => theme.panel};
`

const InputContent = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;

  flex-direction: row;
  align-items: center;
`

const InputPrefix = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.accent};
  margin-left: 12px;
`

const Container = styled.View`
  width: 100%;
`

export const MiTextInput: React.FC<{
  label?: string
  onChange?: (v: string) => void
  value?: string
  prefix?: React.ReactNode
  keyboardType?: KeyboardTypeOptions
  onEndEditing?: () => void
  autoCapitalize?: TextInputProps['autoCapitalize']
}> = ({
  label,
  value,
  onChange,
  prefix,
  keyboardType,
  onEndEditing,
  autoCapitalize,
}) => {
  const theme = useTheme()

  const [isFocused, setIsFocused] = React.useState(false)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(isFocused ? theme.accent : theme.panel, {
        duration: 200,
      }),
    }
  }, [theme, isFocused])

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputContainer style={animatedStyles}>
        <InputContent>
          {prefix && <InputPrefix>{prefix}</InputPrefix>}
          <Input
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            value={value}
            noPadding={!!prefix}
            onChangeText={onChange ? e => onChange(e) : undefined}
            onFocus={() => {
              setIsFocused(true)
            }}
            onBlur={() => {
              setIsFocused(false)
            }}
            onEndEditing={onEndEditing}
          />
        </InputContent>
      </InputContainer>
    </Container>
  )
}
