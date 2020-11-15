import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Avatar,
Title,
Caption,
Text,
TouchableRipple,}from 'react-native-paper';

// import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';


const ProfileScreen = () => {
  return (
  <SafeAreaView style={styles.container}>
    <View style= {styles.userInfoSection}>
      <View style={{flexDirection: 'row', marginTop: 15}} >
        <Avatar.Image
        source={{
          uri: 'https://api.adorable.io/avatars/80/abottaadorable.png',}}
          size={80} />
          <View style={{imarginLeft: 20}}>
            <Title style={[styles.itle, {
              marginTop:15,
              marginBottom: 5,
              }]}>John Doe</Title>
              <Caption style={styles.caption}>@j_doe</Caption>
          </View>
      </View>
    </View>
    <View style={styles.userInfosectio}>
      <View style={styles.row}>
        <Icon name="email" color="#777777" size={20}/>
        <Text style={{color: "#777777", marginLeft: 20}} >@email.com</Text>
      </View>
    </View>
    <View style={styles.menuWrappper}>
      <TouchableRipple onPress={() => {('edit')}}>
        <View style={styles.menuItem}>
        <Icon name="settings-outline" color="#FF6347" size={25}/>
        <Text style={styles.menuItemText}>Setting</Text>
      </View>
      </TouchableRipple>
    </View>
  </SafeAreaView>
  );
};

// ProfileScreen.navigationOptions = (navigationData) => {
//     return {headerTitle: "Filter Meals",
//     headerLeft: ()=>(
//   <HeaderButtons>
//     <Item 
//       IconComponent={Ionicons}
//       iconSize={23}
//       title='Menu'
//       iconName = 'ios-menu'
//       onPress = {()=>{
//       navigationData.navigation.toggleDrawer();
//       }}
//     />
//   </HeaderButtons>
//   ),
//   headerRight: ()=>(
//     <HeaderButtons>
//       <Item 
//         IconComponent={Ionicons}
//         iconSize={23}
//         title='Save'
//         iconName = 'ios-save'
//       />
//     </HeaderButtons>
//     ),
//   };
//     };

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 18,
      margin: 20,
      textAlign: "center",
      fontWeight: "bold",
    },
    filterContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%",
      marginVertical: 15,
    },
  });
  export default ProfileScreen;