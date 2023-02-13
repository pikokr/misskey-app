import React from 'react'
import { Note } from '../types/note'
import { Text } from 'react-native'
import styled, { css } from 'styled-components/native'
import { MkAvatar } from './MkAvatar'
import { Account } from '../utils/accounts'
import { MkUserName } from './mfm/MkUserName'
import { MfmRenderer } from './mfm/MfmRenderer'
import { useTranslation } from 'react-i18next'

const Components = {
  Container: styled.View<{ divider: boolean }>`
    background-color: ${({ theme }) => theme.bg};
    padding: 24px;
    flex-direction: row;
    gap: 16px;
    ${({ divider }) =>
      divider
        ? css`
            border-bottom-width: 1px;
            border-bottom-color: ${({ theme }) => theme.divider};
          `
        : ''}
  `,
  Content: styled.View`
    flex-grow: 1;
    width: 0;
  `,
  UsernameContainer: styled.View`
    gap: 2px;
  `,
  HandleContainer: styled.Text`
    color: ${({ theme }) => theme.fg};
    align-items: center;
    flex-direction: row;
  `,
  HandleHost: styled.Text`
    color: ${({ theme }) =>
      theme.fg.replace('rgb', 'rgba').replace(')', ', 0.5)')}; // Opacity
  `,
  CwContainer: styled.View`
    height: 12px;
  `,
  CwButtonContainer: styled.View`
    background-color: ${({ theme }) => theme.cwBg};
    height: 15px;
    padding: 0 6px;
    justify-content: center;
    top: 0;
    position: absolute;
    border-radius: 4px;
  `,
  CwTouchable: styled.TouchableNativeFeedback``,
  CwButtonText: styled.Text`
    color: ${({ theme }) => theme.cwFg};
    font-size: 12px;
    line-height: 15px;
  `,
}

type Props = {
  note: Note
  divider?: boolean
  account: Account
}

const CwButton: React.FC<{
  onOpen: () => void
  characterCount: number
  open: boolean
}> = ({ onOpen, characterCount, open }) => {
  const { t } = useTranslation()

  return (
    <Components.CwContainer>
      <Components.CwButtonContainer>
        <Components.CwTouchable onPress={onOpen}>
          <Components.CwButtonText>
            {open
              ? t('note.cw.close')
              : t('note.cw.open', {
                  characterCount,
                })}
          </Components.CwButtonText>
        </Components.CwTouchable>
      </Components.CwButtonContainer>
    </Components.CwContainer>
  )
}

export class MkNote extends React.PureComponent<Props, { cwOpen: boolean }> {
  constructor(props: Props) {
    super(props)

    this.updateMfmText()

    this.state = { cwOpen: false }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.note.text !== this.props.note.text) {
      this.updateMfmText()
    }
  }

  openCW = () => {
    this.setState({ cwOpen: !this.state.cwOpen })
  }

  updateMfmText() {
    if (!this.props.note.text) {
      return
    }
  }

  render() {
    const { note, divider = false, account } = this.props

    const content = (
      <>
        {note.text && (
          <Text>
            <MfmRenderer
              fontSize={14}
              content={note.text.trim()}
              emojis={note.emojis}
            />
          </Text>
        )}
      </>
    )

    return (
      <Components.Container divider={divider}>
        <MkAvatar src={note.user.avatarUrl} size={48} />
        <Components.Content>
          <Components.UsernameContainer>
            <MkUserName
              emojis={note.user.emojis}
              host={note.user.host}
              text={note.user.name || note.user.username}
            />
            <Components.HandleContainer>
              <Text>{note.user.username}</Text>
              <Components.HandleHost>
                @{note.user.host ?? account.host}
              </Components.HandleHost>
            </Components.HandleContainer>
          </Components.UsernameContainer>
          {note.cw && (
            <>
              <Text>
                <MfmRenderer content={note.cw} emojis={note.emojis} />
                <CwButton
                  open={this.state.cwOpen}
                  onOpen={this.openCW}
                  characterCount={note.text?.length ?? 0}
                />
              </Text>
            </>
          )}
          {note.cw ? (this.state.cwOpen ? content : null) : content}
        </Components.Content>
      </Components.Container>
    )
  }
}

// export const MkNote: React.FC<{ note: Note; divider?: boolean }> = ({
//   note,
//   divider = false,
// }) => {
//   const account = useSelectedAccount()
//
//   return (
//     <Components.Container divider={divider}>
//       <MkAvatar src={note.user.avatarUrl} size={48} />
//       <Components.Content>
//         <Components.UsernameContainer>
//           <Components.Username>
//             {note.user.name || note.user.username}
//           </Components.Username>
//           <Components.HandleContainer>
//             <Text>{note.user.username}</Text>
//             <Components.HandleHost>
//               @{note.user.host ?? account.host}
//             </Components.HandleHost>
//           </Components.HandleContainer>
//         </Components.UsernameContainer>
//         <Text>TODO</Text>
//       </Components.Content>
//     </Components.Container>
//   )
// }
