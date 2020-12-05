import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Home from '#screen/Home';
import Login from '#screen/Login';

const {Navigator, Screen} = createStackNavigator<StackChat>();

export const StackChat = () => {
  return (
    <Navigator headerMode="none" initialRouteName="Login">
      <Screen component={Login} name="Login" />
      <Screen component={Home} name="Chat" />
    </Navigator>
  );
};
