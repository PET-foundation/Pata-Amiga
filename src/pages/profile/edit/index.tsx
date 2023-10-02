import { ProfileHeader } from '@/components/ProfileHeader';
import UserServiceMethods from '@/service/axios/user/userRequests';
import { PostResponse, userResponse } from '@/service/axios/user/userResponses';
import { popUplaert } from '@/utils/alerts/popUpAlert';
import { alertTypes } from '@/utils/types/alertTypes';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';

interface EditProfileProps {
  userResponseAPI: userResponse;
}

function EditProfile({ userResponseAPI }: EditProfileProps) {
  const { data: session, status } = useSession();

 async function onSubmit(
  userName: string,
  profileImage: string,
  userBanner: string,
  userLocation: string,
  userEmail: string,
  userInstagram: string,
  userWhatsapp: string,
) {
    const user = {
      name: userName,
      profilePicture: profileImage,
      banner: userBanner,
      facebook: userLocation,
      instagram: userInstagram,
      whatsapp: userWhatsapp,
      phone: userResponseAPI.contact.phone,
      email: userEmail,
    };

    try {
      await UserServiceMethods.updateUser(userResponseAPI.uuid, session.user.token, user);
      console.log('Atualizado com sucesso');
    } catch (error) {
      popUplaert('Erro ao atualizar', alertTypes.ERROR)
    }

    console.log(JSON.stringify(user));

  }
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
        onSubmit={onSubmit}
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
