import * as React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

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