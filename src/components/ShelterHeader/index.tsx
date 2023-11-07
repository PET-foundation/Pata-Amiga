import { AbsoluteCenter, Box, Divider, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import QRCode from 'qrcode';
import { popUplaert } from "@/utils/alerts/popUpAlert";
import { alertTypes } from "@/utils/types/alertTypes";
import {AiFillPhone, AiOutlineWhatsApp, AiFillInstagram, AiFillFacebook} from 'react-icons/ai';
import {GrLocation} from 'react-icons/gr';
import {MdOutlinePix} from 'react-icons/md';
import {GiPawHeart} from 'react-icons/gi';

interface ShelterHeaderProps {
  shelterBaner?: string;
  shelterLogo?: string;
  shelterPixQrCode?: string;
  shelterContact?: {phone: string, whatsapp: string, instagram: string, facebook: string}
  shelterLocation?: string
  shelterName: string
  shelterDescription?: string
  shelterAdoptionRules?: string
}

export function ShelterHeader({ 
  shelterBaner, 
  shelterLogo, 
  shelterPixQrCode, 
  shelterContact, 
  shelterLocation, 
  shelterName,
  shelterDescription,
  shelterAdoptionRules
}: ShelterHeaderProps) {
  const [shelterQRCode, setShelterQRCode] = useState<string>(shelterPixQrCode);

  
  useEffect(() => {
    QRCode.toDataURL(shelterPixQrCode ? shelterPixQrCode : 'https://bit.ly/dan-abramov')
    .then((url) => {
      setShelterQRCode(url)
    }).catch((error) => {
      popUplaert(`Error ao gerar QRCode ${error}`, alertTypes.ERROR)
    })
  }, [])

  return (
    <Flex direction='column' w='100vw'>
      <Box bg="black" w='100vw' h='35vh' position='relative'>
        <Image src={shelterBaner} 
          alt="Banner Image"
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>  
      <Box 
        position="absolute"
        mt="125"
        ml="5" 
        w='20vw' 
        h='10vh' 
        >
          <Image
            src={shelterLogo ? shelterLogo : 'https://bit.ly/dan-abramov'}
            backgroundColor='black'
            border='2px'
            alt="Banner Image"
            borderRadius="full"
            boxSize="25vh"
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
          <Text fontWeight='bold' textAlign='start'>{shelterName}</Text>
          <SimpleGrid columns={2} spacingX='1px' spacingY='10px' mt={3}>
            <Box height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <AiFillPhone size={20} />
              <Text fontWeight='bold' textAlign='center'>{shelterContact.phone}</Text>
              </Flex>
            </Box>
            <Box height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <AiOutlineWhatsApp size={20} />
              <Text fontWeight='bold' textAlign='center'>{shelterContact.whatsapp}</Text>
              </Flex>
            </Box>
            <Box height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <AiFillInstagram size={20} />
              <Text fontWeight='bold' textAlign='center'>{shelterContact.instagram}</Text>
              </Flex>
            </Box>
            <Box height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <AiFillFacebook size={20} />
              <Text fontWeight='bold' textAlign='center'>{shelterContact.facebook}</Text>
              </Flex>
            </Box>
            <Box height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <GrLocation size={20} />
              <Text fontWeight='bold' textAlign='center'>{shelterLocation}</Text>
              </Flex>
            </Box>
            <Box height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <GiPawHeart size={20} />
              <Text fontWeight='bold'>10 adotados</Text>
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
        <Flex direction='column'  mr={20} w='12vw'>
          <Text fontWeight='bold' textAlign='center'>Chave pix para doações</Text>
          <Image src={shelterQRCode} alt="Pix QrCode" />
            <Flex direction='row' gap={7}>
              <MdOutlinePix size={20} />
              <Text fontWeight='bold' textAlign='center'>Pix: {shelterPixQrCode}</Text>
            </Flex>
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
        <Text 
          fontWeight='bold' 
          textAlign='center'
          p="20px" 
          m="20px"
          >
            {shelterDescription ? shelterDescription : 'Não há descrição cadastrada'}
          </Text>
          <Text 
          mt={20}
          fontWeight='bold' 
          fontSize='3xl' 
          textAlign='center'
          as='u'
          >
            Politica de adoção do abrigo:
          </Text>
          <Text 
          fontWeight='bold' 
          textAlign='center'
          p="20px" 
          m="20px"
          >
            {shelterAdoptionRules ? shelterAdoptionRules : 'Não há politica de adoção cadastrada'}
          </Text>
      </Flex>
      <Box position='relative' padding='10'>
        <Divider colorScheme="blue" borderColor='red.100'/>
        <AbsoluteCenter bg='white' px='4'>
          Posts do abrigo
        </AbsoluteCenter>
      </Box>
    </Flex>
  );
}
