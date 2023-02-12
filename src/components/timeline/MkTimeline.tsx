import React from 'react'
import { VirtualizedList } from 'react-native'
import { Note } from '../../types/note'
import { MkNote } from '../MkNote'
import styled, { useTheme } from 'styled-components/native'
import { useSelectedAccount } from '../../utils/accounts'

export interface MkTimelineProps {
  notes: Note[]
  loading?: boolean
  onMore?: () => void
}

const Spinner = styled.ActivityIndicator`
  margin: 16px;
`

export const MkTimeline: React.FC<MkTimelineProps> = ({
  notes,
  loading,
  onMore,
}) => {
  const theme = useTheme()
  const account = useSelectedAccount()

  return (
    <VirtualizedList<Note>
      getItemCount={data => data.length}
      data={notes}
      getItem={(data, index) => data[index]}
      renderItem={info => {
        return <MkNote note={info.item} account={account} divider />
      }}
      ListFooterComponent={loading ? <Spinner color={theme.accent} /> : null}
      onEndReached={onMore}
    />
  )
}
