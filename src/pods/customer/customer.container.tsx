import { mapCustomerFromApiToVm } from 'pods/customer-list/customer-list.mapper';
import {
  createEmptyCustomer,
  Customer,
} from 'pods/customer-list/customer-list.vm';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CustomerComponent } from './customer.component';

const url = `${process.env.API_URL}/person`;

interface Params {
  id: string;
}

export const CustomerContainer: React.FC = () => {
  const { id } = useParams<Params>();
  const [customer, setCustomer] = useState<Customer>(createEmptyCustomer);

  const getCustomer = async (id: string) => {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    setCustomer(mapCustomerFromApiToVm(data));
  };

  useEffect(() => {
    if (id !== '0') {
      getCustomer(id);
    }
  }, []);

  return <CustomerComponent id={id} customer={customer} />;
};
