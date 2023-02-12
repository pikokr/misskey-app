import React from 'react'
import { ScrollView, Text, VirtualizedList } from 'react-native'
import { Note } from '../../types/note'
import { MkNote } from '../MkNote'

export interface MkTimelineProps {
  notes: Note[]
}

export const MkTimeline: React.FC<MkTimelineProps> = ({ notes }) => {
  return (
    <VirtualizedList<Note>
      getItemCount={data => data.length}
      data={notes}
      getItem={(data, index) => data[index]}
      renderItem={info => {
        return <MkNote note={info.item} divider={info.index !== 0} />
      }}
    />
  )
}
