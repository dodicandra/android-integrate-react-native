import React, {memo, useEffect, useReducer, useRef, useState} from 'react';

import {gql, useLazyQuery, useSubscription} from '@apollo/client';

import {ScrollView, Text, View} from 'react-native';

import Chat from '#components/Chat';
import Header from '#components/Header';
import Input from '#components/Input';
import {IgetMsg, INewMsg} from '#typing/apollo';
import {reducer} from '#utils/reducer';

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

const GET_ADMIN = gql`
  query {
    getAdmin {
      username
      createdAt
      imageUrl
      role
    }
  }
`;

const GET_MESSAGE = gql`
  query getMessage($from: String!) {
    getMessages(from: $from) {
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
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, {message: []});
  const {data} = useSubscription<INewMsg>(NEW_MSG, {fetchPolicy: 'network-only'});
  const ref = useRef<ScrollView>(null);

  const [getMessage] = useLazyQuery<IgetMsg, {from: string}>(GET_MESSAGE, {
    onCompleted: (data) => {
      dispatch({type: 'ADD_MSG', payload: data.getMessages});
      console.log(data);
    },
  });

  useEffect(() => {
    const curenmsg = state.message[state.message.length - 1]?.content !== data?.newMessage?.content;
    if (data && curenmsg) {
      dispatch({type: 'ADD_SINGLE_MSG', payload: data.newMessage});
    }
  }, [data]);

  useEffect(() => {
    getMessage({variables: {from: 'dodi'}});
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header name={name} />
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{padding: 20}}
          onContentSizeChange={() => ref.current?.scrollToEnd()}
          ref={ref}
          style={{flex: 1}}
        >
          {state.message.map((chat) => (
            <Chat key={chat.uuid} chat={chat} />
          ))}
        </ScrollView>
      </View>
      <Input />
    </View>
  );
};

export default memo(Home);
