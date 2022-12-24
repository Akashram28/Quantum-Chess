import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Homescreen from './screens/Homescreen'
import Playscreen from './screens/Playscreen'

const MainNavigator = createStackNavigator(
  {
    Homescreen : {
      screen : Homescreen
    },
    Playscreen :{
      screen : Playscreen
    }
  },
  {
    defaultNavigationOptions : {
      headerShown : false
    }
  }
)

const App = createAppContainer(MainNavigator)
export default App