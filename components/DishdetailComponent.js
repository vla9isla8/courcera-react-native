import React, {Component} from "react";
import {View, Text, FlatList} from 'react-native';
import { Card, Icon} from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import { baseUrl } from "../datasource";
import {connect} from "react-redux";
import Loading from "./LoadingComponent";
import {postFavorite} from "../redux/actions/favorites";

function RenderDish({dish, loading, error, favorite, markFavorite}) {
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
                    onPress={() => markFavorite(dish.id)}
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
        this.props.postFavorite(dishId);
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId');
        const favorite = this.props.favorites.some((el) => el === dishId);
    
        return (
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.data.find(({id}) => id === dishId)} 
                    loading={this.props.dishes.loading}
                    error={this.props.dishes.error}
                    favorite={favorite}
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

const mapStateToProps = ({dishes,comments,favorites}) => ({
    dishes,
    comments,
    favorites
});

const mapDispatchToProps = {
    postFavorite
}

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);
