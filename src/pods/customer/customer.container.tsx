import { AuthRoutes } from 'core/auth';
import { mapCustomerFromApiToVm } from 'pods/customer-list/customer-list.mapper';
import {
  createEmptyCustomer,
  Customer,
} from 'pods/customer-list/customer-list.vm';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { CustomerComponent } from './customer.component';

const url = `${process.env.API_URL}/person`;

interface Params {
  id: string;
}

export const CustomerContainer: React.FC = () => {
  const { id } = useParams<Params>();
  const [customer, setCustomer] = useState<Customer>(createEmptyCustomer);
  const history = useHistory();

  const getCustomer = async (id: string) => {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    setCustomer(mapCustomerFromApiToVm(data));
  };

  const handlingCreate = async (customer: Customer) => {
    console.log(customer);
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.json());

    history.push(AuthRoutes.customerList);
  };

  const handlingCancel = () => {
    history.push(AuthRoutes.customerList);
  };

  useEffect(() => {
    if (id !== '0') {
      getCustomer(id);
    }
  }, []);

  return (
    <CustomerComponent
      id={id}
      onCreate={handlingCreate}
      customer={customer}
      onCancel={handlingCancel}
    />
  );
};
