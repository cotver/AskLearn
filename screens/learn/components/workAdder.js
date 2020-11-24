import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';


class workAdder extends React.Component {
    state = {
        course:"",
        description: "" 
    }
    render() {

        return (

            <View>
                <Modal
                    visible={this.props.visible}
                    animationType="slide"
                    onRequestClose={() => { this.props.addVisible(false) }}
                >
                    <View style={{ backgroundColor: '#ea87b09e' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
                            <TouchableOpacity
                                style={styles.cancel}
                                onPress={() => {
                                    this.props.addVisible(false)
                                    this.setState({ course: "" })
                                    this.setState({ description: "" })
                                }}
                            >
                                <Text>{"Cancel"}</Text>
                            </TouchableOpacity>
                            <Text style={styles.title}>{"Add Work"}</Text>
                            <TouchableOpacity
                                style={styles.add}
                                onPress={() => {
                                    this.props.addVisible(false)
                                    this.setState({ course: "" })
                                    this.setState({ description: "" })
                                    this.props.addHandler(this.state.course, this.state.description)
                                }}
                            >
                                <Text>{"Add"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={styles.courseContainer}>
                            <TextInput
                                style={styles.course}
                                multiline={true}
                                value={this.state.course}
                                placeholder={"Title"}
                                underlineColorAndroid="transparent"
                                onChangeText={(input) => { this.setState({ course: input }) }}
                                onSubmitEditing={() => {  this.setState({ course: "" }) }}
                            />
                        </View>
                        <View style={styles.descriptionContainer}>
                            <TextInput
                                style={styles.description}
                                multiline={true}
                                value={this.state.description}
                                placeholder={"Description"}
                                underlineColorAndroid="transparent"
                                onChangeText={(input) => { this.setState({ description: input }) }}
                                onSubmitEditing={() => {this.setState({ description: "" }) }}
                            />
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    course: {
        fontSize: 25,
        height: 70,

    },
    description: {
        fontSize: 20,
        
    },
    courseContainer: {
        marginTop: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 20,
        height: 60,
    },
    descriptionContainer: {
        marginTop: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 20,
        height: "100%",
    },
    container1: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
    },
    cancel: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#ff3737bf',
        justifyContent: 'flex-end'
    },
    add: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#F90',
        justifyContent: 'flex-end'
    },
});

export default workAdder;
