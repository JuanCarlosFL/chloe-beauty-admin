const url = `${process.env.API_URL}/user`;
const roleUrl = `${process.env.API_URL}/getRole`;
const tokenUrl = `${process.env.API_URL}/api/jwtauth/requesttoken`;

export const isValidLogin = async (
  username: string,
  password: string
): Promise<boolean> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (data.status == 401) {
    return false;
  }
  return data;
};

export const getRole = async (username: string): Promise<string> => {
  const response = await fetch(roleUrl);
  return response.json();
};

export const getToken = async (
  username: string,
  password: string
): Promise<string> => {
  const accessToken = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const token = await accessToken.json();
  return token.token;
};
