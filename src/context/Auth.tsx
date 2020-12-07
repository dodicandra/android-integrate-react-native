import React, {createContext, useContext, useEffect, useState, FC} from 'react';

import {getToLocal} from '#utils/localstorage';
import {navigate} from '#utils/Rootnavigator';

type Auth = {
  token: string | null;
  setAuth: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const val = await getToLocal('token');
      setToken(val);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      navigate();
    }
  }, [token]);

  return <AuthContext.Provider value={{setAuth: setToken, token: token}}>{children}</AuthContext.Provider>;
};
