import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconz from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import VulScreen from './VulScreen';
import EncScreen from './EncScreen';
import DecScreen from './DecScreen';


const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
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
          LabelColor: '#000000',
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
          LabelColor: '#000000',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-bug" color='#000000' size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Text Encryptiom"
        component={EncScreen}
        setOptions={{ title: 'Gck' }}
        options={{
          tabBarLabel: 'Ciphertext',
          tabBarIcon: ({ color }) => (
            <Iconz name="message-text-lock" color='#000000' size={26} />
          ),

        }}

      />
      <Tab.Screen
        name="Decryption"
        component={DecScreen}
        options={{
          tabBarLabel: 'Decryption',
          tabBarIcon: ({ color }) => (
            <Iconz name="file-key" color='#000000' size={26} />

          )

        }}
      />
    </Tab.Navigator>
  );

};


export default MainTabScreen;


