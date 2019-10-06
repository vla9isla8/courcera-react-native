import React, { Component } from 'react';
import {View, Text, FlatList, Modal,
    StyleSheet, Button} from 'react-native';
import { Card, Icon, Input, Rating, ListItem} from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import { baseUrl } from "../datasource";
import {connect} from "react-redux";
import Loading from "./LoadingComponent";
import {postFavorite} from "../redux/actions/favorites";
import {postComment} from "../redux/actions/comments";


class Favorites extends Component {

    static navigationOptions = {
        title: "My Favorites"
    }

    render() {
        const {navigate} = this.props.navigation;

        const {dishes,favorites} = this.props;

        const renderMenuItem = ({ item, index }) => {
            return (
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

export default connect(mapStateToProps)(Favorites);
