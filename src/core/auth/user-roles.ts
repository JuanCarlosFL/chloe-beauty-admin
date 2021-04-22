export enum UserRoles {
  administrator = 'Administrator',
  client = 'Client',
}

export const userRoles = {
  admins: [String(UserRoles.administrator)],
  users: [String(UserRoles.client)],
  all: [String(UserRoles.administrator), String(UserRoles.client)],
};

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

export enum NonAuthRoutes {
  root = '/',
  login = '/login',
  nonAuth = '/nonAuth',
}
