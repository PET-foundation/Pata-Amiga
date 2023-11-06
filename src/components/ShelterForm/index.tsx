import { popUplaert } from '@/utils/alerts/popUpAlert';
import { alertTypes } from '@/utils/types/alertTypes';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { 
  Box, 
  Button, 
  Center, 
  Flex, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Square, 
  Step, 
  StepDescription, 
  StepIcon, 
  StepIndicator,
  StepNumber, 
  StepSeparator, 
  StepStatus, 
  StepTitle, 
  Stepper, 
  Text, 
  Textarea, 
  useSteps,
  Image
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  AiOutlineArrowRight, 
  AiOutlinePhone, 
  AiOutlineWhatsApp, 
  AiFillInstagram, 
  AiFillFacebook
} from 'react-icons/ai';
import {MdPix} from 'react-icons/md';
import QRCode from 'qrcode';

interface ShelterFormProps {
  onSubmit: (
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
  ) => void;
}

export function ShelterForm({ onSubmit }: ShelterFormProps) {
  const [shelterName, setShelterName] = useState('');
  const [shelterDescription, setShelterDescription] = useState('');
  const [shelterAddress, setShelterAddress] = useState('');
  const [shelterPicture, setShelterPicture] = useState('');
  const [shelterBanner, setShelterBanner] = useState('');
  const [shelterPhone, setShelterPhone] = useState('');
  const [shelterWhatsapp, setShelterWhatsapp] = useState('');
  const [shelterInstagram, setShelterInstagram] = useState('');
  const [shelterFacebook, setShelterFacebook] = useState('');
  const [shelterCNPJ, setShelterCNPJ] = useState('');
  const [shelterPixKey, setShelterPixKey] = useState('');
  const [qrCodePixUrl, setQrCodePixUrl] = useState(''); 
  const [shelterAdoptionRules, setShelterAdoptionRules] = useState('');

  const [stepsIndex, setStepsIndex] = useState(0);
  const [errors, setErrors] = useState<Map<string, boolean>>(new Map());

  const handleShelterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterName(event.target.value);
  }

  const handleShelterDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShelterDescription(event.target.value);
  }

  const handleShelterAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterAddress(event.target.value);
  }

  const handleShelterPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterPicture(event.target.value);
  }

  const handleShelterBanner = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterBanner(event.target.value);
  }

  const handleShelterPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterPhone(event.target.value);
  }

  const handleShelterWhatsapp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterWhatsapp(event.target.value);
  }

  const handleShelterInstagram = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterInstagram(event.target.value);
  }

  const handleShelterFacebook = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterFacebook(event.target.value);
  }

  const handleShelterCNPJ = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterCNPJ(event.target.value);
  }

  const handleShelterPixKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterPixKey(event.target.value);
  }

  const handleShelterAdoptionRules = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShelterAdoptionRules(event.target.value);
  }

  const handleSubmit = () => {
    onSubmit(
      shelterName,
      shelterDescription,
      shelterAddress,
      shelterPicture,
      shelterBanner,
      shelterPhone,
      shelterWhatsapp,
      shelterInstagram,
      shelterFacebook,
      shelterPixKey,
      shelterAdoptionRules,
    )
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileSizeInMB = file.size / 1024 / 1024 // Convert bytes to MB
   
      if (fileSizeInMB > 2) {
        popUplaert('O tamanho da imagem deve ser de no máximo 2MB', alertTypes.ERROR);
        return;
      }
   
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setShelterBanner(`data:image/png;base64,${base64String}`);
      };
      reader.readAsDataURL(file);
    }
   };

   const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileSizeInMB = file.size / 1024 / 1024 // Convert bytes to MB
   
      if (fileSizeInMB > 2) {
        popUplaert('O tamanho da imagem deve ser de no máximo 2MB', alertTypes.ERROR);
        return;
      }
   
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setShelterPicture(`data:image/png;base64,${base64String}`);
      };
      reader.readAsDataURL(file);
    }
   };
   


  type Fields = {
    [key: string]: string | undefined;
  };
   
  const fields: Fields = {
  shelterName: shelterName,
  shelterDescription: shelterDescription,
  shelterAddress: shelterAddress,
  shelterPicture: shelterPicture,
  shelterBanner: shelterBanner,
  shelterPhone: shelterPhone,
  shelterWhatsapp: shelterWhatsapp,
  shelterInstagram: shelterInstagram,
  shelterFacebook: shelterFacebook,
  shelterCNPJ: shelterCNPJ,
  shelterPixKey: shelterPixKey,
  shelterAdoptionRules: shelterAdoptionRules,
  };

  const validateField = (fieldName: string) => {
    const value = fields[fieldName];
    if (!value) {
      setErrors((error) => error.set(fieldName, true));
    } else {
      setErrors((error) => error.set(fieldName, false));
    }
   };
   
  

  const steps = [
    { title: 'Primeiro', description: 'Descrições' },
    { title: 'Segundo', description: 'Contatos' },
    { title: 'Terceiro', description: 'Imagens' },
  ]

  const { activeStep, goToNext } = useSteps({
    index: stepsIndex,
    count: steps.length,
  })

  console.log(`stepIndex: ${stepsIndex}`)

  const handleNextStep = () => {
    if (stepsIndex === steps.length - 1) {
      return;
    }
    if (errors.size > 0) {
      errors.forEach((value, key) => {
        if(value) {
          popUplaert('Preencha todos os campos corretamente', alertTypes.ERROR);
          return
        }
      })
    } 
    setErrors(new Map());
    setStepsIndex(stepsIndex + 1);
    goToNext();  
  }

  useEffect(() => {
    QRCode.toDataURL(shelterPixKey ? shelterPixKey : 'This is the way')
    .then((url) => {
      setQrCodePixUrl(url);
    }).catch((err) => {
      popUplaert('Erro ao gerar QRCode', alertTypes.ERROR);
    });
  }, [shelterPixKey])


  return (
    <>

    <Stepper 
      index={activeStep}
      mb={10}
      mt={10}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {stepsIndex === 0 && (
        <FormControl
        maxW='container.sm'
        >
        <FormLabel>Nome do abrigo</FormLabel>
        <Input 
          placeholder='Exemplo: Abrigo dois irmãos' 
          mb={5}
          onChange={handleShelterName}
          value={shelterName}
          onBlur={() => validateField('shelterName')}
          isInvalid={errors.get('shelterName')}
          />

        <FormLabel>Descrição do abrigo</FormLabel>
        <Textarea 
          placeholder='Exemplo: O abrigo é uma instituição sem fins lucrativos que tem como objetivo resgatar animais
          abandonados e cuidar deles até que sejam adotados.'
          mb={5}
          onChange={handleShelterDescription}
          value={shelterDescription}
          onBlur={() => validateField('shelterDescription')}
          isInvalid={errors.get('shelterDescription')}
          />

        <FormLabel>Localização do abrigo</FormLabel>
        <Input 
          placeholder='Exemplo: Rua 150, esquina com o Derby'  
          mb={5}
          onChange={handleShelterAddress}
          value={shelterAddress}
          onBlur={() => validateField('shelterAddress')}
          isInvalid={errors.get('shelterAddress')}
          />

        <FormLabel>Politica de adoção</FormLabel>
        <Textarea 
          placeholder='Exemplo: O abrigo não 
          aceita adoções de animais para fins de reprodução ou para serem usados como comercio.'
          mb={5}
          onChange={handleShelterAdoptionRules}
          value={shelterAdoptionRules}
          onBlur={() => validateField('shelterAdoptionRules')}
          isInvalid={errors.get('shelterAdoptionRules')}
          />
        <Flex justifyContent='center'>
          <Button 
            colorScheme='blue'
            onClick={handleNextStep}
            rightIcon={<AiOutlineArrowRight/>}
          >
            Próximo
          </Button>
        </Flex>
      </FormControl>
      )}
      {stepsIndex === 1 && (
        <FormControl
        maxW='container.sm'
        >
        <FormLabel>Telefone do abrigo</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <AiOutlinePhone />
          </InputLeftElement>
          <Input 
            placeholder='Exemplo: (81) 9 9999-9999' 
            mb={5}
            onChange={handleShelterPhone}
            value={shelterPhone}
            onBlur={() => validateField('shelterPhone')}
            isInvalid={errors.get('shelterPhone')}
          />
        </InputGroup>
       

        <FormLabel>Whatsapp do abrigo</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <AiOutlineWhatsApp />
          </InputLeftElement>
          <Input 
          placeholder='Exemplo: (81) 9 9999-9999' 
          mb={5}
          onChange={handleShelterWhatsapp}
          value={shelterWhatsapp}
          onBlur={() => validateField('shelterWhatsapp')}
          isInvalid={errors.get('shelterWhatsapp')}
        />
        </InputGroup>
        

        <FormLabel>Instagram do abrigo</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <AiFillInstagram />
          </InputLeftElement>
          <Input 
            placeholder='Exemplo: @abrigo_dois_irmaos'  
            mb={5}
            onChange={handleShelterInstagram}
            value={shelterInstagram}
          />
        </InputGroup>
        

        <FormLabel>Facebook de adoção</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <AiFillFacebook />
          </InputLeftElement>
          <Input 
            placeholder='Exemplo: @abrigo_dois_irmaos'  
            mb={5}
            onChange={handleShelterFacebook}
            value={shelterFacebook}
          />
        </InputGroup>
        <Flex direction='row'>
          <InputGroup maxW='60%'>
            <InputLeftElement pointerEvents='none'>
              <MdPix />
            </InputLeftElement>
            <Input 
              placeholder='Exemplo: 99999999999'  
              mb={5}
              onChange={handleShelterPixKey}
              value={shelterPixKey}
            />
          </InputGroup>
          <Box ml={20}>
            <Image 
              src={qrCodePixUrl}
              width={170}
              height={70}
              alt=''
            />
          </Box>
        </Flex>
        <Flex justifyContent='center'>
          <Button 
            colorScheme='blue'
            mb={5}
            onClick={handleNextStep}
            rightIcon={<AiOutlineArrowRight/>}
          >
            Próximo
          </Button>
        </Flex>
      </FormControl>
      )}
      {stepsIndex === 2 && (
        <Flex direction='column' maxH='60vh' maxW='60vw'>
          <Text fontSize='xl' fontWeight='bold' mb={5}>Banner do abrigo</Text>
          <Button
          border='2px solid'
          borderColor='gray.500'
          h='40%'
          w='100%'
          onClick={() => document.getElementById('imageUpload')?.click()}
          >
          {shelterBanner && 
            <Image src={shelterBanner} 
            alt="" 
            objectFit="cover"
            w='100%'
            h='100%'
            />
          }
          </Button>
          <input type="file" id="imageUpload" hidden onChange={handleImageUpload} style={{ display: 'none' }} />

        <Text fontSize='xl' fontWeight='bold' mt={5} mb={5}>Perfil do abrigo</Text>
        <Button
         border='2px solid'
         borderColor='gray.500'
         borderRadius='full'
          boxSize='150px'
         onClick={() => document.getElementById('imagePicUpload')?.click()}
        >
         {shelterPicture && 
           <Image src={shelterPicture} 
           alt="" 
           objectFit="cover"
           borderRadius='full'
           boxSize='150px'
           />
         }
        </Button>
        <input 
          type="file" 
          id="imagePicUpload" 
          hidden onChange={handleProfileImageUpload} 
          style={{ display: 'none' }} 
        />
        <Flex
          w="40%"
          justifyContent='center'
          mb={5}
        >
          <Button
            colorScheme='blue'
            mt={5}
            onClick={handleSubmit}
          >
            Criar abrigo
          </Button>
        </Flex>
       </Flex>
       
      )}

      
    </>
  );
}
