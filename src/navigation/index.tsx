import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screen/Home'
import AddCity from '../screen/AddCity'

const WeatherNavigator = createStackNavigator(
  {
    Home,
    AddCity
  },
  {
    headerMode: 'none'
  }
)

export default createAppContainer(WeatherNavigator)
