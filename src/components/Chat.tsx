import React, {memo, FC} from 'react';

import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Message} from '#typing/apollo';

interface Props {
  chat: Message;
}

let user = 'bons padang';

const Chat: FC<Props> = ({chat}) => {
  const curenuser = chat.from === user;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          alignSelf: curenuser ? 'flex-start' : 'flex-end',
          borderBottomLeftRadius: curenuser ? 0 : 7,
          borderBottomRightRadius: !curenuser ? 0 : 7,
          backgroundColor: curenuser ? '#03ACD2' : 'white',
        },
      ]}
    >
      <Text style={[styles.hello, {color: curenuser ? 'white' : 'black'}]}>{chat.content}</Text>
    </TouchableOpacity>
  );
};

export default memo(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 230,
    borderRadius: 7,
    marginVertical: 7,
    elevation: 5,
  },
  hello: {
    fontSize: 17,
    letterSpacing: 1.2,
    lineHeight: 18,
    textAlign: 'left',
    margin: 10,
    color: 'black',
  },
});
