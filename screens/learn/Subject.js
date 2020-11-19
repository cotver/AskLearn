import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";

import { Subject } from '../../data/data-dummy'

const subjectScreen = (props) => {
    const cId = props.navigation.getParam("cId");
    const cTitle = props.navigation.getParam("cTitle");

    const content = Subject.filter((subject) => subject.course == cId);


    const renderSubject = (itemData) => (

        <View style={styles.Box}>
            <View style={styles.row}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{itemData.item.owner}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text numberOfLines={2} style={{ fontSize: 10, fontWeight: 'bold' }}>{itemData.item.detail}</Text>
                </View>
            </View>

        </View>

    )

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.head}>
                <View style={styles.add}>
                    <Button title="add Work" />
                </View>
                <Text style={styles.Header}>{cTitle}</Text>
            </View>
            <FlatList
                data={content}
                renderItem={renderSubject}
            />
        </View>


    );
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
