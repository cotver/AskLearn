import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView, TextInput, Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons';


class Post extends React.Component {
  state = {
    inputText: "",
    commentVisible: false,
  }

  image = this.props.image || undefined
  text = this.props.post

  initData = [
    {
      id: "1",
      text: "Hi",
      date: "50m",
    },
    {
      id: "2",
      text: "Hi",
      date: "50m",
    },
    {
      id: "3",
      text: "Hi",
      date: "50m",
    },
    {
      id: "4",
      text: "Hi",
      date: "50m",
    },
  ]
  comVisible = (stats) => {
    this.setState({ commentVisible: stats })
  }

  renderItem = (item, index) => {
    return (<View key={index} style={styles.comment}>
      <Text>{item.text}</Text>
    </View>
    )
  };

  renderpost = (image, text) => {
    return (
      <View style={{ paddingVertical: 5 }}>
        <Text>{text}</Text>
        {this.image && <Image source={{ uri: this.image }} style={{ maxWidth: "100%", width: Dimensions.get('window').width, height: Dimensions.get('window').width - 50 }} />}
      </View>
    )
  }

  render() {

    return (

      <View style={styles.Container}>
        <View style={styles.box}>
          <View>
            <Image
              source={require("../../../assets/icon.png")}
              style={styles.profile}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.user}>{this.props.user}</Text>
            </View>
          </View>
        </View>
        {this.renderpost(this.image, this.text)}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button}>
            <AntDesign
              name={this.props.like ? "heart" : "hearto"}
              size={24}
              color={this.props.like ? "#ff5350" : "#AAA"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { this.comVisible(true) }}>
            <AntDesign name="message1" size={24} color="black" />
          </TouchableOpacity>
        </View>


        <Modal
          visible={this.state.commentVisible}
          animationType="slide"
          onRequestClose={() => { this.comVisible(false) }}
        >
          <View style={styles.container1}>
            <TouchableOpacity
              style={styles.leftText}
              onPress={() => { this.comVisible(false) }}
            >
              <Text>{"Close"}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{"Comment"}</Text>
          </View>
          <View style={styles.container2}>
            <TextInput
              style={styles.input}
              value={this.state.inputText}
              placeholder={"Type something"}
              underlineColorAndroid="transparent"
              onChangeText={(input) => { this.setState({ inputText: input }) }}
              onSubmitEditing={(input) => { console.log(this.state.inputText), this.setState({ inputText: "" }) }}
            />
          </View>
          <ScrollView>{this.initData.map(this.renderItem)}</ScrollView>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "column",
    marginBottom: 20,
    marginHorizontal: 7,
    padding: 10,
    borderWidth: 1,
    borderBottomColor: "black",
    borderRadius: 20,
  },
  profile: {
    resizeMode: "cover",
    height: 47,
    width: 47,
    borderRadius: 50,
    backgroundColor: "#FF5350",
    marginRight: 10,
  },
  user: {
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
  },
  box: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  comment: {
    marginLeft: 20,
    paddingVertical: 20,
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  input: {
    flex: 1,
  },
  container2: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 20,
    height: 60,
  },
  container1: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '500',
  },
  leftText: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default Post;
