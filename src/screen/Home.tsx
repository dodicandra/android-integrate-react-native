import React, {useCallback, useEffect, useRef, useState, FC} from 'react';

import {GestureResponderEvent, Keyboard, ScrollView, View} from 'react-native';

import Chat from '#components/Chat';
import Input from '#components/Input';
import Modal from '#components/Modal';
import ScreenContainer from '#components/ScreenContainer';
import {useAuth} from '#context/Auth';
import {useAdmin, useGetMessage} from '#utils/hooks';
import {PickImage} from '#utils/pickimage';

type Input = {
  content?: string;
  image?: string | null;
};

const Home: FC = () => {
  const {
    user: {username},
  } = useAuth();

  const [chat, setChat] = useState<Input>({
    content: '',
    image: null,
  });
  const ref = useRef<ScrollView>(null);
  const disable = chat.image?.length ? false : !chat.content?.length ? true : false;

  const onType = useCallback((text: string) => setChat({...chat, content: text}), []);

  const onCancelImage = useCallback(() => setChat({...chat, image: null}), []);

  const pickImage = async () => {
    try {
      const result = await PickImage();
      setChat({...chat, image: result.data!});
    } catch (err) {
      console.log(err);
    }
  };

  const {loading, data} = useAdmin();

  const {state, sendMessage, loadingOnsend} = useGetMessage({
    onSucess: () => setChat({...chat, content: '', image: null}),
    adminName: data?.username,
  });

  const submit = async (e: GestureResponderEvent) => {
    e.preventDefault();
    sendMessage({variables: {content: chat.content, to: data.username!, image: chat.image}});
  };

  const hideKeyboard = () => ref.current?.scrollToEnd();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', hideKeyboard);

    return () => {
      Keyboard.addListener('keyboardDidHide', hideKeyboard);
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        contentContainerStyle={{padding: 20}}
        onContentSizeChange={() => ref.current?.scrollToEnd()}
        ref={ref}
        style={{flex: 1}}
        indicatorStyle="white"
      >
        {state?.message?.map((chat) => (
          <Chat user={username!} key={chat.uuid} chat={chat} />
        ))}
      </ScrollView>
      <Input
        loading={loadingOnsend}
        imageChat={chat.image}
        disable={disable}
        value={chat.content}
        onSendImage={pickImage}
        onSend={submit}
        onType={onType}
        onImageCancel={onCancelImage}
      />
      <Modal visible={loading} />
    </View>
  );
};

export default ScreenContainer('#03ACD2')(Home);
