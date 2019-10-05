import React, { Component } from "react";
import {ScrollView, View, Text } from "react-native";
import { Card } from "react-native-elements";
import {PROMOTIONS} from '../shared/promotions';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {DISHES} from '../shared/dishes';
import {connect} from "react-redux";
import { baseUrl } from "../datasource";

function RenderItem({item,onPress,loading,error}) {
    if (item != null) {
        return (
            <Card 
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{
                    uri: baseUrl + item.image
                }}
            >
                <Text onPress={onPress ? () => onPress(item.id) : undefined} style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    } else {
        return (<View/>);
    }
}



class Home extends Component {

    static navigationOptions = {
        title: "Home"
    }

    render() {


        const featuredDish = this.props.dishes.data.find(({featured})=> featured);
        const featuredLeader = this.props.leaders.data.find(({featured})=> featured);
        const featuredPromo = this.props.promotions.data.find(({featured})=> featured);

        const {navigate} = this.props.navigation;

        return(
            <ScrollView>
                <RenderItem 
                    item={featuredDish} 
                    loading={this.props.dishes.loading}
                    error={this.props.dishes.error}
                    onPress={(id) => navigate('Dishdetail', {dishId: id})} />
                <RenderItem 
                    item={featuredPromo} 
                    loading={this.props.promotions.loading}
                    error={this.props.promotions.error}
                />
                <RenderItem 
                    item={featuredLeader} 
                    loading={this.props.leaders.loading}
                    error={this.props.leaders.error}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = ({dishes,leaders,promotions}) => ({
    dishes,
    leaders,
    promotions
});

export default connect(mapStateToProps)(Home);
