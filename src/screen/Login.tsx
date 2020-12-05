import React, {memo, useEffect, useState} from 'react';

import {gql, useLazyQuery} from '@apollo/client';

import {Button, NativeSyntheticEvent, NativeTouchEvent, StyleSheet, Text, View} from 'react-native';

import {LoginAction, LoginData} from '#typing/apollo';
import {getToLocal, setToLocal} from '#utils/localstorage';
import {navigate} from '#utils/Rootnavigator';

interface Props {}

const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
      email
      createdAt
    }
  }
`;

const Login = (props: Props) => {
  const [values, setValues] = useState({username: 'bons padang', password: '123123'});
  const [load, setLoad] = useState(true);
  const [loginuser, {loading}] = useLazyQuery<LoginData, LoginAction>(LOGIN, {
    onCompleted: async (data) => {
      console.log('com', data);
      await setToLocal('token', data.login.token);
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
    const getToken = async () => {
      const token = await getToLocal('token');
      console.log(token);
      setLoad(false);
      if (token) {
        navigate();
      } else {
        return;
      }
      return () => {
        setLoad(false);
      };
    };

    getToken();
  }, []);

  if (load) return <View />;

  return (
    <View style={styles.root}>
      <Text>Login</Text>
      <Button title="login" onPress={loginaction} />
    </View>
  );
};

export default memo(Login);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
