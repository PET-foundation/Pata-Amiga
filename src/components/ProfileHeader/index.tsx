import { Box, Button, Flex, Image, Link, SimpleGrid, Text } from '@chakra-ui/react';
import {IoLocationSharp} from 'react-icons/io5'
import {AiOutlineMail, AiFillInstagram, AiOutlineWhatsApp} from 'react-icons/ai'

interface ProfileHeaderProps {
  userName: string;
  profilePicture: string;
  userBanner: string;
  userLocation: string;
  userEmail: string;
  userInstagram: string;
  userWhatsApp: string;
  onClick?: () => void;
}

export function ProfileHeader({ 
  profilePicture, 
  userBanner, 
  userEmail, 
  userInstagram, 
  userLocation,
  userName,
  userWhatsApp,
  onClick
}: ProfileHeaderProps) {

  const makeUserAtSymbol = (userName: string) => {
    const userAtSymbol = '@'
    const userAtSymbolWithUserName = userAtSymbol + userName

    return userAtSymbolWithUserName
  }
  return (
    <>
    <Flex direction="column" w="100%">
      <Box w="100%" h="170px" bg="blue.500" position="relative">
        <Image
          src={userBanner? userBanner : 'https://bit.ly/2Z4KKcF'}
          alt="Banner Image"
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>
      <Button 
        position="absolute" 
        mt="30vh" 
        ml="90vw" 
        colorScheme="blue" 
        variant="outline"
        onClick={onClick}
        >
        editar perfil
      </Button>
      <Box position="absolute" mt="100" ml="5">
      <Image
          src={profilePicture ? profilePicture : 'https://bit.ly/dan-abramov'}
          alt="Banner Image"
          borderRadius='full'
          boxSize='25vh'
        />
      </Box>
      <Flex direction="column" mt="100" ml="30">
        <Text fontSize="3xl" fontWeight="bold" mt="10">
          {userName}
        </Text>
        <Text fontSize="xs" fontWeight="bold" mt="1">
          {makeUserAtSymbol(userName)}
        </Text>
      </Flex>
      <Flex direction="row" mt="10" ml="30">
      </Flex>
      <Box width="500px">
        <SimpleGrid columns={2} rowGap={0} columnGap={0}>
          <Box height='80px' width="260px">
            <Flex direction="row" mt="10" ml="10" gap={2}>
            <IoLocationSharp />
            <Text fontSize="lg">{userLocation}</Text>
            </Flex>
          </Box>
          <Box height='80px' width="400px">
          <Flex direction="row" mt="10" ml="10" gap={2}>
            <AiOutlineMail />
            <Link fontSize="lg" href={`mailto:${userEmail}`}>{userEmail}</Link>
          </Flex>
          </Box>
          <Box height='80px' width="260px">
            <Flex direction="row" mt="10" ml="10" gap={2}>
              <AiFillInstagram />
              {userInstagram ? 
                <Link fontSize="lg" href={`https://www.instagram.com/${userInstagram}`}>{userInstagram}</Link>
                : 
                <Text fontSize="lg">
                  {'usuário não tem instagram'}
                </Text>
              }
            </Flex>
          </Box>
          <Box height='80px' width="260px">
          <Flex direction="row" mt="10" ml="10" gap={2}>
            <AiOutlineWhatsApp />
            {userWhatsApp ? 
              <Link fontSize="lg" href={`https://api.whatsapp.com/send?phone=55${userWhatsApp}`}>{userWhatsApp}</Link>
              : 
              <Text fontSize="lg">
                {'usuário não tem whatsapp'}
              </Text>
            }
            
          </Flex>
          </Box>
        </SimpleGrid>
      </Box>
      
    </Flex>
    
    </>
  );
}
