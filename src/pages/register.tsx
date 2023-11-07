import RegisterForm from '@/components/RegisterForm';
import UserServiceMethods from '@/service/axios/user/userRequests';
import { popUplaert } from '@/utils/alerts/popUpAlert';
import { CredentialsRegister } from '@/utils/types/CredentialsRegister';
import { alertTypes } from '@/utils/types/alertTypes';
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Image } from "@chakra-ui/react";

function Register() {
  const { push } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (
      name: string,
      email: string,
      password: string,
      phone: string,
      whatsapp?: string,
      instagram?: string,
      facebook?: string,
  ) => {
    setIsSubmitting(true);
    const userData: CredentialsRegister = {
      name,
      email,
      password,
      phone,
      whatsapp,
      instagram,
      facebook,
    };
    await submitUserToCreate(userData);
    setIsSubmitting(false);
  };

  const submitUserToCreate = async (userData: CredentialsRegister) => {

    const userToSave: CredentialsRegister = {
      email: userData.email,
      name: userData.name,
      password: userData.password,
      phone: userData.phone,
      whatsapp: userData.phone,
      facebook: userData.facebook,
      instagram: userData.instagram,
    }

    console.log(JSON.stringify(userToSave));

    try {
      const response = await UserServiceMethods.register(userToSave);

      console.log(`response`, JSON.stringify(response));
      await redirectToLogin();
    } catch (error) {
      popUplaert(error.message, alertTypes.ERROR);
      console.log(`error`, error);
    }
  };

  const redirectToLogin = async () => {
    await push('/login');
  };

  const formBackground = useColorModeValue('gray.100', 'gray.700');
  return (
    <>
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
        <Flex direction="column" background={formBackground} p={12} rounded={6}>
          <Heading mb={6}> <Image src='/img/imagemlogin.png' height="10vh" alt="Logo" mx="auto" my="auto"/> </Heading>
          <RegisterForm
            onRegister={handleRegister}
            isSubmitting={isSubmitting}
          />
        </Flex>
      </Flex>
      </Flex>
    </>
  );
}

export default Register;

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
