import React from 'react';
import { TreatmentListContainer } from 'pods/treatment-list';
import { AppLayout } from 'layout';

export const TreatmentListScene: React.FC = () => {
  return (
    <AppLayout>
      <TreatmentListContainer />
    </AppLayout>
  );
};
