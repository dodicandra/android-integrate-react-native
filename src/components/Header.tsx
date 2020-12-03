import React from 'react';

import {Dimensions, StyleSheet, Text, View} from 'react-native';

const {width, height} = Dimensions.get('window');

interface Props {}

const Header = (props: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Header</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'blue',
    width,
    height: height * 0.07,
    justifyContent: 'center',
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    letterSpacing: 1.2,
    color: 'white',
  },
});
