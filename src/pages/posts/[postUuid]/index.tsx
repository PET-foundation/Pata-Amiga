import PostServieceMethods from "@/service/axios/posts/postsRequests";
import { PostResponse } from "@/service/axios/user/userResponses";
import { PortTypes } from "@/utils/types/portTypes";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import {ImLocation} from 'react-icons/im';

interface GetPostByUuidProps {
  postResponseAPI: PostResponse;
}

function GetPostByUuid({postResponseAPI}: GetPostByUuidProps) {

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
          color='InfoText'
          >
            Conheça: {postResponseAPI.name}
        </Text>
        <Flex direction='row' alignItems='center' gap={2}>
        <ImLocation /> 
        <Text fontSize='2xl' mt={1} color='cyan'>
          {postResponseAPI.location}
        </Text>
        </Flex>
        <Flex direction='column' alignItems='start' w='90%' mt={9} ml={5}>
          <Text
            fontSize='2xl'
            color='InfoText'
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
        <Text fontSize='2xl' color='InfoText' as='u' mt={5}>
          Informações basicas:
        </Text>
        <Flex direction='row' gap={9} mt={5}>
          <Text fontSize='xl' mt={1} color='cyan'>
            Espécie: {postResponseAPI.info.specie}  
          </Text>
          <Text fontSize='xl' mt={1} color='cyan'>
            Raça: {postResponseAPI.info.race}
          </Text>
          <Text fontSize='xl' mt={1} color='cyan'>
            Sexo: {postResponseAPI.info.sex == 'M' ? "Macho" : "Fêmea"}
          </Text>
          <Text fontSize='xl' mt={1} color='cyan'>
            Idade: {postResponseAPI.info.age}
          </Text>
          <Text fontSize='xl' mt={1} color='cyan'>
            Porte: {enumPortToString(postResponseAPI.info.port)}
          </Text>
          <Text fontSize='xl' mt={1} color='cyan'>
            Peso: {postResponseAPI.info.weight}
          </Text>
        </Flex>
          <Text fontSize='2xl' color='InfoText' as='u' mt={9}>
            Saúde:
          </Text>
          <Flex direction='row' gap={5} pb={5}>
            <Text fontSize='xl' mt={1} color='cyan'>
              Castrado: {booleanToYesOrNo(postResponseAPI.info.castrated)}
            </Text>
            <Text fontSize='xl' mt={1} color='cyan'>
              Vacinado: {booleanToYesOrNo(postResponseAPI.info.vaccinated)}
            </Text>
            <Text fontSize='xl' mt={1} color='cyan'>
              Vermifungado: {booleanToYesOrNo(postResponseAPI.info.ungerminated)}
            </Text>
            <Text fontSize='xl' mt={1} color='cyan'>
              Pedigree: {booleanToYesOrNo(postResponseAPI.info.pedigree)}
            </Text>
            <Text fontSize='xl' mt={1} color='cyan'>
              Necessidades especiais: {booleanToYesOrNo(postResponseAPI.info.specialNeeds)}
            </Text>
        </Flex>
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