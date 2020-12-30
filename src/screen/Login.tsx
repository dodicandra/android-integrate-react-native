import React, {useCallback, useEffect, useState, FC} from 'react';

import {ActivityIndicator, BackHandler, Image, NativeModules, StyleSheet, ToastAndroid, View} from 'react-native';
import crypto from 'react-native-crypto-js';

import {useLazyQuery} from '@apollo/client';
import messaging from '@react-native-firebase/messaging';

import ScreenContainer from '#components/ScreenContainer';
import TypoGrapy from '#components/TypoGrapy';
import {useAuth} from '#context/Auth';
import {LOGIN_OR_CREATE} from '#GQl/gql';
import {LoginAction, LoginOrCreateData} from '#typing/apollo';
import {setToLocal} from '#utils/localstorage';

const oke = require('../assets/oke.png');

const Login: FC = () => {
  const enc = crypto.AES.encrypt('123123', 'tes123').toString();
  const [values, setValues] = useState({
    username: 'dodi',
    password: '123123',
    email: 'dodi@gmai.com',
    phone: '0812312323',
    id: `${Math.random() * 120123}asdnawekrbyq2387asdf`,
  });
  const {setAuth} = useAuth();
  const [load, setLoad] = useState(true);

  const [loginuser] = useLazyQuery<LoginOrCreateData, LoginAction>(LOGIN_OR_CREATE, {
    onCompleted: async (data) => {
      const value = data.loginOrCreate;
      await setToLocal('user', value);
      setAuth(value);
      setLoad(false);
    },
    onError: (e) => {
      ToastAndroid.show('Oops.. Terjadi Kesalahan', 3000);
      BackHandler.exitApp();
      console.log(e);
    },
  });

  const loginaction = async (token: string) => {
    loginuser({variables: {...values, token}});
  };

  useEffect(() => {
    messaging()
      .getToken()
      .then(async (res) => {
        await loginaction(res);
      });
  }, []);

  if (load) return <View />;

  return (
    <View style={styles.root}>
      <Image source={oke} resizeMode="contain" style={{width: 200, height: 300, marginBottom: 20}} />
      <ActivityIndicator size={40} color="#03ACD2" />
      <TypoGrapy text="Loading..." />
    </View>
  );
};

export default ScreenContainer()(Login);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
