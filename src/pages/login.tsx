import LoginForm from "@/components/LoginForm";
import { popUplaert } from "@/utils/alerts/popUpAlert";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { alertTypes } from "@/utils/types/alertTypes";

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const data = {email, password};

    try {
      setIsSubmitting(true);

      const result = await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/login'
      })
      
      if(result.ok) popUplaert('Logado com sucesso', alertTypes.SUCCESS)

      setIsSubmitting(false);

      if (result?.error) {
        console.log('Erro no signIn');

        popUplaert('erro ao Logar', alertTypes.ERROR)
        return setIsSubmitting(false);
      }

      if (result?.url) {
        return await push(result.url);
      }
      console.log('result', JSON.stringify(result));
    } catch (error) {
      popUplaert(error.message, alertTypes.ERROR)
      return setIsSubmitting(false);
    }
  };

  const formBackground = useColorModeValue('gray.100', 'gray.700')

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Login</Heading>
        <LoginForm 
        onLogin={handleLogin}
        isSubmitting={isSubmitting}
      />
      </Flex>
    </Flex>
  );
}

export default Login;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
    props: {
      session
    }
  };
};