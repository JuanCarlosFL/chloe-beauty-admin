export interface Customer {
  PersonId: number;
  Name: string;
  Surname: string;
  Telephone: string;
  Address: string;
  Town: string;
  PostCode: string;
  Points: number;
  Email: string;
  Comments: string;
  ContactNow: string;
}

export const createEmptyCustomer = {
  PersonId: 0,
  Name: '',
  Surname: '',
  Telephone: '',
  Address: '',
  Town: '',
  PostCode: '',
  Points: 0,
  Email: '',
  Comments: '',
  ContactNow: '',
};
