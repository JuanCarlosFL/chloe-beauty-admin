// Urls de los endpoints de la api que vamos a necesitar
const url = `${process.env.API_URL}/user`;
const roleUrl = `${process.env.API_URL}/user/getRole`;
const tokenUrl = `${process.env.API_URL}/api/jwtauth/requesttoken`;
// Función que valida si el login es correcto
export const isValidLogin = async (username: string, password: string): Promise<boolean> => {
  // Mandamos al post del controlador user los datos del usuario
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (data.status == 401) {
    // Si el estado de la respuesta es no autorizado devolvemos false
    return false;
  }
  // Sino devolvemos true
  return data;
};

// Función para obtener los roles del usuario
export const getRole = async (username: string): Promise<string> => {
  // Solicitamos los roles del usuario
  const response = await fetch(`${roleUrl}/${username}`);
  const role = await response.json();
  // si se ha recicbido un 404 el usuario no existe y no devolvemos ningún rol
  // En otro caso devolvemos el primer rol, si es administrador tendrá permisos para todo y sino será un cliente
  return role.status === 404 ? '' : role[0];
};

// Función para obtener un nuevo token para el usuario
export const getToken = async (username: string, password: string): Promise<string> => {
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
