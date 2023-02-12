import React from 'react'
import { View } from 'react-native'
import { MkTimeline } from '../../../components/timeline/MkTimeline'
import { useSelectedAccount } from '../../../utils/accounts'
import { Note } from '../../../types/note'

export const TimelineView: React.FC = () => {
  const [notes, setNotes] = React.useState<Note[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)

  const [isFirstLoad, setIsFirstLoad] = React.useState(true)
  const loadingRef = React.useRef(false)

  const account = useSelectedAccount()

  React.useEffect(() => {
    if (isLoading || !isFirstLoad || loadingRef.current) {
      return
    }

    loadingRef.current = true

    setIsFirstLoad(false)

    setNotes([])
    setIsLoading(true)
    ;(async () => {
      const { data } = await account.api.post<Note[]>('/notes/timeline', {
        limit: 11,
      })

      setNotes(data)

      setHasMore(data.length === 11)
    })().finally(() => {
      setIsLoading(false)
      loadingRef.current = false
    })
  }, [account, isFirstLoad, isLoading])

  const loadMore = React.useCallback(async () => {
    if (!hasMore || !notes.length || isLoading || loadingRef.current) {
      return
    }

    loadingRef.current = true

    const lastNote = notes[notes.length - 1]

    const { data } = await account.api.post<Note[]>('/notes/timeline', {
      limit: 31,
      untilId: lastNote.id,
    })

    data.shift()

    setNotes(prev => {
      return [...prev, ...data]
    })

    setHasMore(data.length === 30)

    loadingRef.current = false
  }, [hasMore, notes, isLoading, account.api])

  return (
    <View>
      <MkTimeline
        onMore={loadMore}
        notes={notes}
        loading={isLoading || hasMore}
      />
    </View>
  )
}
