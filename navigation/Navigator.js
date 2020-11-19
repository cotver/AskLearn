import React from 'react';
import {Image} from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Base from '../screens/auth/Base';
import LoginPage from '../screens/auth/Login';
import RegisterPage from '../screens/auth/Register';

import courseScreen from '../screens/learn/Course';
import subjectScreen from '../screens/learn/Subject';
import AskScreen from '../screens/learn/Ask';
import ProfileScreen from '../screens/editPro/Profile';
// import editProScreen from '../screens/editPro/edit';


const AskLearn = createMaterialTopTabNavigator({
  Lesson: {
    screen: subjectScreen,
  },
  Ask: {
    screen: AskScreen,
  },
  Quiz: {
    screen: subjectScreen,
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

        headerRight: () => (
          <HeaderButtons>
            <Item
              title='Menu'
              IconComponent={Ionicons}
              iconSize={30}
              iconName='ios-notifications-outline'
              color='gray' //{isnotification?'red' :'gray'}
            //onPress = {()=>{
            //  
            //}}
            />
          </HeaderButtons>
        ),
      },
    },
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
      screen: AskLearnNavigator,
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
// const editProNavigator = createStackNavigator(
//   {
//     editPro: {screen: editProScreen},    
//   },
// );


const MainNavigator = createDrawerNavigator(
  {
    AskLearn: { screen: bottomNavigator },
    EditProfile: { screen: ProfileScreen },
    // editPro: { screen: editProScreen },
  },
  { contentOptions: { activeTintColor: 'pink' } }
);

const AuthenNavigator = createStackNavigator(
  {
    Main: { screen: Base },
    LoginScreen: { screen: LoginPage },
    RegisterScreen: { screen: RegisterPage },
    Learn: { screen: MainNavigator }

  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "pink", },
      headerTintColor: "black",
    },
  }
);



//const FavNavigator = createStackNavigator(
//  {
//    Favorites: {screen: FavoritesScreen},
//    MealDetail: {screen: MealDetailScreen}, 
//  },
//  {
//    defaultNavigationOptions: {
//      headerStyle: { backgroundColor: "#4a148c", },
//      headerTintColor: "white",
//    }
//  },
//  );



//const FiltersNavigator = createStackNavigator(
//  {
//    Filters: {screen: FiltersScreen},    
//  },
//);





export default createAppContainer(MainNavigator);
