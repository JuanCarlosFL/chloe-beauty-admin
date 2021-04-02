import { Customer } from 'pods/customer-list/customer-list.vm';
import React from 'react';

interface Props {
  id: string;
  customer: Customer;
}

export const CustomerComponent: React.FC<Props> = props => {
  const { id, customer } = props;

  return (
    <h2>
      Customer Component {id} {customer.Name}
    </h2>
  );
};
