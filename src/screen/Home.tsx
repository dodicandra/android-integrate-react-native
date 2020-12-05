import React, {memo, useEffect, useReducer, useRef, useState} from 'react';

import {gql, useLazyQuery, useMutation, useSubscription} from '@apollo/client';

import {GestureResponderEvent, ScrollView, Text, View} from 'react-native';

import Chat from '#components/Chat';
import Header from '#components/Header';
import Input from '#components/Input';
import {IgetMsg, INewMsg, Message, SendMsgAction} from '#typing/apollo';
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

const SEND_MSG = gql`
  mutation sendMessage($to: String!, $content: String, $image: String) {
    sendMessage(to: $to, content: $content, image: $image) {
      uuid
      content
      from
      to
      createdAt
    }
  }
`;

let user = 'bons padang';

const Home = (props: Props) => {
  const [name] = useState('');
  const [state, dispatch] = useReducer(reducer, {message: []});
  const [chat, setChat] = useState<Message>({
    content: '',
    from: '',
    image: '',
    to: '',
  });
  const {data} = useSubscription<INewMsg>(NEW_MSG, {fetchPolicy: 'network-only'});
  const ref = useRef<ScrollView>(null);

  const [getMessage] = useLazyQuery<IgetMsg, {from: string}>(GET_MESSAGE, {
    onCompleted: (data) => {
      dispatch({type: 'ADD_MSG', payload: data.getMessages});
    },
  });

  const [sendMessage] = useMutation<SendMsgAction>(SEND_MSG, {
    onError: (e) => console.log(e.networkError),
    onCompleted: () => {
      setChat({...chat, content: ''});
    },
  });

  const submit = (e: GestureResponderEvent) => {
    e.preventDefault();

    sendMessage({variables: {content: chat.content, to: 'dodi', image: null}});
  };

  useEffect(() => {
    if (data) {
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
            <Chat user="bons padang" key={chat.uuid} chat={chat} />
          ))}
        </ScrollView>
      </View>
      <Input value={chat.content} onSend={submit} onType={(text) => setChat({...chat, content: text})} />
    </View>
  );
};

export default memo(Home);
