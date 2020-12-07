import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Home from '#screen/Home';
import ImageChat from '#screen/ImageChat';
import Login from '#screen/Login';

const {Navigator, Screen} = createStackNavigator<StackChat>();

export const StackChat = () => {
  return (
    <Navigator headerMode="none" initialRouteName="Login" mode="modal">
      <Screen component={Home} name="Chat" />
      <Screen component={Login} name="Login" />
      <Screen component={ImageChat} name="Image" />
    </Navigator>
  );
};
