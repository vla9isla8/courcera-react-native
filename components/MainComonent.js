import React, {Component} from "react";
import {DISHES} from '../shared/dishes';
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const MenuNavigator = createAppContainer(createStackNavigator({
    Menu: {
        screen: Menu
    },
    Dishdetail: {
        screen: Dishdetail
    }
}, {
    initialRouteName: "Menu",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    }
}));

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    }
});

class Main extends Component {

    render() {
        return (
                <MenuNavigator />
        );
    }
}

export default Main;
