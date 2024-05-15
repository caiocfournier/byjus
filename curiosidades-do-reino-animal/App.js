import * as React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Cavalo from './screens/Cavalo';
import Tamandua from './screens/Tamandua';
import Hipopotamo from './screens/Hipopotamo';
import Cobra from './screens/Cobra';
import Falcao from './screens/Falcao';
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

var AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  Cavalo: Cavalo,
  Tamandua: Tamandua,
  Hipopotamo: Hipopotamo,
  Cobra: Cobra,
  Falcao: Falcao
});

const AppContainer = createAppContainer(AppNavigator);