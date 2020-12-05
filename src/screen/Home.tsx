import React, {memo, useEffect, useState} from 'react';

import {gql, useSubscription} from '@apollo/client';

import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

import Header from '#components/Header';
import ImageChat from '#components/ImageChat';
import {dataChat} from '#dumy/data';
import {IMessage} from '#typing/message';

interface Props {}

const NEW_MSG = gql`
  subscription newMessage {
    newMessage {
      uuid
      content
      from
      to
      createdAt
      image
    }
  }
`;

const Home = (props: Props) => {
  const [msg, setMsg] = useState(dataChat);

  const {data, loading, error} = useSubscription(NEW_MSG);

  const [name, setName] = useState('');
  const onSend = (newMessages: IMessage[] = []) => {
    setMsg(GiftedChat.append(msg, newMessages));
    const n = newMessages.map((el) => el.text)[0];
    setName(n);
  };
  console.log(data, loading, error);

  useEffect(() => {}, [data]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header name={name} />
      <View style={{flex: 1}}>
        <GiftedChat
          onSend={onSend}
          messages={msg}
          showUserAvatar={false}
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
