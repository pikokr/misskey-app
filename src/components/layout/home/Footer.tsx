import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import {
  IconHome,
  IconMenu2,
  IconNotification,
  IconPencil,
  TablerIcon,
} from 'tabler-icons-react-native'
import { TouchableNativeFeedback } from 'react-native'
import { useLocation, useNavigate } from 'react-router-native'

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
    </Components.Container>
  )
}
