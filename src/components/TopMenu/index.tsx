import {
  Box, Text,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from '@chakra-ui/react';
import Link from 'next/link';
import { BsFillSearchHeartFill } from 'react-icons/bs';
import imagemlogin from '/public/img/imagemlogin.png';
import perfil from '/public/img/perfil.png';

interface TopMenuProps {
  profilePicture: string;
  userName: string;
  onClick: () => void;
  onSearch: (search: string) => void;
}

export function TopMenu({ profilePicture, onSearch }: TopMenuProps) {
  return (
    <Box bg="yellow.300" p={2} color="white" height="7vh">
      <Flex alignItems="center" height="5vh">
        <Box>
          <Link href="/">
            <Image boxSize="5vh" src={imagemlogin.src} alt="logo" h="50px" w="100px" />
          </Link>
        </Box>
        <Spacer />
        <Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BsFillSearchHeartFill color="blue.300" />
            </InputLeftElement>
            <Input
              alignItems="center"
              mr="50"
              variant="flushed"
              placeholder="Pesquisa"
              onChange={(e) => onSearch(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Spacer />
        <Box>
          <Link href="/profile">
            <Flex align="center">
            <Text marginRight="2" fontSize="1xl"
                  fontWeight="bold"
                  color="blue.500"
                  textAlign="center">Perfil</Text>
            <Image
              borderRadius="full"
              boxSize="5vh"
              src={
                profilePicture ? profilePicture : perfil.src
              }
              alt="Perfil"
            />
            </Flex>
          </Link>
          </Box>
      </Flex>
    </Box>
  );
}
