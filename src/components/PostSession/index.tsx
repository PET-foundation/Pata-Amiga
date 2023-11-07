import { ReactNode } from 'react';
import { PostPreview } from '../PostPreview';
import { Box, Button, Center, Flex, Image, Link, Text } from '@chakra-ui/react';
import notFoundPost from '/public/img/posts_not_found.png';
import { PostPreviewPros, PostResponse, userResponse } from '@/service/axios/user/userResponses';
import { useRouter } from 'next/router';

interface PostSessionProps {
  posts: PostPreviewPros[];
  userName?: string;
  profilePicture?: string;
  userUuid?: string;
}

export function PostSession({
  posts,
  profilePicture,
  userName,
}: PostSessionProps) {
  const router = useRouter();
  const handleRedirectToCreatePost = async () => {
    await router.push('/posts/create');
  };

  return (
    <Box w="100vw">
      <Flex direction="column" p={10} gap={2}>
        {posts.length > 0 ? (
            posts.map((post) => (
              <PostPreview
                key={post.postUuid}
                description={post.description}
                postUuid={post.postUuid}
                postCreatedAt={post.createdAt}
                postImage={post.postPicture? post.postPicture : ''}
                profilePicture={post.userPicture}
                userName={post.userName}
                userUuid={post.userUuid ? post.userUuid : ''}
                postUserUuid={post.postUserUuid ? post.postUserUuid : ''}
            />
          ))
        ) : (
          <>
            <Image
              src={notFoundPost.src}
              alt="Banner Image"
              boxSize="30vh"
              alignSelf="center"
            />
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="blue.500"
              textAlign="center"
            >
              Você ainda <br />
              não tem nenhum post
            </Text>
            <Button
              colorScheme="blue"
              size="lg"
              mt={5}
              maxW="30vh"
              alignSelf="center"
              onClick={handleRedirectToCreatePost}
            >
              🐾Crie seu primeiro post🐾
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
}
{
  /*<Flex direction="column" p={5} gap={3}>
      <PostPreview 
      description='fdasasff afdsfas fadjslfaksfdjalsfjasdlf Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sed cupiditate numquam optio obcaecati voluptates sequi repudiandae aliquid debitis ullam aperiam sint. Cum, natus libero dignissimos nostrum molestiae suscipit voluptatem.' 
      postUuid='fsdjaç'
      />
      </Flex> */
}
