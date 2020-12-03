import React from 'react';

import {View} from 'react-native';

import Chat from '@components/Chat';
import Header from '@components/Header';

interface Props {}

const Home = (props: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header />
      <Chat />
    </View>
  );
};

export default Home;
