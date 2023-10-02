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
} from 'react-icons/ai';
import { use, useEffect, useRef, useState } from 'react';

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
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target.result;
        setProfileImage(base64Image.toString());
      };

      reader.readAsDataURL(file);
    }
  }

  function handleChangeBanner(event: any) {
    const file = event.target.files[0]; 

    if (file) {
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

  const updateUser = () => {
    if (isValidEmail(userEmailInput)) {
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
          <>
            <Button
              position="absolute"
              mt="30vh"
              ml="90vw"
              colorScheme="blue"
              variant="outline"
              rightIcon={<AiOutlineSave />}
            >
              Salvar perfil
            </Button>
          </>
        ) : (
          <Button
            as={Link}
            position="absolute"
            mt="30vh"
            ml="90vw"
            colorScheme="blue"
            variant="outline"
            href="/profile/edit"
            rightIcon={<AiFillEdit />}
          >
            editar perfil
          </Button>
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
                  variant="flushed"
                  value={makeUserAtSymbol(userNameInput).split('@').join('')}
                  onChange={(e) => setUserNameInput(e.target.value)}
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
