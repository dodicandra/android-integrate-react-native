import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {}

const Home = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Halloo hahah</Text>
    </View>
  );
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
