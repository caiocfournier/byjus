import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import VideoGamesScreen from './Screens/VideoGamesScreen';
import JogosScreen from './Screens/JogosScreen';
import HomeScreen from './Screens/HomeScreen';

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
  VideoGamesScreen: VideoGamesScreen,
  JogosScreen: JogosScreen,
});

const AppContainer = createAppContainer(AppNavigator);