export enum UserRoles {
  administrator = 'administrator',
  client = 'client',
}

export const userRoles = {
  admins: [String(UserRoles.administrator)],
  users: [String(UserRoles.client)],
  all: [String(UserRoles.administrator), String(UserRoles.client)],
};

export enum AuthRoutes {
  menu = '/menu',
  loyalty = '/loyalty',
  treatment = '/treatment',
  appointment = '/appointment',
  customer = '/customer',
}

export enum NonAuthRoutes {
  root = '/',
  login = '/login',
  nonAuth = '/nonAuth',
}
