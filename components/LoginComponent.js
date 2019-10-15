import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, CheckBox, Icon, Input } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as Permissions from "expo-permissions";
import { baseUrl } from "../datasource";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        margin: 20
    },
    formInput: {
        margin: 20,
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    },
    imageContainer: {
        flex: 1,
        flexDirection: "row",
        margin: 20,
    },
    image: {
        margin: 10,
        width: 80,
        height: 60,
    },
});

class LoginTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userInfo').then((userdata) => {
            let userInfo = JSON.parse(userdata);
            if (userInfo) {
                this.setState({
                    username: userInfo.username,
                    password: userInfo.password,
                    remember: true
                });
            }
        });
    }

    static navigationOptions = {
        title: "Login",
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="sign-in"
                type="font-awesome"
                size={24}
                iconStyle={{ color: tintColor }}
            />
        ),
    };

    handleLogin() {
        console.log(JSON.stringify(this.state))
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userInfo',
                JSON.stringify({...this.state})
            ).catch(e => console.error("Could not save userinfo: ", + e.message)); 
        } else {
            SecureStore.deleteItemAsync(
                'userInfo'
            ).catch(e => console.error("Could not delete userinfo: ", + e.message)); 
        }
    }

    render() {
        return (
            <View styles={styles.container} >
                <Input 
                    placeholder="Username"
                    leftIcon={{
                        type: "font-awesome",
                        name: "user-o"
                    }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.container}
                />
                <Input 
                    placeholder="Password"
                    leftIcon={{
                        type: "font-awesome",
                        name: "key"
                    }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.container}
                />
                <CheckBox 
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState(({remember})=> ({remember: !remember}))}
                />
                <View style={styles.formButton} >
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        color="#512DA8"
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate("Register")}
                        title="Register"
                        color="#512DA8"
                        icon={<Icon
                            name="user-plus"
                            color="white"
                            size={24}
                            type="font-awesome"
                        />}
                    />
                </View>
            </View>
        );
    }



}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            email: "",
            imageUrl: baseUrl + "images/logo.png",
            remember: true,
        };
    }

    static navigationOptions = {
        title: "Register",
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="user-plus"
                type="font-awesome"
                size={24}
                iconStyle={{ color: tintColor }}
            />
        ),
    };

    handleRegister = () => {
        console.log(JSON.stringify(this.state));
        const { remember, username, password } = this.state;
        if (remember) {
            SecureStore.setItemAsync("userInfo", JSON.stringify({
                username,
                password,
            }));
        }
    };

    getImageFromCamera = async () => {
        let cameraPermission = await Permissions.getAsync(Permissions.CAMERA);
        let cameraRollPermission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (cameraPermission.status !== "granted") {
            cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        }
        if (cameraRollPermission.status !== "granted") {
            cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
        if (cameraPermission.status === "granted" && cameraRollPermission.status === "granted") {
            const captureImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!captureImage.cancelled) {
                this.setState({
                    imageUrl: captureImage.uri,
                });
            }
        } else {
            // console.error("Somethink bad");
            console.log(cameraPermission.status);
            console.log(cameraRollPermission.status);

        }
    };

    render() {
        return (
            <ScrollView styles={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: this.state.imageUrl,
                        }}
                        style={styles.image}
                    />
                    <Button
                        title={"Get Image"}
                        onPress={this.getImageFromCamera}
                    />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{
                        type: "font-awesome",
                        name: "user-o",
                    }}
                    onChangeText={(username) => this.setState({ username })}
                    value={this.state.username}
                    containerStyle={styles.container}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{
                        type: "font-awesome",
                        name: "key",
                    }}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    containerStyle={styles.container}
                />
                <Input
                    placeholder="Firstname"
                    leftIcon={{
                        type: "font-awesome",
                        name: "user-o",
                    }}
                    onChangeText={(firstname) => this.setState({ firstname })}
                    value={this.state.firstname}
                    containerStyle={styles.container}
                />
                <Input
                    placeholder="Lastname"
                    leftIcon={{
                        type: "font-awesome",
                        name: "user-o",
                    }}
                    onChangeText={(lastname) => this.setState({ lastname })}
                    value={this.state.lastname}
                    containerStyle={styles.container}
                />
                <Input
                    placeholder="Email"
                    leftIcon={{
                        type: "font-awesome",
                        name: "envelope-o",
                    }}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    containerStyle={styles.container}
                />
                <CheckBox
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState(({ remember }) => ({ remember: !remember }))}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title="Register"
                        color="#512DA8"
                        icon={<Icon
                            name="user-plus"
                            color="white"
                            size={24}
                            type="font-awesome"
                        />}
                    />
                </View>
            </ScrollView>
        );
    }
}

export default createBottomTabNavigator({
    Login: {
        screen: LoginTab,
    },
    Register: {
        screen: RegisterTab,
    },
}, {
    tabBarOptions: {
        activeBackgroundColor: "#9575CD",
        inactiveBackgroundColor: "#D1C4E9",
        activeTintColor: "#ffffff",
        inactiveTintColor: "gray",
    },
});
