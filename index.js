import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Home from './src/Home';

class HelloWorld extends React.Component {
  render() {
    return <Home />;
  }
}
var styles = StyleSheet.create({
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

AppRegistry.registerComponent('ReactNative', () => HelloWorld);
