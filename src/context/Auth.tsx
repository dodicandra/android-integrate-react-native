import React, {createContext, useContext, useEffect, useState, FC} from 'react';

import {getToLocal} from '#utils/localstorage';
import {navigate} from '#utils/Rootnavigator';

type User = {
  token: string | null;
  username?: string;
};

type Auth = {
  user: User;
  setAuth: React.Dispatch<React.SetStateAction<User>>;
};

const AuthContext = createContext<Auth>({} as Auth);

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('not found context');
  }
  return ctx;
}

export const AuthProvider: FC = ({children}) => {
  const [user, setToken] = useState<User>({
    username: '',
    token: null,
  });

  useEffect(() => {
    const getToken = async () => {
      const val = await getToLocal('user');
      setToken(val!);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (user?.token) {
      navigate();
    }
  }, [user?.token]);

  return <AuthContext.Provider value={{setAuth: setToken, user}}>{children}</AuthContext.Provider>;
};
