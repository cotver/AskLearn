import React, {useEffect} from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Post from "./components/post";
//import {useSelector} from 'react-redux'


const AskScreen = ({ navigation }) => {

  //const token = useSelector((state) => state.Authorize.token)
  //useEffect(() => {
//
  //}, [])
  
  const initData = [
    {
      id:"1",
      user:"Username",
      type:{
        image:"image",
        text:"Hi"
      },
      date: "50m",
      like:true
    },
    {
      id: "2",
      user: "Username",
      type: {
        image: "image",
        text:
          "55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555",
      },
      date: "50m",
      like:true
    },
    {
      id: "3",
      user: "Username",
      type: {
        image: "",
        text: 'Hello',
      },
      date: "50m",
      like:false
    },
  ]

  // useEffect(() =>{
  //   fetch("http://364edd12ecf8.ngrok.io/register/student")
  //     .then((response) => response.json())
  //     .then((json) => console.log(json))
  // }, [])

  // const addPost = (title) => {
  //   const newPost = { id, title, like: 0 };
  //   setPosts([newPost, ...posts]);
  //   id += 1;
  // };

  // const likePost = (id, status) => {
  //   const likePost = posts.filter((value) => id == value.id);
  //   const allPost = posts.filter((value) => id != value.id);
  //   if (status) {
  //     likePost[0].like -= 1;
  //   } else {
  //     likePost[0].like += 1;
  //   }
  //   allPost.push(...likePost);
  //   const allPostSorted = allPost.sort((a, b) => b.id - a.id);
  //   setPosts([...allPostSorted]);
  // };

  const renderPostItem = ({ item }) => {
    if (item.id == "1") {
      return (
          <Post
            key={item.id}
            id={item.id}
            type={item.type}
            like={item.like}
            date={item.date}
            user={item.user}
          />
      );
    } else {
      return (
        <Post
          key={item.id}
          id={item.id}
          type={item.type}
          like={item.like}
          date={item.date}
          user={item.user}
        />
      );
    }
  };

  return (
    <View >
      <FlatList
        data={initData}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};


export default AskScreen;
