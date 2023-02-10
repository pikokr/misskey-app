import React, { PropsWithChildren } from 'react'
import styled from 'styled-components/native'
import { IconAlertCircle } from 'tabler-icons-react-native'

export type AlertSeverity = 'error'

export const alertColors: Record<AlertSeverity, string> = {
  error: '#ff4747',
}

const Container = styled.View<{ severity: AlertSeverity }>`
  background-color: ${({ severity }) => alertColors[severity]};
  padding: 12px;
  border-radius: 6px;

  flex-direction: row;
`

export const AlertText = styled.Text`
  color: #fff;
  font-size: 16px;
`

const AlertContent = styled.View`
  margin-left: 8px;
  flex-grow: 1;
  width: 0;
`

export const Alert: React.FC<
  PropsWithChildren<{ severity?: AlertSeverity }>
> = ({ children, severity = 'error' }) => {
  return (
    <Container severity={severity}>
      <IconAlertCircle color="#fff" size={16} />
      <AlertContent>{children}</AlertContent>
    </Container>
  )
}
