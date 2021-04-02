import React from 'react';
import { CustomerContainer } from 'pods/customer';
import { AppLayout } from 'layout';

export const CustomerScene: React.FC = () => {
  return (
    <AppLayout>
      <CustomerContainer />
    </AppLayout>
  );
};
