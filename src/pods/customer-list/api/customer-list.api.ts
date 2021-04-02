import { Customer } from './customer-list.api-model';

const url = `${process.env.API_URL}/person`;

export const getCustomerList = async (): Promise<Customer[]> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const deleteCustomer = async (id: number): Promise<boolean> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};
