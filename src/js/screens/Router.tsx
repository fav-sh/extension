// For some reason I can't get traditional DOM routers
// to work with this extension. Nomally this would be a terrible
// idea but with only 3 - 4 simple routes, this won't hurt
import React, { useEffect } from 'react'
import { AddScreen } from './EditorScreen/AddScreen'
import { MainScreen } from './MainScreen/MainScreen'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentScreen } from '~/store/modules/navigation'
import { passivePullUpdates } from '~/store/modules/backup'

export const Router = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(passivePullUpdates())
  }, [])
  const currentScreen = useSelector(getCurrentScreen)

  switch (currentScreen) {
    case 'add':
      return <AddScreen />
    case 'home':
    default:
      return <MainScreen />
  }
}
