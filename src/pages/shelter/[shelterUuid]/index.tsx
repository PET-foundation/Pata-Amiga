import { PostSession } from "@/components/PostSession";
import { ShelterHeader } from "@/components/ShelterHeader";
import { TopMenu } from "@/components/TopMenu";
import shelterServiceMethods from "@/service/axios/shelter/shelterRequest";
import UserServiceMethods from "@/service/axios/user/userRequests";
import { PostPreviewPros, PostResponse, ShelterResponse, userResponse } from "@/service/axios/user/userResponses";
import { Button, Flex } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticPaths } from "next";
import { GetSessionParams, getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

interface PageViewProps {
  shelterResponseAPI: ShelterResponse;
  userResponseAPI: userResponse;
  postResponseAPI: PostResponse[];
}

function PageView({shelterResponseAPI, userResponseAPI, postResponseAPI}: PageViewProps) {
  const [shelter, setShelter] = useState<ShelterResponse>(shelterResponseAPI);
  const {push} = useRouter()

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

  const handleRedirectToCreatePost = async() => {
    await push(`/shelter/${shelter.uuid}/create`);
  }

  return (
    <>
      <Head>
        <title>{shelter.name}</title>
      </Head>
      <TopMenu 
        profilePicture={userResponseAPI.profilePicture}
        userName={userResponseAPI.name}
        onClick={() => {}}
        onSearch={() => {}}
      />
      <ShelterHeader 
        shelterName={shelter.name}
        shelterBaner={shelter.banner} 
        shelterLogo={shelter.profilePicture}
        shelterPixQrCode={shelter.pixKey}
        shelterContact={shelter.contact}
        shelterLocation={shelter.location}
        shelterAdoptionRules={shelter.adoptionPolice}
        shelterDescription={shelter.description}
        shelterOwners={shelter.owners}
        userUuid={userResponseAPI.uuid}
        shelterUuid={shelter.uuid}
      />
      {shelter.owners.includes(userResponseAPI.uuid) && (
        <Flex justifyContent="center" alignItems="center" mt="4">
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
      )}
      <PostSession 
        posts={convertPostsToPostPreview(postResponseAPI)}
        userName={userResponseAPI.name}
        profilePicture={userResponseAPI.profilePicture}
        userUuid={userResponseAPI.uuid}
      />
    </>
  );
}

export default PageView;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { shelterUuid } = params;
  const session = await getSession(context);
  const token = session.user.token;

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let shelterResponseAPI: ShelterResponse;
  let userResponseAPI: userResponse;
  let postResponseAPI: PostResponse[];
  try {
    const shelters = await shelterServiceMethods.getShelterByUuid(shelterUuid as string,token)
    shelterResponseAPI = shelters;
    const user = await UserServiceMethods.getUserTheirSelf(token);
    userResponseAPI = user;
    const allPostsFromShelter = await shelterServiceMethods.getAllPostsFromShelter(shelterUuid as string, token);
    postResponseAPI = allPostsFromShelter;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      session,
      shelterResponseAPI: shelterResponseAPI,
      userResponseAPI: userResponseAPI,
      postResponseAPI: postResponseAPI,
    },
  };
};

