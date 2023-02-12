import React from 'react'
import { VirtualizedList } from 'react-native'
import { Note } from '../../types/note'
import { MkNote } from '../MkNote'
import styled, { useTheme } from 'styled-components/native'

export interface MkTimelineProps {
  notes: Note[]
  loading?: boolean
}

const Spinner = styled.ActivityIndicator`
  margin: 16px;
`

export const MkTimeline: React.FC<MkTimelineProps> = ({ notes, loading }) => {
  const theme = useTheme()

  return (
    <VirtualizedList<Note>
      getItemCount={data => data.length}
      data={notes}
      getItem={(data, index) => data[index]}
      renderItem={info => {
        return <MkNote note={info.item} divider />
      }}
      ListFooterComponent={loading ? <Spinner color={theme.accent} /> : null}
    />
  )
}
