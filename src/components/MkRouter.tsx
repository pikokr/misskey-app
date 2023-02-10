import React from 'react'
import { Route, Routes } from 'react-router-native'
import { NotFoundPage } from '../views/NotFound'

export const MkRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
