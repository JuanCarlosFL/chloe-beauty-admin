import React from 'react';
import { LoyaltyListContainer } from 'pods/loyalty-list';
import { AppLayout } from 'layout';

export const LoyaltyListScene: React.FC = () => {
  return (
    <AppLayout>
      <LoyaltyListContainer />
    </AppLayout>
  );
};
