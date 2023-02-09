import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import styled, { useTheme } from 'styled-components/native'

const Input = styled.TextInput`
  width: 100%;
  padding: 0 12px;
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

const Container = styled.View`
  width: 100%;
`

export const MiTextInput: React.FC<{
  label?: string
  onChange?: (v: string) => void
  value?: string
}> = ({ label, value, onChange }) => {
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
        <Input
          value={value}
          onChangeText={onChange ? e => onChange(e) : undefined}
          onFocus={() => {
            setIsFocused(true)
          }}
          onBlur={() => {
            setIsFocused(false)
          }}
        />
      </InputContainer>
    </Container>
  )
}
