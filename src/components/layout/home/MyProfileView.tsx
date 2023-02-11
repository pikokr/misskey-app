import React from 'react'
import { ActivityIndicator, Text } from 'react-native'
import useSWR from 'swr'
import { User } from '../../../types/user'
import { fetchers } from '../../../utils/fetcher'
import { useSelectedAccount } from '../../../utils/accounts'
import { IconAlertTriangle } from 'tabler-icons-react-native'
import { alertColors } from '../../Alert'
import { MkAvatar } from '../../MkAvatar'
import styled, { useTheme } from 'styled-components/native'
import { MkProfileContent } from '../../../views/profile/MkProfileContent'

const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const MyProfileView: React.FC = () => {
  const account = useSelectedAccount()

  const { data, isLoading, error } = useSWR<User>(account, {
    fetcher: fetchers.user,
  })

  const theme = useTheme()

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator color={theme.fg} />
      ) : error ? (
        <IconAlertTriangle color={alertColors.error} />
      ) : data ? (
        <MkProfileContent user={data} />
      ) : null}
    </Container>
  )
}
