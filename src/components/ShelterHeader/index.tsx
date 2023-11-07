import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import QRCode from 'qrcode';
import { popUplaert } from "@/utils/alerts/popUpAlert";
import { alertTypes } from "@/utils/types/alertTypes";
import {AiFillPhone, AiOutlineWhatsApp, AiFillInstagram, AiFillFacebook} from 'react-icons/ai';
import {GrLocation} from 'react-icons/gr';

interface ShelterHeaderProps {
  shelterBaner?: string;
  shelterLogo?: string;
  shelterPixQrCode?: string;
  shelterContact?: {phone: string, whatsapp: string, instagram: string, facebook: string}
  shelterLocation?: string
  shelterName: string
}

export function ShelterHeader({ shelterBaner, shelterLogo, shelterPixQrCode, shelterContact, shelterLocation, shelterName }: ShelterHeaderProps) {
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
      <Box bg='red.500' w='100vw' h='35vh' position='relative'>
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
          <SimpleGrid columns={2} spacingX='1px' spacingY='10px'>
            <Box bg='tomato' height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <AiFillPhone size={20} />
              <Text fontWeight='bold' textAlign='center'>{shelterContact.phone}</Text>
              </Flex>
            </Box>
            <Box bg='tomato' height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <AiOutlineWhatsApp size={20} />
              <Text fontWeight='bold' textAlign='center'>{shelterContact.whatsapp}</Text>
              </Flex>
            </Box>
            <Box bg='tomato' height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <AiFillInstagram size={20} />
              <Text fontWeight='bold' textAlign='center'>{shelterContact.instagram}</Text>
              </Flex>
            </Box>
            <Box bg='tomato' height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <AiFillFacebook size={20} />
              <Text fontWeight='bold' textAlign='center'>{shelterContact.facebook}</Text>
              </Flex>
            </Box>
            <Box bg='tomato' height='30px' width='130px'>
              <Flex direction='row' gap={2}>
              <GrLocation size={20} />
              <Text fontWeight='bold' textAlign='center'>{shelterLocation}</Text>
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
        <Flex direction='column'  mr={20} w='12vw'>
          <Text fontWeight='bold' textAlign='center'>Chave pix para doações</Text>
        <Image src={shelterQRCode} alt="" />
        </Flex>
      </Flex>

    </Flex>
  );
}
