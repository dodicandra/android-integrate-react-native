import {useEffect, useReducer, useState} from 'react';

import {ToastAndroid} from 'react-native';

import {useLazyQuery, useMutation, useSubscription} from '@apollo/client';

import {GET_ADMIN, GET_MESSAGE, NEW_MSG, SEND_MSG} from '#GQl/gql';
import {IgetMsg, IGetAdmin, INewMsg, IUserData, SendMsgAction, SendMsgType} from '#typing/apollo';

import {setToLocal} from './localstorage';
import {reducer} from './reducer';

type UserGetMessage = {
  onSucess: () => void;
  adminName?: string;
};

export function useAsync(callback: () => void, deps: React.DependencyList) {
  useEffect(() => {
    callback();
  }, [deps]);
}

export function useGetMessage(params: UserGetMessage) {
  const [state, dispatch] = useReducer(reducer, {message: []});
  const [getMessage] = useLazyQuery<IgetMsg, {from: string}>(GET_MESSAGE, {
    onCompleted: (data) => {
      dispatch({type: 'ADD_MSG', payload: data.getMessages});
    },
  });

  const [sendMessage, {loading}] = useMutation<SendMsgAction, SendMsgType>(SEND_MSG, {
    onError: (e) => {
      console.log(e);
      ToastAndroid.show(e.message, 2000);
    },
    onCompleted: () => {
      params.onSucess();
    },
  });

  const {data: subs} = useSubscription<INewMsg>(NEW_MSG);

  useEffect(() => {
    if (subs) {
      dispatch({type: 'ADD_SINGLE_MSG', payload: subs.newMessage});
    }
  }, [subs]);

  useEffect(() => {
    console.log('getMSG');
    getMessage({variables: {from: params.adminName!}});
  }, [params.adminName]);

  return {
    state,
    sendMessage,
    loadingOnsend: loading,
  };
}

export const useAdmin = () => {
  const [state, setState] = useState<Partial<IUserData>>({});

  const [getAdmin, {loading}] = useLazyQuery<IGetAdmin>(GET_ADMIN, {
    onCompleted: async (value) => {
      const random = Math.floor(Math.random() * value.getAdmin.length);
      const admin = value.getAdmin[random];
      setState(admin);
      await setToLocal('admin', admin);
    },
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    console.log('getadmin');
    getAdmin();
  }, []);

  return {
    state,
    loading,
  };
};
