import { Link } from '@chakra-ui/next-js'
import {  Button, Image } from '@chakra-ui/react'
import { GetServerSideProps } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';


export default function Home() {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    console.log(JSON.stringify(session));
  }

  if (status === 'loading') return <p>Loading</p>;
  return (
    <div>
      <Image
        borderRadius='full'
        boxSize='150px'
        src='https://bit.ly/dan-abramov'
        alt='Dan Abramov'
      />
      <Link href='/about' _hover={{color: '#0037a4'}}>About</Link>
      <Button onClick={() => signOut()}>Sign out</Button>
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
  return {
    props: {
      session
    }
  };
};
