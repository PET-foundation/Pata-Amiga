import { TopMenu } from '@/components/TopMenu';
import PostServieceMethods from '@/service/axios/posts/postsRequests';
import UserServiceMethods from '@/service/axios/user/userRequests';
import { PostPreviewPros, PostResponse, userResponse } from '@/service/axios/user/userResponses';
import { Link } from '@chakra-ui/next-js';
import { Button, Flex, Image, Text, Textarea } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import {AiOutlineSend} from 'react-icons/ai'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PostSession } from '@/components/PostSession';

interface HomeProps {
  userResponseAPI: userResponse;
  allPosts: PostResponse[];
}

export default function Home({ userResponseAPI, allPosts }: HomeProps) {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  const [posts, setPosts] = useState<PostResponse[]>(allPosts);
  const [postsConverted, setPostConverted] = useState<PostResponse[]>([]);
  const [search, setSearch] = useState('');

  if (status === 'authenticated') {
    console.log(JSON.stringify(session));
  }

  console.log(`profilePicture: ${userResponseAPI.profilePicture}`);

  const onClick = () => {};

  const onSearch = (search: string) => {
    console.log(search);
  };

   const convertPostsToPostPreview = (posts: PostResponse[]) => {
    const postPreview: PostPreviewPros[] = [];
    posts.map((post) => {
      postPreview.push({
        createdAt: post.createdAt,
        description: post.description,
        postPicture: post.picture,
        postUuid: post.uuid,
        dataPost: post.createdAt,
        location: post.location,
        userName: userResponseAPI.name,
        userPicture: userResponseAPI.profilePicture,
        userUuid: userResponseAPI.uuid,
        postUserUuid: post.userUuid,
      });
    });
    console.log(`postPreview: ${JSON.stringify(postPreview)}`);
    return postPreview;
  };
  
  const postArrayEmpty: PostPreviewPros[] = []

  if (status === 'loading') return <p>Loading</p>;
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <TopMenu
        profilePicture={userResponseAPI.profilePicture}
        onClick={onClick}
        userName="lasdfkj"
        onSearch={onSearch}
      />
      <Flex 
        direction="column" 
        alignItems="center"  
        ml={12}
        mr={12}
        mt={12}
        h='25vh'
        >
        <Text fontSize="2xl" color="blue.400" fontWeight="bold">
          Seja bem vindo de volta: {userResponseAPI.name}
        </Text>
        <Text fontSize="2xl" color="yellow.400" fontWeight="bold">
          Achou algum animal? Publique aqui!
        </Text>
        <Flex direction="row" 
        justifyContent="center"
         alignItems='center'
        w="100%" gap={12}
        onClick={() => push('/posts/create')}
        >
        <Textarea
          placeholder="Escreva aqui"
          size="lg"
          resize="none"
          bgColor="gray.100"
          color='black'
          isReadOnly
          w="50%"
          h="50%"
          mt={4}
        />
        <AiOutlineSend size={30}/>
        </Flex>
      </Flex>

      <Flex direction="column" alignItems="center" justifyContent="center">
        <PostSession 
          posts={posts.length > 0 ? convertPostsToPostPreview(posts) : postArrayEmpty}
          key={posts[0]?.uuid}
        />
      </Flex>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let userResponseAPI: userResponse;
  let allPosts: PostResponse[] = [];

  try {
    const response = await UserServiceMethods.getUserTheirSelf(
      session.user.token,
    );
      userResponseAPI = response;
    const data = await PostServieceMethods.getAllPosts();
    allPosts = data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      session,
      userResponseAPI,
      allPosts,
    },
  };
};
