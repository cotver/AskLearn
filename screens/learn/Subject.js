import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
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

            <View style={{ margin:5, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start', borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 10 }}>
                <View style={{ flexDirection: 'column', alignContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{itemData.item.owner}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={2} style={{ fontSize: 10, fontWeight: 'bold' }}>{itemData.item.detail}</Text>
                    </View>
                </View>

            </View>

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


export default subjectScreen;
