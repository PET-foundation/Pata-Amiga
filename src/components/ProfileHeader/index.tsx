import { TopMenu } from '@/components/TopMenu';
import { PostPreviewPros, PostResponse, ShelterResponse, userResponse } from '@/service/axios/user/userResponses';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { IoLocationSharp } from 'react-icons/io5';
import {
  AiOutlineMail,
  AiFillInstagram,
  AiOutlineWhatsApp,
  AiFillEdit,
  AiOutlineSave,
  AiOutlineArrowLeft,
  AiOutlineLogout
} from 'react-icons/ai';
import { use, useEffect, useRef, useState } from 'react';
import { popUplaert } from '@/utils/alerts/popUpAlert';
import { alertTypes } from '@/utils/types/alertTypes';
import { signOut, useSession } from 'next-auth/react';

interface ProfileHeaderProps {
  userName: string;
  profilePicture: string;
  userBanner: string;
  userLocation: string;
  userEmail: string;
  userInstagram: string;
  userWhatsApp: string;
  isEditable?: boolean;
  onSubmit?: (
    userName: string,
    profileImage: string,
    userBanner: string,
    userLocation: string,
    userEmail: string,
    userInstagram: string,
    userWhatsapp: string,
  ) => void;
}

export function ProfileHeader({
  profilePicture,
  userBanner,
  userEmail,
  userInstagram,
  userLocation,
  userName,
  userWhatsApp,
  isEditable = false,
  onSubmit,
}: ProfileHeaderProps) {
  const { data: session, status } = useSession();
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);


  const [profileImage, setProfileImage] = useState(profilePicture);
  const [userBannerImage, setUserBannerImage] = useState(userBanner);

  const [userNameInput, setUserNameInput] = useState(userName);
  const [userLocationInput, setUserLocationInput] = useState(userLocation);
  const [userEmailInput, setUserEmailInput] = useState(userEmail);
  const [userInstagramInput, setUserInstagramInput] = useState(userInstagram);
  const [userWhatsAppInput, setUserWhatsAppInput] = useState(userWhatsApp);

  const makeUserAtSymbol = (userName: string) => {
    const userAtSymbol = '@';
    const userAtSymbolWithUserName =
      userAtSymbol + userName.split(' ').join('');

    return userAtSymbolWithUserName;
  };

  function handleChangeProfilePicture(event: any) {
    const file = event.target.files[0];

    if (file) {
      if (!(file.size <= 2 * 1024 * 1024)) {
        popUplaert('A imagem deve ter no máximo 2MB', alertTypes.WARNING)
        return
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target.result;
        setProfileImage(base64Image.toString());
      };

      reader.readAsDataURL(file);
      console.log(profileImage)
    }
  }

  function handleChangeBanner(event: any) {
    const file = event.target.files[0]; 

    if (file) {
      if (!(file.size <= 2 * 1024 * 1024)) {
        popUplaert('A imagem deve ter no máximo 2MB', alertTypes.WARNING)
        return
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target.result;
        setUserBannerImage(base64Image.toString());
      };

      reader.readAsDataURL(file);
    }
  }

  const handleBoxClickImageProfile = () => {
    if (isEditable) {
      profileFileInputRef.current.click();
    }
  };

  const handleBoxClickImageBanner = () => {
    if (isEditable) {
      bannerFileInputRef.current.click();
    }
  };

  const isValidEmail = (email: string) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
  };

  const handleSingOut = async () => {
    await signOut();
  };

  const updateUser = () => {
    if (isValidEmail(userEmailInput) && userNameInput.length > 0) {
      onSubmit(
        userNameInput,
        profileImage,
        userBannerImage,
        userLocationInput,
        userEmailInput,
        userInstagramInput,
        userWhatsAppInput,
      );
    } else {
      popUplaert('Preencha os campos corretamente', alertTypes.WARNING)
    }
  };

  return (
    <>
      <Flex direction="column" w="100%">
        <Box
          w="100%"
          h="25vh"
          bg="blue.500"
          position="relative"
          _hover={isEditable && { opacity: '0.5' }}
          onClick={handleBoxClickImageBanner}
        >
          <Image
            src={userBanner ? userBannerImage : 'https://bit.ly/2Z4KKcF'}
            alt="Banner Image"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <input
            type="file"
            ref={bannerFileInputRef}
            style={{ display: 'none' }}
            onChange={handleChangeBanner}
          />
        </Box>
        {isEditable ? (
          <Flex 
            direction="column" 
            mt="30vh"
            ml="85vw"
            position="absolute"
            gap={2}
            >
            <Button
              colorScheme="blue"
              variant="outline"
              rightIcon={<AiOutlineSave />}
              onClick={updateUser}
            >
              Salvar perfil
            </Button>
            <Button
              as={Link}
              colorScheme="blue"
              variant="solid"
              href='/profile'
              leftIcon={<AiOutlineArrowLeft />}
            >
              Retornar ao perfil
            </Button>
          </Flex>
        ) : (
          <Flex direction='column' gap={2} position="absolute"
          mt="30vh"
          ml="85vw"
          mr='12'>
            <Button
            as={Link}
            
            colorScheme="blue"
            variant="outline"
            href="/profile/edit"
            rightIcon={<AiFillEdit />}
            >
              Editar perfil
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={handleSingOut}
              leftIcon={<AiOutlineLogout/>}
            >
              Sair
            </Button>
          </Flex>

        )}
        <Box
          position="absolute"
          mt="100"
          ml="5"
          _hover={isEditable && { opacity: '0.5' }}
          onClick={handleBoxClickImageProfile}
        >
          <Image
            src={profilePicture ? profileImage : 'https://bit.ly/dan-abramov'}
            alt="Banner Image"
            borderRadius="full"
            boxSize="25vh"
          />
          {isEditable && (
            <Icon name="edit" position="absolute" top="0" right="0" />
          )}
          <input
            type="file"
            ref={profileFileInputRef}
            style={{ display: 'none' }}
            onChange={handleChangeProfilePicture}
          />
        </Box>
        <Flex direction="column" mt="65" ml="10">
          {isEditable ? (
            <>
              <Input
                isInvalid={userNameInput.length === 0}
                placeholder='Digite seu nome'
                variant="flushed"
                value={userNameInput}
                onChange={(e) => setUserNameInput(e.target.value)}
                width={userNameInput.length > 50 ? 'sm' : 'md'}
                mt={5}
              />
            </>
          ) : (
            <>
              <Text fontSize="3xl" fontWeight="bold" mt="10">
                {userName}
              </Text>
            </>
          )}
          {isEditable ? (
            <>
              <InputGroup>
                <InputLeftElement pointerEvents="none">@</InputLeftElement>
                <Input
                  isReadOnly
                  placeholder='Escolha um nome para seu usuário'
                  variant="flushed"
                  value={makeUserAtSymbol(userNameInput).split('@').join('')}
                  width={userLocationInput.length > 50 ? 'sm' : 'md'}
                />
              </InputGroup>
            </>
          ) : (
            <>
              <Text fontSize="1xs" fontWeight="bold" mt="1">
                {makeUserAtSymbol(userName)}
              </Text>
            </>
          )}
        </Flex>
        <Flex  direction="row" mt="10" ml="30"></Flex>
        <Box  width="30vw" h='12vh'>
          <SimpleGrid columns={2} columnGap={0}>
            <Box  h="5vh" w='30vw'>
              <Flex direction="row" ml="10" gap={2}>
                <IoLocationSharp />
                {isEditable ? (
                  <>
                    <Input
                      placeholder='Digite sua localização'
                      variant="flushed"
                      value={userLocationInput}
                      onChange={(e) => setUserLocationInput(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    {userLocation ? (
                      <Text fontSize="lg"                 
                      >
                        {userLocation}
                      </Text>
                    ) : (                  
                    <Text fontSize="lg">{'Não defifnido'}</Text>
                    )}
                  </>
                )}
              </Flex>
            </Box>
            <Box h="5vh" w='20vw' >
              <Flex direction="row"  gap={2}>
                <AiOutlineMail />
                {isEditable ? (
                  <>
                    <Input
                      placeholder='Digite seu e-mail'
                      isInvalid={!isValidEmail(userEmailInput)}
                      type="e-mail"
                      variant="flushed"
                      value={userEmailInput}
                      onChange={(e) => setUserEmailInput(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <Link fontSize="lg" href={`mailto:${userEmail}`}>
                      {userEmail}
                    </Link>
                  </>
                )}
              </Flex>
            </Box>
            <Box h="10vh" w='20vw'>
              <Flex direction="row" ml="10" gap={2}>
                <AiFillInstagram />
                {isEditable ? (
                  <>
                    <Input
                      placeholder='Digite seu instagram'
                      variant="flushed"
                      value={userInstagramInput}
                      onChange={(e) => setUserInstagramInput(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    {userInstagram ? (
                      <Link
                        fontSize="lg"
                        href={`https://www.instagram.com/${userInstagram}`}
                      >
                        {userInstagram}
                      </Link>
                    ) : (
                      <Text fontSize="lg">{'Não definido'}</Text>
                    )}
                  </>
                )}
              </Flex>
            </Box>
            <Box h="10vh" w='30vw'>
              <Flex direction="row" gap={2}>
                <AiOutlineWhatsApp />
                {isEditable ? (
                  <>
                    <Input
                      placeholder='Digite seu Whatsapp'
                      variant="flushed"
                      value={userWhatsAppInput}
                      onChange={(e) => setUserWhatsAppInput(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    {userWhatsApp ? (
                      <Link
                        fontSize="lg"
                        href={`https://api.whatsapp.com/send?phone=55${userWhatsApp}`}
                      >
                        {userWhatsApp}
                      </Link>
                    ) : (
                      <Text fontSize="lg">{'Usuário não tem whatsapp'}</Text>
                    )}
                  </>
                )}
              </Flex>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
}
