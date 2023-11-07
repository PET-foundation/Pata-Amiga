import { ShelterHeader } from "@/components/ShelterHeader";
import { TopMenu } from "@/components/TopMenu";
import shelterServiceMethods from "@/service/axios/shelter/shelterRequest";
import UserServiceMethods from "@/service/axios/user/userRequests";
import { ShelterResponse, userResponse } from "@/service/axios/user/userResponses";
import { GetServerSideProps, GetStaticPaths } from "next";
import { GetSessionParams, getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

interface PageViewProps {
  shelterResponseAPI: ShelterResponse;
  userResponseAPI: userResponse;
}

function PageView({shelterResponseAPI, userResponseAPI}: PageViewProps) {
  const [shelter, setShelter] = useState<ShelterResponse>(shelterResponseAPI);
  return (
    <>
      <Head>
        <title>{shelter.name}</title>
      </Head>
      <TopMenu 
        profilePicture={userResponseAPI.profilePicture}
        userName={userResponseAPI.name}
        onClick={() => {}}
        onSearch={() => {}}
      />
      <ShelterHeader 
        shelterName={shelter.name}
        shelterBaner={shelter.banner} 
        shelterLogo={shelter.profilePicture}
        shelterPixQrCode={shelter.pixKey}
        shelterContact={shelter.contact}
        shelterLocation={shelter.location}
        shelterAdoptionRules={shelter.adoptionPolice}
        shelterDescription={shelter.description}
        />
    </>
  );
}

export default PageView;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { shelterUuid } = params;
  const session = await getSession(context);
  const token = session.user.token;

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let shelterResponseAPI: ShelterResponse;
  let userResponseAPI: userResponse;
  try {
    const shelters = await shelterServiceMethods.getShelterByUuid(shelterUuid as string,token)
    shelterResponseAPI = shelters;
    const user = await UserServiceMethods.getUserTheirSelf(token);
    userResponseAPI = user;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      session,
      shelterResponseAPI: shelterResponseAPI,
      userResponseAPI: userResponseAPI,
    },
  };
};

