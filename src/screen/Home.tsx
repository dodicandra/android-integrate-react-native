import React, {memo, useEffect, useReducer, useRef, useState} from 'react';

import {GestureResponderEvent, KeyboardAvoidingView, SafeAreaView, ScrollView} from 'react-native';

import {useLazyQuery, useMutation, useSubscription} from '@apollo/client';

import Chat from '#components/Chat';
import Header from '#components/Header';
import Input from '#components/Input';
import {GET_MESSAGE, NEW_MSG, SEND_MSG} from '#GQl/gql';
import {IgetMsg, INewMsg, SendMsgAction, SendMsgType} from '#typing/apollo';
import {PickImage} from '#utils/pickimage';
import {reducer} from '#utils/reducer';

interface Props {}

let user = 'bons padang';

const Home = (props: Props) => {
  const [name] = useState('');
  const [state, dispatch] = useReducer(reducer, {message: []});
  const [chat, setChat] = useState({
    content: '',
    image: '',
  });
  const {data} = useSubscription<INewMsg>(NEW_MSG);
  const ref = useRef<ScrollView>(null);
  const disable = chat.image.length ? false : !chat.content.length ? true : false;
  const [getMessage] = useLazyQuery<IgetMsg, {from: string}>(GET_MESSAGE, {
    onCompleted: (data) => {
      dispatch({type: 'ADD_MSG', payload: data.getMessages});
    },
  });

  const [sendMessage] = useMutation<SendMsgAction, SendMsgType>(SEND_MSG, {
    onError: (e) => console.log(e.networkError),
    onCompleted: () => {
      setChat({...chat, content: '', image: ''});
    },
  });
  const pickImage = async () => {
    try {
      const result = await PickImage();
      setChat({...chat, image: result.data!});
    } catch (err) {
      console.log(err);
    }
  };

  const submit = (e: GestureResponderEvent) => {
    e.preventDefault();

    sendMessage({variables: {content: chat.content, to: 'dodi', image: chat.image}});
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header name={name} />
      <KeyboardAvoidingView enabled behavior="height" style={{flex: 1}}>
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
        <Input
          imageChat={chat.image}
          disable={disable}
          value={chat.content}
          onSendImage={pickImage}
          onSend={submit}
          onType={(text) => setChat({...chat, content: text})}
          onImageCancel={() => setChat({...chat, image: ''})}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default memo(Home);
