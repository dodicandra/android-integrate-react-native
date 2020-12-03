import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Home = (props) => {
  return (
    <View style={styles.root}>
      <Text>Hello RN</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
