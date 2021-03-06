import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Base = (props) => {

    return (

        <View style={styles.screen}>
            <Image source={require("../../assets/icon.png")} style={styles.logo} />
            <View style={styles.buttonArea}>
                <TouchableOpacity style={ styles.button} onPress={()=>{
                    props.navigation.navigate("LoginScreen")
                }}>
                    <Text style={{fontSize: 20, textAlign: 'center' }}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.button } onPress={()=>{
                    props.navigation.navigate("RegisterScreen")
                }}>
                    <Text style={{fontSize: 20, textAlign: 'center' }}>สมัครสมาชิก</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

Base.navigationOptions = (navigationData) => {
    return {headerTitle: ""
    };
  };



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white'
    },
    logo: {
        width: 100,
        height: 100,
    },
    buttonArea:{
        marginTop: 20
    },
    button:{
        marginBottom: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        justifyContent: 'center'
    }
});

export default Base;
