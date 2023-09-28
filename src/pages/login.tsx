import LoginForm from "@/components/LoginForm";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

function Login() {
  const { push } = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const data = {email, password};

    try {
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl: '/login'
      })
      if (result?.error) {
        alert(`Erro ao autenticar: ${result.error}`);
        console.log('Erro no signIn');
        return;
      }
      if (result?.url) {
        return await push(result.url);
      }
      console.log('result', JSON.stringify(result));
    } catch (error) {
      
    }
  };

  const formBackground = useColorModeValue('gray.100', 'gray.700')

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Login</Heading>
        <LoginForm 
        onLogin={handleLogin}
        isSubmitting={false}
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