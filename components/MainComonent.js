import React, { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import Constants from "expo-constants";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Icon, Image } from "react-native-elements";
import NetInfo from "@react-native-community/netinfo";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import AboutUs from "./AboutUsComponent";
import { loadDishes } from "../redux/actions/dishes";
import { loadComments } from "../redux/actions/comments";
import { loadLeaders } from "../redux/actions/leader";
import { loadPromotions } from "../redux/actions/promotions";
import { connect } from "react-redux";
import { baseUrl } from "../datasource";
import Reservation from "./ReservationComponent";
import FavoritesComponent from "./FavoritesComponent";
import Login from "./LoginComponent";

const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu
    },
    Dishdetail: {
        screen: Dishdetail
    }
}, {
    initialRouteName: "Menu",
    defaultNavigationOptions: ({navigation}) => ({
        headerLeft: <Icon 
            name="menu" 
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />,
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    })
});

const HomeNavigator = createStackNavigator({
    Home: {
        screen: Home
    }
}, {
    defaultNavigationOptions: ({navigation}) => ({
        headerLeft: <Icon 
            name="menu" 
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />,
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    })
});
const LoginNavigator = createStackNavigator({
    Contact: {
        screen: Login
    }
}, {
    defaultNavigationOptions:({navigation}) => ({
        headerLeft: <Icon 
            name="menu" 
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />,
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    })
});
const ContactNavigator = createStackNavigator({
    Contact: {
        screen: Contact
    }
}, {
    defaultNavigationOptions:({navigation}) => ({
        headerLeft: <Icon 
            name="menu" 
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />,
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    })
});

const AboutUsNavigator = createStackNavigator({
    AboutUs: {
        screen: AboutUs
    }
}, {
    defaultNavigationOptions: ({navigation}) => ({
        headerLeft: <Icon 
            name="menu" 
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />,
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    })
});

const ReservationNavigator = createStackNavigator({
    AboutUs: {
        screen: Reservation
    }
}, {
    defaultNavigationOptions: ({navigation}) => ({
        headerLeft: <Icon 
            name="menu" 
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />,
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    })
});

const FavoritesNavigator = createStackNavigator({
    Favorites: {
        screen: FavoritesComponent
    }
}, {
    defaultNavigationOptions: ({navigation}) => ({
        headerLeft: <Icon 
            name="menu" 
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />,
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"
        }
    })
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    },
    drawerHeader: {
        backgroundColor: "#512DA8",
        height: 140,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row"
    },
    drawerHeaderText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold"
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

const CustomDrawerContentComponent = (props) => {
    return(
        <ScrollView>
            <SafeAreaView 
                style={styles.container} 
                forceInset={{top: "allways", horizontal: "never"}}>
                <View style={styles.drawerHeader}>
                    <View style={{flex: 1}}>
                        <Image style={styles.drawerImage} source={{
                            uri: baseUrl + "images/logo.png"}
                        } />
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.drawerHeaderText}>
                            Ristorante Con Fusion
                        </Text>
                    </View>
                </View>
                <DrawerNavigatorItems {...props} />
            </SafeAreaView>
        </ScrollView>
    );
}

const MainNavigator = createAppContainer(createDrawerNavigator({
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: "Login",
            drawerLabel: "Login",
            drawerIcon: ({tintColor}) => <Icon 
                name="sign-in"
                type="font-awesome"
                size={24}
                color={tintColor}
            />
        }
    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: "Home",
            drawerLabel: "Home",
            drawerIcon: ({tintColor}) => <Icon 
                name="home"
                type="font-awesome"
                size={24}
                color={tintColor}
            />
        }
    },
    AboutUs: {
        screen: AboutUsNavigator,
        navigationOptions: {
            title: "About Us",
            drawerLabel: "About Us",
            drawerIcon: ({tintColor}) => <Icon 
                name="info-circle"
                type="font-awesome"
                size={24}
                color={tintColor}
            />
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: "Menu",
            drawerLabel: "Menu",
            drawerIcon: ({tintColor}) => <Icon 
                name="list"
                type="font-awesome"
                size={24}
                color={tintColor}
            />
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: "Contact Us",
            drawerLabel: "Contact Us",
            drawerIcon: ({tintColor}) => <Icon 
                name="address-card"
                type="font-awesome"
                size={22}
                color={tintColor}
            />
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: "My Favorites",
            drawerLabel: "My Favorites",
            drawerIcon: ({tintColor}) => <Icon 
                name="heart"
                type="font-awesome"
                size={24}
                color={tintColor}
            />
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: "Reserve Table",
            drawerLabel: "Reserve Table",
            drawerIcon: ({tintColor}) => <Icon 
                name="cutlery"
                type="font-awesome"
                size={24}
                color={tintColor}
            />
        }
    },
},{
    initialRouteName: "Home",
    defaultNavigationOptions: {
        backgroundColor: "#000"
    },
    contentComponent: CustomDrawerContentComponent
}));

class Main extends Component {

    netInfoSubscription;

    async componentDidMount() {
        this.netInfoSubscription = NetInfo.addEventListener(this.handleConnectivityChange);
        this.props.loadDishes();
        this.props.loadLeaders();
        this.props.loadComments();
        this.props.loadPromotions();
        const netInfoData = await NetInfo.fetch();
        ToastAndroid.show("Network Connectivity Type:" + netInfoData.type, ToastAndroid.LONG);
    }

    componentWillUnmount() {
        this.netInfoSubscription();
    }

    handleConnectivityChange(netInfoData) {
        switch (netInfoData.type) {
            case "none":
                ToastAndroid.show("You are offline", ToastAndroid.LONG);
                break;
            case "wifi":
                ToastAndroid.show("You are now connected to WiFi!", ToastAndroid.LONG);
                break;
            case "cellular":
                ToastAndroid.show("You are connected to Cellular!", ToastAndroid.LONG);
                break;
            case "unknown":
                ToastAndroid.show("You are have a unknown connection!", ToastAndroid.LONG);
                break;
        }
    }

    render() {
        return (
            <MainNavigator/>
        );
    }
}

const mapDispatchToProps = {
    loadDishes,
    loadComments,
    loadLeaders,
    loadPromotions
}


export default connect(null,mapDispatchToProps)(Main);
