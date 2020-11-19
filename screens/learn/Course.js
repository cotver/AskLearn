import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import { COURSE } from '../../data/data-dummy'

import AddCourse from './components/addCourse'

const courseScreen = (props) => {
    const [isnotification, setnotification] = useState(false)
    const [addVisible, setaddVisible] = useState(false)

    const changeVisible= (stats) =>{
        setaddVisible(stats)
    }


    const renderCourse = (itemData) => (

        <TouchableOpacity style={{ margin: 5 }} onPress={() => { props.navigation.navigate('SubjectScreen', { cId: itemData.item.id, cTitle: itemData.item.name }) }}>
            <View style={styles.Box}>
                <View style={styles.row}>
                    <Text style={styles.Header}>{itemData.item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={2} style={{ fontSize: 10, fontWeight: 'bold' }}>{itemData.item.description}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.add}>
                <Button title="add Course" onPress={() => changeVisible(true)}/>
            </View>
            <AddCourse
                visible={addVisible}
                addVisible ={changeVisible}
            />
            <FlatList
                data={COURSE}
                renderItem={renderCourse}
            />
        </View>


    );
};

courseScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: () => (<Image style={{ width: 150, height: 50 }} source={require('../../assets/icon.png')} />),
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
const styles = StyleSheet.create({
    Header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    Box: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    row: {
        flexDirection: 'column',
        alignContent: 'center'
    },
    add: {
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10,
    }
});


export default courseScreen;
