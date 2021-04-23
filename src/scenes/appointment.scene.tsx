import React from 'react';
import { AppLayout } from 'layout';
import { AppointmentContainer } from 'pods/appointment';

export const MenuScene: React.FC = () => {
  return (
    <AppLayout>
      <AppointmentContainer />
    </AppLayout>
  );
};
