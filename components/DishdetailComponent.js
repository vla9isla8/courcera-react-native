import React, {Component} from "react";
import {View, Text, FlatList} from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { ScrollView } from "react-native-gesture-handler";

function RenderDish({dish, favorite, unmarkFavorite, markFavorite}) {

    if (dish != null) {
        return (
            <Card 
                featuredTitle={dish.name}
                image={require('../images/uthappizza.png')}
            >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <Icon
                    raised
                    reverse
                    name={ favorite ? "heart" : "heart-o"}
                    type='font-awesome'
                    color="#f50"
                    onPress={() => favorite ? unmarkFavorite(dish.id) : markFavorite(dish.id)}
                />
            </Card>
        );
    }

    return (<View></View>);
}


function RenderComments({comments}) {
    const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.raiting} Starts</Text>
                <Text style={{fontSize: 12}}>{'--' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return (
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={({id}) => id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favorites: []
        }
    }

    static navigationOptions = {
        title: "Dish Detail"
    }

    markFavorite = (dishId) => {
        this.setState({
            favorites: [
                ...this.state.favorites,
                dishId
            ]
        });
    }

    unmarkFavorite = (dishId) => {
        this.setState({
            favorites: this.state.favorites.filter((id) => id !== dishId)
        });
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId');
        const favorite = this.state.favorites.some((el) => el === dishId);
        console.log(this.state.favorites);
        return (
            <ScrollView>
                <RenderDish 
                    dish={this.state.dishes.find(({id})=> id === dishId)} 
                    favorite={favorite}
                    unmarkFavorite={this.unmarkFavorite}
                    markFavorite={this.markFavorite}
                />
                <RenderComments comments={this.state.comments.filter((item)=> item.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default Dishdetail;
