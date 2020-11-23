import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button, LogBox } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Spinner from 'react-native-loading-spinner-overlay';

import { COURSE } from '../../data/data-dummy'

import AddCourse from './components/addCourse'

import firebase from '../../config/Firebase';

import { snapshotToArray } from '../helper'



class courseScreen extends React.Component {
    state = {
        courses: [],
        userId: "",
        description: "",
        addVisible: false,
        isLoading: true,
        role: "",
        uid: ''
    }

    componentDidMount() {
        LogBox.ignoreLogs(['Setting a timer', "Can't perform a React state update on an unmounted component"]);
        this.liveUpdate();
    }

    liveUpdate = () => {
        let data = []
        this.setState({ isLoading: true, })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ uid: user.uid })
            }
            let users = []
            firebase.database().ref().child('users').once('value', (snapshot) => {
                users = snapshotToArray(snapshot)
                    .filter(user => user.uid == this.state.uid)

                if (users.length > 0) {
                    this.setState({
                        role: users[0].role,
                    })
                }
            });
        });



        firebase.database().ref().child('courses').on('value', (snapshot) => {
            data = snapshotToArray(snapshot)
                .map(course => ({
                    name: course.name,
                    description: course.description,
                    id: course.id,
                }));

            this.setState({
                courses: data,
                isLoading: false,
            })

        });
    }

    teacher = (role) => {
        console.log(role)
        if (role == "Student") {
            return <View style={styles.add}></View>;
        }
        else {
            return <View style={styles.add}>
                <Button title="add Course" onPress={() => (this.changeVisible(true))} />
            </View>
        }
    }



    addHandler = (name, description) => {
        this.setState({ isLoading: true, })
        firebase.database().ref()
            .child('courses')
            .push({
                name: name,
                description: description,
            }).then(
                this.setState({ isLoading: false, })
            );

    }

    changeVisible = (stats) => {
        this.setState({ addVisible: stats })
    }


    renderCourse = (itemData) => (

        <TouchableOpacity style={{ margin: 5 }} onPress={() => { this.props.navigation.navigate('SubjectScreen', { cId: itemData.item.id, cTitle: itemData.item.name }) }}>
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
    render() {

        return (
            <View style={{ flex: 1 }}>

                {this.teacher(this.state.role)}
                <AddCourse
                    visible={this.state.addVisible}
                    addVisible={this.changeVisible}
                    addHandler={this.addHandler}
                />

                <FlatList
                    data={this.state.courses}
                    renderItem={this.renderCourse}
                />
                <Spinner visible={this.state.isLoading} />
            </View>


        );
    }

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
