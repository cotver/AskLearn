import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import { Avatar, Button } from "react-native-elements";
import * as firebase from 'firebase';
import firebase2 from '../../config/Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions, StackActions } from 'react-navigation';
import { HeaderBackground } from 'react-navigation-stack';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';

import { snapshotToArray } from '../helper'

export default class TestScreen extends React.Component {
  state = {
    user_id: '',
    isLoading: true,
    uid: "",
    userPic: "",
    imageUrl: ""
  }
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
    };
  }
  componentDidMount() {
    this.liveUpdate();
  }

  liveUpdate = () => {
    let data = []
    this.setState({ isLoading: true, })

    firebase2.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid: user.uid })
      }
      let users = []
      firebase2.database().ref().child('users').on('value', (snapshot) => {
        users = snapshotToArray(snapshot)
          .filter(user => user.uid == this.state.uid)

        if (users.length > 0) {
          this.setState({
            user_id: users[0].id,
            userPic: users[0].photoURL,
            isLoading: false,
          })
        }
      });
    });
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      this.uploadImage(result.uri)
    }
  };
  uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uniqid = () => Math.random().toString(36).substr(2, 9);
      const ext = uri.split('.').pop(); // Extract image extension
      const filename = `${uniqid()}.${ext}`;

      var ref = firebase2.storage().ref().child("users/" + filename);
      ref.put(blob).then(() => {
        ref.getDownloadURL().then((url) => {
          this.setState({ imageUrl: url })
          firebase2.database().ref()
            .child('users')
            .child(this.state.user_id)
            .update({
              photoURL: this.state.imageUrl,
            }).then(() => {
              this.setState({ isLoading: false, imageUrl: '' })
            }
            );
        })
      })
    }
    catch (error) {
      console.log(error)
    }

    return;
  }

  userpic = () => {
    if (this.state.userPic != "") {
      return <TouchableOpacity onPress={() => this.pickImage()} style={{ flex: 2, marginLeft: 60 }}>
        <Image source={{ uri: this.state.userPic }} style={styles.image} resizeMode="center" />
      </TouchableOpacity>
    }
    else {
      return <Avatar
        size={180}
        rounded
        icon={{ name: 'user', type: 'font-awesome' }}
        onPress={() => { this.pickImage() }}
        activeOpacity={0.7}
        containerStyle={{ flex: 2, marginLeft: 60 }} />
    }
  }

  // Occurs when signout is pressed...
  onSignoutPress = () => {
    firebase.auth().signOut();
    this.props.navigation.replace('LoginScreen')
  }

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Changes user's password...
  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(this.state.newPassword).then(() => {
        Alert.alert("Password was changed");
      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
  }

  onBackToHomePress = () => {
    var navActions = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Learn" })]
    });
    this.props.navigation.dispatch(navActions);
  }

  // Changes user's email...
  onChangeEmailPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(this.state.newEmail).then(() => {
        Alert.alert("Email was changed");
      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
  }
  render() {
    return (
      <ScrollView style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.container}>
          <View style={styles.imgprofile}>
            <Image
              source={require("../../assets/splash.png")}
              style={{ width: 250, height: 135 }}
            /></View>
          {this.userpic()}
          {/* <Image source={require("../../assets/pro.jpg")} style={styles.image} resizeMode="center"></Image> */}
          {/* </View> */}
          {/* <Button title="Sign out" onPress={this.onSignoutPress} /> */}

          <TextInput style={styles.textInput} value={this.state.currentPassword}
            placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
            onChangeText={(text) => { this.setState({ currentPassword: text }) }}
          />

          <TextInput style={styles.textInput} value={this.state.newPassword}
            placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
            onChangeText={(text) => { this.setState({ newPassword: text }) }}
          />
          <View style={{ padding: 15 }}>
            <Button type="outline"
              icon={
                <Icon
                  name="save"
                  size={30}
                  color="pink" />} title=" Password" onPress={this.onChangePasswordPress} />
          </View>
          <View style={{ padding: 60 }}>
            <Button type="outline"
              icon={
                <Icon
                  name="home"
                  size={30}
                  color="pink" />} title=" " onPress={this.onBackToHomePress} /></View>
          <View style={{ padding: 10 }}>
            <Button type="outline"
              icon={
                <Icon
                  name="sign-out"
                  size={30}
                  color="pink" />} title=" SignOut" onPress={this.onSignoutPress} />
          </View>
        </View>

        <Spinner visible={this.state.isLoading} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",

  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },

  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 15,
    padding: 10,
    width: 300,
    height: 40,
    alignSelf: "stretch",
    fontSize: 18,
  },
  imgprofile: {
    alignContent: "center",
    marginLeft: 45,
    top: 100
  },
  image: {
    flex: 1,
    height: 180,
    width: 180,
    resizeMode: "cover",
    borderRadius: 100,
    backgroundColor: "#FF5350",
  },

});

// import React,{ useState } from 'react';
// import { View, Text,Platform, TextInput,Button, StyleSheet ,SafeAreaView,ScrollView,Image ,TouchableOpacity, Alert} from 'react-native';
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import { AntDesign } from '@expo/vector-icons';
// import * as Animatable from 'react-native-animatable';
// // MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);
// const ProfileScreen = (navigation) => {
//   const [selectedValue_role, setSelectedValue_role] = useState();
//     const [data, setData] = React.useState({
//         email: '',
//         password: '',
//         confirm_password: '',
//         check_textInputChange: false,
//         secureTextEntry: true,
//         confirm_secureTextEntry: true,
//     });

