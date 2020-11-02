import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    Linking,
    SafeAreaView,
    ScrollView,
    Platform,
    FlatList
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";

import { Subject } from '../../data/data-dummy'

const subjectScreen = (props) => {
    const cId = props.navigation.getParam("cId");
    const content = Subject.filter((subject) => subject.course == cId);


    const renderSubject = (itemData) => (
        <TouchableOpacity style={{ margin: 5 }} //onPress={() => {props.navigation.navigate('MealDetail', {cId: itemData.item.id})}}
        >

            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start', borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 10 }}>
                <View style={{ flexDirection: 'column', alignContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{itemData.item.owner}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={2} style={{ fontSize: 10, fontWeight: 'bold' }}>{itemData.item.detail}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={content}
                renderItem={renderSubject}
            />
        </View>


    );
};

subjectScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: "asdf",

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
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    uploadImg: {
        borderRadius: 200,
        height: 80,
        width: 80,
        // marginBottom: '5%'

    },
    screen: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        width: '80%',
        textAlign: 'center',
        marginBottom: '5%',
        // paddingHorizontal: 40,
        paddingVertical: 10,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20
    },
    topArea: {
        flex: 3,
        marginBottom: 20,
        alignItems: 'center'
    },
    buttonArea: {
        flex: 3,
        flexDirection: 'column',
        width: '80%',
        marginBottom: '25%',
    },
    inputArea: {
        flex: 3,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '5%'
    },
    button: {
        borderColor: 'black',
        //borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        marginHorizontal: '10%',
        paddingVertical: '3%',
    },
    privacyaccept: {
        alignItems: 'center',
        flexDirection: 'row',
    }
});


export default subjectScreen;
