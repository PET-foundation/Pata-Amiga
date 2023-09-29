import { TopMenu } from '@/components/TopMenu';
import UserServiceMethods from '@/service/axios/user/userRequests';
import { Link } from '@chakra-ui/next-js'
import {  Button, Image } from '@chakra-ui/react'
import { GetServerSideProps } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';


export default function Home({profilePicture}) {
  const { data: session, status } = useSession();


  if (status === 'authenticated') {
    console.log(JSON.stringify(session));
  }

  console.log(profilePicture)

  const onClick = () => {}

  const onSearch = (search: string) => {
    console.log(search)
  }

  if (status === 'loading') return <p>Loading</p>;
  return (
    <div>
      <TopMenu 
      profilePicture={profilePicture} 
      onClick={onClick} userName='lasdfkj'
      onSearch={onSearch}
      />
    </div>
  )
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
  const {profilePicture} = await UserServiceMethods.getUserTheirSelf(session.user.token)
  return {
    props: {
      session,
      profilePicture
    }
  };
};
