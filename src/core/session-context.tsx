import React, { useState } from 'react';

interface Context {
  login: string;
  token: string;
  role: string;
  updateLogin: (value: string) => void;
  updateToken: (value: string) => void;
  updateRole: (value: string) => void;
}

export const SessionContext = React.createContext<Context>({
  login: 'no user',
  token: 'no token',
  role: 'no role',
  updateLogin: value => {
    console.warn(
      'If you are reading this, likely you forgot to add the provider on top of your app'
    );
  },
  updateToken: value => {
    console.warn(
      'If you are reading this, likely you forgot to add the provider on top of your app'
    );
  },
  updateRole: value => {
    console.warn(
      'If you are reading this, likely you forgot to add the provider on top of your app'
    );
  },
});

export const SessionProvider: React.FC = props => {
  const [login, setLogin] = useState('');
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  return (
    <SessionContext.Provider
      value={{
        login,
        updateLogin: setLogin,
        token,
        updateToken: setToken,
        role,
        updateRole: setRole,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};
