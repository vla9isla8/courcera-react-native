import React, {Component} from "react";
import { FlatList, StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
import { baseUrl } from "../datasource";
import { connect } from "react-redux";

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
            leftAvatar={{source: {uri: baseUrl + item.image}}}
            hideChevron
            onPress={onPress}
        />
    );

}

class Menu extends Component {

    static navigationOptions = {
        title: "Menu"
    }

    render() {

        const {navigate} = this.props.navigation;

        return (
            <FlatList
                data={this.props.dishes.data}
                renderItem={(props) => <MenuItem  
                    {...props} 
                    onPress={() => navigate('Dishdetail', {dishId: props.index})}
                />}
                keyExtractor={({id}) => id.toString()}
            />
        );
    }
}

const mapStateToProps = ({dishes}) => ({
    dishes
});

export default connect(mapStateToProps)(Menu);
