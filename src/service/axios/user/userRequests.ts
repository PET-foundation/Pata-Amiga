import { CredentialsLogin } from "@/utils/types/CredentialsLogin";
import { api } from "../config/axios.config";
import LoginInvalidError from "../config/erros/LoginInvalideError";

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

const exportMethods = {
    Login
};

export default exportMethods;