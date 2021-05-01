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
  // Iniciamos una variable para el id del tratamiento a 0
  const [idTreatment, setIdTreatment] = useState<number>(0);
  // Creamos una variable a false para el alert
  const [open, setOpen] = useState(false);
  // Guardamos el token del context
  const { token } = useContext(SessionContext);
  // Creamos un array de tratamientos vacío
  const [treatments, setTreatments] = useState<TreatmentVM[]>([]);
  // Guardamos el historial
  const history = useHistory();

  const onLoadTreatmentList = async () => {
    try {
      // Cargamos la lista de tratamientos
      const apiTreatmentList = await getTreatmentList(token);
      // Y la mapeamos del modelo de api al viewmodel
      const viewModelTreatmentList = mapTreatmentListFromApiToVm(apiTreatmentList);
      // Y actualizamos la lista
      setTreatments(viewModelTreatmentList);
    } catch (error) {
      console.error(error);
    }
  };
  // Función para volver al menú si se pincha el botón
  const handleBack = () => {
    history.push(AuthRoutes.menu);
  };
  // función que se ejecuta cuando se borra un tratamiento
  const handleDelete = async (id: number) => {
    // Muestra el prompt personalizado para preguntar si queremos borrarlo
    setOpen(true);
    // Actualiza el id del tratamiento
    setIdTreatment(id);
  };
  // Función que se ejecuta cuando confirmamos que queremos borrarlo
  const confirmDelete = async () => {
    // Mandamos al delete de la api el id para borrarlo
    const isDeleted = await deleteTreatment(idTreatment, token);
    // Si devuelve true volvemos a cargar la lista sino no hacemos nada
    isDeleted ? onLoadTreatmentList() : null;
  }
  // Función que se ejecuta cuando si pincha en el botón edit y llama al componente pasándole el id
  const handleEdit = (id: string) => {
    // Se usa generatePath para crear la ruta y evitar caracteres extraños
    history.push(generatePath(AuthRoutes.treatment, { id }));
  };
  // Función que se ejecuta cuando si pincha en el botón create y llama al componente pasándole el id
  const handleCreate = (id: string) => {
    history.push(generatePath(AuthRoutes.treatment, { id }));
  }

  useEffect(() => {
    // Cargamos la lista cuando se pinta el componente
    onLoadTreatmentList();
  }, []);
  // Llamamos al componente pasándale las props necesarias
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
