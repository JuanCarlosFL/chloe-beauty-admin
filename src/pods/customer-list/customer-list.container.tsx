import React, { useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router';
import { CustomerListComponent } from './customer-list.component';
import { deleteCustomer, getCustomerList } from './api';
import { Customer } from './customer-list.vm';
import { mapCustomerListFromApiToVm } from './customer-list.mapper';
import { AuthRoutes } from 'core/auth';

export const CutomerListContainer: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const history = useHistory();

  const onLoadCustomerList = async () => {
    try {
      const apiCustomerList = await getCustomerList();
      const viewModelCustomerList = mapCustomerListFromApiToVm(apiCustomerList);
      setCustomers(viewModelCustomerList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    history.push(AuthRoutes.menu);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = prompt(
        `¿Seguro que quieres borrar este cliente ${id}? (S/N)`
      );
      if (res === 'S') {
        const isDeleted = await deleteCustomer(id);
        isDeleted ? onLoadCustomerList() : null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id: string) => {
    history.push(generatePath(AuthRoutes.customer, { id }));
  };

  const handleCreate = (id: string) => {
    history.push(generatePath(AuthRoutes.customer, { id }));
  }

  useEffect(() => {
    onLoadCustomerList();
  }, []);

  return (
    <CustomerListComponent
      customerList={customers}
      handleDelete={handleDelete}
      handleBack={handleBack}
      handleEdit={handleEdit}
      handleCreate={handleCreate}
    />
  );
};
