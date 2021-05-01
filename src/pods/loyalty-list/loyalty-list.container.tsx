import { AuthRoutes } from 'core/auth';
import { SessionContext } from 'core/session-context';
import React, { useContext, useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router';
import { deleteLoyalty, getLoyaltyList } from './api/loyalty-list.api';
import { LoyaltyVM } from './loaylty-list.vm';
import { LoyaltyListComponent } from './loyalty-list.component';
import { mapLoyaltyListFromApiToVm } from './loyalty-list.mapper';
import { AlertDialog } from 'common/components/prompt';

export const LoyaltyListContainer: React.FC = () => {
  // Iniciamos una variable para el id de la oferta a 0
  const [idLoyalty, setIdLoyalty] = useState<number>(0);
  // Creamos una variable a false para el alert
  const [open, setOpen] = useState(false);
  // Guardamos el token del context
  const { token } = useContext(SessionContext);
  // Creamos un array de ofertas vacío
  const [loyalties, setLoyalties] = useState<LoyaltyVM[]>([]);
  // Guardamos el historial
  const history = useHistory();

  const onLoadLoyaltyList = async () => {
      try {
        // Cargamos la lista de ofertas
        const apiLoyaltyList = await getLoyaltyList(token);
        // Y la mapeamos del modelo de api al viewmodel
        const viewModelLoyaltyList = mapLoyaltyListFromApiToVm(apiLoyaltyList);
        // Y actualizamos la lista
        setLoyalties(viewModelLoyaltyList);
      } catch (error) {
        console.error(error);
      }
  };
  // Función para volver al menú si se pincha el botón
  const handleBack = () => {
      history.push(AuthRoutes.menu);
  };
  // función que se ejecuta cuando se borra una oferta
  const handleDelete = async (id: number) => {
    // Muestra el prompt personalizado para preguntar si queremos borrarlo
    setOpen(true);
    // Actualiza el id de la oferta
    setIdLoyalty(id);
  };
  // Función que se ejecuta cuando confirmamos que queremos borrarlo
  const confirmDelete = async () => {
    // Mandamos al delete de la api el id para borrarlo
    const isDeleted = await deleteLoyalty(idLoyalty, token);
    // Si devuelve true volvemos a cargar la lista sino no hacemos nada
    isDeleted ? onLoadLoyaltyList() : null;
  }
  // Función que se ejecuta cuando si pincha en el botón edit y llama al componente pasándole el id
  const handleEdit = (id: string) => {
    // Se usa generatePath para crear la ruta y evitar caracteres extraños
      history.push(generatePath(AuthRoutes.loyalty, { id }));
  };
  // Función que se ejecuta cuando si pincha en el botón create y llama al componente pasándole el id
  const handleCreate = (id: string) => {
      history.push(generatePath(AuthRoutes.loyalty, { id }));
  }

  useEffect(() => {
    // Cargamos la lista cuando se pinta el componente
      onLoadLoyaltyList();
  }, []);
  // Llamamos al componente pasándale las props necesarias
  return (
    <>
      <LoyaltyListComponent 
          loyaltyList={loyalties}
          handleDelete={handleDelete}
          handleBack={handleBack}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
      />
      <AlertDialog  title="Borrar Oferta"
        open={open}
        setOpen={setOpen}
        onConfirm={confirmDelete}>
          ¿Seguro que quiere borrar esta oferta?
      </AlertDialog>
    </>
  );
}