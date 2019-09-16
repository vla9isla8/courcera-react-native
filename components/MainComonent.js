import React, {Component} from "react";
import {DISHES} from '../shared/dishes';
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { View } from "react-native";

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
            <View>
                <Menu dishes={this.state.dishes} onPress={this.onDishSelect} />
                <Dishdetail dish={this.state.dishes.find(({id}) => id === this.state.selectedDish)} />
            </View>
        );
    }
}

export default Main;
