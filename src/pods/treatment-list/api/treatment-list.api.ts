import { Treatment } from './treatment.list.api.model';

const url = `${process.env.API_URL}/treatment`;

export const getTreatmentList = async (): Promise<Treatment[]> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const deleteTreatment = async (id: number): Promise<boolean> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};
