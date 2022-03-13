import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import VulScreen from './VulScreen';
import EncScreen from './EncScreen';
import DecScreen from './DecScreen';


const HomeStack = createNativeStackNavigator();
const VulStack = createNativeStackNavigator();
const EncStack = createNativeStackNavigator();
const DecStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    return(
      <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: '#83EEFF' }}
      activeColor='black'
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Password Generator',
          LabelColor:'#000000',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-logo-react" color='#000000' size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Password Checker"
        component={VulScreen}
        options={{
          tabBarLabel: 'Vulnerability Checker',
          LabelColor:'#000000',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-bug" color='#000000' size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Encryption"
        component={EncScreen}
        setOptions={{title: 'Gck'}}
        options={{
          tabBarLabel: 'Encryption',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-lock-closed" color='#000000' size={26} />
          ),
          
        }}

      />
       <Tab.Screen
        name="Decryption"
        component={DecScreen}
        options={{
          tabBarLabel: 'Decryption',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-lock-open" color='#000000' size={26} />
            
          )
          
        }}
      />
    </Tab.Navigator>
    );

};


export default MainTabScreen;


