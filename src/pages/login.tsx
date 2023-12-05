import LoginForm from '@/components/LoginForm';
import { popUplaert } from '@/utils/alerts/popUpAlert';
import {background, Flex, Heading, Link, Text, useColorModeValue} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { alertTypes } from '@/utils/types/alertTypes';
import Head from 'next/head';
import React from 'react';
import { Image } from "@chakra-ui/react";


function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const data = { email, password };

    try {
      setIsSubmitting(true);

      const result = await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/login',
      });

      if (result.ok) popUplaert('Logado com sucesso', alertTypes.SUCCESS);

      setIsSubmitting(false);

      if (result?.error) {
        popUplaert('Credenciais Inválidas', alertTypes.ERROR);
        return setIsSubmitting(false);
      }

      if (result?.url) {
        return await push(result.url);
      }
      console.log('result', JSON.stringify(result));
    } catch (error) {
      popUplaert(error.message, alertTypes.ERROR);
      return setIsSubmitting(false);
    }
  };

  const formBackground = useColorModeValue('yellow.50', 'yellow.700');

  const handleGoogleLogin = async () => {
    signIn('google');
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        backgroundImage="url('img/background.png')"
        backgroundSize="100% 100%"
        backgroundPosition="center"
        position="relative"
      >
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex  direction="column" background={formBackground} p={12} rounded={6}>
          <Heading  mb={6}> <Image src='/img/imagemlogin.png' height="10vh" alt="Logo" mx="auto" my="auto"  /> </Heading>
          <LoginForm onLogin={handleLogin} isSubmitting={isSubmitting}
            onGoogleLogin={handleGoogleLogin}
          />
        </Flex>
      </Flex>
      </Flex>
    </>
    
  );
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};