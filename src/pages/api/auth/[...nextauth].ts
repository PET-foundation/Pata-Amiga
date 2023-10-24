import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { CredentialsLogin } from '../../../utils/types/CredentialsLogin';
import { api } from '@/service/axios/config/axios.config';
import LoginInvalidError from '@/service/axios/config/erros/LoginInvalideError';
import { loginResponse } from '@/service/axios/user/userResponses';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize({ email, password }: CredentialsLogin) {
        const { data, status } = await api().post<loginResponse>(
          '/auth/login',
          {
            email,
            password,
          },
        );

        if (status === 403) {
          console.log(data);

          throw new LoginInvalidError(`Credenciais inválidas ${data}`);
        } else if (status === 500) {
          throw new Error('erro ao logar');
        }

        if (data) {
          console.log(data.token, 'token do data');

          return {
            token: data.token,
            id: "",
            apiToken: "",
            ...data
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = { ...user, token: user.token };
      }

      return token;
    },

    async session({ session, token }) {
      if (token && token.user) {
        // eslint-disable-next-line no-param-reassign
        session.user = token.user;

        /*  const { apiToken, accessToken } = token;
              session.user.apiToken = apiToken;
              session.user.accessToken = accessToken; */
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
