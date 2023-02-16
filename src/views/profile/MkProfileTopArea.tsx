import React from 'react'
import styled from 'styled-components/native'
import { User } from '../../types/user'
import FastImage from 'react-native-fast-image'
import { MfmSimpleRenderer } from '../../components/mfm/MfmSimpleRenderer'
import { parseSimple } from 'mfm-js'
import { MfmRenderer } from '../../components/mfm/MfmRenderer'

const Components = {
  Container: styled.View``,
  ProfileImage: styled(FastImage)`
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
  BannerImage: styled(FastImage)`
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
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.fg};
  `,
  Description: styled.View`
    color: ${({ theme }) => theme.fg};

    margin-top: 12px;
  `,
  TopSpacer: styled.View`
    margin-top: 24px;
  `,
  FieldListItem: styled.View<{ index: number }>`
    flex-direction: row;
    margin-top: ${({ index }) => (index === 0 ? 0 : 4)}px;
  `,
  FieldListItemName: styled.Text`
    width: 25%;
    text-align: center;
    color: ${({ theme }) => theme.fg};

    font-weight: bold;
    font-size: 16px;
  `,
  FieldListItemValue: styled.Text`
    flex-grow: 1;
    width: 0;
    color: ${({ theme }) => theme.fg};
    font-size: 16px;
  `,
}

export const MkProfileTopArea: React.FC<{ user: User }> = ({ user }) => {
  const mfmUsernameContent = React.useMemo(() => {
    return parseSimple(user.name ?? user.username)
  }, [user.username, user.name])

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
          <Components.ProfileNameText>
            <MfmSimpleRenderer
              fontSize={24}
              emojis={user.emojis}
              nodes={mfmUsernameContent}
            />
          </Components.ProfileNameText>
          <Components.Description>
            <MfmRenderer content={user.description} emojis={user.emojis} />
          </Components.Description>
        </Components.Section>
      </Components.UserNameArea>

      <Components.TopSpacer>
        <Components.Section>
          {user.fields.map((x, i) => (
            <Components.FieldListItem index={i} key={i}>
              <Components.FieldListItemName>
                {x.name}
              </Components.FieldListItemName>
              <Components.FieldListItemValue>
                {x.value}
              </Components.FieldListItemValue>
            </Components.FieldListItem>
          ))}
        </Components.Section>
      </Components.TopSpacer>
    </Components.Container>
  )
}
