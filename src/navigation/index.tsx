import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screen/Home'

const WeatherNavigator = createStackNavigator(
  {
    home: Home
  },
  {
    headerMode: 'none'
  }
)

export default createAppContainer(WeatherNavigator)
