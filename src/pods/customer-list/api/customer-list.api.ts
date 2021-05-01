import { Customer } from './customer-list.api-model';
// Url del endpoint de la api que necesitamos
const url = `${process.env.API_URL}/person`;
// Función que obtiene una colección de usuarios
export const getCustomerList = async (token: string): Promise<Customer[]> => {
  const response = await fetch(url, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
};
// Función que borra un usuario que tenga el id recibido por parámetro
export const deleteCustomer = async (id: number, token: string): Promise<boolean> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    },
  });

  return await response.json();
};
