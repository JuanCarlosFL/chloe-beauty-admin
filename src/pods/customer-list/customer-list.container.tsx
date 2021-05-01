import React, { useContext, useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router';
import { CustomerListComponent } from './customer-list.component';
import { deleteCustomer, getCustomerList } from './api';
import { Customer } from './customer-list.vm';
import { mapCustomerListFromApiToVm } from './customer-list.mapper';
import { AuthRoutes } from 'core/auth';
import { SessionContext } from 'core/session-context';
import { AlertDialog } from 'common/components/prompt';

export const CutomerListContainer: React.FC = () => {
  // Iniciamos una variable para el id del cliente a 0
  const [idClient, setIdClient] = useState<number>(0);
  // Creamos una variable a false para el alert
  const [open, setOpen] = useState(false);
  // Creamos un array de clientes vacío
  const [customers, setCustomers] = useState<Customer[]>([]);
  // Guardamos el token del context
  const { token } = useContext(SessionContext);
  // Guardamos el historial
  const history = useHistory();

  const onLoadCustomerList = async () => {
    try {
      // Cargamos la lista de usarios
      const apiCustomerList = await getCustomerList(token);
      // Y la mapeamos del modelo de api al viewmodel
      const viewModelCustomerList = mapCustomerListFromApiToVm(apiCustomerList);
      // Y actualizamos la lista
      setCustomers(viewModelCustomerList);
    } catch (error) {
      console.error(error);
    }
  };
  // Función para volver al menú si se pincha el botón
  const handleBack = () => {
    history.push(AuthRoutes.menu);
  };
  // función que se ejecuta cuando se borra un cliente
  const handleDelete = async (id: number) => {
    // Muestra el prompt personalizado para preguntar si queremos borrarlo
    setOpen(true);
    // Actualiza el id del cliente
    setIdClient(id);
  };
  // Función que se ejecuta cuando confirmamos que queremos borrarlo
  const confirmDelete = async () => {
    // Mandamos al delete de la api el id para borrarlo
    const isDeleted = await deleteCustomer(idClient, token);
    // Si devuelve true volvemos a cargar la lista sino no hacemos nada
    isDeleted ? onLoadCustomerList() : null;
  }
  // Función que se ejecuta cuando si pincha en el botón edit y llama al componente pasándole el id
  const handleEdit = (id: string) => {
    // Se usa generatePath para crear la ruta y evitar caracteres extraños
    history.push(generatePath(AuthRoutes.customer, { id }));
  };

  // Función que se ejecuta cuando si pincha en el botón create y llama al componente pasándole el id
  const handleCreate = (id: string) => {
    history.push(generatePath(AuthRoutes.customer, { id }));
  }

  useEffect(() => {
    // Cargamos la lista cuando se pinta el componente
    onLoadCustomerList();
  }, []);
  // Llamamos al componente pasándale las props necesarias
  return (
    <>
      <CustomerListComponent
        customerList={customers}
        handleDelete={handleDelete}
        handleBack={handleBack}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
      />
      <AlertDialog  title="Borrar Cliente"
        open={open}
        setOpen={setOpen}
        onConfirm={confirmDelete}>
          ¿Seguro que quiere borrar este cliente?
      </AlertDialog>
    </>
  );
};
