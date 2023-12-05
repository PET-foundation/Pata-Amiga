import { TopMenu } from '@/components/TopMenu';
import PostServieceMethods from '@/service/axios/posts/postsRequests';
import UserServiceMethods from '@/service/axios/user/userRequests';
import { PostPreviewPros, PostResponse, ShelterResponse, userResponse } from '@/service/axios/user/userResponses';
import { AbsoluteCenter, Box, Divider, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import {AiOutlineSend} from 'react-icons/ai'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PostSession } from '@/components/PostSession';
import salci from '/public/img/kchorrosalci.png';
import caramelo from '/public/img/caramelo.gif';
import { ShelterSession } from '@/components/ShelterSession';
import shelterServiceMethods from '@/service/axios/shelter/shelterRequest';
import { ShelterPreview } from './profile';

interface HomeProps {
  userResponseAPI: userResponse;
  allPosts: PostResponse[];
  sheltersResponse: ShelterResponse[];
}

export default function Home({ userResponseAPI, allPosts, sheltersResponse }: HomeProps) {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  const [posts, setPosts] = useState<PostResponse[]>(allPosts);
  const [sheltersAll, setSheltersAll] = useState<ShelterResponse[]>(sheltersResponse);
  const [postsConverted, setPostConverted] = useState<PostResponse[]>([]);
  const [search, setSearch] = useState('');

  console.log(`SHELTERESSSSS ${JSON.stringify(sheltersResponse)}`);

  const onClick = () => {};

  const onSearch = (serachInput: string) => {
    setSearch(serachInput);
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
        userName: post.userName,
        userPicture: post.userPicture,
        userUuid: userResponseAPI.uuid,
        postUserUuid: post.userUuid,
      });
    });
    return postPreview;
  };

  const convertSheltersToShelterPreview = (shelters: ShelterResponse[]) => {
    const shelterPreview: ShelterPreview[] = [];
    shelters.map((shelter) => {
      shelterPreview.push({
        shelterName: shelter.name,
        shelterUuid: shelter.uuid,
        shelterPicture: shelter.profilePicture,
        shelterAddress: shelter.location,
        shelterDescription: shelter.description,
        shelterBanner: shelter.banner,
        numberOfAnimals: 10,
      });
    });
    return shelterPreview;
  }

  useEffect(() =>{
    const postsFiltered = posts.filter((post) => 
      post.description.toLowerCase()
      .includes(search.toLowerCase())
    );
    setPosts(postsFiltered);
    if (search === '') {
      setPosts(allPosts);
    }
  }, [search])
  
  const postArrayEmpty: PostPreviewPros[] = []

  if (status === 'loading') return <p>Loading</p>;   
   
  return (
    <div className="content">
      <Head>
        <title>Home</title>
      </Head>
      <TopMenu
        profilePicture={userResponseAPI.profilePicture}
        onClick={onClick}
        userName="lasdfkj"
        onSearch={onSearch}
      />
      <Flex direction="row" align="center" justify="center" h="20vh">
        <Image src={caramelo.src} h='180px' objectFit="contain" alt="caramelo" />
        <Flex direction="row-reverse" align="center" justify="center" h="20vh" gap={60}>
      <Image src={salci.src} h='180px' objectFit="contain" alt="salcicha" />
      <Flex direction="column" alignItems="center" ml={350} mr={12} mt={7} h='18vh' >
        <Text fontSize="2xl" color="blue.400" fontWeight="bold" mr={35}>
          Bem-vindo: {userResponseAPI.name}
        </Text>

        <Flex direction="row" 
        justifyContent="center" alignItems='center' w="150%" gap={3}
        onClick={() => push('/posts/create')}
        >
        <Textarea
          placeholder="Achou algum animal? Publique aqui!"
          size="lg"
          resize="none"
          bgColor="blue.50"
          color='black'
          isReadOnly
          w="34vh"
          mt={2}
          mb={2}
        />
        <AiOutlineSend size={40}/>
        </Flex>
      </Flex>
      </Flex>
      </Flex>
      <Tabs isFitted variant='enclosed' mt={17}>
        <TabList mb='1em'>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Posts</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Abrigos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          <Box position='relative' padding='10'>
            <Divider colorScheme="blue" borderColor='red.100'/>
            <AbsoluteCenter bg='white' px='4'>
              Feed de Posts
            </AbsoluteCenter>
          </Box>
          <Flex direction="column" alignItems="center" justifyContent="center">
            <PostSession 
              posts={posts.length > 0 ? convertPostsToPostPreview(posts) : postArrayEmpty}
              key={posts[0]?.uuid}
            />
          </Flex>
          </TabPanel>
          <TabPanel>
          <Box position='relative' padding='10'>
            <Divider colorScheme="blue" borderColor='red.100'/>
            <AbsoluteCenter bg='white' px='4'>
              Feed de Abrigos
            </AbsoluteCenter>
          </Box>
          <ShelterSession 
          sheltersToPrewiew={
            sheltersAll.length > 0 ? convertSheltersToShelterPreview(sheltersAll) : []
          }
          />
          </TabPanel>
        </TabPanels>
      </Tabs>
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
  let sheltersResponse: ShelterResponse[] = [];

  try {
    const response = await UserServiceMethods.getUserTheirSelf(
      session.user.token,
    );
      userResponseAPI = response;
    const data = await PostServieceMethods.getAllPosts();
    allPosts = data;
    const shelters = await shelterServiceMethods.getAllShelters(session.user.token);
    sheltersResponse = shelters;

  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      session,
      userResponseAPI,
      allPosts,
      sheltersResponse,
    },
  };
};
