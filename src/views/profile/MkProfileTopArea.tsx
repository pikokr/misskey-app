import React from 'react'
import styled from 'styled-components/native'
import { User } from '../../types/user'
import { Text } from 'react-native'

const Components = {
  Container: styled.View``,
  ProfileImage: styled.Image`
    width: 100%;
    height: 100%;
  `,
  ProfileImageContainer: styled.View`
    width: 128px;
    height: 128px;

    border-radius: 64px;

    position: absolute;
    left: 24px;
    bottom: -64px;
    overflow: hidden;

    elevation: 8;
  `,
  BannerContainer: styled.View`
    aspect-ratio: 2;
  `,
  BannerImage: styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  `,
  UserNameArea: styled.View`
    margin-top: 76px;
  `,
  Section: styled.View`
    margin-left: 24px;
    margin-right: 24px;

    background-color: ${({ theme }) => theme.panel};

    padding: 24px;
    border-radius: 24px;

    elevation: 4;
  `,
  ProfileNameText: styled.Text`
    font-size: 36px;
    font-weight: bold;
    color: ${({ theme }) => theme.fg};
  `,
  Description: styled.Text`
    color: ${({ theme }) => theme.fg};

    margin-top: 12px;
  `,
  TopSpacer: styled.View`
    margin-top: 24px;
  `,
}

export const MkProfileTopArea: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Components.Container>
      <Components.BannerContainer>
        <Components.BannerImage
          source={{
            uri: user.bannerUrl,
          }}
        />
        <Components.ProfileImageContainer>
          <Components.ProfileImage
            source={{
              uri: user.avatarUrl,
            }}
          />
        </Components.ProfileImageContainer>
      </Components.BannerContainer>
      <Components.UserNameArea>
        <Components.Section>
          <Components.ProfileNameText>{user.name}</Components.ProfileNameText>
          <Components.Description>{user.description}</Components.Description>
        </Components.Section>
      </Components.UserNameArea>

      <Components.TopSpacer>
        <Components.Section>
          <Text>{JSON.stringify(user.fields)}</Text>
        </Components.Section>
      </Components.TopSpacer>
    </Components.Container>
  )
}