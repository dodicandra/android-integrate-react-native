import React, {memo, FC} from 'react';

import {useWindowDimensions, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Message} from '#typing/apollo';

interface Props {
  chat: Message;
  user: string;
}

const Chat: FC<Props> = ({chat, user}) => {
  const {width} = useWindowDimensions();
  const curenuser = chat.from === user;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          alignSelf: !curenuser ? 'flex-start' : 'flex-end',
          borderBottomLeftRadius: !curenuser ? 0 : 9,
          borderBottomRightRadius: curenuser ? 0 : 9,
          backgroundColor: !curenuser ? '#03ACD2' : 'white',
          maxWidth: width * 0.8,
        },
      ]}
    >
      <Text style={[styles.hello, {color: !curenuser ? 'white' : 'black'}]}>{chat.content}</Text>
    </TouchableOpacity>
  );
};

export default memo(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 9,
    marginVertical: 7,
    elevation: 5,
    paddingHorizontal: 7,
    paddingVertical: 4,
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
