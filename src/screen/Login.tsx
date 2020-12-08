import React, {useEffect, useState, FC} from 'react';

import {Image, NativeSyntheticEvent, NativeTouchEvent, StyleSheet, TextInput, View} from 'react-native';

import {useLazyQuery} from '@apollo/client';

import Button from '#components/Button';
import ScreenContainer from '#components/ScreenContainer';
import TypoGrapy from '#components/TypoGrapy';
import {useAuth} from '#context/Auth';
import {LOGON_OR_CREATE} from '#GQl/gql';
import {LoginAction, LoginOrCreateData} from '#typing/apollo';
import {setToLocal} from '#utils/localstorage';

const oke = require('../assets/oke.png');

const Login: FC = () => {
  const [values, setValues] = useState({username: 'bons padang', password: '123123', email: ''});
  const {setAuth} = useAuth();

  const [load, setLoad] = useState(true);
  const [loginuser] = useLazyQuery<LoginOrCreateData, LoginAction>(LOGON_OR_CREATE, {
    onCompleted: async (data) => {
      const value = data.loginOrCreate;
      await setToLocal('user', value);
      setAuth(value);
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
      <TextInput
        value={values.username}
        onChangeText={(text) => setValues({...values, username: text, email: text.replace(/\s+/g, '') + '@gmail.com'})}
      />
      <Button textSize={25} title="Lanjutkan" onPress={loginaction} />
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
