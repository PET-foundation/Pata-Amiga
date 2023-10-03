import { PostSession } from '@/components/PostSession';
import { ProfileHeader } from '@/components/ProfileHeader';
import PostServieceMethods from '@/service/axios/posts/postsRequests';
import UserServiceMethods from '@/service/axios/user/userRequests';
import {
  PostPreviewPros,
  PostResponse,
  userResponse,
} from '@/service/axios/user/userResponses';
import { Box, Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';

interface ProfileProps {
  userResponseAPI: userResponse;
  postsResponseAPI?: PostResponse[];
}

function Profile({ userResponseAPI, postsResponseAPI }: ProfileProps) {

  console.log(userResponseAPI.name);
  
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
      });
    });
    console.log(`postPreview: ${postPreview}`);
    return postPreview;
  };
  if (postsResponseAPI.length > 0) {
    const userPosts = convertPostsToPostPreview(postsResponseAPI);
    console.log(userPosts);
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
        <PostSession
          posts={
            postsResponseAPI.length > 0
              ? convertPostsToPostPreview(postsResponseAPI)
              : posts
          }
          userName={userResponseAPI.name}
          profilePicture={userResponseAPI.profilePicture}
        />
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

  let userResponseAPI: userResponse;
  let postsResponseAPI: PostResponse[];

  try {
    const userResponse = await UserServiceMethods.getUserTheirSelf(
      session.user.token,
    );
    userResponseAPI = userResponse;
    const post = await PostServieceMethods.getAllPostsFromUser(
      userResponseAPI.uuid,
      session.user.token,
    );

    postsResponseAPI = post;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      session,
      userResponseAPI: userResponseAPI,
      postsResponseAPI: postsResponseAPI,
    },
  };
};
