import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { CredentialsLogin } from '../../../utils/types/CredentialsLogin';
import { api } from '@/service/axios/config/axios.config';
import LoginInvalidError from '@/service/axios/config/erros/LoginInvalideError';
import { loginResponse } from '@/service/axios/user/userResponses';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize({ email, password }: CredentialsLogin) {
        const { data, status } = await api().post<loginResponse>(
          '/auth/login',
          {
            email,
            password
          }
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
            id: '',
            apiToken: '',
            ...data
          };
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = { ...user, token: user.token };
      }

      if (account?.provider === 'google') {
        const { id_token, access_token: accessToken } = account;
        console.log(id_token, 'id token');

        try {
          const { data } = await api().post('/auth/login/google', {
            token: id_token
          });
          console.log(JSON.stringify(data), 'este é o usuário');
          token.user = { ...user, token: data.token };
        } catch (error) {
          console.log(error, 'erro ao logar com o google');
          /* throw new Error('Erro ao enviar as credenciais para a API'); */
        }
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
    }
  }
};

export default NextAuth(authOptions);
