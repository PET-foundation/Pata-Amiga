import { CredentialsLogin } from '@/utils/types/CredentialsLogin';
import { api } from '../config/axios.config';
import LoginInvalidError from '../config/erros/LoginInvalideError';
import { CredentialsRegister } from '@/utils/types/CredentialsRegister';
import { loginResponse, registerResponse, userResponse } from './userResponses';

const Login = async (credentials: CredentialsLogin): Promise<loginResponse> => {
  try {
    const { data, status } = await api().post<loginResponse>(
      '/auth/login',
      credentials,
    );

    if (status == 403) throw new LoginInvalidError('Credenciais invalidas');

    return data;
  } catch (error: any) {
    throw new LoginInvalidError(error.msg || 'Erro ao fazer login');
  }
};

const register = async (
  credentials: CredentialsRegister,
): Promise<registerResponse> => {
  try {
    const { data, status } = await api().post('/auth/register', credentials);

    console.log(`aaaaaaaaaaaaaa status: ${status} data: ${data}`);

    return data;
  } catch (error: any) {
    throw new LoginInvalidError(`Email já cadastrado`);
  }
};

const getUserTheirSelf = async (token: string): Promise<userResponse> => {
  try {
    const { data, status } = await api().get('/user/themselves', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    throw new LoginInvalidError(`Erro ao buscar usuário`);
  }
};

const UserServiceMethods = {
  Login,
  register,
  getUserTheirSelf,
};

export default UserServiceMethods;
