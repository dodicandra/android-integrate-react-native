import Chat from '@components/Chat';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {}

const Home = (props: Props) => {
  return <Chat />;
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
