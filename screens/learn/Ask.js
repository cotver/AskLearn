import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Image, TextInput, Button } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import * as ImagePicker from 'expo-image-picker';

import Post from "./components/post";
import firebase from '../../config/Firebase';
import { snapshotToArray } from '../helper'


class AskScreen extends React.Component {
    state = {
        uid: '',
        post: [],
        InputVisible: false,
        commentVisible: false,
        Input: "",
        image: null,
        imageUrl: '',
        isLoading: true,
    }
    cId = this.props.navigation.getParam("cId");

    componentDidMount() {
        this.liveUpdate();
    }

    liveUpdate = () => {
        let data = []
        this.setState({ isLoading: true, })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ uid: user.uid })
            }
        });

        firebase.database().ref().child('post').on('value', (snapshot) => {
            data = snapshotToArray(snapshot).filter(post =>
                post.course == this.cId

            ).reverse()
                .map(post => ({
                    course: post.course,
                    user: post.user,
                    text: post.post,
                    image: post.image,
                    id: post.id,
                }));

            this.setState({
                post: data,
                isLoading: false,
            })


        });
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });


        }
    };

    postHandler = async () => {
        this.setState({ isLoading: true, })
        this.uploadImage(this.state.image)

    }
    uploadImage = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const uniqid = () => Math.random().toString(36).substr(2, 9);
            const ext = uri.split('.').pop(); // Extract image extension
            const filename = `${uniqid()}.${ext}`;

            var ref = firebase.storage().ref().child("Post/" + filename);
            ref.put(blob).then(() => {
                ref.getDownloadURL().then((url) => {
                    this.setState({ imageUrl: url })
                    firebase.database().ref()
                        .child('post')
                        .push({
                            course: this.cId,
                            user: this.state.uid,
                            post: this.state.Input,
                            image: this.state.imageUrl,
                        }).then(() => {
                            this.setState({ isLoading: false, InputVisible: false, Input: "", image: null, imageUrl: '' })
                        }
                        );
                })
            })

        }
        catch (error) {
            try {
                firebase.database().ref()
                    .child('post')
                    .push({
                        course: this.cId,
                        user: this.state.uid,
                        post: this.state.Input,
                        image: null,
                    }).then(() => {
                        this.setState({ isLoading: false, InputVisible: false, Input: "" })
                    }
                    );

            }
            catch (error) {
                console.log(error)
            }
        }

        return;
    }




    renderPostItem = ({ item }) => {
        return (
            <Post
                key={item.id}
                id={item.id}
                image={item.image}
                post={item.text}
                like={item.like}
                user={item.user}

            />
        );
    };
    render() {

        return (
            <View >
                <Modal animationType="slide" visible={this.state.InputVisible} onRequestClose={() => { this.setState({ InputVisible: false }) }}>
                    <View style={{ backgroundColor: '#ea87b09e' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
                            <TouchableOpacity
                                style={styles.cancel}
                                onPress={() => {
                                    this.setState({ InputVisible: false, Input: "" });
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
                                    this.postHandler()

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
                        onChangeText={(Input) => this.setState({ Input: Input })}
                        value={this.state.Input}
                    />
                    <View style={styles.imageIn}>
                        <Button title="Pick an image" onPress={this.pickImage} />
                        {this.state.image && <Image source={{ uri: this.state.image }} style={{ margin: 10, alignContent: 'center', justifyContent: 'center', width: 200, height: 200 }} />}
                    </View>

                </Modal>
                <View style={styles.box}>
                    <Image
                        source={require("../../assets/icon.png")}
                        style={styles.profile}
                    />
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => {
                            this.setState({ InputVisible: true })
                        }}
                    >
                        <Text style={styles.text}>Ask something</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.post}
                    renderItem={this.renderPostItem}
                    keyExtractor={(item) => item.id.toString()}
                />
                <Spinner visible={this.state.isLoading} />
                <View style={{ width: "100%", height: "28%" }}></View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 30,
        width: 250
    },
    text: {
        color: 'gray',

    },
    box: {
        marginBottom: 15,
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
        height: '50%'
    },
    imageIn: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export default AskScreen;
