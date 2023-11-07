import { Box, Container, Flex, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import {IoLocationOutline} from 'react-icons/io5';

interface ShelterPreviewProps {
  shelterName: string;
  shelterDescription: string;
  shelterPicture: string;
  shelterBanner: string;
  shelterAddress: string;
  shelterUuid: string;
  numberOfAnimals: number;
}

export function ShelterPreview({
  shelterName, 
  shelterDescription, 
  shelterAddress, 
  shelterBanner, 
  shelterPicture,
  numberOfAnimals,
  shelterUuid,
}: ShelterPreviewProps) {
  return (
    <VStack 
      h='32vh'
      mb={70}
      >
      <Container
        maxW="container.sm"
        maxH="10vh"
        borderTopRadius={10}
        bg="yellow.300"
        color="black"
        border="0.1vh solid"
        borderColor="black"
      >
        <Flex 
          direction='row' 
          alignItems='center'
          justifyContent='space-between' 
        >
          <Flex direction='row' alignItems='center' gap={2}>
            <IoLocationOutline />
            <Text mt={1}>{shelterAddress}</Text>
          </Flex>
          <Flex direction='row' alignItems='center' gap={2}>
            <Text mt={1} as='b'>Abrigo: </Text>
            <Text mt={1}>{shelterName}</Text>
          </Flex>
          <Flex direction='row' alignItems='center' gap={2}>
            <Text mt={1} as='b'>Número de animais: </Text>
            <Text mt={1}>{numberOfAnimals}</Text>
          </Flex>
        </Flex>
      </Container>
      <Container
        maxW="container.sm"
        h="100%"
        w="100%"
        borderBottomRadius={10}
        bg="white"
        color="black"
        border="0.1vh solid"
        borderColor="black"
        p={0}
        >
        <Link href={`/shelter/${shelterUuid}`}>
          <Flex
            direction="column"
            w="100%"
            h="100%"
          >
            <Image 
              src={shelterBanner} 
              alt="" 
              objectFit="cover"
              w="100%"
              h="70%"
              position='relative'
            />
            <Image
              src={shelterPicture}
              alt="Banner Image"
              borderRadius="full"
              boxSize="20vh"
              position='absolute'
              m={5}
            />
            <Text
              fontWeight="bold"
              textAlign="center"
              mt={10}
              noOfLines={2}
              mb={2}
            >
              {shelterDescription}
            </Text>
          </Flex>
        </Link>
      </Container>
    </VStack>
  );
}
