import React from 'react'
import { Route, Routes } from 'react-router-native'
import { NotFoundPage } from '../views/NotFound'
import { HomeLayout } from './layout/HomeLayout'
import { TimelineView } from '../views/home/timeline/Timeline'

export const MkRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index element={<TimelineView />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