//     const textInputChange = (val) => {
//         if( val.length !== 0 ) {
//             setData({
//                 ...data,
//                 email: val,
//                 check_textInputChange: true
//             });
//         } else {
//             setData({
//                 ...data,
//                 email: val,
//                 check_textInputChange: false
//             });
//         }
//     }

//     const handlePasswordChange = (val) => {
//         setData({
//             ...data,
//             password: val
//         });
//     }

//     const handleConfirmPasswordChange = (val) => {
//         setData({
//             ...data,
//             confirm_password: val
//         });
//     }

//     const updateSecureTextEntry = () => {
//         setData({
//             ...data,
//             secureTextEntry: !data.secureTextEntry
//         });
//     }

//     const updateConfirmSecureTextEntry = () => {
//         setData({
//             ...data,
//             confirm_secureTextEntry: !data.confirm_secureTextEntry
//         });
//     }


//     return (
//       <SafeAreaView style={styles.container}>
//           <View style={styles.header}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 {/* <View style={styles.titleBar}>
//                     <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons> 
//                 </View> */}

//                 <View style={{ alignSelf: "center" }}>
//                     <View style={styles.imgprofile}>
//                         <Image source={require("../../assets/pro.jpg")} style={styles.image} resizeMode="center"></Image>
//                     </View>

//                     {/* <View style={styles.active}></View> */}

//                     <TouchableOpacity style={styles.add}
//       onPress={() => Alert.alert('เพิ่มรูปยังไง')}> 
//         <Ionicons name="ios-add" size={25} color="pink"></Ionicons>
//     </TouchableOpacity> 


//                 </View>
//                 <SafeAreaView style={styles.container}>
//                 <ScrollView>
//               <Text style={styles.text_footer}>ชื่อ-นามสกุล</Text>
//               <View style={styles.action}>

//                   <AntDesign name="user" size={25} color="#fff" />
//                   <TextInput 
//                       placeholder="แก้ไขชื่อ-นามสกุล"
//                       style={styles.textInput}
//                       autoCapitalize="none"
//                       onChangeText={(val) => textInputChange(val)}
//                   />
//                   {data.check_textInputChange ? 
//                   <Animatable.View
//                       animation="bounceIn"
//                   >
//                       <Feather 
//                           name="check-circle"
//                           color="blue"
//                           size={20}
//                       />
//                   </Animatable.View>
//                   : null}
//               </View>

//               <Text style={[styles.text_footer, {
//                   marginTop: 35
//               }]}>email</Text>

//               <View style={styles.action}>
//                   <AntDesign name="mail" size={25} color="#fff" />
//                   <TextInput 
//                       placeholder="แก้ไข email.."
//                       style={styles.textInput}
//                       autoCapitalize="none"
//                       onChangeText={(val) => textInputChange(val)}
//                   />
//                   {data.check_textInputChange ? 
//                   <Animatable.View
//                       animation="bounceIn"
//                   >
//                       <Feather 
//                           name="check-circle"
//                           color="blue"
//                           size={20}
//                       />
//                   </Animatable.View>
//                   : null}
//               </View>






//               <View style={styles.button}>
//                   <TouchableOpacity
//                       style={[styles.signIn,{backgroundColor: "orange"}]}
//                       onPress={() => {}}>

//                       <Text style={[{color:'#fff'}]}>บันทึก</Text>

//                   </TouchableOpacity>


//               </View>
//               </ScrollView>
//               </SafeAreaView>
//             </ScrollView>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       backgroundColor: "pink"
//   },
// //   header:{
// //     backgroundColor: "#00BFFF",
// //     height:200,
// //   },
//   text: {
//       fontFamily: "HelveticaNeue",
//       color: "#52575D"
//   },
//   image: {
//       flex: 1,
//       height: undefined,
//       width: undefined
//   },
//   titleBar: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       marginTop: 24,
//       marginHorizontal: 16
//   },
//   imgprofile: {
//       margin: 30,
//       width: 150,
//       height: 150,
//       borderRadius: 100,
//       overflow: "hidden"
//   },
// //   active: {
// //       backgroundColor: "#34FFB9",
// //       position: "absolute",
// //       bottom: 28,
// //       left: 10,
// //       padding: 4,
// //       height: 20,
// //       width: 20,
// //       borderRadius: 10
// //   },
//   add: {
//       backgroundColor: "#fff",
//       position: "absolute",
//       bottom: 0,
//       right: 0,
//       width: 60,
//       height: 60,
//       borderRadius: 30,
//       alignItems: "center",
//       justifyContent: "center"
//   },
// footer: {
//     flex: 3,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 30
// },
// text_footer: {
//     color: 'black',
//     fontSize: 18
// },
// action: {
//     flexDirection: 'row',
//     marginTop: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f2f2f2',
//     paddingBottom: 5
// },
// actionError: {
//     flexDirection: 'row',
//     marginTop: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#FF0000',
//     paddingBottom: 5
// },
// textInput: {
//     flex: 1,
//     marginTop: Platform.OS === 'ios' ? 0 : -12,
//     paddingLeft: 10,
//     color: '#000',
// },
// button: {
//     alignItems: 'center',
//     marginTop: 50
// },
// signIn: {
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10
// },

// });