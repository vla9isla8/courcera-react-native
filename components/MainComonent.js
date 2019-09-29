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
import Contact from "./ContactComponent";
import AboutUs from "./AboutUsComponent";

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

const ContactNavigator = createStackNavigator({
    Contact: {
        screen: Contact
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

const AboutUsNavigator = createStackNavigator({
    AboutUs: {
        screen: AboutUs
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
        navigationOptions: {
            title: "Home",
            drawerLabel: "Home"
        }
    },
    AboutUs: {
        screen: AboutUsNavigator,
        navigationOptions: {
            title: "About Us",
            drawerLabel: "About Us"
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: "Menu",
            drawerLabel: "Menu"
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: "Contact Us",
            drawerLabel: "Contact Us"
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
