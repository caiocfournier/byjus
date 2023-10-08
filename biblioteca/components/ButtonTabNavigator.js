import React, {Component} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TransactionScreen from "../screens/transactions";
import SearchScreen from "../screens/Search";

const tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component{
    render(){
        return(
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Transação" component={TransactionScreen}/>
                    <Tab.Screen name="pesquisa" component={SearchScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}