import React, {useCallback, useEffect, useRef, useState, FC} from 'react';

import {
  ActivityIndicator,
  Alert,
  BackHandler,
  GestureResponderEvent,
  Keyboard,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';

import {useMutation} from '@apollo/client';
import messaging from '@react-native-firebase/messaging';

import AlertComponent from '#components/Alert';
import Chat from '#components/Chat';
import {HeaderLeft, HeaderRight} from '#components/Header';
import Input from '#components/Input';
import Modal from '#components/Modal';
import ScreenContainer from '#components/ScreenContainer';
import {useAuth} from '#context/Auth';
import {DELE_MESSAGE} from '#GQl/gql';
import {IDeleteMsgVar, IDeleMsgRes} from '#typing/apollo';
import {StackHome} from '#typing/navigation';
import {useAdmin, useGetMessage} from '#utils/hooks';
import {removeLocal} from '#utils/localstorage';
import {PickImage} from '#utils/pickimage';

type Input = {
  content?: string;
  image?: string | null;
};

const Home: FC<StackHome> = (props) => {
  const {
    user: {username},
  } = useAuth();

  const [chat, setChat] = useState<Input>({
    content: '',
    image: null,
  });

  const [hidden, setHidden] = useState(false);
  const {loading, data} = useAdmin();

  const ref = useRef<ScrollView>(null);
  const disable = chat.image?.length ? false : !chat.content?.length ? true : false;
  const onType = useCallback((text: string) => setChat({...chat, content: text}), []);
  const onCancelImage = useCallback(() => setChat({...chat, image: null}), []);
  const onHide = useCallback(() => {
    setHidden(!hidden);
  }, [hidden]);

  const pickImage = async () => {
    try {
      const result = await PickImage();
      setChat({...chat, image: result.data!});
    } catch (err) {
      console.log(err);
    }
  };

  const {state, sendMessage, loadingOnsend} = useGetMessage({
    onSucess: () => setChat({...chat, content: '', image: null}),
    adminName: data?.username,
    userName: username!,
  });

  const submit = async (e: GestureResponderEvent) => {
    e.preventDefault();
    sendMessage({variables: {content: chat.content, to: data.username!, image: chat.image}});
  };

  const scrollToEnd = () => ref.current?.scrollToEnd();

  const [deleMessage, {loading: loadingDelet}] = useMutation<IDeleMsgRes, IDeleteMsgVar>(DELE_MESSAGE, {
    onCompleted: async (val) => {
      await removeLocal('admin');
      setHidden(!hidden);
      BackHandler.exitApp();
    },
    onError: (err) => {
      ToastAndroid.showWithGravity('Oops, Terjadi Kesalahan', ToastAndroid.SHORT, ToastAndroid.CENTER);
      console.log(err.graphQLErrors[0].extensions);
    },
  });

  const deletAction = async (e: GestureResponderEvent) => {
    e.preventDefault();
    deleMessage({variables: {to: data.username!}});
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', scrollToEnd);

    return () => {
      Keyboard.addListener('keyboardDidHide', scrollToEnd);
    };
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (state?.message?.length ? <HeaderRight onPress={onHide} /> : null),
      headerLeft: () => <HeaderLeft />,
    });
  }, [state?.message?.length]);

  useEffect(() => {
    const subs = messaging().onMessage(async (res) => {
      const adminName = res.data?.admin === (await data.username);
      if (adminName) {
        Alert.alert('New Message');
      }
    });
    return () => {
      subs;
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        contentContainerStyle={{padding: 20}}
        onContentSizeChange={scrollToEnd}
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
      <Modal visible={loading}>
        <ActivityIndicator size={50} color="#03ACD2" />
      </Modal>
      <Modal visible={hidden} onRequestClose={onHide}>
        <AlertComponent loading={loadingDelet} onPressCancel={onHide} onPressOk={deletAction} />
      </Modal>
    </View>
  );
};

export default ScreenContainer('#03ACD2')(Home);
