import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView , LogBox} from "react-native";
import validator from 'validator';

import firebase from '../../config/Firebase';


const RegisterPage = (props) => {
    LogBox.ignoreLogs(['Setting a timer']);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmationError, setPasswordConfirmationError] = useState("");
    const [Ferror, setFerror] = useState("");

    const runValidation = () => {
        const isEmail = validator.isEmail(email);
        const isname = name.length >= 4;
        const ispass = password.length >= 8 && password.length <= 16;
        const isnpassc = password === passwordConfirmation;
        console.log(isEmail)
        setEmailError("")
        setNameError("")
        setPasswordError("")
        setPasswordConfirmationError("")
        setFerror("")
        if(!isEmail){
            setEmailError('Your Email is invalid')
        }
        if(!isname){
            setNameError('Your name is too short')
        }
        if(!ispass){
            setPasswordError('Password must have 8-16 character')
        }
        if(!isnpassc){
            setPasswordConfirmationError('Your password is not match')
        }
        if(!isEmail || !isname || !ispass || !isnpassc){
            return false;
        }
        return true;
    }

    const onSubmitRegistration = () => {
        if (!runValidation()) {
            return;
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                // Add the new user to the users table
                firebase.database().ref()
                    .child('users')
                    .push({
                        email: email,
                        uid: user.uid,
                        name: name,
                        photoURL: "",
                        role:"Student"
                    });
                    console.log(user.uid)
                // Update the user's metadata on firebase
                user.updateProfile({
                    displayName: name,
                    photoURL: "",
                });
                props.navigation.replace('LoginScreen');
                return;
            })
            .catch((error) => {
                setFerror("Something went worng")
                console.log(error)
            });
    }

    const LoginHandler = () => {

        props.navigation.replace("LoginScreen")
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.screen}>
                <View style={styles.topArea}>
                    <Image source={require("../../assets/icon.png")} style={styles.logo} />
                    <Text style={{ fontSize: 20, fontSize: 25, fontWeight: 'bold' }}>สมัครสมาชิก</Text>
                </View>
                <View style={styles.inputArea}>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={name => setName(name)}
                        placeholder="Name"
                    />
                    <Text style={styles.errortext}>{nameError}</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={email => setEmail(email)}
                        keyboardType="email-address"
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
                    <Text style={styles.errortext}>{passwordError}</Text>
                    <TextInput
                        style={styles.input}
                        value={passwordConfirmation}
                        onChangeText={passwordConfirmation => setPasswordConfirmation(passwordConfirmation)}
                        placeholder="Confirm Password"
                        secureTextEntry
                        returnKeyType="go"
                    />
                    <Text style={styles.errortext}>{passwordConfirmationError}</Text>
                    <Text style={styles.errortext}>{Ferror}</Text>
                    

                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={onSubmitRegistration}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>สมัครสมาชิก</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonRegis}>
                    <TouchableOpacity style={styles.buttonR} onPress={LoginHandler}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>กลับสู่หน้าแรก</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

RegisterPage.navigationOptions = (navigationData) => {
    return {
        headerTitle: ""
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        width: '80%',
        textAlign: 'center',
        marginBottom: '2%',
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
        marginBottom: '5%'
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
    buttonRegis: {
        flex: 3,
        width: '100%',
        marginBottom: '25%',
    },
    errortext:{
        color:"red",
        marginBottom:"3%",
        fontSize:15,
        fontWeight:"bold"
    }
});

export default RegisterPage;
