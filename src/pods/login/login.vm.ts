export interface LoginVM {
  username: string;
  password: string;
}

export const createEmptyLogin = (): LoginVM => ({
  username: '',
  password: '',
});
