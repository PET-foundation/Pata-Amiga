import { areYouSureAlert } from '@/utils/alerts/areYouSureAlert';
import {
  Center,
  Container,
  Flex,
  Image,
  Text,
  VStack,
  Link,
  Button,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';

interface PostPreviewProps {
  profilePicture?: string;
  userName: string;
  postCreatedAt?: string;
  description: string;
  postUuid: string;
  postImage?: string;
  userUuid?: string;
  postUserUuid?: string;
}

export function PostPreview({
  profilePicture,
  userName,
  postCreatedAt,
  description,
  postUuid,
  postImage,
  userUuid,
  postUserUuid,

}: PostPreviewProps) {
  const { data: session, status } = useSession();
  console.log(`userUuid: ${userUuid} e postUserUuid: ${postUserUuid}`);

  const getPostCreatedAt = (postCreatedAt: string) => {
    const currentDate = new Date();
    const postDate = new Date(postCreatedAt);
    return currentDate.getHours() - postDate.getHours();
  };

  const isUserOwnerOfPost = () => {
    return userUuid === postUserUuid;
  }

  const onDeletePost = () => {
    console.log(`deleting post ${postUuid}`);
    areYouSureAlert(postUuid, session.user.token)
  }

  return (
    <>
      <VStack>
        <Container
          maxW="container.sm"
          borderTopRadius={10}
          bg="yellow.300"
          color="black"
          border="5px solid"
          borderColor="black"
        >
          <Flex direction="row" w="100%" gap={8} alignItems="center">
            <Image
              src={
                profilePicture ? profilePicture : 'https://bit.ly/dan-abramov'
              }
              alt="Banner Image"
              borderRadius="full"
              boxSize="8vh"
            />
            <Text fontSize="lg">@{userName}</Text>
            <Text fontSize="lg">
              {postCreatedAt ? `${getPostCreatedAt(postCreatedAt)}` : 'sem informação'}h
            </Text>
           {userUuid == postUserUuid && (
              <Flex direction='row' ml={20} gap={5}>
                <Button 
                  as={Link}
                  variant='solid' 
                  color='blue.400' 
                  leftIcon={<AiFillEdit/>}
                  href={`/posts/${postUuid}/edit`}
                  />
                <Button 
                  color='red.400' 
                  leftIcon={<AiFillDelete/>}
                  onClick={onDeletePost}
                  />
              </Flex>
           )}
          </Flex>
        </Container>
        <Link href={`/posts/${postUuid}`} fontStyle="unset">
          <Container
            maxW="container.sm"
            bg="white"
            color="black"
            border="5px solid"
            borderColor="black"
          >
            <Flex
              direction="column"
              w="100%"
              gap={8}
              alignItems="center"
              paddingTop="3"
            >
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
                ver mais...
              <Center borderRadius={10}>
                <Flex
                  direction="row"
                  w="100%"
                  bg="blue.500"
                  gap={8}
                  alignItems="center"
                >
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