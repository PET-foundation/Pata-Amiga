import { CreatePostForm } from "@/components/CreatePostForm";
import PostServieceMethods from "@/service/axios/posts/postsRequests";
import UserServiceMethods from "@/service/axios/user/userRequests";
import { popUplaert } from "@/utils/alerts/popUpAlert";
import { Post } from "@/utils/types/CreatePost";
import { alertTypes } from "@/utils/types/alertTypes";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Image, background} from "@chakra-ui/react";
import backpg from '/public/img/backpg.png';

function Create() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession(); 
  const { push } = useRouter();


  const handleCreatePost = async (post: Post) => {
    try {
      setIsSubmitting(true);
      const userResponse = await UserServiceMethods.getUserTheirSelf(
        session.user.token,
      );

      const postToCreate: Post = {
        ...post,
        userUuid: userResponse.uuid
      }

      const response = await PostServieceMethods.createPost(postToCreate, session.user.token);
      setIsSubmitting(false);
      if(response) {
        popUplaert('post criado com sucesso', alertTypes.SUCCESS);
        console.log(postToCreate);
        push('/profile');
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

export default Create;
