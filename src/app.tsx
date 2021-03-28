import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterComponent } from 'core/router';
import { CenteredLayout } from 'layout';
import { SessionProvider } from 'core/session-context';

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
