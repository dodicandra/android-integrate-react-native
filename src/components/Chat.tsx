import React, {FC} from 'react';

import {StyleSheet, Text, View} from 'react-native';

interface Props {
  count: number;
}

const Chat: FC<Props> = ({count}) => {
  console.log('chat');
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Chat {count}</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
});
