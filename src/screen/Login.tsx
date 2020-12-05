import React, {memo, useEffect, useState} from 'react';

import {gql, useLazyQuery} from '@apollo/client';

import {Button, StyleSheet, Text, View} from 'react-native';

import {getToLocal, setToLocal} from '#utils/localstorage';
import {navigate} from '#utils/Rootnavigator';

interface Props {}

type LoginAction = {
  username: string;
  password: string;
};

type LoginData = {
  login: {
    username: string;
    token: string;
    email: string;
    role: string;
  };
};

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
  const [values, setValues] = useState({username: 'dodi', password: '123123'});
  const [load, setLoad] = useState(true);
  const [loginuser, {loading}] = useLazyQuery<LoginData, LoginAction>(LOGIN, {
    onCompleted: async (data) => {
      console.log(data);
      await setToLocal('token', data.login.token);
    },
    onError: (e) => {
      console.log('error', e?.graphQLErrors[0]?.extensions?.erros);
    },
  });

  const loginaction = () => {
    console.log('object');
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
      <Button title="login" onPress={() => loginaction()} />
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
