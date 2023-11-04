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
    throw new LoginInvalidError(`erro na request ${error}`);
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

const getUserByUuid = async (token: string, userUuid: string): Promise<userResponse> => {
  try {
    const { data, status } = await api().get(`/user/${userUuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    throw new LoginInvalidError(`Erro ao buscar usuário`);
  }
};

const updateUser = async (userUuid: string,token: string, data: Omit<CredentialsRegister, "password">): Promise<void> => {
  
  try {
    const { status } = await api().put(`user/${userUuid}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if(status != 200) throw new LoginInvalidError(`Erro ao buscar usuário`);
  } catch (error: any) {
    throw new LoginInvalidError(`Erro ao buscar usuário`);
  }
}

const UserServiceMethods = {
  Login,
  register,
  getUserTheirSelf,
  updateUser,
  getUserByUuid
};

export default UserServiceMethods;
