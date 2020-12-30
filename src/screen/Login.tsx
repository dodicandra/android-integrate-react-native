import React, {useEffect, useState, FC} from 'react';

import {ActivityIndicator, BackHandler, Image, NativeModules, StyleSheet, ToastAndroid, View} from 'react-native';
import crypto from 'react-native-crypto-js';

import {useLazyQuery} from '@apollo/client';
import message from '@react-native-firebase/messaging';

import ScreenContainer from '#components/ScreenContainer';
import TypoGrapy from '#components/TypoGrapy';
import {useAuth} from '#context/Auth';
import {LOGIN_OR_CREATE} from '#GQl/gql';
import {LoginAction, LoginOrCreateData} from '#typing/apollo';
import {setToLocal} from '#utils/localstorage';

const {getUserId} = NativeModules;

const oke = require('../assets/oke.png');

const Login: FC = () => {
  const enc = crypto.AES.encrypt('123123', 'tes123').toString();
  const [values, setValues] = useState({username: 'dodi', password: '123123', email: 'dodi@gmai', token: ''});
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
      console.log('error', e?.graphQLErrors[0]);
    },
  });

  const loginaction = (token: string) => {
    loginuser({variables: {...values, token, phone: '08123123123'}});
  };

  useEffect(() => {
    getUserId.getData('', '', (val, e) => {
      setValues({...values, username: val, email: e});
    });
    message()
      .getToken()
      .then(async (res) => {
        setValues({...values, token: res});
        getUserId.getData('', '', (n, e, p, t) => {
          let em = e.split(' ').join('');
          console.log({n, e: em, p, t});
        });
        loginaction(res);
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
