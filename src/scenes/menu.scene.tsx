import React from 'react';
import { AppLayout } from 'layout';
import { MenuContainer } from 'pods/menu';

export const MenuScene: React.FC = () => {
  return (
    <AppLayout>
      <MenuContainer />
    </AppLayout>
  );
};
