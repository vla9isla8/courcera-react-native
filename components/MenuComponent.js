import React, {Component} from "react";
import {View, FlatList, StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      marginVertical: 8,
      marginHorizontal: 16,
    }
});

function MenuItem({item,index,onPress}) {
    return (
        <ListItem 
            style={styles.item}
            key={index}
            title={item.name}
            subtitle={item.description}
            leftAvatar={{source: require("../images/alberto.png")}}
            hideChevron
            onPress={() => onPress(index)}
        />
    );
}

function Menu({dishes, onPress}) {
    return (
        <FlatList
            data={dishes}
            renderItem={(props) => <MenuItem  {...props} onPress={onPress}/>}
            keyExtractor={({id}) => id.toString()}
        />
    );
}
export default Menu;
