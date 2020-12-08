import React, {memo, FC} from 'react';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {
  useWindowDimensions, GestureResponderEvent, Image,
  NativeModules, StyleSheet, Text,
  ToastAndroid, TouchableOpacity, View
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Message} from '#typing/apollo';
import {ImageScren} from '#typing/navigation';

import {BubleChat} from './BubleChat';

dayjs.extend(localizedFormat);
const {RNCClipboard} = NativeModules;

interface Props {
  chat: Message;
  user: string;
  loading: boolean;
}

export type ChildProps = {
  curenuser: boolean;
  width: number;
  onPress: (e: GestureResponderEvent) => void;
  chat: Message;
};

const ImageChats = memo(({curenuser, width, chat, onPress}: ChildProps) => {
  const date = dayjs(chat.createdAt).format('DD/MM/YY');
  const curentFlex = curenuser ? 'flex-end' : 'flex-start';
  return (
    <View style={{paddingVertical: 5, marginVertical: 16}}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            alignSelf: curentFlex,
            borderBottomLeftRadius: curenuser ? 9 : 0,
            borderBottomRightRadius: curenuser ? 0 : 9,
            maxWidth: width * 0.8,
            borderRadius: 12,
            overflow: 'hidden',
          },
        ]}
      >
        <Image source={{uri: `data:image/jpeg;base64,${chat.image}`}} style={styles.image} />
      </TouchableOpacity>
      <Text style={[styles.date, {alignSelf: curentFlex}]}>{date}</Text>
    </View>
  );
});

const Chat: FC<Props> = ({chat, user, loading}) => {
  const {width} = useWindowDimensions();
  const curenuser = chat.from === user;
  const navigate = useNavigation<ImageScren>();
  const onCopy = () => {
    RNCClipboard.setString(chat.content);
    ToastAndroid.showWithGravity('text copied', 200, ToastAndroid.CENTER);
  };

  return chat.image?.length ? (
    <ImageChats
      onPress={() => navigate.navigate('Image', {image: `data:image/jpeg;base64,${chat.image}`})}
      curenuser={curenuser}
      width={width}
      chat={chat}
    />
  ) : (
    <BubleChat onPress={onCopy} chat={chat} curenuser={curenuser} width={width} />
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
