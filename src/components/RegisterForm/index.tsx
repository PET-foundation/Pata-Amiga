import React, { useState } from 'react';
import { Box, Text, Center, Stack } from '@chakra-ui/react';
import {
    FormControl,
    FormErrorMessage,
    Button,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement, Link,
} from '@chakra-ui/react';
import {
    AiOutlineWhatsApp,
    AiFillInstagram,
    AiFillFacebook,
} from 'react-icons/ai';

interface RegisterFormProps {
    onRegister: (
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
        phone: string,
        whatsapp: string,
        instagram?: string,
        facebook?: string,
    ) => void;
    isSubmitting?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, isSubmitting }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };
    
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWhatsapp(e.target.value);
    };

    const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInstagram(e.target.value);
    };

    const handleFacebookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFacebook(e.target.value);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onRegister(name, email, password, confirmPassword, phone, whatsapp, instagram, facebook);
        if (password === confirmPassword) {
            // As senhas coincidem, proceda com o registro
            console.log('Usuário registrado!');
            onRegister(name, email, password, confirmPassword, phone, whatsapp, instagram, facebook);
        } else {
            // As senhas não coincidem, exiba uma mensagem de erro
            console.log('Erro: As senhas não coincidem');
        }
    };

    const onBlurNameError = () => {
        setNameError(name === '');
    };

    const onBlurEmailError = () => {
        setEmailError(email === '');
    };

    const onBlurPasswordError = () => {
        setPasswordError(password === '');
    };

    const onBlurConfirmPasswordError = () => {
        setConfirmPasswordError(confirmPassword === '');
    };

    const onBlurPhoneError = () => {
      setPhoneError(phone === '');
  };

    return (
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={4} width="400px">
          <Flex direction="row" gap={5}>
          <FormControl  isRequired >
            <Text>Nome Completo<span style={{ color: 'red' }}> *</span></Text>
                <Input
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={handleNameChange}
                    onBlur={onBlurNameError}
                    _hover={{bgColor: 'yellow.100'}}
                />
                {nameError && <FormErrorMessage>Name is required.</FormErrorMessage>}
            </FormControl>
            
            <FormControl isRequired >
              <Text>E-mail<span style={{ color: 'red' }}> *</span></Text>
              <Input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={onBlurEmailError}
                    _hover={{bgColor: 'yellow.100'}}
                />
                {emailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
            </FormControl>
          </Flex>
            <Flex direction="row" gap={5}>
            
            <FormControl isRequired >
              <Text>Senha<span style={{ color: 'red' }}> *</span></Text>
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={onBlurPasswordError}
                    _hover={{bgColor: 'yellow.100'}}
                />
                {passwordError && (
                    <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
            </FormControl>
            
            <FormControl isRequired>
              <Text>Confirmar a senha<span style={{ color: 'red' }}> *</span></Text>
              <Input 
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={onBlurConfirmPasswordError}
                    _hover={{bgColor: 'yellow.100'}}
                />
              {confirmPasswordError && (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>
            </Flex>
            <Text>Telefone<span style={{ color: 'red' }}> *</span></Text>
            <Flex direction="row" gap={5}>
            <InputGroup size="md">
              <Input
                    pr="4.5rem"
                    placeholder="Digite seu telefone/whatsapp"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={onBlurPhoneError}
                    _hover={{bgColor: 'yellow.100'}}
                />
              {phoneError && <FormErrorMessage>Phone is required.</FormErrorMessage>}
                <InputRightElement width="4.5rem">
                    <AiOutlineWhatsApp/>
                </InputRightElement>
            </InputGroup>
            </Flex>
            <p>Instagram</p>
            <InputGroup size="md">
                <Input
                    pr="4.5rem"
                    placeholder="Digite seu Instagram"
                    value={instagram}
                    onChange={handleInstagramChange}
                    _hover={{bgColor: 'yellow.100'}}
                />
                <InputRightElement width="4.5rem">
                    <AiFillInstagram/>
                </InputRightElement>
            </InputGroup>
            <p>Facebook</p>
            <InputGroup size="md">
                <Input
                    pr="4.5rem"
                    placeholder="Digite seu Facebook"
                    value={facebook}
                    onChange={handleFacebookChange}
                    _hover={{bgColor: 'yellow.100'}}
                />
                <InputRightElement width="4.5rem">
                    <AiFillFacebook/>
                </InputRightElement>
            </InputGroup>
                <Button
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    Cadastrar
                </Button>
            <Button
              colorScheme="blue"
              variant="outline"
            ><Link href="/login"> Voltar</Link>
            </Button>
            </Stack>
        </form>
    );
}
export default RegisterForm;
