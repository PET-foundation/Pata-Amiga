import { 
  Button, 
  Flex, 
  FormControl, 
  FormErrorMessage, 
  FormLabel, 
  IconButton, 
  Input, 
  InputGroup, 
  InputRightElement, 
  useColorMode, 
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  isSubmitting: boolean;
  /* onGoogleLogin: () => void; */
}

export default function LoginForm({ onLogin, isSubmitting }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  /* const {toggleColorMode} = useColorMode() */
  /* const formBackground = useColorModeValue('gray.100', 'gray.700') */

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleEmailBlur = () => {
    setEmailError(email === '');
  };

  const handlePasswordBlur = () => {
    setPasswordError(password === '');
  };



  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl id="email" isRequired mb={4} isInvalid={emailError}>
        <Input type='email' 
          placeholder='Porfavor informe seu Email' 
          value={email} 
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        />
         {emailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
        
      </FormControl>
      <FormControl id="password" isRequired mb={4} isInvalid={passwordError}>
        <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
          onBlur={handlePasswordBlur}
        />
        <InputRightElement width="4.5rem">
        <IconButton
            aria-label="Show password"
            h="1.75rem"
            size="sm"
            icon={showPassword ? <FaEyeSlash /> : <FaEye />}
            onClick={handleTogglePassword}
          />
        </InputRightElement>
        </InputGroup>
      </FormControl>
      <Flex alignItems="center" justifyContent="center">
        <Button
          mt={4}
          mb={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'
          >
          Login in
        </Button>
      </Flex>
      {/* <Button onClick={toggleColorMode}>Tloge</Button> */}
    </form>
  );
}
