import React from "react";
import {
  StyleSheet,
  View,
  Image,
} from "react-native";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Questions from "./Questions";
import { NativeRouter, Link } from "react-router-native";
import { Ionicons } from "@expo/vector-icons";

export default class Quiz extends React.Component {
  render() {
    return (
      <NativeRouter>
      <View style={styles.container}>
        <Image
          source={require("../../assets/splash.png")}
          style={{ width: 200, height: 85 }}
        />
        <Button type="outline"
        icon={
          <Icon
            name="play-circle"
            size={50}
            color="pink"
          />
        }title="  Quiz คลายเครียด" onPress={() => this.props.navigation.navigate('Questions')}>
        </Button>
      </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#3498db",
    color: "white",
    padding: 10
  },

  paragraph: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    padding: 10,
    marginTop: 15,
    lineHeight: 25
  }
});