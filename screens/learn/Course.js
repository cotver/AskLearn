import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import { COURSE } from '../../data/data-dummy'

const courseScreen = (props) => {
    const [isnotification, setnotification] = useState(false)


    const renderCourse = (itemData) => (

        <TouchableOpacity style={{ margin: 5 }} onPress={() => { props.navigation.navigate('SubjectScreen', { cId: itemData.item.id }) }}>
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 10 }}>
                <View style={{ flexDirection: 'column', alignContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{itemData.item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={2} style={{ fontSize: 10, fontWeight: 'bold' }}>{itemData.item.description}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={COURSE}
                renderItem={renderCourse}
            />
        </View>


    );
};

courseScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: "",
        headerLeft: () => (
            <HeaderButtons>
                <Item
                    title='Menu'
                    IconComponent={Ionicons}
                    iconSize={23}
                    iconName='ios-menu'
                    color='gray'
                    onPress={() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons>
                <Item
                    title='Menu'
                    IconComponent={Ionicons}
                    iconSize={30}
                    iconName='ios-notifications-outline'
                    color='gray' //{isnotification?'red' :'gray'}
                //onPress = {()=>{
                //  
                //}}
                />
            </HeaderButtons>
        ),
    };
};



export default courseScreen;
