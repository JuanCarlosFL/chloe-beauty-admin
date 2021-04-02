import React from 'react';
import { CutomerListContainer } from 'pods/customer-list';
import { AppLayout } from 'layout';

export const CustomerListScene: React.FC = () => {
  return (
    <AppLayout>
      <CutomerListContainer />
    </AppLayout>
  );
};
