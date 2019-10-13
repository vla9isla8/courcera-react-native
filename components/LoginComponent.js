import React, { Component } from "react";
import {View, StyleSheet, Button} from "react-native";
import {Card, Icon, Input, CheckBox} from "react-native-elements";
import * as SecureStore from 'expo-secure-store';


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        margin: 20
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
})

class Login extends Component {

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
        title: "Login"
    }

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
                        onPress={()=> this.handleLogin()} 
                        title="Login"
                        color="#512DA8" 
                    />
                </View>
            </View>
        );
    }



}


export default Login;