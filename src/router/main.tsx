import React from 'react';

import {Dimensions, Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import Home from '#screen/Home';
import ImageChat from '#screen/ImageChat';
import Login from '#screen/Login';

const {height} = Dimensions.get('window');

const bons = require('../assets/LOGOWP.webp');

const {Navigator, Screen} = createStackNavigator<StackChat>();

export const StackChat = () => {
  return (
    <Navigator initialRouteName="Login" mode="modal">
      <Screen options={{headerShown: false}} component={Login} name="Login" />
      <Screen options={{headerShown: false}} component={ImageChat} name="Image" />
      <Screen
        options={{
          title: 'Bons Indonesia',
          headerStyle: {
            backgroundColor: '#03ACD2',
            borderBottomEndRadius: 12,
            borderBottomStartRadius: 12,
            height: height * 0.1,
          },
          headerTitleStyle: {
            fontSize: 20,
            letterSpacing: 1.2,
            color: 'white',
            fontWeight: '700',
          },
        }}
        component={Home}
        name="Chat"
      />
    </Navigator>
  );
};
