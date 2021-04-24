import React, { useContext, useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router';
import { TreatmentListComponent } from './treatment-list.component';
import { deleteTreatment, getTreatmentList } from './api';
import { mapTreatmentListFromApiToVm } from './treatment-list.mapper';
import { AuthRoutes } from 'core/auth';
import { TreatmentVM } from './treatment-list.vm';
import { SessionContext } from 'core/session-context';
import { AlertDialog } from 'common/components/prompt';

export const TreatmentListContainer: React.FC = () => {
  const [idTreatment, setIdTreatment] = useState<number>(0);
  const [open, setOpen] = useState(false);
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
    setOpen(true);
    setIdTreatment(id);
  };

  const confirmDelete = async () => {
    const isDeleted = await deleteTreatment(idTreatment, token);
    isDeleted ? onLoadTreatmentList() : null;
  }

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
    <>
      <TreatmentListComponent
        treatmentList={treatments}
        handleDelete={handleDelete}
        handleBack={handleBack}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
      />
      <AlertDialog  title="Borrar Tratamiento"
        open={open}
        setOpen={setOpen}
        onConfirm={confirmDelete}>
          ¿Seguro que quiere borrar este tratamiento?
      </AlertDialog>
    </>
  );
};
