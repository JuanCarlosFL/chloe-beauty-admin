// View model para el login
export interface LoginVM {
  username: string;
  password: string;
}
// Función que crea un login vacío
export const createEmptyLogin = (): LoginVM => ({
  username: '',
  password: '',
});
