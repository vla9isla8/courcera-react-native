import React, {Component} from "react";
import {View, Text, FlatList} from 'react-native';
import { Card, Icon} from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import { baseUrl } from "../datasource";
import {connect} from "react-redux";
import Loading from "./LoadingComponent";

function RenderDish({dish, loading, error, favorite, unmarkFavorite, markFavorite}) {
    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Text>{error}</Text>
    }


    if (dish != null) {
        return (
            <Card 
                featuredTitle={dish.name}
                image={{
                    uri: baseUrl + dish.image
                }}
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


function RenderComments({comments,loading,error}) {

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Text>{error}</Text>
    }

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
        return (
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.data.find(({id}) => id === dishId)} 
                    loading={this.props.dishes.loading}
                    error={this.props.dishes.error}
                    favorite={favorite}
                    unmarkFavorite={this.unmarkFavorite}
                    markFavorite={this.markFavorite}
                />
                <RenderComments 
                    comments={this.props.comments.data.filter((item)=> item.dishId === dishId)} 
                    loading={this.props.comments.loading}
                    error={this.props.comments.error}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = ({dishes,comments}) => ({
    dishes,
    comments
});

export default connect(mapStateToProps)(Dishdetail);
