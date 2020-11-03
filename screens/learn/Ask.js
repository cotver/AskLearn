import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Image, TextInput, } from "react-native";
import Post from "./components/post";
//import {useSelector} from 'react-redux'


const AskScreen = ({ navigation }) => {
    const [InputVisible, setInputVisible] = useState(false);
    const [commentVisible, setcommentVisible] = useState(false);
    const [Input, setInput] = useState('');


    const initData = [
        {
            id: "1",
            user: "Username",
            type: {
                image: "image",
                text: "Hi"
            },
            date: "50m",
            like: true
        },
        {
            id: "2",
            user: "Username",
            type: {
                image: "image",
                text:
                    "55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555",
            },
            date: "50m",
            like: true
        },
        {
            id: "3",
            user: "Username",
            type: {
                image: "",
                text: 'Hello',
            },
            date: "50m",
            like: false
        },
        {
            id: "4",
            user: "Username",
            type: {
                image: "",
                text: 'Hello',
            },
            date: "50m",
            like: false
        },
    ]

   
    const comVisible= (stats) =>{
        setcommentVisible(stats)
    }

    const renderPostItem = ({ item }) => {
        if (item.id == "1") {
            return (
                <View>
                    <View style={styles.box}>
                        <Image
                            source={require("../../assets/icon.png")}
                            style={styles.profile}
                        />
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => {
                                setInputVisible(true);
                            }}
                        >
                            <Text style={styles.text}>Ask something</Text>
                        </TouchableOpacity>
                    </View>
                    <Post
                        key={item.id}
                        id={item.id}
                        type={item.type}
                        like={item.like}
                        date={item.date}
                        user={item.user}
                        commentVisible = {commentVisible}
                        comVisible ={comVisible}
                    />
                </View>
            );
        } else {
            return (
                <Post
                    key={item.id}
                    id={item.id}
                    type={item.type}
                    like={item.like}
                    date={item.date}
                    user={item.user}
                    commentVisible = {commentVisible}
                    comVisible ={comVisible}
                />
            );
        }
    };

    return (
        <View >
            <Modal animationType="slide" visible={InputVisible}  onRequestClose={() => { setInputVisible(false); }}>
                <View style={{ backgroundColor: '#ea87b09e' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
                        <TouchableOpacity
                            style={styles.cancel}
                            onPress={() => {
                                setInput('');
                                setInputVisible(false);
                            }}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.head}>
                            ASK
                              </Text>
                        <TouchableOpacity
                            style={styles.post}
                            onPress={() => {
                                console.log(Input);
                                setInput('');
                                setInputVisible(false);
                            }}
                        >
                            <Text>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="Type Something"
                    placeholderTextColor='gray'
                    onChangeText={(Input) => setInput(Input)}
                    value={Input}
                />
            </Modal>
            <FlatList
                data={initData}
                renderItem={renderPostItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 30,
    },
    text: {
        color: 'gray',

    },
    box: {
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        flexDirection: "row",
        paddingHorizontal: 5,
    },
    profile: {
        resizeMode: "cover",
        height: 47,
        width: 47,
        borderRadius: 50,
        backgroundColor: "#FF5350",
        marginRight: 10,
    },
    head: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    cancel: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#ff3737bf',
        justifyContent: 'flex-end'
    },
    post: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#F90',
        justifyContent: 'flex-end'
    },
    textInput: {
        margin: 15,
        fontSize: 16,
    }
});


export default AskScreen;
