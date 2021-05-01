// Viewmodel que usaremos en nuestra aplicación
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
  ContactHow: string;
}
// Función que crea un usuario vacío
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
  ContactHow: '',
};
