import React, {memo, FC} from 'react';

import {
  useWindowDimensions, Image, NativeModules,
  StyleSheet, Text, ToastAndroid,
  TouchableOpacity, View
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Message} from '#typing/apollo';
import {getDate, getTime} from '#utils/Day';

const {RNCClipboard} = NativeModules;

interface Props {
  chat: Message;
  user: string;
}

const Chat: FC<Props> = ({chat, user}) => {
  const {width} = useWindowDimensions();
  const curenuser = chat.from === user;
  const navigate = useNavigation();
  const date = getDate(chat.createdAt!);

  const onCopy = () => {
    RNCClipboard.setString(chat.content);
    ToastAndroid.showWithGravity('text copied', 200, ToastAndroid.CENTER);
  };

  return chat.image?.length ? (
    <View style={{paddingVertical: 5, marginVertical: 16}}>
      <TouchableOpacity
        onPress={() => navigate.navigate('Image', {image: `data:image/jpeg;base64,${chat.image}`})}
        style={[
          {
            alignSelf: !curenuser ? 'flex-start' : 'flex-end',
            borderBottomLeftRadius: !curenuser ? 0 : 9,
            borderBottomRightRadius: curenuser ? 0 : 9,
            maxWidth: width * 0.8,
            borderRadius: 12,
            overflow: 'hidden',
          },
        ]}
      >
        <Image source={{uri: `data:image/jpeg;base64,${chat.image}`}} style={styles.image} />
      </TouchableOpacity>
      <Text style={[styles.date, {alignSelf: !curenuser ? 'flex-start' : 'flex-end'}]}>{date}</Text>
    </View>
  ) : (
    <View style={{paddingVertical: 5}}>
      <TouchableOpacity
        onLongPress={onCopy}
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
        <Text style={{color: !curenuser ? 'white' : '#dedede'}}>{getTime(chat.createdAt!)}</Text>
      </TouchableOpacity>
      <Text style={[styles.date, {alignSelf: !curenuser ? 'flex-start' : 'flex-end'}]}>{date}</Text>
    </View>
  );
};

export default memo(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 9,
    marginVertical: 7,
    elevation: 1,
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
  image: {width: 200, height: 200},
  date: {color: '#404040', position: 'absolute', fontSize: 8, bottom: -10},
});
