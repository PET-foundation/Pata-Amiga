import { AbsoluteCenter, Box, Button, Divider, Flex, Image, Input, InputGroup, InputLeftElement, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import QRCode from 'qrcode';
import { popUplaert } from "@/utils/alerts/popUpAlert";
import { alertTypes } from "@/utils/types/alertTypes";
import {AiFillPhone, AiOutlineWhatsApp, AiFillInstagram, AiFillFacebook} from 'react-icons/ai';
import {GrLocation} from 'react-icons/gr';
import {MdOutlinePix} from 'react-icons/md';
import {GiPawHeart} from 'react-icons/gi';
import { useRouter } from "next/router";

interface ShelterHeaderProps {
  shelterBaner?: string;
  shelterLogo?: string;
  shelterPixQrCode?: string;
  shelterContact?: {phone: string, whatsapp: string, instagram: string, facebook: string}
  shelterLocation?: string
  shelterName: string,
  shelterOwners?: string[]
  shelterDescription?: string
  shelterAdoptionRules?: string
  isEditable?: boolean,
  userUuid?: string,
  shelterUuid: string
  onSubmit?: (
    shelterName: string,
    shelterDescription: string,
    shelterAdoptionRules: string,
    shelterPixQrCode: string,
    shelterContact: {phone: string, whatsapp: string, instagram: string, facebook: string},
    shelterLocation: string,
    shelterBanner?: string,
    shelterLogo?: string,
  ) => void
}

export function ShelterHeader({ 
  shelterBaner, 
  shelterLogo, 
  shelterPixQrCode, 
  shelterContact, 
  shelterLocation, 
  shelterName,
  shelterDescription,
  shelterAdoptionRules,
  isEditable = false,
  onSubmit,
  shelterOwners,
  userUuid,
  shelterUuid
}: ShelterHeaderProps) {
  const [shelterQRCode, setShelterQRCode] = useState<string>(shelterPixQrCode);
  const [shelterQrCodeUrl, setShelterQrCodeUrl] = useState<string>(shelterQRCode);
  const [shelterBannerState, setShelterBannerState] = useState<string>(shelterBaner);
  const [shelterLogoState, setShelterLogoState] = useState<string>(shelterLogo);
  const [shelterNameState, setShelterNameState] = useState<string>(shelterName);
  const [shelterLocationState, setShelterLocationState] = useState<string>(shelterLocation);
  const [shelterDescriptionState, setShelterDescriptionState] = useState<string>(shelterDescription);
  const [shelterAdoptionRulesState, setShelterAdoptionRulesState] = useState<string>(shelterAdoptionRules);
  const [shelterContactState, setShelterContactState] = useState<{phone: string, whatsapp: string, instagram: string, facebook: string}>(shelterContact);

  const {push} = useRouter();


  const handleShelterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterNameState(event.target.value);
  }

  const handleShelterLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterLocationState(event.target.value);
  }

  const handleShelterDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterDescriptionState(event.target.value);
  }

  const handleShelterAdoptionRulesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterAdoptionRulesState(event.target.value);
  }

  const handleShelterPixQrCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterQrCodeUrl(event.target.value);
  }

  const handleShelterContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterContactState({
      ...shelterContactState,
      [event.target.name]: event.target.value
    });
  }

  const onEditSubmit = () => {
    onSubmit(
      shelterNameState,
      shelterDescriptionState,
      shelterAdoptionRulesState,
      shelterQrCodeUrl,
      shelterContactState,
      shelterLocationState,
      shelterBannerState,
      shelterLogoState,
    )
  }
  
  useEffect(() => {
    QRCode.toDataURL(shelterQrCodeUrl ? shelterQrCodeUrl : 'https://bit.ly/dan-abramov')
    .then((url) => {
      setShelterQRCode(url)
    }).catch((error) => {
      popUplaert(`Error ao gerar QRCode ${error}`, alertTypes.ERROR)
    })
  }, [shelterPixQrCode, shelterQrCodeUrl])

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setShelterBannerState(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setShelterLogoState(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Flex direction='column' w='100vw'>
      <Box bg="black" w='100vw' h='35vh' position='relative'
      onClick={() => isEditable && document.getElementById('bannerUpload')?.click()}
      >
      <input type="file" id="bannerUpload" hidden onChange={handleBannerUpload} style={{ display: 'none' }} />
        <Image src={shelterBannerState} 
          alt="Banner Image"
          objectFit="cover"
          w="100%"
          h="100%"
          _hover={isEditable && {opacity: 0.5, transition: '0.5s'}}
        />
      </Box>  
      <Box 
        position="absolute"
        mt="125"
        ml="5" 
        w='20vw' 
        h='10vh' 
        onClick={() => isEditable && document.getElementById('logoUpload')?.click()}
        >

        <input type="file" id="logoUpload" hidden onChange={handleLogoUpload} style={{ display: 'none' }} />

          <Image
            src={shelterLogo ? shelterLogoState : 'https://bit.ly/dan-abramov'}
            backgroundColor='black'
            border='2px'
            alt="Banner Image"
            borderRadius="full"
            boxSize="25vh"
            _hover={isEditable && {opacity: 0.7, transition: '0.5s'}}
          />
      </Box>

      <Flex 
        direction='row' 
        justifyContent='space-between'
        mt={79}
        w='100vw'
        >
        <Flex 
          direction='column'
          ml={10}
          w='50%'
          >
          {isEditable ? (
              <Input 
              placeholder='Nome do abrigo'
              variant='flushed'
              value={shelterNameState}
              onChange={handleShelterNameChange}
              fontWeight='bold' 
              textAlign='start'
              w={shelterNameState.length > 0 ? shelterNameState.length * 10 : 150}
              />
          ): (
            
              <Text fontWeight='bold' textAlign='start'>{shelterName}</Text>
          )}
          <SimpleGrid columns={2} spacingX='1px' spacingY='10px' mt={3}>
            <Box height='30px' width='130px'>
              {isEditable ? (
                <InputGroup>
                  <InputLeftElement>
                    <AiFillPhone size={20} />
                  </InputLeftElement>
                  <Input 
                  placeholder='Telefone'
                  name="phone"
                  variant='flushed'
                  value={shelterContactState.phone}
                  onChange={handleShelterContactChange}
                  fontWeight='bold' 
                  textAlign='start'
                  w={shelterContact.phone.length > 0 ? shelterContact.phone.length * 20 : 150}
                />
                </InputGroup>
              ): (
                <Flex direction='row' gap={2}>
                <AiFillPhone size={20} />
                <Text fontWeight='bold' textAlign='center'>{shelterContact.phone}</Text>
                </Flex>
              )}
            </Box>
            <Box height='30px' width='130px'>
              {isEditable ? (
                <InputGroup>
                  <InputLeftElement>
                    <AiOutlineWhatsApp size={20} />
                  </InputLeftElement>
                  <Input 
                    placeholder='Whatsapp'
                    name="whatsapp"
                    variant='flushed'
                    value={shelterContactState.whatsapp}
                    onChange={handleShelterContactChange}
                    fontWeight='bold' 
                    textAlign='start'
                    w={shelterContact.whatsapp.length > 0 ? shelterContact.whatsapp.length * 16 : 200}
                  />
                </InputGroup>
              ): (
                <Flex direction='row' gap={2}>
                  <AiOutlineWhatsApp size={20} />
                  <Text fontWeight='bold' textAlign='center'>{shelterContact.whatsapp}</Text>
                </Flex>
              )}
            </Box>
            <Box height='30px' width='130px'>
              {isEditable ? (
                <InputGroup>
                  <InputLeftElement>
                    <AiFillInstagram size={20} />
                  </InputLeftElement>
                  <Input 
                    placeholder='Instagram'
                    name="instagram"
                    variant='flushed'
                    value={shelterContactState.instagram}
                    onChange={handleShelterContactChange}
                    fontWeight='bold' 
                    textAlign='start'
                    w={shelterContact.instagram.length > 0 ? shelterContact.instagram.length * 10 : 200}
                  />
                </InputGroup>
              ): (
                <Flex direction='row' gap={2}>
                  <AiFillInstagram size={20} />
                  <Text fontWeight='bold' textAlign='center'>{shelterContact.instagram}</Text>
                </Flex>
              )}
            </Box>
            <Box height='30px' width='130px'>
              {isEditable ? (
                <InputGroup>
                  <InputLeftElement>
                    <AiFillFacebook size={20} />
                  </InputLeftElement>
                  <Input 
                    placeholder='Facebook'
                    name="facebook"
                    variant='flushed'
                    value={shelterContactState.facebook}
                    onChange={handleShelterContactChange}
                    fontWeight='bold' 
                    textAlign='start'
                    w={shelterContact.facebook.length > 0 ? shelterContact.facebook.length * 10 : 200}
                  />
                </InputGroup>
              ): (

                <Flex direction='row' gap={2}>
                  <AiFillFacebook size={20} />
                  <Text fontWeight='bold' textAlign='center'>{shelterContact.facebook}</Text>
                </Flex>
              )}
            </Box>
            <Box height='30px' width='130px'>
              {isEditable ? (
                <InputGroup>
                  <InputLeftElement>
                    <GrLocation size={20} />
                  </InputLeftElement>
                  <Input 
                    placeholder='Localização'
                    name="location"
                    variant='flushed'
                    value={shelterLocationState}
                    onChange={handleShelterLocationChange}
                    fontWeight='bold' 
                    textAlign='start'
                    w={shelterLocationState.length > 0 ? shelterLocationState.length * 10 : 200}
                  />
                </InputGroup>
              ): (

                <Flex direction='row' gap={2}>
                  <GrLocation size={20} />
                  <Text fontWeight='bold' textAlign='center'>{shelterLocation}</Text>
                </Flex>
              )}
            </Box>
            <Box height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <GiPawHeart size={20} />
              <Text fontWeight='bold'>10 adotados</Text>
              </Flex>
            </Box>
            <Box height='30px' width='130px'>
             {shelterOwners && shelterOwners.includes(userUuid) && (
                <Button 
                  mt={5}
                  colorScheme="blue" 
                  size="lg" mb={5} 
                  maxW="30vh" 
                  alignSelf="center"
                  onClick={() => push(`/shelter/${shelterUuid}/edit`)}
                  >
                  Editar
                </Button>
             )}
            </Box>
          </SimpleGrid>
        </Flex>
        <Flex direction='column'  mr={20} w='12vw'>
          <Text fontWeight='bold' textAlign='center'>Chave pix para doações</Text>
          <Image src={shelterQRCode} alt="Pix QrCode" />
            {isEditable ? (
              <InputGroup>
                <InputLeftElement>
                  <MdOutlinePix size={20} />
                </InputLeftElement>
                <Input 
                  placeholder='Chave pix para doações'
                  name="pixKey"
                  variant='flushed'
                  value={shelterQrCodeUrl}
                  onChange={handleShelterPixQrCodeChange}
                  fontWeight='bold' 
                  textAlign='start'
                  w={shelterPixQrCode.length > 0 ? shelterPixQrCode.length * 15 : 200}
                />
              </InputGroup>
            ): (
              <Flex direction='row' gap={7}>
                <MdOutlinePix size={20} />
                <Text fontWeight='bold' textAlign='center'>Pix: {shelterPixQrCode}</Text>
            </Flex>
            )}
        </Flex>
      </Flex>
      <Flex direction='column' justifyContent='space-between' mt={10} w='100vw'>
        <Text 
          fontWeight='bold' 
          fontSize='3xl' 
          textAlign='center'
          as='u'
          >
            Sobre o abrigo:
          </Text>
          {isEditable ? (
            <Input 
            placeholder='Descrição do abrigo'
            variant='flushed'
            value={shelterDescriptionState}
            onChange={handleShelterDescriptionChange}
            fontWeight='bold' 
            textAlign='center'
            p="20px" 
            m="20px"
            />
          ): (
            <Text 
            fontWeight='bold' 
            textAlign='center'
            p="20px" 
            m="20px"
            >
              {shelterDescription ? shelterDescription : 'Não há descrição cadastrada'}
            </Text>
          )}
          <Text 
          mt={20}
          fontWeight='bold' 
          fontSize='3xl' 
          textAlign='center'
          as='u'
          >
            Politica de adoção do abrigo:
          </Text>
          {isEditable ? (
            <Input 
            placeholder='Politica de adoção do abrigo'
            variant='flushed'
            value={shelterAdoptionRulesState}
            onChange={handleShelterAdoptionRulesChange}
            fontWeight='bold' 
            textAlign='center'
            p="20px" 
            m="20px"
            />
          ): (
            <Text 
            fontWeight='bold' 
            textAlign='center'
            p="20px" 
            m="20px"
            >
              {shelterAdoptionRules ? shelterAdoptionRules : 'Não há politica de adoção cadastrada'}
            </Text>
          )}
      </Flex>
      {isEditable ? (
        <Flex justifyContent='center' mt={10}>
          <Button 
            colorScheme="blue" 
            size="lg" mb={5} 
            maxW="30vh" 
            alignSelf="center"
            onClick={onEditSubmit}
            >
            Salvar
          </Button>
        </Flex>
      ) : (
        <Box position='relative' padding='10'>
          <Divider colorScheme="blue" borderColor='red.100'/>
          <AbsoluteCenter bg='white' px='4'>
            Posts do abrigo
          </AbsoluteCenter>
      </Box>
      )}
    </Flex>
  );
}
