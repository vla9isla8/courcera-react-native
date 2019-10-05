import React, {Component} from "react";
import { FlatList, StyleSheet, Text, ScrollView, View} from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { connect } from "react-redux";
import { baseUrl } from "../datasource";
import Loading from "./LoadingComponent";

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      marginVertical: 8,
      marginHorizontal: 16,
    }
});

function RenderItem({item}) {
    return (
        <ListItem 
            style={styles.item}
            title={item.name}
            subtitle={item.description}
            leftAvatar={{source: {uri: baseUrl + item.image}}}
            hideChevron
        />
    );
}

function History() {
    return (
        <Card title="Our History" >
            <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
            <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
        </Card>
    );
}

function Leaders(props) {
    if (props.loading) {
        return <Loading />
    }

    if (props.error) {
        return <View style={{flex: 1}}><Text>{props.error}</Text></View>
    }
    return (
        <Card title="Corporate Leadership">
            <FlatList
                data={props.data}
                renderItem={(props) => <RenderItem  
                    {...props}
                />}
                keyExtractor={({id}) => id.toString()}
            />
        </Card>
    )
}

class AboutUs extends Component {

    static navigationOptions = {
        title: "About Us"
    }

    render() {
        return (
            <ScrollView style={{flexGrow: 1}}>
                <History />
                <Leaders
                    {...this.props.leaders}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = ({leaders}) => ({
    leaders
});

export default connect(mapStateToProps)(AboutUs);
