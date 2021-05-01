import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterComponent } from 'core/router';
import { CenteredLayout } from 'layout';
import { SessionProvider } from 'core/session-context';
// Componente principal que pinta los componentes de CenteredLayout, SessionProvider y RouterComponent
const App: React.FunctionComponent = () => {
  return (
    <CenteredLayout>
      <SessionProvider>
        <RouterComponent />
      </SessionProvider>
    </CenteredLayout>
  );
};

export default hot(App);
