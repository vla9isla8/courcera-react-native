import React, {Component} from "react";
import {DISHES} from '../shared/dishes';
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { View, StyleSheet, ScrollView } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      marginTop: Constants.statusBarHeight,
    }
});

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
        this.onDishSelect = this.onDishSelect.bind(this);
    }

    onDishSelect(dishId) {
        this.setState({
            selectedDish: dishId
        });
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <Menu dishes={this.state.dishes} onPress={this.onDishSelect} />
                <Dishdetail dish={this.state.dishes.find(({id}) => id === this.state.selectedDish)} />
            </ScrollView>
        );
    }
}

export default Main;
