import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import CustomDrawerContent from '../widget/CustomDrawerContent'
import Home from '../screen/Home'
import AddCity from '../screen/AddCity'
import Account from '../screen/Account'

const WeatherDrawerNavigator = createDrawerNavigator(
  {
    Home,
    Account
  },
  {
    edgeWidth: -100,
    drawerPosition: 'right',
    drawerType: 'slide',
    drawerLockMode: 'unlocked',
    drawerWidth: 150,
    contentOptions: {
      activeTintColor: '#e91e63'
    },
    contentComponent: CustomDrawerContent
  }
)

const WeatherStackNavigator = createStackNavigator(
  {
    Home: WeatherDrawerNavigator,
    AddCity
  },
  {
    headerMode: 'none'
  }
)

export default createAppContainer(WeatherStackNavigator)
