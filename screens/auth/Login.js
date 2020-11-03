import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";


const LoginPage = (props) => {
    const [loginDetail, setLoginDetail] = useState({ username: null, password: null })
    const LoginSubmit = () => {
        // login code
        props.navigation.navigate("Learn")
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.screen}>
                <View style={styles.topArea}>
                    <Image source={require("../../assets/icon.png")} style={styles.logo} />
                    <Text style={{ fontSize: 20, fontSize: 25, fontWeight: 'bold' }}>เข้าสู่ระบบ</Text>
                </View>
                <View style={styles.inputArea}>
                    <TextInput placeholder="อีเมล" style={styles.input} />
                    <TextInput placeholder="รหัสผ่าน" style={styles.input} />
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={LoginSubmit}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};

LoginPage.navigationOptions = (navigationData) => {
    return {
        headerTitle: ""
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: 'white'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        width: '80%',
        marginBottom: '5%',
        textAlign: 'center',
        fontSize: 20,
        paddingVertical: 10,

    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    topArea: {
        flex: 3,
        marginBottom: 20,
        alignItems: 'center'
    },
    buttonArea: {
        flex: 3,
        flexDirection: 'column-reverse',
        width: '100%',
        marginBottom: '25%',
    },
    inputArea: {
        flex: 3,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#43B8D2',
        color: 'white',
        borderColor: 'black',
        borderRadius: 5,
        textAlign: 'center',
        marginHorizontal: '10%',
        paddingVertical: '3%',
    }
});

export default LoginPage;
