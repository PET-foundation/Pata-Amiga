import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import {FaWhatsapp} from 'react-icons/fa';
import {AiOutlineMail, AiFillPhone, AiFillInstagram, AiFillFacebook} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { IoIosContact } from "react-icons/io";
import UserServiceMethods from '@/service/axios/user/userRequests';
import { popUplaert } from '@/utils/alerts/popUpAlert';
import { alertTypes } from '@/utils/types/alertTypes';


interface OwnerContact{
  email: string;
  phone: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
}
interface AdoptionPreviewProps {
  userOwnerImage: string;
  userOwnerName: string;
  userContactInfo?: OwnerContact;
}

export function AdoptionPreview({ userOwnerImage, userOwnerName, userContactInfo }: AdoptionPreviewProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userContactInfoState, setUserContactInfoState] = useState<OwnerContact>(userContactInfo)

  const phoneMask = (phone: string): string => {
    const phoneMask = phone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    return phoneMask;
  }

  return (
    <Flex direction='column'>
      <Text 
        fontSize='2xl' 
        fontWeight='bold' 
        textAlign='center'
        mb={4}
        >
        Responsável
      </Text>
      <Image
        src={userOwnerImage? userOwnerImage: 'https://bit.ly/dan-abramov'}
        alt={userOwnerName}
        borderRadius="full"
        boxSize="25vh"
      />
        <Text fontSize="2xl" fontWeight="bold" mt={4} textAlign='center'>
          {userOwnerName}
        </Text>
        <Button 
          onClick={onOpen} 
          leftIcon={<IoIosContact />} 
          colorScheme='pink' 
          variant='solid'
          mb={4}
          >Entrar em contato</Button>

        <Modal onClose={onClose} isOpen={isOpen} isCentered size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contatos do responsável</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' gap={2}>
              <Flex direction='row' align='center' gap='5'>
                <FaWhatsapp/> {userContactInfo.whatsapp? userContactInfo.whatsapp: 'Não informado'}
              </Flex>
              <Flex direction='row' align='center' gap='5'>
                <AiOutlineMail/> {userContactInfo.email? userContactInfo.email: 'Não informado'}
              </Flex>
              <Flex direction='row' align='center' gap='5'>
                <AiFillPhone/> {userContactInfo.phone? phoneMask(userContactInfo.phone): 'Não informado'}
              </Flex>
              <Flex direction='row' align='center' gap='5'>
                <AiFillInstagram/> {userContactInfo.instagram? userContactInfo.instagram : 'Não informado'}
              </Flex>
              <Flex direction='row' align='center' gap='5'>
                <AiFillFacebook/> {userContactInfo.facebook? userContactInfo.facebook : 'Não informado'}
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
