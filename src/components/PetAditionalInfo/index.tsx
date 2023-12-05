import { AspectRatio, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PetAditionalInfoProps {
  Specie: string;
}

export function PetAditionalInfo({ Specie }: PetAditionalInfoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const  specieMapVideo = {
    Cachorro: 'https://www.youtube.com/embed/F8-TKfQAD20',
    Gato: 'https://www.youtube.com/embed/UCYNqs2tJJU',
    Coelho: 'https://www.youtube.com/embed/7-OAc1fHDfI',
    Passarinho: 'https://www.youtube.com/embed/ag960aIXBW0',
  }
  return (
    <Flex direction='column'>
      <Text 
        fontSize='2xl' 
        fontWeight='bold' 
        textAlign='center'
        mb={4}
        >
        Dicas  sobre o pet
      </Text>
        <Text fontSize="2xl" fontWeight="bold" mt={4} textAlign='center'>
          Veja abaixo dicas sobre como cuidar do seu pet:
        </Text>
        <Button 
          onClick={onOpen} 
          colorScheme='pink' 
          variant='solid'
          mb={4}
          >Ver dicas</Button>

        <Modal onClose={onClose} isOpen={isOpen} isCentered size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contatos do responsável</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' gap={2}>
            <AspectRatio maxW='560px' ratio={1}>
              <iframe
                title='Como cuidar de um cachorro'
                src={specieMapVideo[Specie]}
                allowFullScreen
              />
            </AspectRatio>
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
