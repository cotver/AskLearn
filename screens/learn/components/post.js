import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from '@expo/vector-icons'; 


const Post = ({ type, date, like, id, user }) => {
  const image = type.image||undefined
  const text = type.text||undefined

  const postControl = (image, text) =>{
    if(image&&text){
      return (
        <View style={{ paddingVertical: 5 }}>
          <Text>{text}</Text>
          <Text></Text>
        </View>
      )
    }
    else if(image){
      return <Text></Text>
    }
    else if(text){
      return <Text>{text}</Text>
    }
  }

  return (
    <View style={styles.Container}>
      <View style={styles.boxIdentity}>
        <View>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.postImgProfile}
          />
        </View>
        <View style={{ justifyContent: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.postUsername}>{user}</Text>
            <Text>{date}</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, paddingVertical: 0 }}>
        {postControl(image, text)}
        <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity style={styles.likeButton}>
          <AntDesign
            name={like ? "heart" : "hearto"}
            size={24}
            color={like ? "#ff5350" : "#AAA"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeButton}>
          <AntDesign name="message1" size={24} color="black" />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 20,
    marginHorizontal: 7,
    padding: 10,
    borderWidth: 1,
    borderBottomColor:"black",
    borderRadius: 20,
  },
  postImgProfile: {
    resizeMode: "cover",
    height: 47,
    width: 47,
    borderRadius: 50,
    backgroundColor: "#FF5350",
    marginRight: 10,
  },
  postUsername: {
    fontWeight: "bold",
    marginRight: 10,
  },
  likeButton: {
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
  },
  boxIdentity: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
});

export default Post;
