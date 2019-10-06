import React, { Component } from 'react';
import {View, Text, FlatList, Modal,
    StyleSheet, Button} from 'react-native';
import { ListItem } from 'react-native-elements';
import { baseUrl } from "../datasource";
import {connect} from "react-redux";
import Loading from "./LoadingComponent";
import {deleteFavorite} from "../redux/actions/favorites";
import SwipeOut from "react-native-swipeout";

class Favorites extends Component {

    static navigationOptions = {
        title: "My Favorites"
    }

    render() {
        const {navigate} = this.props.navigation;

        const {dishes,favorites} = this.props;

        const renderMenuItem = ({ item, index }) => {
            
            const rightButton = [
                {
                    text: "Delete",
                    type: "delete",
                    onPress: () => this.props.deleteFavorite(item.id)
                }
            ];
            
            return (
                <SwipeOut right={rightButton} autoClose >
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        leftAvatar={{
                            source: {
                                uri: baseUrl + item.image
                            }
                        }}
                        onPress={()=> navigate('Dishdetail', {dishId: item.id})}
                    />
                </SwipeOut>
            );
        }

        if (dishes.isLoading) {
            return (
                <Loading/>
            );
        }

        if (dishes.error) {
            return (
                <View>
                    <Text>{dishes.error}</Text>
                </View>
            );
        }

        const items = dishes.data.filter(({id}) => favorites.some(el => el === id));

        return (
            <FlatList 
                data={items}
                renderItem={renderMenuItem}
                keyExtractor={({id})=>id.toString()}
            />
        )

    }

}

const mapStateToProps = ({dishes,favorites}) => ({
    dishes,
    favorites
});

const mapDispatchToProps = {
    deleteFavorite
}

export default connect(mapStateToProps,mapDispatchToProps)(Favorites);
