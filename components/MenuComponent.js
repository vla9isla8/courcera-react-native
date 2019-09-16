import React, {Component} from "react";
import {View, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';

function MenuItem({item,index,onPress}) {
    return (
        <ListItem 
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
