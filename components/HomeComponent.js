import React, { Component } from "react";
import {View, Text, Animated, Easing } from "react-native";
import { Card } from "react-native-elements";
import {connect} from "react-redux";
import { baseUrl } from "../datasource";
import Loading from "./LoadingComponent";

function RenderItem({item,onPress,loading,error,style}) {

    if (loading) {
        return <Loading style={style}/>;
    }

    if (error) {
        return <View style={style}><Text>{error}</Text></View>
    }

    if (item != null) {
        return (
            <Card 
                style={style}
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{
                    uri: baseUrl + item.image
                }} >
                <Text onPress={onPress ? () => onPress(item.id) : undefined} style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    } else {
        return (<View style={style}/>);
    }
}



class Home extends Component {


    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }

    static navigationOptions = {
        title: "Home"
    }


    componentDidMount() {
        this.animate();
    }

    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(this.animatedValue, {
            toValue: 8,
            duration: 8000,
            easing: Easing.linear
        }).start(() => this.animate());
    }


    render() {

        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 8],
            outputRange: [1200, -1200]
        });

        const featuredDish = this.props.dishes.data.find(({featured})=> featured);
        const featuredLeader = this.props.leaders.data.find(({featured})=> featured);
        const featuredPromo = this.props.promotions.data.find(({featured})=> featured);

        const {navigate} = this.props.navigation;

        return(
            <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                <Animated.View style={{width: "100%", transform: [{ translateX: xpos1}]}}>
                    <RenderItem 
                        style={{flex: 1}}
                        item={featuredDish} 
                        loading={this.props.dishes.loading}
                        error={this.props.dishes.error}
                        onPress={(id) => navigate('Dishdetail', {dishId: id})} />
                </Animated.View>
                <Animated.View style={{width: "100%", transform: [{ translateX: xpos1}]}}>
                    <RenderItem 
                        style={{flex: 1}}
                        item={featuredPromo} 
                        loading={this.props.promotions.loading}
                        error={this.props.promotions.error}
                    />
                </Animated.View>
                <Animated.View style={{width: "100%", transform: [{ translateX: xpos1}]}}>
                    <RenderItem 
                        style={{flex: 1}}
                        item={featuredLeader} 
                        loading={this.props.leaders.loading}
                        error={this.props.leaders.error}
                    />
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = ({dishes,leaders,promotions}) => ({
    dishes,
    leaders,
    promotions
});

export default connect(mapStateToProps)(Home);
