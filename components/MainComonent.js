import React, {Component} from "react";
import {DISHES} from '../shared/dishes';
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Home from "./HomeComponent";

const MenuNavigator = createStackNavigator({
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
});

const HomeNavigator = createStackNavigator({
    Home: {
        screen: Home
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    }
});

const MainNavigator = createAppContainer(createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        defaultNavigationOptions: {
            title: "Home",
            drawerLabel: "Home"
        }
    },
    Menu: {
        screen: MenuNavigator,
        defaultNavigationOptions: {
            title: "Menu",
            drawerLabel: "Menu"
        }
    }
},{
    defaultNavigationOptions: {
        backgroundColor: "#000"
    }
}))

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    }
});

class Main extends Component {

    render() {
        return (
            <MainNavigator />
        );
    }
}

export default Main;
