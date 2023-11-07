import { ShelterHeader } from "@/components/ShelterHeader";
import shelterServiceMethods from "@/service/axios/shelter/shelterRequest";
import { ShelterResponse } from "@/service/axios/user/userResponses";
import { GetServerSideProps, GetStaticPaths } from "next";
import { GetSessionParams, getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

interface PageViewProps {
  shelterResponseAPI: ShelterResponse;
}

function PageView({shelterResponseAPI}: PageViewProps) {
  const [shelter, setShelter] = useState<ShelterResponse>(shelterResponseAPI);
  return (
    <>
      <Head>
        <title>{shelter.name}</title>
      </Head>
      <ShelterHeader 
        shelterName={shelter.name}
        shelterBaner={shelter.banner} 
        shelterLogo={shelter.profilePicture}
        shelterPixQrCode={shelter.pixKey}
        shelterContact={shelter.contact}
        shelterLocation={shelter.location}
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
  try {
    const shelters = await shelterServiceMethods.getShelterByUuid(shelterUuid as string,token)
    shelterResponseAPI = shelters;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      session,
      shelterResponseAPI: shelterResponseAPI,
    },
  };
};

