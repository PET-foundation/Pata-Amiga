import { Center, Container, Flex, Image, Text, VStack, Link } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PostPreviewProps {
  profilePicture?: string;
  userName?: string;
  postCreatedAt?: string;
  description: string;
  postUuid: string;
  postImage?: string;
}

export function PostPreview({ 
  profilePicture, 
  userName, 
  postCreatedAt, 
  description, 
  postUuid,
  postImage
}: PostPreviewProps) {
  const getPostCreatedAt = (postCreatedAt: string) => {
    return new Date(postCreatedAt).toLocaleDateString()
  }
  return (
    <>
  <VStack>
    <Container maxW='container.sm' borderTopRadius={10} bg='yellow.300' color='black' border="5px solid" borderColor="black">
      <Flex direction="row" w="100%" gap={8} alignItems="center">
        <Image
          src={profilePicture ? profilePicture : 'https://bit.ly/dan-abramov'}
          alt="Banner Image"
          borderRadius='full'
          boxSize='8vh'
        />
        <Text fontSize="lg">@{userName ? userName : "oi"}</Text>
        <Text fontSize="lg">{postCreatedAt ? `${getPostCreatedAt}`: "sem informação"}h</Text>
      </Flex>
    </Container>
    <Link href={`/posts/${postUuid}`} fontStyle='unset'>
    <Container maxW='container.sm' bg='white' color='black' border="5px solid" borderColor="black">
      <Flex direction="column" w="100%" gap={8} alignItems="center" paddingTop="3">
        <Text 
          fontSize="lg" 
          fontWeight="bold" 
          textAlign="center" 
          whiteSpace="pre-wrap"
          borderRadius={10}
          noOfLines={4}
        >
          {description}
        </Text>
        <Link href={`/posts/${postUuid}`} fontStyle='unset'>ver mais...</Link>
        <Center borderRadius={10}>
          <Flex direction="row" w="100%" bg="blue.500"  gap={8} alignItems="center">
            <Image 
              src={postImage ? postImage : 'https://bit.ly/2Z4KKcF'} 
              alt="Banner Image" 
              maxH="100%"
              maxW="100%"
              borderRadius={10}
              border="5px solid" 
              borderColor="black"
            />
          </Flex>
        </Center>
      </Flex>
    </Container>
    </Link>
  </VStack>
</>

  );
}
