import React from 'react'
import {
  Navigator,
  Route,
  Routes,
  UNSAFE_NavigationContext,
  useNavigate,
} from 'react-router-native'
import { NotFoundPage } from '../views/NotFound'
import { HomeLayout } from './layout/home/HomeLayout'
import { TimelineView } from '../views/home/timeline/Timeline'
import { BackHandler } from 'react-native'
import { MyProfileView } from './layout/home/MyProfileView'

export const MkRouter: React.FC = () => {
  const navigate = useNavigate()

  const navigator = React.useContext(UNSAFE_NavigationContext)
    .navigator as Navigator & { index: number }

  React.useEffect(() => {
    const back = () => {
      if (navigator.index > 0) {
        navigate(-1)
        return true
      }

      return false
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', back)

    return () => backHandler.remove()
  }, [navigate, navigator.index])

  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index element={<TimelineView />} />
        <Route path="me" element={<MyProfileView />} />
      </Route>
      <Route path="users/:id" element={<MyProfileView />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
