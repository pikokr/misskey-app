import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import {
  IconAlertTriangle,
  IconHome,
  IconMenu2,
  IconNotification,
  IconPencil,
  TablerIcon,
} from 'tabler-icons-react-native'
import { ActivityIndicator, Text, TouchableNativeFeedback } from 'react-native'
import { useLocation, useNavigate } from 'react-router-native'
import useSWR from 'swr'
import { Account, useSelectedAccount } from '../../../utils/accounts'
import axios from 'axios'
import { alertColors } from '../../Alert'
import { MkAvatar } from '../../MkAvatar'
import { User } from '../../../types/user'
import { fetchers } from '../../../utils/fetcher'

const Components = {
  Container: styled.View`
    background-color: ${({ theme }) => theme.panel};
    flex-direction: row;
  `,
  ItemContainer: styled.View`
    flex-grow: 1;
    width: 0;
    justify-content: center;
    align-items: center;
  `,
  ItemTouchable: styled.TouchableNativeFeedback`
    width: 100%;
    height: 100%;
  `,
  ItemContent: styled.View`
    width: 100%;
    padding: 16px;
    justify-content: center;
    align-items: center;
  `,
}

const NavItem: React.FC<{
  icon: TablerIcon
  onPress: () => void
}> = ({ icon: Icon, onPress }) => {
  const theme = useTheme()

  return (
    <Components.ItemContainer>
      <Components.ItemTouchable onPress={onPress}>
        <Components.ItemContent>
          <Icon size={36} color={theme.fg} />
        </Components.ItemContent>
      </Components.ItemTouchable>
    </Components.ItemContainer>
  )
}

const AccountNavItem: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const account = useSelectedAccount()

  const { data, isLoading, error } = useSWR<User>(account, {
    fetcher: fetchers.user,
  })

  return (
    <Components.ItemContainer>
      <Components.ItemTouchable
        onPress={() => navigate('/me', { replace: true })}>
        <Components.ItemContent>
          {isLoading ? (
            <ActivityIndicator color={theme.fg} />
          ) : error ? (
            <IconAlertTriangle color={alertColors.error} />
          ) : data ? (
            <Text>
              <MkAvatar src={data.avatarUrl} />
            </Text>
          ) : null}
        </Components.ItemContent>
      </Components.ItemTouchable>
    </Components.ItemContainer>
  )
}

const NavItemLink: React.FC<{ icon: TablerIcon; to: string }> = ({
  icon,
  to,
}) => {
  const navigate = useNavigate()

  return <NavItem icon={icon} onPress={() => navigate(to, { replace: true })} />
}

export const HomeBottomNavigation: React.FC = () => {
  return (
    <Components.Container>
      <NavItem
        icon={IconMenu2}
        onPress={() => {
          console.log('sidebar')
        }}
      />
      <NavItemLink icon={IconHome} to="/" />
      <NavItemLink icon={IconNotification} to="/notifications" />
      <AccountNavItem />
    </Components.Container>
  )
}
