import { PostSession } from '@/components/PostSession';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ShelterPreview } from '@/components/ShelterPreview';
import { ShelterSession } from '@/components/ShelterSession';
import { TopMenu } from '@/components/TopMenu';
import PostServieceMethods from '@/service/axios/posts/postsRequests';
import shelterServiceMethods from '@/service/axios/shelter/shelterRequest';
import { ShelterResponse } from '@/service/axios/shelter/shelterResponse';
import UserServiceMethods from '@/service/axios/user/userRequests';
import {
  PostPreviewPros,
  PostResponse,
  userResponse,
} from '@/service/axios/user/userResponses';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ProfileProps {
  userResponseAPI: userResponse;
  postsResponseAPI?: PostResponse[];
  sheltersResponseAPI: ShelterResponse[];
}

export interface ShelterPreview {
  shelterName: string;
  shelterDescription: string;
  shelterPicture: string;
  shelterBanner: string;
  shelterAddress: string;
  shelterUuid: string;
  numberOfAnimals: number;
}


function Profile({ userResponseAPI, postsResponseAPI, sheltersResponseAPI }: ProfileProps) {
  const [postsResponse, setPostsResponse] = useState<PostResponse[]>(postsResponseAPI);
  const [shelterResponse, setShelterResponse] = useState<ShelterResponse[]>(sheltersResponseAPI);
  const [userShelters, setUserShelters] = useState<ShelterPreview[]>([]);
  const [search, setSearch] = useState('');

  const router = useRouter();

  console.log(`SHELTERESSSSS ${JSON.stringify(sheltersResponseAPI[0])}`);
  
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
    return postPreview;
  };
  if (postsResponseAPI.length > 0) {
    const userPosts = convertPostsToPostPreview(postsResponseAPI);
    console.log(userPosts);
  }

  const convertSheleterToShelterPreview = (shelters: ShelterResponse[]) => {
    const shelterPreview: ShelterPreview[] = [];
    shelters.map((shelter) => {
      shelterPreview.push({
        shelterAddress: shelter.location,
        shelterBanner: shelter.banner,
        shelterDescription: shelter.description,
        shelterName: shelter.name,
        shelterPicture: shelter.profilePicture,
        shelterUuid: shelter.uuid,
        numberOfAnimals: 10,
      });
    });
    return shelterPreview;
  }

  const handleRedirectToCreatePost = async() => {
    await router.push('/posts/create');
  }

  const onEditProfile = () => {
    console.log('edit profile');
  };

  useEffect(() => {
    const shelterFiltered = shelterResponse.filter((shelter) => 
      shelter.name.toLowerCase().includes(search.toLowerCase())
    )

    setShelterResponse(shelterFiltered);

    const postsFiltered = postsResponse.filter((post) => 
      post.description.toLowerCase().includes(search.toLowerCase())
    );

    setPostsResponse(postsFiltered);

    if(search === '') {
      setShelterResponse(sheltersResponseAPI);
      setPostsResponse(postsResponseAPI);
    }

  },[search])
  
  const posts: PostPreviewPros[] = [];
  return (
    <>
      <Head>
        <title>Profile | {userResponseAPI.name}</title>
      </Head>
      <TopMenu 
        userName={userResponseAPI.name}
        profilePicture={userResponseAPI.profilePicture}
        onClick={() => {}}
        onSearch={setSearch}
      />
      <Flex direction="column">
        <ProfileHeader
          profilePicture={userResponseAPI.profilePicture}
          userBanner={userResponseAPI.banner}
          userEmail={userResponseAPI.email}
          userInstagram={userResponseAPI.contact.instagram}
          userLocation={userResponseAPI.contact.facebook}
          userName={userResponseAPI.name}
          userWhatsApp={userResponseAPI.contact.whatsapp}
        />
        <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
            <Tab 
            _selected={{ 
              color: 'white', 
              bg: 'blue.500' 
            }}
            >
              Meus Posts
            </Tab>
            <Tab 
            _selected={{ 
              color: 'white', 
              bg: 'blue.500' 
              }}
              >
                Meus abrigos
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <Flex 
              direction='column' 
              justifyContent='space-between' 
              alignItems='center'
              mb={10}
              >
              <Text fontSize='2xl' fontWeight='bold'>
                Crie novos Posts
              </Text>
              <Button
                onClick={handleRedirectToCreatePost}
                colorScheme="blue"
                size="lg"
                mt={5}
                maxW="30vh"
                alignSelf="center">
                🐾 Criar Post 🐾
              </Button>
            </Flex>
            <PostSession
              posts={
                postsResponseAPI.length > 0
                  ? convertPostsToPostPreview(postsResponse)
                  : posts
              }
              userName={userResponseAPI.name}
              profilePicture={userResponseAPI.profilePicture}
              userUuid={userResponseAPI.uuid}
            />
            </TabPanel>
            <TabPanel>
              <ShelterSession 
               sheltersToPrewiew={setShelterResponse.length > 0 ? 
                convertSheleterToShelterPreview(shelterResponse) : []
              } 
            />
              
            </TabPanel>
          </TabPanels>
        </Tabs>
       
      </Flex>
    </>
  );
}

export default Profile;

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

  const token = session.user.token;

  let userResponseAPI: userResponse;
  let postsResponseAPI: PostResponse[];
  let sheltersResponseAPI: ShelterResponse[];

  try {
    const userResponse = await UserServiceMethods.getUserTheirSelf(
      token,
    );
    userResponseAPI = userResponse;

    const post = await PostServieceMethods.getAllPostsFromUser(
      userResponseAPI.uuid,
      token,
    );
    postsResponseAPI = post;
    console.log('Before shelters')

    const shelters = await shelterServiceMethods.getAllSheltersByUser(userResponseAPI.uuid, token);
    console.log(`shelters: ${shelters}`);
    sheltersResponseAPI = shelters;
    
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      session,
      userResponseAPI: userResponseAPI,
      postsResponseAPI: postsResponseAPI,
      sheltersResponseAPI: sheltersResponseAPI,
    },
  };
};
