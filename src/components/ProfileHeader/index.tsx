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
          h="170px"
          bg="blue.500"
          position="relative"
          _hover={isEditable && { opacity: '0.5' }}
          onClick={handleBoxClickImageBanner}
        >
          {!isEditable && (
            <Button
              as={Link}
              position="absolute"
              mt="10"
              ml="10"
              colorScheme="blue"
              variant="solid"
              href="/"
              rightIcon={<AiOutlineArrowLeft />}
            ></Button>
          ) }
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
          <Flex direction='column' gap={5} position="absolute"
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
              editar perfil
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
        <Flex direction="column" mt="100" ml="30">
          {isEditable ? (
            <>
              <Input
                isInvalid={userNameInput.length === 0}
                placeholder='Aqui irá ficar o seu nome, que é o seu userName'
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
                  placeholder='Aqui irá ficar o seu @, que é o seu userName'
                  variant="flushed"
                  value={makeUserAtSymbol(userNameInput).split('@').join('')}
                  width={userLocationInput.length > 50 ? 'sm' : 'md'}
                />
              </InputGroup>
            </>
          ) : (
            <>
              <Text fontSize="xs" fontWeight="bold" mt="1">
                {makeUserAtSymbol(userName)}
              </Text>
            </>
          )}
        </Flex>
        <Flex direction="row" mt="10" ml="30"></Flex>
        <Box width="500px">
          <SimpleGrid columns={2} rowGap={0} columnGap={0}>
            <Box height="80px" width="260px">
              <Flex direction="row" mt="10" ml="10" gap={2}>
                <IoLocationSharp />
                {isEditable ? (
                  <>
                    <Input
                      placeholder='Aqui irá ficar a sua localização'
                      variant="flushed"
                      value={userLocationInput}
                      onChange={(e) => setUserLocationInput(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <Text fontSize="lg">{userLocation}</Text>
                  </>
                )}
              </Flex>
            </Box>
            <Box height="80px" width="400px">
              <Flex direction="row" mt="10" ml="10" gap={2}>
                <AiOutlineMail />
                {isEditable ? (
                  <>
                    <Input
                      placeholder='Aqui irá ficar o seu email'
                      isInvalid={!isValidEmail(userEmailInput)}
                      type="email"
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
            <Box height="80px" width="260px">
              <Flex direction="row" mt="10" ml="10" gap={2}>
                <AiFillInstagram />
                {isEditable ? (
                  <>
                    <Input
                      placeholder='Aqui irá ficar o seu instagram se você tiver'
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
                      <Text fontSize="lg">{'usuário não tem instagram'}</Text>
                    )}
                  </>
                )}
              </Flex>
            </Box>
            <Box height="80px" width="260px">
              <Flex direction="row" mt="10" ml="10" gap={2}>
                <AiOutlineWhatsApp />
                {isEditable ? (
                  <>
                    <Input
                      placeholder='Aqui irá ficar o seu whatsapp se você tiver'
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
                      <Text fontSize="lg">{'usuário não tem whatsapp'}</Text>
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
