import React, { useState } from 'react';
// El context es donde almacenamos los valores que son comunes a la aplicación y que podemos llamar desde cualquier componente
interface Context {
  login: string;
  token: string;
  role: string;
  updateLogin: (value: string) => void;
  updateToken: (value: string) => void;
  updateRole: (value: string) => void;
}
// Creamos el contexto con las variables y funciones para actualizar las variables que necesitamos
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
// En el componente lo primero es actualizar los valores de inicio
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
