import React from 'react'
import { ScrollView, Text, VirtualizedList } from 'react-native'
import { Note } from '../../types/note'

export interface MkTimelineProps {
  notes: Note[]
}

export const MkTimeline: React.FC<MkTimelineProps> = ({ notes }) => {
  return (
    <VirtualizedList
      getItemCount={data => data.length}
      data={notes}
      getItem={(data, index) => data[index]}
      renderItem={info => {
        return <Text>{JSON.stringify(info, null, 2)}</Text>
      }}
    />
  )
}
