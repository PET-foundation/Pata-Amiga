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
import backpg from '/public/img/backpg.png';

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
      <Link href="/" >
       <Image src={backpg.src} h='5vh' position='absolute' top='50' left='300'  alt='voltar' />
      </Link>
      <Flex direction="column" alignItems='center' h="100vh">
          
          <Flex alignItems='end' justifyContent='flex-end' width='90%' mt={2}>
            <Text fontSize="lg" color="gray.500">
              Criado há {getPostCreatedAt(postResponseAPI.createdAt)} horas
            </Text>
          </Flex>
          <Flex
            justifyContent="center"
            alignItems="center"
            height="100vh" // Defina a altura da tela inteira
            mt={10}
          >
            <Box >
              <Image 
                src={postResponseAPI.picture ? postResponseAPI.picture : 'https://i.postimg.cc/prX195SW/nenhumkchorro.jpg'} 
                alt={postResponseAPI.description}
              />
            </Box>
          </Flex>
  
          <Text
            mt={5}
            fontSize='3xl'
            color='black'
            fontWeight="bold"
          >
            Conheça: {postResponseAPI.name}
          </Text>
          
          <Flex direction='row' alignItems='center' gap={2} mt={1}>
            <ImLocation /> 
            <Text fontSize='lg' color='gray.700'>
              {postResponseAPI.location}
            </Text>
          </Flex>
          
          <Flex 
            direction='column' 
            gap={2} 
            alignItems='center' // Adicionando a propriedade alignItems para centralizar verticalmente
            display="inline-block"
          >
          <Box w='90%' mt={9}>
            <Text
              fontSize='2xl'
              color='black'
              as='u'
              mb={3}
              textAlign="center"
              display="inline-block"
            >
              Descrição do animal:
            </Text>
            <Text
              fontSize='lg'
              color='gray.700'
              casing='capitalize'
              overflowWrap="break-word"
              textAlign="center"
              display="inline-block"
            >
              {postResponseAPI.description}
            </Text>
          </Box>
          
          <Box w='90%' mt={5}>
            <Text
              fontSize='2xl'
              color='black'
              as='u'
              mb={3}
              textAlign="center"
              display="inline-block"
            >
              Informações básicas:
            </Text>
            
              <Text fontSize='lg' color='gray.700' >
                Espécie: {postResponseAPI.info.specie}  
              </Text>
              <Text fontSize='lg' color='gray.700' >
                Raça: {postResponseAPI.info.race}
              </Text>
              <Text fontSize='lg' color='gray.700' >
                Sexo: {postResponseAPI.info.sex == 'M' ? "Macho" : "Fêmea"}
              </Text>
              <Text fontSize='lg' color='gray.700' >
                Idade: {postResponseAPI.info.age}
              </Text>
              <Text fontSize='lg' color='gray.700' >
                Porte: {enumPortToString(postResponseAPI.info.port)}
              </Text>
              <Text fontSize='lg' color='gray.700' >
                Peso: {postResponseAPI.info.weight}
              </Text>
          </Box>

          <Box w='90%' mt={5}>
            <Text
              fontSize='2xl'
              color='black'
              as='u'
              mb={3}
              textAlign="center"
              display="inline-block"
            >
              Saúde:
            </Text>
            
              <Text fontSize='lg' color='gray.700' >
                Castrado: {booleanToYesOrNo(postResponseAPI.info.castrated)}
              </Text>
              <Text fontSize='lg' color='gray.700' >
                Vacinado: {booleanToYesOrNo(postResponseAPI.info.vaccinated)}
              </Text>
              <Text fontSize='lg' color='gray.700' >
                Vermifugado: {booleanToYesOrNo(postResponseAPI.info.ungerminated)}
              </Text>
              <Text fontSize='lg' color='gray.700' >
                Pedigree: {booleanToYesOrNo(postResponseAPI.info.pedigree)}
              </Text>
              <Text fontSize='lg' color='gray.700' >
                Necessidades especiais: {booleanToYesOrNo(postResponseAPI.info.specialNeeds)}
              </Text>
           
          </Box>
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
                      mt={20}
                      ml={20}
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