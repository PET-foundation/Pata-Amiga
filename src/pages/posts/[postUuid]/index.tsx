import PostServieceMethods from "@/service/axios/posts/postsRequests";
import { PostResponse, userResponse } from "@/service/axios/user/userResponses";
import { PortTypes } from "@/utils/types/portTypes";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import {ImLocation} from 'react-icons/im';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { AdoptionPreview } from "@/components/AdoptionPreview";
import UserServiceMethods from "@/service/axios/user/userRequests";

interface GetPostByUuidProps {
  postResponseAPI: PostResponse;
  ownerOfPost: userResponse;
}

function GetPostByUuid({postResponseAPI, ownerOfPost}: GetPostByUuidProps) {
  const { data: session, status } = useSession();

  const booleanToYesOrNo = (boolean: boolean) => {
    return boolean ? "Sim" : "Não";
  }

  const getPostCreatedAt = (postCreatedAt: string) => {
    const currentDate = new Date();
    const postDate = new Date(postCreatedAt);
    return currentDate.getHours() - postDate.getHours();
  };

  const enumPortToString = (portValue: string) => {
    switch(portValue) {
      case "BIG":
        return PortTypes.BIG
      
      case "SMALL":
        return PortTypes.SMALL

      case "MEDIUM":
        return PortTypes.MEDIUM
    }
  }

  return (
    <>
    <Head>
      <title>Post | {postResponseAPI.name}</title>
    </Head>
      <Flex direction="column" alignItems='center' h="100vh">
        <Box w='100%' h='55%' >
          <Link
            colorScheme="teal"
            variant='solid'
            position='fixed'
            padding='2'
            border='1px solid'
            borderColor='blue.200'
            borderRadius={5}
            mt={6}
            ml={6}
            href="/"
          >
            <AiOutlineArrowLeft/>
          </Link>
          <Image 
            src={postResponseAPI.picture} 
            alt={postResponseAPI.description}
            objectFit="cover"
            w="100%"
            h="100%"
            />
        </Box>
        <Flex alignItems='end' justifyContent='end' width='90%' mt={2}>
          Criado há: {getPostCreatedAt(postResponseAPI.createdAt).toString().split('-')} h
        </Flex>
        <Text
          mt={5}
          fontSize='3xl'
          color='black'
          as='u'
          >
            Conheça: {postResponseAPI.name}
        </Text>
        <Flex direction='row' alignItems='center' gap={2}>
        <ImLocation /> 
        <Text fontSize='2xl' mt={1} color='gray.700'>
          {postResponseAPI.location}
        </Text>
        </Flex>
        <Flex direction='column' alignItems='start' w='90%' mt={9} ml={5}>
          <Text
            fontSize='2xl'
            color='black'
            as={'u'}
          >
            Descrição do animal:
          </Text>
          <Text
            fontSize='xl'
            mt={3}
            casing='capitalize'
            overflowWrap="break-word"
            >
            {postResponseAPI.description}
          </Text>
        </Flex>
        <Text fontSize='2xl' color='black' as='u' mt={5}>
          Informações basicas:
        </Text>
        <Flex direction='row' gap={9} mt={5}>
          <Text fontSize='xl' mt={1} color='gray.700'>
            Espécie: {postResponseAPI.info.specie}  
          </Text>
          <Text fontSize='xl' mt={1} color='gray.700'>
            Raça: {postResponseAPI.info.race}
          </Text>
          <Text fontSize='xl' mt={1} color='gray.700'>
            Sexo: {postResponseAPI.info.sex == 'M' ? "Macho" : "Fêmea"}
          </Text>
          <Text fontSize='xl' mt={1} color='gray.700'>
            Idade: {postResponseAPI.info.age}
          </Text>
          <Text fontSize='xl' mt={1} color='gray.700'>
            Porte: {enumPortToString(postResponseAPI.info.port)}
          </Text>
          <Text fontSize='xl' mt={1} color='gray.700'>
            Peso: {postResponseAPI.info.weight}
          </Text>
        </Flex>
          <Text fontSize='2xl' color='black' as='u' mt={9}>
            Saúde:
          </Text>
          <Flex direction='row' gap={5} pb={5}>
            <Text fontSize='xl' mt={1} color='gray.700'>
              Castrado: {booleanToYesOrNo(postResponseAPI.info.castrated)}
            </Text>
            <Text fontSize='xl' mt={1} color='gray.700'>
              Vacinado: {booleanToYesOrNo(postResponseAPI.info.vaccinated)}
            </Text>
            <Text fontSize='xl' mt={1} color='gray.700'>
              Vermifungado: {booleanToYesOrNo(postResponseAPI.info.ungerminated)}
            </Text>
            <Text fontSize='xl' mt={1} color='gray.700'>
              Pedigree: {booleanToYesOrNo(postResponseAPI.info.pedigree)}
            </Text>
            <Text fontSize='xl' mt={1} color='gray.700'>
              Necessidades especiais: {booleanToYesOrNo(postResponseAPI.info.specialNeeds)}
            </Text>
        </Flex>
        <AdoptionPreview 
        userOwnerImage={postResponseAPI.userPicture} 
        userOwnerName={postResponseAPI.userName}
        userContactInfo={{
          email: ownerOfPost.email,
          phone: ownerOfPost.contact.phone,
          whatsapp: ownerOfPost.contact.whatsapp,
          instagram: ownerOfPost.contact.instagram,
          facebook: ownerOfPost.contact.facebook
        }}
        />
      </Flex>
    </>
  )
}

export default GetPostByUuid;



export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { postUuid } = params;
  const session = await getSession(context);
  
  console.log(`postUuid: ${postUuid} e params: ${params}`);
  const token = session?.user.token;

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let postResponseAPI: PostResponse;
  let ownerOfPost: userResponse;

  try {
    const post = await PostServieceMethods.getPostByUuid(
      postUuid as string,
      token,
    );

    postResponseAPI = post;

    const user =  await UserServiceMethods.getUserByUuid(token, post.userUuid);
    ownerOfPost = user;
  } catch (error) {
    console.log(error);
  }


  return {
    props: {
      session,
      postResponseAPI: postResponseAPI,
      ownerOfPost: ownerOfPost
    },
  };
};