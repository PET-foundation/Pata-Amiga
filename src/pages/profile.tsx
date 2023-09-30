import { PostSession } from "@/components/PostSession";
import { ProfileHeader } from "@/components/ProfileHeader";
import PostServieceMethods from "@/service/axios/posts/postsRequests";
import UserServiceMethods from "@/service/axios/user/userRequests";
import { PostPreviewPros, PostResponse, userResponse } from "@/service/axios/user/userResponses";
import { Box, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";

interface ProfileProps {
  userResponseAPI: userResponse
  postsResponseAPI?: PostResponse[]
}

function Profile({userResponseAPI, postsResponseAPI}: ProfileProps) {

  /* const convertPostsToPostPreview = (posts: PostResponse[]) => {
    const postPreview: PostPreviewPros[] = []
    posts.map(post => {
      postPreview.push({
        createdAt: post.createdAt,
        description: post.description,
        postPicture: post.picture,
        postUuid: post.uuid,
        dataPost: post.createdAt,
        location: post.location,
        userName: userResponseAPI.name,
        userPicture: userResponseAPI.profilePicture
      })
    })
    return postPreview
  }
  const userPosts = convertPostsToPostPreview(postsResponseAPI) */
  console.log(postsResponseAPI)

  const onEditProfile = () => {
    console.log('edit profile')
  }
  console.log(JSON.stringify(userResponseAPI))
  const posts: PostPreviewPros[] = []
  return (
    <>
      <Flex direction="column">
        <ProfileHeader
          profilePicture={userResponseAPI.profilePicture}
          userBanner={userResponseAPI.banner}
          userEmail={userResponseAPI.email}
          userInstagram={userResponseAPI.contact.instagram}
          userLocation={userResponseAPI.contact.facebook}
          userName={userResponseAPI.name}
          userWhatsApp={userResponseAPI.contact.whatsapp}
          onClick={onEditProfile}
        />
        <PostSession  posts={posts}/>
      </Flex>
    </>
  );
}

export default Profile;


export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  let userResponseAPI: userResponse
  let postsResponseAPI: PostResponse[]

  try {
    const userResponse = await UserServiceMethods.getUserTheirSelf(session.user.token)
    userResponseAPI = userResponse
    const post = await PostServieceMethods.getAllPostsFromUser(userResponseAPI.uuid)
    
    
    postsResponseAPI = post
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      session,
      userResponseAPI: userResponseAPI,
      postsResponseAPI: postsResponseAPI
    }
  };
};
