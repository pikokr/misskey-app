import React from 'react'
import { Note } from '../types/note'
import { Text } from 'react-native'
import styled, { css } from 'styled-components/native'
import { MkAvatar } from './MkAvatar'
import { Account } from '../utils/accounts'
import { MkUserName } from './mfm/MkUserName'

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
}

type Props = {
  note: Note
  divider?: boolean
  account: Account
}

export class MkNote extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)

    this.updateMfmText()
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.note.text !== this.props.note.text) {
      this.updateMfmText()
    }
  }

  updateMfmText() {
    if (!this.props.note.text) {
      return
    }
  }

  render() {
    const { note, divider = false, account } = this.props

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
          <Text>TODO</Text>
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
