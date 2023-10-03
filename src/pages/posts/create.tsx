import { CreatePostForm } from "@/components/CreatePostForm";
import PostServieceMethods from "@/service/axios/posts/postsRequests";
import UserServiceMethods from "@/service/axios/user/userRequests";
import { popUplaert } from "@/utils/alerts/popUpAlert";
import { Post } from "@/utils/types/CreatePost";
import { alertTypes } from "@/utils/types/alertTypes";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

function Create() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession(); 


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
      }
      
    } catch (error) {
      popUplaert(`erro ao criar post ${error}`, alertTypes.ERROR);
      setIsSubmitting(false);
      console.log(error);
      
    }
  }
  return (
    <Flex alignItems="center" justifyContent="center" >
      <Flex direction="column" p={12} rounded={6} w='55%'>
        <Heading mb={6}>Criar Post</Heading>
      <CreatePostForm onSubmit={handleCreatePost} />
      </Flex>
    </Flex>
  );
}

export default Create;
