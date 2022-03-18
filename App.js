import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainTabScreen from './screens/MainTabScreen'
import { DrawerContent } from './screens/DrawerContent';
import DeveloperScreen from './screens/Developers'


const Drawer = createDrawerNavigator();


export default function App() {
  return (

    <NavigationContainer>
      <Drawer.Navigator screenOptions={{
        drawerStyle: {
          backgroundColor: 'rgba( 0, 0, 0, .6)',
        },
        headerStyle: {
          backgroundColor: "#83EEFF",
        },
        headerTitleStyle: {
          fontWeight: "bold"
        },
        headerTitleAlign: 'center',
        title: "Z.Y.R.I.S.",
      }}

        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Password Generator" component={MainTabScreen} />
        <Drawer.Screen name="Developer" component={DeveloperScreen} />
      </Drawer.Navigator>
    </NavigationContainer>

  );
}


