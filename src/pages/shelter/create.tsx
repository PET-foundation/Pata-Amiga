import { ShelterForm } from "@/components/ShelterForm";
import { TopMenu } from "@/components/TopMenu";
import shelterServiceMethods from "@/service/axios/shelter/shelterRequest";
import { ShelterCreateRequest } from "@/service/axios/shelter/shelterResponse";
import UserServiceMethods from "@/service/axios/user/userRequests";
import { userResponse } from "@/service/axios/user/userResponses";
import { Box, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

interface CreateProps {
  userResponseAPI: userResponse;
}

function Create({ userResponseAPI }: CreateProps) {
  const { data: session, status } = useSession();

  const token = session?.user.token;

  const handleSubmit = async (
    shelterName: string,
    shelterDescription: string,
    shelterAddress: string,
    shelterPicture: string,
    shelterBanner: string,
    shelterPhone: string,
    shelterWhatsapp: string,
    shelterInstagram: string,
    shelterFacebook: string,
    shelterPixKey: string,
    shelterAdoptionRules: string,
  ) => {
    const shelter: ShelterCreateRequest = {
        adoptionPolice: shelterAdoptionRules,
        location: shelterAddress,
        name: shelterName,
        contact: {
          phone: shelterPhone,
          whatsapp: shelterWhatsapp,
          instagram: shelterInstagram,
          facebook: shelterFacebook,
        },
        banner: shelterBanner,
        profilePicture: shelterPicture,
        pixKey: shelterPixKey,
        description: shelterDescription,
        owners: [
          userResponseAPI.uuid
        ],
    }

    const response = await shelterServiceMethods.createShelter(shelter, token);

    console.log(`RESPONSE OF CREATE SHELTER: ${response}`);
  }

  return (
    <>
    <Head>
      <title>Criar Abrigo</title>
    </Head>
      <TopMenu 
        profilePicture={userResponseAPI.profilePicture}
        userName={userResponseAPI.name}
        onClick={() => {}}
        onSearch={() => {}}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Heading>Criar Abrigo</Heading>
        <ShelterForm onSubmit={handleSubmit} />
      </Box>
    </>
  );
}

export default Create;


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
    const response = await UserServiceMethods.getUserTheirSelf(
      session.user.token,
    );
      userResponseAPI = response;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      session,
      userResponseAPI,
    },
  };
};

