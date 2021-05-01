import { CustomAlert } from 'common/components/alert';
import { AuthRoutes } from 'core/auth';
import { SessionContext } from 'core/session-context';
import { mapCustomerFromApiToVm } from 'pods/customer-list/customer-list.mapper';
import {
  createEmptyCustomer,
  Customer,
} from 'pods/customer-list/customer-list.vm';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { CustomerComponent } from './customer.component';
// Url del endpoint de la api necesarios
const url = `${process.env.API_URL}/person`;
// Tipamos las props
interface Params {
  id: string;
}

export const CustomerContainer: React.FC = () => {
  // Guardamos el token del context
  const { token } = useContext(SessionContext);
  // Creamos una variable a false para el alert
  const [open, setOpen] = useState(false);
  // Guardamos el id que viene por parámetro en la url
  const { id } = useParams<Params>();
  // Creamos un usuario vacío
  const [customer, setCustomer] = useState<Customer>(createEmptyCustomer);
  // Guardamos el historial del navegador
  const history = useHistory();

  // Obtenemos los datos del usuario cuyo id se ha recibido por parámetro
  const getCustomer = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    });
    const data = await response.json();
    // Actualizamos los datos mapeando los datos que vienen de la api
    setCustomer(mapCustomerFromApiToVm(data));
  };

  // Función para crear o modificar un registro
  const handlingCreate = async (customer: Customer) => {
    // Comprobamos si el id es 0
    if (customer.PersonId === 0){
      // Si es así es un registro nuevo y mandamos al post de la api para que lo cree
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
      });
      const data = await response.json();

      if (data === false)
        // Si el resultado de la api es false abrimos el alert para informar del error
        setOpen(true);
      else 
        // Si no redirigimos a mostrar la lista con el nuevo registro
        history.push(AuthRoutes.customerList);

    } else {
      // Si el id no es 0 es que el usuario existe y se ha modificado, así que lo mandamos al endpoint del PUT de la api
      await fetch(`${url}/${customer.PersonId}`, {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
      });
      // Redirigimos a la lista para mostrarla con los cambios realizados en el usuario
      history.push(AuthRoutes.customerList);
    }
  };
  // Función para volver a la lista al pinchar en el botón
  const handlingCancel = () => {
    history.push(AuthRoutes.customerList);
  };
  // Función para cerrar el alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return
    }
    setOpen(false);
  }
  // Cuando se pinta el componente comprobamos si el id es 0
  useEffect(() => {
    if (id !== '0') {
      // Si es distindo de 0 cargamos los datos del cliente
      getCustomer(id);
    }
  }, []);
  // Llamamos al componente pasándole por props los datos
  return (
    <>
      <CustomerComponent
      id={id}
      onCreate={handlingCreate}
      customer={customer}
      onCancel={handlingCancel} />
      <CustomAlert message='Ese usuario ya existe' severity='error' open={open} handleClose={handleClose} />
      </>
    
  );
};
