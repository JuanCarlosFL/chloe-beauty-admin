import React, { useContext, useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router';
import { TreatmentListComponent } from './treatment-list.component';
import { deleteTreatment, getTreatmentList } from './api';
import { mapTreatmentListFromApiToVm } from './treatment-list.mapper';
import { AuthRoutes } from 'core/auth';
import { TreatmentVM } from './treatment-list.vm';
import { SessionContext } from 'core/session-context';

export const TreatmentListContainer: React.FC = () => {
  const { token } = useContext(SessionContext);
  const [treatments, setTreatments] = useState<TreatmentVM[]>([]);
  const history = useHistory();

  const onLoadTreatmentList = async () => {
    try {
      const apiTreatmentList = await getTreatmentList(token);
      const viewModelTreatmentList = mapTreatmentListFromApiToVm(apiTreatmentList);
      setTreatments(viewModelTreatmentList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    history.push(AuthRoutes.menu);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = prompt(
        `¿Seguro que quieres borrar este tratamiento ${id}? (S/N)`
      );
      if (res === 'S') {
        const isDeleted = await deleteTreatment(id, token);
        isDeleted ? onLoadTreatmentList() : null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id: string) => {
    history.push(generatePath(AuthRoutes.treatment, { id }));
  };

  const handleCreate = (id: string) => {
    history.push(generatePath(AuthRoutes.treatment, { id }));
  }

  useEffect(() => {
    onLoadTreatmentList();
  }, []);

  return (
    <TreatmentListComponent
      treatmentList={treatments}
      handleDelete={handleDelete}
      handleBack={handleBack}
      handleEdit={handleEdit}
      handleCreate={handleCreate}
    />
  );
};
