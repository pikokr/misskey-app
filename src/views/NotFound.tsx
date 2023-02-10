import React from 'react'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bg};
  justify-content: center;
  align-content: center;
`

const Description = styled.Text`
  color: ${({ theme }) => theme.accent};
  text-align: center;
  font-size: 24px;
`

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Description>{t('common.errors.notfound')}</Description>
    </Container>
  )
}
