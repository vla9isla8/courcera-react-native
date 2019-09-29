import React, { Component } from "react";
import {ScrollView, View, Text } from "react-native";
import { Card } from "react-native-elements";
import {PROMOTIONS} from '../shared/promotions';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {DISHES} from '../shared/dishes';


function RenderItem({item}) {
    if (item != null) {
        return (
            <Card 
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={require("../images/uthappizza.png")}    
            >
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    } else {
        return (<View/>);
    }
}



class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            leaders: LEADERS,
            promotions: PROMOTIONS
        }

    }
    static navigationOptions = {
        title: "Home"
    }

    render() {


        const featuredDish = this.state.dishes.find(({featured})=> featured);
        const featuredLeader = this.state.leaders.find(({featured})=> featured);
        const featuredPromo = this.state.promotions.find(({featured})=> featured);

        return(
            <ScrollView>
                <RenderItem item={featuredDish} />
                <RenderItem item={featuredPromo} />
                <RenderItem item={featuredLeader} />
            </ScrollView>
        );
    }
}

export default Home;
