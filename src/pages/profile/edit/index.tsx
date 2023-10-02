import { ProfileHeader } from '@/components/ProfileHeader';
import UserServiceMethods from '@/service/axios/user/userRequests';
import { PostResponse, userResponse } from '@/service/axios/user/userResponses';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

interface EditProfileProps {
  userResponseAPI: userResponse;
}

function EditProfile({ userResponseAPI }) {
  return (
    <>
      <ProfileHeader
        isEditable={true}
        profilePicture={userResponseAPI.profilePicture}
        userBanner={userResponseAPI.banner}
        userEmail={userResponseAPI.email}
        userInstagram={userResponseAPI.contact.instagram}
        userLocation={userResponseAPI.contact.facebook}
        userName={userResponseAPI.name}
        userWhatsApp={userResponseAPI.contact.whatsapp}
      />
    </>
  );
}

export default EditProfile;

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

  try {
    const userResponse = await UserServiceMethods.getUserTheirSelf(
      session.user.token,
    );
    userResponseAPI = userResponse;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      session,
      userResponseAPI: userResponseAPI,
    },
  };
};
