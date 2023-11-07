import { ShelterHeader } from "@/components/ShelterHeader";
import shelterServiceMethods from "@/service/axios/shelter/shelterRequest";
import { ShelterCreateRequest } from "@/service/axios/shelter/shelterResponse";
import { ShelterResponse } from "@/service/axios/user/userResponses";
import { popUplaert } from "@/utils/alerts/popUpAlert";
import { alertTypes } from "@/utils/types/alertTypes";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

interface EditProps {
  shelterResponseAPI: ShelterResponse;
}

function Edit({shelterResponseAPI}: EditProps) {

  const { data: session, status } = useSession();
  const {push} = useRouter();

  const onUpdate = (
    shelterName: string,
    shelterDescription: string,
    shelterAdoptionRules: string,
    shelterPixQrCode: string,
    shelterContact: {phone: string, whatsapp: string, instagram: string, facebook: string},
    shelterLocation: string,
    shelterBanner: string,
    shelterLogo: string
  ) => {

    const shelter: ShelterCreateRequest = {
      name: shelterName,
      description: shelterDescription,
      adoptionPolice: shelterAdoptionRules,
      pixKey: shelterPixQrCode,
      contact: shelterContact,
      location: shelterLocation,
      banner: shelterBanner,
      profilePicture: shelterLogo, 
    }

    console.log(`shelter updated: ${JSON.stringify(shelter)}`)

    shelterServiceMethods.updateShelter(shelterResponseAPI.uuid, session.user.token, shelter)
    .then(async (response) => {
      popUplaert('Atualizado com sucesso', alertTypes.SUCCESS);
      await push(`/shelter/${shelterResponseAPI.uuid}`)
    }).catch((error) => {
      popUplaert(`Erro ao atualizar ${error}`, alertTypes.ERROR)
    })
    
  }

  return (
    <>
      <Head>
        <title>{shelterResponseAPI.name}</title>
      </Head>
      <ShelterHeader 
      isEditable
      shelterName={shelterResponseAPI.name}
      shelterAdoptionRules={shelterResponseAPI.adoptionPolice}
      shelterBaner={shelterResponseAPI.banner}
      shelterContact={shelterResponseAPI.contact}
      shelterDescription={shelterResponseAPI.description}
      shelterLocation={shelterResponseAPI.location}
      shelterLogo={shelterResponseAPI.profilePicture}
      shelterPixQrCode={shelterResponseAPI.pixKey}
      onSubmit={onUpdate}
      shelterUuid={shelterResponseAPI.uuid}
    />
    </>
  );
}

export default Edit;

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
      shelterResponseAPI: shelterResponseAPI
    },
  };
};
