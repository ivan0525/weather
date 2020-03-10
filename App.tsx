import React, { FC, useEffect } from 'react'
import 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import store from './src/store'
import WeatherNavigator from './src/navigation/index'
import SplashScreen from 'react-native-splash-screen'

const App: FC = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <Provider store={store}>
        <WeatherNavigator />
      </Provider>
    </>
  )
}

export default App
