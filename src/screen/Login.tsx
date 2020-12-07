import React, {memo, useEffect, useState} from 'react';

import {Image, NativeSyntheticEvent, NativeTouchEvent, StyleSheet, Text, View} from 'react-native';

import {useLazyQuery} from '@apollo/client';

import Button from '#components/Button';
import TypoGrapy from '#components/TypoGrapy';
import {useAuth} from '#context/Auth';
import {LOGIN} from '#GQl/gql';
import {LoginAction, LoginData} from '#typing/apollo';
import {setToLocal} from '#utils/localstorage';

const oke = require('../assets/oke.png');

interface Props {}

const Login = (props: Props) => {
  const [values, setValues] = useState({username: 'bons padang', password: '123123'});
  const {setAuth} = useAuth();
  const [load, setLoad] = useState(true);
  const [loginuser] = useLazyQuery<LoginData, LoginAction>(LOGIN, {
    onCompleted: async (data) => {
      await setToLocal('token', data.login.token);
      setAuth(data.login.token);
    },
    onError: (e) => {
      console.log('error', e?.graphQLErrors[0]);
    },
  });

  const loginaction = (ev: NativeSyntheticEvent<NativeTouchEvent>) => {
    ev.preventDefault();
    loginuser({variables: values});
  };

  useEffect(() => {
    const preview = setTimeout(() => {
      setLoad(false);
    }, 500);

    return () => {
      setLoad(false);
      clearTimeout(preview);
    };
  }, []);

  if (load) return <View />;

  return (
    <View style={styles.root}>
      <TypoGrapy text="Konfirmasi Akunmu dulu yaa..." />
      <Image source={oke} resizeMode="contain" style={{width: 200, height: 300, marginBottom: 20}} />
      <Button textSize={25} title="OK" onPress={loginaction} />
    </View>
  );
};

export default memo(Login);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
