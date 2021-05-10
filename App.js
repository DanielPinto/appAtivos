import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/Pages/HomeScreen';
import ListScreen from './src/Pages/ListScreen';
import DashScreen from "./src/Pages/Dash";
import ScannerScreen from "./src/Pages/ScannerScreen";

const MainStak = createStackNavigator();

export default function App (){
  return(
    <NavigationContainer>
      <MainStak.Navigator initialRouteName="Home">
        <MainStak.Screen name="Home" component={HomeScreen} />
        <MainStak.Screen name="Lista" component={ListScreen} />
        <MainStak.Screen name="DashBoard" component={DashScreen} />
        <MainStak.Screen name="Scanner" component={ScannerScreen} />
      </MainStak.Navigator>
    </NavigationContainer>
    );
  };