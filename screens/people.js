import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button, LogBox } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';


import firebase from '../config/Firebase';

import { snapshotToArray } from './helper'



class peopleScreen extends React.Component {
    state = {
        isLoading: true,
        uid: '',
        users: []
    }

    componentDidMount() {
        LogBox.ignoreLogs(['Setting a timer', "Can't perform a React state update on an unmounted component"]);
        this.liveUpdate();
    }

    liveUpdate = () => {
        this.setState({ isLoading: true, })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ uid: user.uid })
            }
        });
        let users = []
        firebase.database().ref().child('users').once('value', (snapshot) => {
            users = snapshotToArray(snapshot).map(user => ({
                name: user.name,
                photoURL: user.photoURL,
                id: user.id,
                email: user.email,
                uid: user.uid,
                role: user.role
            }));


            this.setState({
                users: users,
                isLoading: false, 
            })

        });

    }
    userPic = (photo) =>{
        if(photo != ""){
            return <Image
            source={{uri:photo}}
            style={styles.profile}
        />
        }
        else{
            return <Image
            source={require("../assets/icon.png")}
            style={styles.profile}
        />
        }
    }




    renderCourse = (itemData) => (

        <TouchableOpacity style={{ margin: 5 }}>
            <View style={styles.Box}>
            {this.userPic(itemData.item.photoURL)}
                <View style={styles.row}>
                    <Text style={styles.Header}>{itemData.item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={2} style={{padding:5, fontSize: 10, fontWeight: 'bold' }}>Email : {itemData.item.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    <Text numberOfLines={2} style={{padding:5, fontSize: 10, fontWeight: 'bold' }}>Role : {itemData.item.role}</Text>
                        
                    </View>
                    
                </View>

            </View>
        </TouchableOpacity>
    )
    render() {

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderCourse}
                />
                <Spinner visible={this.state.isLoading} />
            </View>


        );
    }

};

peopleScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: () => (<Image style={{ width: 150, height: 50 }} source={require('../assets/icon.png')} />),
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
        justifyContent: 'flex-start',
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
    },
    profile: {
        resizeMode: "cover",
        height: 47,
        width: 47,
        borderRadius: 50,
        backgroundColor: "#FF5350",
        marginRight: 10,
    },
});


export default peopleScreen;
