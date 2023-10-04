import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from '@chakra-ui/react';
import Link from 'next/link';
import { BsFillSearchHeartFill } from 'react-icons/bs';
import logo from '/public/img/logo.png';

interface TopMenuProps {
  profilePicture: string;
  userName: string;
  onClick: () => void;
  onSearch: (search: string) => void;
}

export function TopMenu({ profilePicture, onSearch }: TopMenuProps) {
  return (
    <Box bg="yellow.300" p={4} color="white" height="10vh">
      <Flex alignItems="center" height="5vh">
        <Box>
          <Link href="/">
            <Image boxSize="10vh" src={logo.src} alt="logo" />
          </Link>
        </Box>
        <Spacer />
        <Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BsFillSearchHeartFill color="gray.300" />
            </InputLeftElement>
            <Input
              variant="flushed"
              placeholder="Flushed"
              onChange={(e) => onSearch(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Spacer />
        <Box>
          <Link href="/profile">
            <Image
              borderRadius="full"
              boxSize="10vh"
              src={
                profilePicture ? profilePicture : 'https://bit.ly/dan-abramov'
              }
              alt="Dan Abramov"
            />
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
