import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import firebase from 'firebase';
import {firebaseConfig} from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

import AnimalScreen from './screens/AnimalScreen';
import HomeScreen from './screens/HomeScreen';

export default class App extends React.Component {
  render() {
    return (
      <View>
       <AppContainer />
       </View>
    );
  }
}

const AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  AnimalScreen: AnimalScreen,
});

const AppContainer = createAppContainer(AppNavigator);