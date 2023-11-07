import { CreatePostForm } from "@/components/CreatePostForm";
import shelterServiceMethods from "@/service/axios/shelter/shelterRequest";
import UserServiceMethods from "@/service/axios/user/userRequests";
import { Post } from "@/utils/types/CreatePost";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import backpg from '/public/img/backpg.png';
import { alertTypes } from "@/utils/types/alertTypes";
import { popUplaert } from "@/utils/alerts/popUpAlert";
import { GetServerSideProps } from "next";

function CreatePost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession(); 
  const token = session?.user.token;
  const { push, query } = useRouter();

  const {shelterUuid} = query;

  const handleCreatePost = async (post: Post) => {
    try {
      setIsSubmitting(true);
      const userResponse = await UserServiceMethods.getUserTheirSelf(
        session.user.token,
      );

      const postToCreate: Post = {
        ...post,
        userUuid: userResponse.uuid,
      } 

      const response = await shelterServiceMethods.createPostForShelter(shelterUuid as string, token, postToCreate);
      setIsSubmitting(false);
      if(response) {
        popUplaert('post criado com sucesso', alertTypes.SUCCESS);
        push(`/shelter/${shelterUuid}`);
      }
      
    } catch (error) {
      popUplaert(`erro ao criar post ${error}`, alertTypes.ERROR);
      setIsSubmitting(false);
      console.log(error);
      
    }
  }
  return (
    <Box backgroundImage="url('/img/background-render.png')"
         backgroundSize="100% 100%"
         backgroundPosition="center"
         width="100vw"
         height="100vh">
    
    <Flex  alignItems="center" justifyContent="center">
    <Link href='/'>
      <Image src={backpg.src} h='5vh' position='absolute' top='50' left='300'  alt='voltar' />
    </Link>
      <Flex direction="column" p={12} rounded={6} w='40%'>
        <Heading mb={6}>Nova publicação</Heading>
      <CreatePostForm onSubmit={handleCreatePost} />
        </Flex>
      </Flex>
    </Box>
  );
}

export default CreatePost;

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

  return {
    props: {
      session,
    },
  };
};
