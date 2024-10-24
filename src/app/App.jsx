import React from 'react'
import { AppRouter } from './router/AppRouter'
import { StoreProvider } from './providers/StoreProvider'
import { AppInitialization } from './initialization'
import { ModalsModule, ModalsProvider } from '@modules/modals'
import { ThemeProvider } from './providers/ThemeProvider'

export const App = () => {
  return (
    <StoreProvider>
      <ModalsProvider>
        <AppInitialization>
          <ThemeProvider>
            <AppRouter/>
            <ModalsModule/>
          </ThemeProvider>
        </AppInitialization>
      </ModalsProvider>
    </StoreProvider>
  )
}