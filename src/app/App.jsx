import React from 'react'
import { AppRouter } from './router/AppRouter'
import { StoreProvider } from './providers/StoreProvider'
import { AppInitialization } from './initialization'

export const App = () => {
  return (
    <StoreProvider>
      <AppInitialization>
        <AppRouter/>
      </AppInitialization>
    </StoreProvider>
  )
}