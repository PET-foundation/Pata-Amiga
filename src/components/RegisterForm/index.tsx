import { FormControl } from '@chakra-ui/form-control';
import { Button, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineWhatsApp, AiFillInstagram, AiFillFacebook } from "react-icons/ai";

interface RegisterFormProps {
  onRegister: (
    name: string, 
    email: string, 
    password: string, 
    phone: string, 
    whatsapp?: string,
    instagram?: string,
    facebook?: string,
  ) => void;
  isSubmitting?: boolean;
}

export default function RegisterForm({ onRegister, isSubmitting }: RegisterFormProps) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  }

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsapp(e.target.value);
  }

  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstagram(e.target.value);
  }

  const handleFacebookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFacebook(e.target.value);
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister(name, email, password, phone, whatsapp, instagram, facebook);
  };


  return (
        <form onSubmit={handleFormSubmit}>
          <FormControl isRequired mb={4}>
            <Input
              placeholder='Informe seu Nome'
              value={name}
              onChange={handleNameChange}
              _hover={{ bgColor: 'gray.900' }}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <Input
              type='email'
              placeholder='Informe seu Email'
              value={email}
              onChange={handleEmailChange}
              _hover={{ bgColor: 'gray.900' }}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <Input
            type='password'
              placeholder='Informe sua Senha'
              value={password}
              onChange={handlePasswordChange}
              _hover={{ bgColor: 'gray.900' }}
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <Input
              placeholder='Informe seu Telefone'
              value={phone}
              onChange={handlePhoneChange}
              _hover={{ bgColor: 'gray.900' }}
            />
          </FormControl>
          <InputGroup size="md">
            <Input
              mb={4}
              pr="4.5rem"
              placeholder='Informe seu Whatsapp'
              value={whatsapp}
              onChange={handleWhatsappChange}
              _hover={{ bgColor: 'gray.900' }}
            />
            <InputRightElement width="4.5rem">
              <AiOutlineWhatsApp/>
            </InputRightElement>
          </InputGroup>
          <InputGroup size="md">
            <Input
              mb={4}
              pr="4.5rem"
              placeholder='Informe seu Instagram'
              value={instagram}
              onChange={handleInstagramChange}
              _hover={{ bgColor: 'gray.900' }}
            />
            <InputRightElement width="4.5rem">
            <AiFillInstagram/>
            </InputRightElement>
          </InputGroup>
          <InputGroup size="md">
            <Input
              mb={4}
              pr="4.5rem"
              placeholder='Informe seu Facebook'
              value={facebook}
              onChange={handleFacebookChange}
              _hover={{ bgColor: 'gray.900' }}
            />
            <InputRightElement width="4.5rem">
            <AiFillFacebook/>
            </InputRightElement>
          </InputGroup>
          <Flex alignItems="center" justifyContent="center">
          <Button
          mt={4}
          mb={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'
          >
            Cadastrar
          </Button>
          </Flex>
        </form>
  );
}
