import { Loyalty} from './loyalty-list.api.model';
// Url del endpoint de la api que necesitamos
const url = `${process.env.API_URL}/loyalty`;
// Función que obtiene una colección de ofertas
export const getLoyaltyList = async (token: string): Promise<Loyalty[]> => {
  const response = await fetch(`${url}/getallloyalties`, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
};
// Función que borra una oferta que tenga el id recibido por parámetro
export const deleteLoyalty = async (id: number, token: string): Promise<boolean> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    },
  });

  return await response.json();
};
