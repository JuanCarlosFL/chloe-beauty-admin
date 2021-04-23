import { Treatment } from './treatment.list.api.model';

const url = `${process.env.API_URL}/treatment`;

export const getTreatmentList = async (token: string): Promise<Treatment[]> => {
  const response = await fetch(url, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
};

export const deleteTreatment = async (id: number, token: string): Promise<boolean> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    },
  });

  return await response.json();
};
