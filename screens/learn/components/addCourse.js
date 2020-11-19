import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';


class courseAdder extends React.Component {
    state = {
        inputText: ""
    }
    render() {

        return (

            <View>
                <Modal
                    visible={this.props.visible}
                    animationType="slide"
                    onRequestClose={() => { this.props.addVisible(false) }}
                >
                    <View style={styles.container1}>
                        <TouchableOpacity
                            style={styles.leftText}
                            onPress={() => { this.props.addVisible(false) }}
                        >
                            <Text>{"Close"}</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>{"Comment"}</Text>
                    </View>
                    <View style={styles.container2}>
                        <TextInput
                            style={styles.input}
                            value={this.state.inputText}
                            placeholder={"Type something"}
                            underlineColorAndroid="transparent"
                            onChangeText={(input) => { this.setState({ inputText: input }) }}
                            onSubmitEditing={(input) => { console.log(this.state.inputText), this.setState({ inputText: "" }) }}
                        />
                    </View>
                    <ScrollView></ScrollView>
                </Modal>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: "column",
        marginBottom: 20,
        marginHorizontal: 7,
        padding: 10,
        borderWidth: 1,
        borderBottomColor: "black",
        borderRadius: 20,
    },
    profile: {
        resizeMode: "cover",
        height: 47,
        width: 47,
        borderRadius: 50,
        backgroundColor: "#FF5350",
        marginRight: 10,
    },
    user: {
        fontWeight: "bold",
        marginRight: 10,
    },
    button: {
        alignItems: "center",
        flexDirection: "row",
        padding: 8,
    },
    box: {
        flexDirection: "row",
        paddingHorizontal: 5,
    },
    comment: {
        marginLeft: 20,
        paddingVertical: 20,
        paddingRight: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    input: {
        flex: 1,
    },
    container2: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 20,
        height: 60,
    },
    container1: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '500',
    },
    leftText: {
        position: 'absolute',
        left: 20,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
});

export default courseAdder;
