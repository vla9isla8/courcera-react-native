import React, {Component} from "react";
import {View, Text, FlatList, Modal,
     StyleSheet, Button, Alert, ScrollView, PanResponder} from 'react-native';
import { Card, Icon, Input, Rating} from 'react-native-elements';
import { baseUrl } from "../datasource";
import {connect} from "react-redux";
import Loading from "./LoadingComponent";
import {postFavorite, deleteFavorite} from "../redux/actions/favorites";
import {postComment} from "../redux/actions/comments";

import * as Animatable from "react-native-animatable";


const commentFormStyles = StyleSheet.create({
    modal: {
        margin: 8
    },
    formRow: {
        marginTop: 10,
        marginBottom: 10
    }
});

class CommentModalForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            author: '',
            comment: ''
        }
    }

    submit() {
        const data = {...this.state};
        this.setState({
            rating: 0,
            author: '',
            comment: ''
        });
        this.props.onSubmit(data);
    }

    close() {
        this.setState({
            rating: 0,
            author: '',
            comment: ''
        });
        this.props.onClose();
    }

    render() {
        return (
            <Modal
                visible={this.props.open}
                onRequestClose={()=>this.close()}
                onDismiss={()=>this.close()}
            >
                <View style={commentFormStyles.modal}>
                    <View style={commentFormStyles.formRow}>
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            ratingCount={5}
                            onFinishRating={(value)=>this.setState({rating:value})}
                        />
                    </View>
                    <View style={commentFormStyles.formRow}>
                        <Input
                            leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                            placeholder="Author"
                            onChangeText={(value)=>this.setState({author:value})}
                        />
                    </View>
                    <View style={commentFormStyles.formRow}>
                        <Input
                            leftIcon={{ type: 'font-awesome', name: 'comment-o'}}
                            placeholder="Comment"
                            onChangeText={(value)=>this.setState({comment:value})}
                        />
                    </View>
                    <View style={commentFormStyles.formRow}>
                        <Button
                            title='Submit'
                            color='#512DA8'
                            onPress={()=>this.submit()}
                        />
                    </View>
                    <View style={commentFormStyles.formRow}>
                        <Button
                            style={commentFormStyles.item}
                            title='Cancel'
                            onPress={()=>this.close()}
                        />
                    </View>
                </View>
            </Modal>
        );
    }


}


function RenderDish({dish, loading, error, favorite, markFavorite, unmarkFavorite, panResponderGrant, submitComment}) {
    
    const recognizeDragRight = ({moveX, moveY, dx, dy}) => {
        if (dx < -200) {
            return true;
        }
        return false;
    };

    const recognizeDragLeft = ({moveX, moveY, dx, dy}) => {
        if (dx > 200) {
            return true;
        }
        return false;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            panResponderGrant();
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDragRight(gestureState)) {
                Alert.alert(
                    "Add to favorites?",
                    "Are you shure you wish to add " + dish.name + " to your favorites?",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        }, {
                            text: "Ok",
                            style: "default",
                            onPress: () => markFavorite(dish.id)
                        }
                    ],
                    { cancelable: false }
                );
            } else if (recognizeDragLeft(gestureState)) {
                submitComment();
            }
            return true;
        }
    });
    
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
                {...panResponder.panHandlers}
            >
                <View>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flexDirection:"row",justifyContent: "center"}}>
                        <Icon
                            raised
                            reverse
                            name={ favorite ? "heart" : "heart-o"}
                            type='font-awesome'
                            color="#f50"
                            onPress={() => favorite ? unmarkFavorite(dish.id) : markFavorite(dish.id)}
                        />
                        <Icon
                            raised
                            reverse
                            name={"pencil"}
                            type='font-awesome'
                            color="#512DA8"
                            onPress={submitComment}
                        />
                    </View>
                </View>
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
            <View key={index} style={{margin: 10, alignItems: "flex-start"}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                    ratingCount={5}
                    readonly
                    startingValue={item.rating}
                    imageSize={14}
                />
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
            commentFormOpen: false
        }
    }

    static navigationOptions = {
        title: "Dish Detail"
    }

    handleViewRef = (ref) => {
        this.view = ref;
    }

    panResponderGrant = () => {
        this.view.rubberBand(1000).then((endState) => {
            console.log(endState.finished ? "Finished" : "Canceled");
        });
    }

    markFavorite = (dishId) => {
        this.props.postFavorite(dishId);
    }

    unmarkFavorite = (dishId) => {
        Alert.alert(
            "Delete Favorite?",
            "Are you sure you wish to delete the favorite dish?",
            [
                {
                    text: "Cansel",
                    style: 'cancel'
                },{
                    text: "Ok",
                    style: "default",
                    onPress: () => this.props.deleteFavorite(dishId)
                }
            ] )
    }

    openCommentForm() {
        this.setState({
            commentFormOpen: true
        });
    }

    closeCommentForm() {
        this.setState({
            commentFormOpen: false
        });
    }

    submitComment(data) {
        const dishId = this.props.navigation.getParam('dishId');
        this.props.postComment(data,dishId);
        this.closeCommentForm();
    }


    render() {
        const dishId = this.props.navigation.getParam('dishId');
        const favorite = this.props.favorites.some((el) => el === dishId);
    
        return (
            <ScrollView>
                <Animatable.View 
                    animation="fadeInDown" 
                    duration={2000} 
                    ref={this.handleViewRef}
                    delay={1000} >
                    <RenderDish 
                        dish={this.props.dishes.data.find(({id}) => id === dishId)} 
                        loading={this.props.dishes.loading}
                        error={this.props.dishes.error}
                        favorite={favorite}
                        markFavorite={this.markFavorite}
                        unmarkFavorite={this.unmarkFavorite}
                        panResponderGrant={this.panResponderGrant}
                        submitComment={()=> this.openCommentForm()}
                    />
                </Animatable.View>
                <Animatable.View 
                    animation="fadeInUp" 
                    duration={2000} 
                    delay={1000} >
                    <RenderComments 
                        comments={this.props.comments.data.filter((item)=> item.dishId === dishId)} 
                        loading={this.props.comments.loading}
                        error={this.props.comments.error}
                    />
                </Animatable.View>
                <CommentModalForm 
                    open={this.state.commentFormOpen}
                    onClose={() => this.closeCommentForm()}
                    onSubmit={(data) => this.submitComment(data)}
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
    postFavorite,
    postComment,
    deleteFavorite
}

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);
