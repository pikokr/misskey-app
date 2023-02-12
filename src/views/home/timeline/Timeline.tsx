import React from 'react'
import { View } from 'react-native'
import { MkTimeline } from '../../../components/timeline/MkTimeline'
import { useSelectedAccount } from '../../../utils/accounts'
import { Note } from '../../../types/note'

export const TimelineView: React.FC = () => {
  const [notes, setNotes] = React.useState<Note[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const account = useSelectedAccount()

  React.useEffect(() => {
    setNotes([])
    setIsLoading(true)
    ;(async () => {
      const { data } = await account.api.post<Note[]>('/notes/timeline', {
        limit: 11,
      })

      setNotes(data)
    })().finally(() => {
      setIsLoading(false)
    })
  }, [account])

  return (
    <View>
      <MkTimeline notes={notes} />
    </View>
  )
}
