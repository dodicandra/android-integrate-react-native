import React, {memo, useState} from 'react';

import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

import Header from '@components/Header';
import ImageChat from '@components/ImageChat';
import {dataChat, IMessage} from '@dumy/data';

interface Props {}

const Home = (props: Props) => {
  const [msg, setMsg] = useState(dataChat);
  const [name, setName] = useState('');
  const onSend = (newMessages: IMessage[] = []) => {
    setMsg(GiftedChat.append(msg, newMessages));
    const n = newMessages.map((el) => el.text)[0];
    setName(n);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header name={name} />
      <View style={{flex: 1}}>
        <GiftedChat
          onSend={onSend}
          messages={msg}
          user={{name: 'dodi', _id: 1, avatar: 'https://source.unsplash.com/random'}}
          scrollToBottom
          renderMessageImage={(props) => <ImageChat src={{uri: ''}} />}
          placeholder="Tulis pesan..."
          imageProps={{
            showUserAvatar: true,
            key: 'images',
            position: 'left',
            user: {
              _id: 1,
              name: 'dodi',
            },
          }}
        />
      </View>
    </View>
  );
};

export default memo(Home);
