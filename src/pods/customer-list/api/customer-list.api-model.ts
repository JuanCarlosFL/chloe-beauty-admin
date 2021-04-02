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
  Deleted: boolean;
  ModifiedDate: string;
  Appointments: [];
  Users: [];
}
