import React, { useContext, useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router';
import { CustomerListComponent } from './customer-list.component';
import { deleteCustomer, getCustomerList } from './api';
import { Customer } from './customer-list.vm';
import { mapCustomerListFromApiToVm } from './customer-list.mapper';
import { AuthRoutes } from 'core/auth';
import { SessionContext } from 'core/session-context';
import { AlertDialog } from 'common/components/prompt';

export const CutomerListContainer: React.FC = () => {
  const [idClient, setIdClient] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { token } = useContext(SessionContext);
  const history = useHistory();

  const onLoadCustomerList = async () => {
    try {
      const apiCustomerList = await getCustomerList(token);
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
    setOpen(true);
    setIdClient(id);
  };

  const confirmDelete = async () => {
    const isDeleted = await deleteCustomer(idClient, token);
    isDeleted ? onLoadCustomerList() : null;
  }

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
    <>
      <CustomerListComponent
        customerList={customers}
        handleDelete={handleDelete}
        handleBack={handleBack}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
      />
      <AlertDialog  title="Borrar Cliente"
        open={open}
        setOpen={setOpen}
        onConfirm={confirmDelete}>
          ¿Seguro que quiere borrar este cliente?
      </AlertDialog>
    </>
  );
};
