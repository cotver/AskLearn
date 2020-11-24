import React from "react";
import { ScrollView ,View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions, StackActions } from 'react-navigation';

export default class TestScreen extends React.Component {

    onBackToHomePress = () =>{
        var navActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Learn"})]
        });
        this.props.navigation.dispatch(navActions);
      }

      render() {
    return (
        // <ScrollView>
        <View style={styles.screen}>
            <Image source={require("../assets/icon.png")} style={styles.logo} />
            <View style={styles.buttonArea}>
                <Text style={({ textAlign: "left", padding: 10 })}>1.
                    การแก้ไขข้อกำหนดและเงื่อนไขฯ ฉบับนี้ Ask Learn อาจเปลี่ยนแปลงแก้ไขข้อกำหนดและเงื่อนไขฯ 
                    ฉบับนี้ได้ตลอดเวลาตามที่  Ask Learn เห็นสมควรซึ่งจะอยู่ภายใต้ขอบวัตถุประสงค์ของข้อกำหนดและเงื่อนไขฯ ฉบับนี้ 
                    ในกรณีดังกล่าว  Ask Learn จะแจ้งเนื้อหาของข้อกำหนดฉบับแก้ไขรวมถึงวันที่มีผลบังคับใช้บนเว็บไซต์ของ  Ask Learn หรืออาจแจ้งให้ผู้ใช้ทราบด้วยวิธีการอื่นใดตามที่ 
                    Ask Lern กำหนด ทั้งนี้ ข้อกำหนดและเงื่อนไขฉบับแก้ไขจะมีผลบังคับใช้ตามวันที่กำหนดต่อไป </Text>
            <Text style={({ textAlign: "left" ,padding: 10})}>2.
                    Ask Lern จะไม่รับประกันใด ๆ ไม่ว่าโดยชัดแจ้งหรือโดยปริยายเกี่ยวกับการให้บริการฯ แก่ผู้ใช้ (ซึ่งรวมถึงเนื้อหาหลักฯ) ว่าบริการฯ นั้นปราศจากข้อบกพร่องใดๆ 
                    (ข้อบกพร่องในที่นี่รวมถึงแต่ไม่จำกัดเพียง ข้อบกพร่องด้านความปลอดภัย ฯลฯ ข้อผิดพลาด บัค (BUGS) หรือการละเมิดสิทธิใดๆ) หรือมีความปลอดภัย 
                    มีความน่าเชื่อถือ มีความถูกต้องสมบูรณ์ มีประสิทธิภาพ และมีความเหมาะสมแก่การใช้ประโยชน์เฉพาะอย่าง ทั้งนี้ Ask Lern ไม่มีความรับผิดชอบในการที่จะต้องจัดหาบริการฯ 
                    ที่ไม่มีข้อบกพร่องดังกล่าวแต่อย่างใด</Text>
            </View>
            <Button type="outline"
        icon={
          <Icon
            name="home"
            size={30}
            color="pink"/>} title=" " onPress={this.onBackToHomePress} />
        </View>
        // </ScrollView>
    );
};
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
       
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 50
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


