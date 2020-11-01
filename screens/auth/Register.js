import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native";
import theme from "../../themes/default"

const RegisterPage = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const RegisterHandler = () => {
        //simple validate
        //sent form
        //wait response
        props.navigation.navigate("LoginScreen")
    }

    return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={styles.screen}>
                    <View style={styles.topArea}>
                        <Image source={require("../../assets/icon.png")} style={styles.logo} />
                        <Text style={{ ...theme.font, fontSize: 25, fontWeight: 'bold' }}>สมัครสมาชิก</Text>
                    </View>
                    <View style={styles.inputArea}>
                        <TextInput placeholder="ชื่อผู้ใช้" style={[styles.input, theme.font]} />
                        <TextInput placeholder="อีเมล" style={[styles.input, theme.font]} />
                        <TextInput placeholder="รหัสผ่าน" style={[styles.input, theme.font]} />
                        <TextInput placeholder="ยืนยันรหัสผ่าน" style={[styles.input, theme.font]} />

                    </View>
                    <View style={styles.buttonArea}>
                        <TouchableOpacity style={[styles.button, theme.defaultButton]} onPress={RegisterHandler}>
                            <Text style={{ ...theme.font, textAlign: 'center' }}>สมัครสมาชิก</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
    );
};

RegisterPage.navigationOptions = (navigationData) => {
    return {headerTitle: ""
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
        marginBottom: '5%',
        // paddingHorizontal: 40,
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
        borderColor: 'black',
        //borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        marginHorizontal: '10%',
        paddingVertical: '3%',
        backgroundColor: theme.defaultButton.backgroundColor,
        color: theme.defaultButton.color
    },
});

export default RegisterPage;
