import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button, LogBox
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";

import AddWork from './components/workAdder'
import firebase from 'firebase';

import { Subject } from '../../data/data-dummy'
import { render } from "react-dom";
import { snapshotToArray } from '../helper'

import Spinner from 'react-native-loading-spinner-overlay';


class subjectScreen extends React.Component {
    state = {
        content: [],
        description: "",
        addVisible: false,
        isLoading: true,
        role: ""
    }
    cId = this.props.navigation.getParam("cId");
    cTitle = this.props.navigation.getParam("cTitle");

    componentDidMount() {
        LogBox.ignoreLogs(['Setting a timer']);
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


        firebase.database().ref().child('Lessons').on('value', (snapshot) => {
            data = snapshotToArray(snapshot)
                .filter(lesson => lesson.course === this.cId)
                .map(lesson => ({
                    lesson: lesson.lesson,
                    detail: lesson.detail,
                    id: lesson.id,
                    course: lesson.course,
                }));

            this.setState({
                content: data,
                isLoading: false,
            })

        });
    }



    addHandler = (lesson, detail) => {
        this.setState({ isLoading: true, })
        firebase.database().ref()
            .child('Lessons')
            .push({
                lesson: lesson,
                detail: detail,
                course: this.cId,
            }).then(
                this.setState({ isLoading: false, })
            );
    }

    changeVisible = (stats) => {
        this.setState({ addVisible: stats })
    }

    renderSubject = (itemData) => (

        <View style={styles.Box}>
            <View style={styles.row}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{itemData.item.lesson}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text numberOfLines={2} style={{ fontSize: 10, fontWeight: 'bold' }}>{itemData.item.detail}</Text>
                </View>
            </View>

        </View>

    )

    teacher = (role) => {
        if (this.state.role == "Student") {
            return <View style={styles.add}></View>;
        }
        else if(this.state.role == "Teacher"){
            return <View style={styles.add}>
                <Button title="add Work" onPress={() => this.changeVisible(true)} />
            </View>
        }
        else{
            return <View style={styles.add}></View>;
        }
    }

    render() {


        return (
            <View style={{ flex: 1 }}>
                <View style={styles.head}>
                    {this.teacher(this.state.role)}
                    <Text style={styles.Header}>{this.cTitle}</Text>
                </View>
                <AddWork
                    visible={this.state.addVisible}
                    addVisible={this.changeVisible}
                    addHandler={this.addHandler}
                />
                <FlatList
                    data={this.state.content}
                    renderItem={this.renderSubject}
                />
                <Spinner visible={this.state.isLoading} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    Header: {
        padding: 10,
        fontSize: 25,
        fontWeight: 'bold',
    },
    Box: {
        margin: 5,
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
    head: {
        flexDirection: "column",
    }
});

export default subjectScreen;
