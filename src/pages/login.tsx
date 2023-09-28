import LoginForm from "@/components/LoginForm";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";

function Login() {
  const handleLogin = (email: string, password: string) => {
    // Lógica de autenticação com email e senha
    console.log('Email:', email);
    console.log('Password:', password);
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
