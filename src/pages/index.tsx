import { TopMenu } from '@/components/TopMenu';
import UserServiceMethods from '@/service/axios/user/userRequests';
import { Link } from '@chakra-ui/next-js'
import {  Button, Image } from '@chakra-ui/react'
import { GetServerSideProps } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


export default function Home({profileUserPicture}) {
  const { data: session, status } = useSession();


  if (status === 'authenticated') {
    console.log(JSON.stringify(session));
  }

  console.log(`profilePicture: ${profileUserPicture}`)

  const onClick = () => {}

  const onSearch = (search: string) => {
    console.log(search)
  }

  if (status === 'loading') return <p>Loading</p>;
  return (
    <div>
      <TopMenu 
      profilePicture={profileUserPicture} 
      onClick={onClick} userName='lasdfkj'
      onSearch={onSearch}
      />
      <Button onClick={handleSingOut}>Sign Out</Button>
    </div>
  )
}
const handleSingOut = async() => {
  await signOut()
}


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

  let profileUserPicture = ''

  try {
    const {profilePicture} = await UserServiceMethods.getUserTheirSelf(session.user.token)
    
    profileUserPicture = profilePicture
  } catch (error) {
   console.log(error)
  }

  return {
    props: {
      session,
      profileUserPicture
    }
  };
};
