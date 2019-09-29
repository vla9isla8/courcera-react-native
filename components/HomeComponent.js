import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

class Home extends Component {


    static navigationOptions = {
        title: "Home"
    }

    render() {
        return(
            <View>
                <Text>Home Component</Text>
            </View>
        );
    }
}

export default Home;
