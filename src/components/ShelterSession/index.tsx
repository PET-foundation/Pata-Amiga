import { useRouter } from 'next/router';
import { ShelterPreview } from '../ShelterPreview';
import shelterNotFoundImage from '/public/img/posts_not_found.png'
import { Button, Flex, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';

interface ShelterSessionProps {
  sheltersToPrewiew: ShelterPreviewProps[];
}

interface ShelterPreviewProps {
  shelterName: string;
  shelterDescription: string;
  shelterPicture: string;
  shelterBanner: string;
  shelterAddress: string;
  shelterUuid: string;
  numberOfAnimals: number;
}

export function ShelterSession({ sheltersToPrewiew }: ShelterSessionProps) {
  const router = useRouter()
  const handleRedirectToCreateShelter = () => {
    router.push('/shelter/create');
  };
  return (
    <>
      {sheltersToPrewiew.length > 0 ? (
      <>
        <Flex 
          direction='column' 
          justifyContent='space-between' 
          alignItems='center'
          mb={10}
          >
          <Text fontSize='2xl' fontWeight='bold'>
            Crie novos abrigos
          </Text>
          <Button
            onClick={handleRedirectToCreateShelter}
            colorScheme="blue"
            size="lg"
            mt={5}
            maxW="30vh"
            alignSelf="center">
            🐾 Criar abrigo 🐾
          </Button>
        </Flex>
        {sheltersToPrewiew.map((shelter, index) => (
          <ShelterPreview 
          key={index}
          shelterName={shelter.shelterName}
          shelterDescription={shelter.shelterDescription}
          shelterBanner={shelter.shelterBanner}
          shelterPicture={shelter.shelterPicture}
          shelterAddress={shelter.shelterAddress}
          numberOfAnimals={10}
          shelterUuid={shelter.shelterUuid}
        />
        ))}
      </>
      ): (
        <Flex direction='column' alignItems='center' justifyContent='center'>
          <Flex direction='row'>
            <Image src={shelterNotFoundImage} width={400} alt='Nenhum abrigo encontrado' />
          </Flex>
          <Text 
            textAlign='center' 
            fontSize='2xl' 
            fontWeight='bold'
            mt={10}
          >
            Nenhum abrigo encontrado
          </Text>
          <Button 
            href='/shelter/create' 
            as={Link}
            fontStyle='unset'
            colorScheme="blue"
            size="lg"
            mt={5}
            maxW="30vh"
            alignSelf="center"
          >
            🐾 Criar abrigo 🐾
          </Button>
        </Flex>
      )}
    </>
  );
}
