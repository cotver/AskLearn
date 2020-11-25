import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import validator from 'validator';

import firebase from '../../config/Firebase';

const LoginPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [Ferror, setFerror] = useState("");
    const [isLoading, setisLoading] = useState(false);

    const runValidation = () => {
        const isEmail = validator.isEmail(email);

        console.log(isEmail)
        setEmailError("")
        setFerror("")
        if (!isEmail) {
            setEmailError('Your Email is invalid')
            return false;
        }
        return true;
    }

    const RegisterHandler = () => {
        props.navigation.replace("RegisterScreen")
    }

    const onLoginPress = () => {
        setisLoading(true)
        if (!runValidation()) {
            return;
        }

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setisLoading(false);
                props.navigation.replace('Learn');
            })
            .catch((error) => {
                setFerror("The Email or password is invalid")
                setisLoading(false);
                console.log(error)
            });
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.screen}>
                <View style={styles.topArea}>
                    <Image source={require("../../assets/icon.png")} style={styles.logo} />
                    <Text style={{ fontSize: 20, fontSize: 25, fontWeight: 'bold' }}>เข้าสู่ระบบ</Text>
                </View>
                <View style={styles.inputArea}>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={email => setEmail(email)}
                        placeholder="Email Address"
                    />
                    <Text style={styles.errortext}>{emailError}</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={password => setPassword(password)}
                        placeholder="Password"
                        secureTextEntry

                    />
                    <Text style={styles.errortext}>{Ferror}</Text>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonRegis}>
                    <TouchableOpacity style={styles.buttonR} onPress={RegisterHandler}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>สมัครสมาชิก</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <Spinner visible={isLoading} />
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
        marginBottom: '2%',
        textAlign: 'center',
        fontSize: 20,
        paddingVertical: 10,
        borderRadius: 10,

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
        marginBottom: '5%',
        borderRadius: 20,
    },
    buttonRegis: {
        flex: 3,
        width: '100%',
        marginBottom: '10%',
        borderRadius: 20,
    },
    inputArea: {
        flex: 3,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#43B8D2',
        color: 'white',
        borderColor: 'black',
        borderRadius: 5,
        textAlign: 'center',
        marginHorizontal: '10%',
        paddingVertical: '3%',
    },
    buttonR: {
        backgroundColor: 'orange',
        borderColor: 'black',
        borderRadius: 5,
        textAlign: 'center',
        marginHorizontal: '10%',
        paddingVertical: '3%',
    },
    errortext:{
        color:"red",
        marginBottom:"3%",
        fontSize:15,
        fontWeight:"bold"
    }
});

export default LoginPage;
