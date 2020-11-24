import React from 'react';
import {  Image } from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Base from '../screens/auth/Base';
import LoginPage from '../screens/auth/Login';
import RegisterPage from '../screens/auth/Register';
// import SettingPage from '../screens/SettingNav/setting';
import courseScreen from '../screens/learn/Course';
import subjectScreen from '../screens/learn/Subject';
import Questions from '../screens/learn/Questions';

import QuizScreen from '../screens/learn/QuizIndex';
import AskScreen from '../screens/learn/Ask';
import ProfileScreen from '../screens/editPro/Profile';
import PeopleScreen from '../screens/people';
// import editProScreen from '../screens/editPro/edit';


const AskLearn = createMaterialTopTabNavigator({
  Lesson: {
    screen: subjectScreen,
  },
  Ask: {
    screen: AskScreen,
  },
  Quiz: {
    screen: QuizScreen,
  },
},
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: 'white',
      style: {
        height: 56,
        backgroundColor: 'orange',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  },
)
const Header = createAppContainer(AskLearn)



const AskLearnNavigator = createStackNavigator(
  {

    CourseScreen: { screen: courseScreen },
    SubjectScreen: {
      screen: Header,
      navigationOptions: {

        headerTitle: () =>  (<Image style={{width:150, height:50}} source={require('../assets/icon.png')}/>),

      },
    },
    QuizScreen: { screen: QuizScreen,
      navigationOptions: {
        headerTitle: "Quizzes"
      }
    },
    Questions: {
      screen: Questions,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "pink", },
      headerTintColor: "black",
    },
  }
);

const PScreen = createStackNavigator(
  {
    Profile: {screen: PeopleScreen},    
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "pink", },
      headerTintColor: "black",
    },
  }
);


const bottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: AskLearnNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (<Ionicons name="ios-home" size={30} color="black" />);
        },
      },
    },
    Chat: {
      screen: AskLearnNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (<Ionicons name="ios-chatbubbles" size={30} color="black" />);
        },
      },
    },
    People: {
      screen: PScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (<Ionicons name="md-people" size={30} color="black" />);
        },
      },
    },
  },
  { tabBarOptions: { activeTintColor: 'pink', } }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: {screen: ProfileScreen},    
  },
);


// const SettingNavigator = createStackNavigator(
//   {
//     Setting: {screen: SettingPage},    
//   },
// );
// const editProNavigator = createStackNavigator(
//   {
//     editPro: {screen: editProScreen},    
//   },
// );


const MainNavigator = createDrawerNavigator(
  {
    AskLearn: { screen: bottomNavigator },
    ChangePassword: { screen: ProfileScreen },
    // Setting: {screen: SettingPage},
    
    // editPro: { screen: editProScreen },
  },
  { contentOptions: { activeTintColor: 'pink' } }
);

const AuthenNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginPage },
    RegisterScreen: { screen: RegisterPage },
    Learn: { screen: MainNavigator, navigationOptions: ({ navigation }) => ({
      headerShown: false
    }) }

  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "pink", },
      headerTintColor: "black",
    },
  }
);




export default createAppContainer(AuthenNavigator);
