import * as viewModel from './customer-list.vm';
import * as apiModel from './api/customer-list.api-model';
import { mapToCollection } from 'common/mappers';

export const mapCustomerFromApiToVm = (
  customer: apiModel.Customer
): viewModel.Customer => {
  return {
    PersonId: customer.PersonId,
    Name: customer.Name,
    Surname: customer.Surname,
    Telephone: customer.Telephone,
    Address: customer.Address,
    Town: customer.Town,
    PostCode: customer.PostCode,
    Points: customer.Points,
    Email: customer.Email,
    Comments: customer.Comments,
    ContactNow: customer.ContactNow,
  };
};

export const mapCustomerListFromApiToVm = (
  employeeList: apiModel.Customer[]
): viewModel.Customer[] =>
  mapToCollection(employeeList, e => mapCustomerFromApiToVm(e));
