import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Pages/HomeScreen';
import ListScreen from './src/Pages/ListScreen';
import StoreScreen from "./src/Pages/StoreScreen";
import ScannerScreen from "./src/Pages/ScannerScreen";


const MainStak = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <MainStak.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
      >
        <MainStak.Screen name="Home" component={HomeScreen} />
        <MainStak.Screen name="Lista" component={ListScreen} />
        <MainStak.Screen name="Cadastrar" component={StoreScreen} />
        <MainStak.Screen name="Scanner" component={ScannerScreen} />
      </MainStak.Navigator>
    </NavigationContainer>
  );
};