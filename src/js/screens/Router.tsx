// For some reason I can't get traditional DOM routers
// to work with this extension. Nomally this would be a terrible
// idea but with only 3 - 4 simple routes, this won't hurt
import React from 'react'
import { AddScreen } from './AddScreen'
import { MainScreen } from './MainScreen'
import { useSelector } from 'react-redux'
import { getCurrentScreen } from '~/store/modules/navigation'

export const Router = () => {
  const currentScreen = useSelector(getCurrentScreen)

  switch (currentScreen) {
    case 'add':
      return <AddScreen />
    case 'home':
    default:
      return <MainScreen />
  }
}
