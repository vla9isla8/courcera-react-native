import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";

const styles = StyleSheet.create({
    item: {
      marginTop: 8,
      marginBottom: 8,
      fontWeight: "500"
    }
});


class Contact extends Component {

    static navigationOptions = {
        title: "Contact Us"
    }
    render(){
        return ( 
            <Animatable.View 
                animation="fadeInDown" 
                duration={2000} 
                delay={1000} >
                <Card title="Contact Information" >
                    <Text style={styles.item}>121, Clear Water Bay Road</Text>
                    <Text style={styles.item}>Clear Water Bay, Kowloon</Text>
                    <Text style={styles.item}>HONG KONG</Text>
                    <Text style={styles.item}>Tel: +852 1234 5678</Text>
                    <Text style={styles.item}>Fax: +852 8765 4321</Text>
                    <Text style={styles.item}>Email:confusion@food.net</Text>
                </Card>
            </Animatable.View>
        );
    }
}

export default Contact;
