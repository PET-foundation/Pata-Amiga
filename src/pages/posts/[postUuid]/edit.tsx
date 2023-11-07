import { CreatePostForm } from "@/components/CreatePostForm";
import PostServieceMethods from "@/service/axios/posts/postsRequests";
import { PostResponse } from "@/service/axios/user/userResponses";
import { popUplaert } from "@/utils/alerts/popUpAlert";
import { Post } from "@/utils/types/CreatePost";
import { alertTypes } from "@/utils/types/alertTypes";
import { Alert, Flex, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { Image, background, Box, Link} from "@chakra-ui/react";
import backpg from '/public/img/backpg.png';

interface EditProps {
  postResponseAPI: PostResponse;
}

function Edit({postResponseAPI}: EditProps) {
  const { data: session, status } = useSession();
  const {push} = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdatePost = async (post: Post) => {
    const postUuid = postResponseAPI.uuid;
    const token = session.user.token;
    const postToUpdate = post;
    console.log(post);
    setIsSubmitting(true);
    const response = await PostServieceMethods.updatePostByUuid(postUuid, token, postToUpdate);
    if(response) {
      setIsSubmitting(false);
      popUplaert('Post atualizado com sucesso!', alertTypes.SUCCESS);
     await push(`/posts/${postUuid}`);
    }
  }

  return (
      <Box backgroundImage="url('/img/background-render.png')"
           backgroundSize="100% 100%"
           backgroundPosition="center"
           width="100vw"
           height="100vh">
    <Flex alignItems="center" justifyContent="center" >
    <Link href='/'>
      <Image src={backpg.src} h='5vh' position='absolute' top='50' left='300'  alt='voltar' />
    </Link>
      <Flex direction="column" p={12} rounded={6} w='40vw'>
        <Heading mb={6}>Edição do Post</Heading>
        <CreatePostForm 
          onSubmit={handleUpdatePost} 
          isEdit={true}
          postResponse={postResponseAPI}
          />
      </Flex>
    </Flex>
    </Box>
  );
}

export default Edit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { postUuid } = params;
  const session = await getSession(context);
  
  console.log(`postUuid: ${postUuid} e params: ${params}`);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let postResponseAPI: PostResponse;

  try {
    const post = await PostServieceMethods.getPostByUuid(
      postUuid as string,
      session.user.token,
    );

    postResponseAPI = post;
  } catch (error) {
    console.log(error);
  }


  return {
    props: {
      session,
      postResponseAPI: postResponseAPI,
    },
  };
};