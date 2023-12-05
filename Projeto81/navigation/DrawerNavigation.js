import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from './TabNavigator';
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator(); 

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Tela Inicial' component={BottomTabNavigator}/>
            <Drawer.Screen name='Perfil' component={Profile}/>
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
