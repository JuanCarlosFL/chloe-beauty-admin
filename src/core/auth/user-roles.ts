// Enumeramos los roles de nuestra aplicación
export enum UserRoles {
  administrator = 'Administrator',
  client = 'Client',
}
// Creamos los roles que vamos a usar para permitir acceder
export const userRoles = {
  admins: [String(UserRoles.administrator)],
  users: [String(UserRoles.client)],
  all: [String(UserRoles.administrator), String(UserRoles.client)],
};
// Especificamos las rutas que son autorizadas
export enum AuthRoutes {
  menu = '/menu',
  loyaltyList = '/loyalty-list',
  loyalty = '/loyalty/:id',
  treatmentList = '/treatment-list',
  treatment = '/treatment/:id',
  customerList = '/customer-list',
  customer = '/customer/:id',
  appointment = '/appointment',
}
// Especificamos las rutas que no son autorizadas
export enum NonAuthRoutes {
  root = '/',
  login = '/login',
  nonAuth = '/nonAuth',
}
