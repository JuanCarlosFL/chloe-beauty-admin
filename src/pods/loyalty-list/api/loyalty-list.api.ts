import { Loyalty} from './loyalty-list.api.model';

const url = `${process.env.API_URL}/loyalty`;

export const getLoyaltyList = async (): Promise<Loyalty[]> => {
  const response = await fetch(`${url}/getallloyalties`);
  const data = await response.json();
  return data;
};

export const deleteLoyalty = async (id: number): Promise<boolean> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};
