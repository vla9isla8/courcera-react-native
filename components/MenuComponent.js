import React, {Component} from "react";
import {View, FlatList, StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from "../shared/dishes";

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      marginVertical: 8,
      marginHorizontal: 16,
    }
});

function MenuItem({item,index,onPress}) {
    return (
        <ListItem 
            style={styles.item}
            key={index}
            title={item.name}
            subtitle={item.description}
            leftAvatar={{source: require("../images/alberto.png")}}
            hideChevron
            onPress={() => onPress(index)}
        />
    );
}

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        }
    }

    static navigationOptions = {
        title: "Menu"
    }

    render() {

        const {navigate} = this.props.navigation;

        return (
            <FlatList
                data={this.state.dishes}
                renderItem={(props) => <MenuItem  
                    {...props} 
                    onPress={() => navigate('Dishdetail', {dishId: props.index})}
                />}
                keyExtractor={({id}) => id.toString()}
            />
        );
    }
}
export default Menu;
