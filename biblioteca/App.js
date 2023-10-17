import React, {Component} from 'react';
import BottomTabNavigator from './components/ButtonTabNavigator';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font';
import {Rajdhani_600SemiBold} from '@expo-google-fonts/rajdhani';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            fontLoaded: false
        };
    }

    async loadFonts() {
        await Font.loadAsync({
            Rajdhani_600SemiBold: Rajdhani_600SemiBold
        });
        this.setState({
            fontLoaded: true
        });
    }

    componentDidMount(){
        this.loadFonts();
    }

    render() {
        const {fontLoaded} = this.state;
        if(fontLoaded){
          return <BottomTabNavigator/>;  
        }
       return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
