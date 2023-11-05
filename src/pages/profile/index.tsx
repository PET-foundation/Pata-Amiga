import { PostSession } from '@/components/PostSession';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ShelterPreview } from '@/components/ShelterPreview';
import { ShelterSession } from '@/components/ShelterSession';
import PostServieceMethods from '@/service/axios/posts/postsRequests';
import shelterServiceMethods from '@/service/axios/shelter/shelterRequest';
import { ShelterResponse } from '@/service/axios/shelter/shelterResponse';
import UserServiceMethods from '@/service/axios/user/userRequests';
import {
  PostPreviewPros,
  PostResponse,
  userResponse,
} from '@/service/axios/user/userResponses';
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';

interface ProfileProps {
  userResponseAPI: userResponse;
  postsResponseAPI?: PostResponse[];
  sheltersResponseAPI: ShelterResponse[];
}

interface ShelterPreview {
  shelterName: string;
  shelterDescription: string;
  shelterPicture: string;
  shelterBanner: string;
  shelterAddress: string;
  shelterUuid: string;
  numberOfAnimals: number;
}


function Profile({ userResponseAPI, postsResponseAPI, sheltersResponseAPI }: ProfileProps) {
  const [shelterResponse, setShelterResponse] = useState<ShelterResponse[]>(sheltersResponseAPI);
  const [userShelters, setUserShelters] = useState<ShelterPreview[]>([]);

  console.log(`SHELTERESSSSS ${sheltersResponseAPI}`);
  
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

  const onDeletePost = (postUuid: string) => {
    console.log(`deleting post ${postUuid}`);
  }

  const onEditProfile = () => {
    console.log('edit profile');
  };
  const posts: PostPreviewPros[] = [];
  return (
    <>
      <Head>
        <title>Profile | {userResponseAPI.name}</title>
      </Head>
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
            <PostSession
              posts={
                postsResponseAPI.length > 0
                  ? convertPostsToPostPreview(postsResponseAPI)
                  : posts
              }
              userName={userResponseAPI.name}
              profilePicture={userResponseAPI.profilePicture}
              userUuid={userResponseAPI.uuid}
            />
            </TabPanel>
            <TabPanel>
              <ShelterSession 
               sheltersToPrewiew={setShelterResponse.length > 0 ? convertSheleterToShelterPreview(shelterResponse) : []} 
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
