import { Box, Image } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ProfileHeaderProps {
  
}

export function ProfileHeader({  }: ProfileHeaderProps) {
  return (
    <Box w="100%" h="170px" bg="blue.500" position="relative">
      <Image
        src="https://github.com/MatheusVict.png"
        alt="Banner Image"
        objectFit="cover"
        w="100%"
        h="100%"
      />
    </Box>
  );
}
