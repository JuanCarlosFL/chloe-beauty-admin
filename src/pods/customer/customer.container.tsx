import { CustomAlert } from 'common/components/alert';
import { AuthRoutes } from 'core/auth';
import { SessionContext } from 'core/session-context';
import { mapCustomerFromApiToVm } from 'pods/customer-list/customer-list.mapper';
import {
  createEmptyCustomer,
  Customer,
} from 'pods/customer-list/customer-list.vm';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { CustomerComponent } from './customer.component';

const url = `${process.env.API_URL}/person`;

interface Params {
  id: string;
}

export const CustomerContainer: React.FC = () => {
  const { token } = useContext(SessionContext);
  const [open, setOpen] = useState(false);
  const { id } = useParams<Params>();
  const [customer, setCustomer] = useState<Customer>(createEmptyCustomer);
  const history = useHistory();

  const getCustomer = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    });
    const data = await response.json();
    setCustomer(mapCustomerFromApiToVm(data));
  };

  const handlingCreate = async (customer: Customer) => {
    if (customer.PersonId === 0){
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
      });
      const data = await response.json();

      if (data === false)
        setOpen(true);
      else 
        history.push(AuthRoutes.customerList);

    } else {
      await fetch(`${url}/${customer.PersonId}`, {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `bearer ${token}`
        },
      });

      history.push(AuthRoutes.customerList);
    }
  };

  const handlingCancel = () => {
    history.push(AuthRoutes.customerList);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return
    }
    setOpen(false);
  }

  useEffect(() => {
    if (id !== '0') {
      getCustomer(id);
    }
  }, []);

  return (
    <>
      <CustomerComponent
      id={id}
      onCreate={handlingCreate}
      customer={customer}
      onCancel={handlingCancel} />
      <CustomAlert message='Ese usuario ya existe' severity='error' open={open} handleClose={handleClose} />
      </>
    
  );
};
