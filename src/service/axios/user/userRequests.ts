import { CredentialsLogin } from "@/utils/types/CredentialsLogin";
import { api } from "../config/axios.config";
import LoginInvalidError from "../config/erros/LoginInvalideError";
import { CredentialsRegister } from "@/utils/types/CredentialsRegister";

const Login = async (
    credentials: CredentialsLogin
): Promise<loginResponse | LoginInvalidError> => {
    try {
        const {data, status} = await api().post<loginResponse>('/auth/login', credentials);

        if(status == 403) return new LoginInvalidError("Credenciais invalidas");

        return data; 

    } catch (error: any) {
        return new LoginInvalidError(error.msg || "Erro ao fazer login");
    }
}

const register = async (
  credentials: CredentialsRegister
): Promise<registerResponse | LoginInvalidError> => {
    try {
        const { data, status } = await api().post('/auth/register', credentials);

        console.log(`aaaaaaaaaaaaaa status: ${status} data: ${data}`);

        

        return data;
    } catch (error: any) {
      throw new LoginInvalidError(`Email já cadastrado`);
        
    }
}

const UserServiceMethods = {
    Login,
    register
};

export default UserServiceMethods;