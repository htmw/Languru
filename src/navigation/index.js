import React, { useState } from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RecordScreen from '../screens/RecordScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BasicScreen from '../screens/BasicScreen';
import LifeScreen from '../screens/LifeScreen';
import WorkScreen from '../screens/WorkScreen';
import EducationScreen from '../screens/EducationScreen';
import HealthScreen from '../screens/HealthScreen';
import FoodScreen from '../screens/FoodScreen';
import QuotationScreen from '../screens/QuotationScreen';
import QuestionScreen from '../screens/QuestionScreen';
import ConversationScreen from '../screens/ConversationScreen';
import QuizScreen from '../screens/Quiz';
import { Auth } from 'aws-amplify';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export function TabNavigator({ route, navigation }) {
  console.log(route);
  const params = route.params.params;
  return (
        <Tab.Navigator
        initialRouteName = "Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            // console.log(route);
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Profile') {
              iconName = 'ios-person-circle';
            } else if (route.name === 'Training') {
              iconName = 'ios-recording';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
        >
           <Tab.Screen name='Home' component={HomeScreen} />
           <Tab.Screen name='Training' component={RecordScreenNavigator} />
           <Tab.Screen name='Profile' component={ProfileScreen} initialParams={{params}}/>
           <Tab.Screen name='Settings' component={SettingScreen}/>
        </Tab.Navigator>
   )
}

export function RecordScreenNavigator() {
  return (
    <Stack.Navigator initialRouteName = "Record" screenOptions={{headerShown: false}}>
      <Stack.Screen name='Record' component={RecordScreen}/>
      <Stack.Screen name="Basic" component={BasicScreen} />
      <Stack.Screen name="Life" component={LifeScreen} />
      <Stack.Screen name="Work" component={WorkScreen} />
      <Stack.Screen name="Education" component={EducationScreen} />
      <Stack.Screen name="Health" component={HealthScreen} />
      <Stack.Screen name="Food" component={FoodScreen} />
      <Stack.Screen name="Quotation" component={QuotationScreen} />
      <Stack.Screen name="Question" component={QuestionScreen} />
      <Stack.Screen name="Conversation" component={ConversationScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
}

export default Navigation;