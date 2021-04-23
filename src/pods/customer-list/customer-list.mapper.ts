import * as viewModel from './customer-list.vm';
import * as apiModel from './api/customer-list.api-model';
import { mapToCollection } from 'common/mappers';

export const mapCustomerFromApiToVm = (
  customer: apiModel.Customer
): viewModel.Customer => {
  return {
    PersonId: customer.PersonId,
    Name: customer.Name,
    Surname: customer.Surname === null ? '' : customer.Surname,
    Telephone: customer.Telephone === null ? '' : customer.Telephone,
    Address: customer.Address === null ? '' : customer.Address,
    Town: customer.Town === null ? '' : customer.Town,
    PostCode: customer.PostCode === null ? '' : customer.PostCode,
    Points: customer.Points,
    Email: customer.Email,
    Comments: customer.Comments === null ? '' : customer.Comments,
    ContactHow: customer.ContactHow === null ? '' : customer.ContactHow,
  };
};

export const mapCustomerListFromApiToVm = (
  employeeList: apiModel.Customer[]
): viewModel.Customer[] =>
  mapToCollection(employeeList, e => mapCustomerFromApiToVm(e));
