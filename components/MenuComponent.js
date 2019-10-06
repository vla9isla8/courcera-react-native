import React, {Component} from "react";
import { FlatList, StyleSheet, View, Text} from 'react-native';
import { ListItem, Tile } from 'react-native-elements';
import { baseUrl } from "../datasource";
import { connect } from "react-redux";
import Loading from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      marginVertical: 8,
      marginHorizontal: 16,
    }
});

function MenuItem({item,index,onPress}) {
    return (
        <Animatable.View 
                animation="fadeInRightBig" 
                duration={2000} 
                delay={1000} >
            <Tile 
                style={styles.item}
                key={index}
                title={item.name}
                subtitle={item.description}
                imageSrc={{uri: baseUrl + item.image}}
                hideChevron
                onPress={onPress}
            />                                       
        </Animatable.View> 
    );

}

class Menu extends Component {

    static navigationOptions = {
        title: "Menu"
    }

    render() {

        if (this.props.dishes.loading) {
            return <Loading />
        }
    
        if (this.props.dishes.error) {
            return <View><Text>{this.props.dishes.error}</Text></View>
        }

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
