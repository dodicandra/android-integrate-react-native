import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {}

const Chat = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Chat</Text>
    </View>
  );
};

export default Chat;

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
