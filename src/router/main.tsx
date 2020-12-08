import React from 'react';

import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import Header from '#components/Header';
import Home from '#screen/Home';
import ImageChat from '#screen/ImageChat';
import Login from '#screen/Login';

const {Navigator, Screen} = createStackNavigator<StackChat>();

export const StackChat = () => {
  return (
    <Navigator initialRouteName="Login" mode="modal">
      <Screen options={{headerShown: false}} component={Login} name="Login" />
      <Screen options={{headerShown: false}} component={ImageChat} name="Image" />
      <Screen options={{header: () => <Header />}} component={Home} name="Chat" />
    </Navigator>
  );
};
