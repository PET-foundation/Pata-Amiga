import { PostResponse } from '@/service/axios/user/userResponses';
import { popUplaert } from '@/utils/alerts/popUpAlert';
import { Post } from '@/utils/types/CreatePost';
import { alertTypes } from '@/utils/types/alertTypes';
import { Box, Button, Flex, FormControl, Image, Input, Radio, RadioGroup, Select, Stack, Text, Textarea, FormLabel } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import {FaPaw} from 'react-icons/fa';

interface CreatePostFormProps {
  onSubmit?: (
    post: Post
  ) => void;
  isSubmitting?: boolean;
  isEdit?: boolean;
  postResponse?: PostResponse
}

export function CreatePostForm({ onSubmit, isSubmitting = false, isEdit, postResponse }: CreatePostFormProps) {
  const inputImageRef = useRef<HTMLInputElement>(null);

  const [isSubmittingState, setIsSubmittingState] = useState(isSubmitting);

  const [name, setName] = useState(isEdit ? postResponse.name : '');
  const [description, setDescription] = useState(isEdit ? postResponse.description : '');
  const [location, setLocation] = useState(isEdit ? postResponse.location : '');
  const [image, setImage] = useState(isEdit ? postResponse.picture : '');
  const [species, setSpecies] = useState(isEdit ? postResponse.info.specie : '');
  const [race, setRace] = useState(isEdit ? postResponse.info.race: '');
  const [sex, setSex] = useState(isEdit ? postResponse.info.sex : '');
  const [age, setAge] = useState(isEdit ? postResponse.info.age : '');
  const [weight, setWeight] = useState(isEdit ? postResponse.info.weight : '');
  const [castrated, setCastrated] = useState(isEdit ? postResponse.info.castrated : false);
  const [vaccinated, setVaccinated] = useState(isEdit ? postResponse.info.vaccinated : false);
  const [wormed, setWormed] = useState(isEdit ? postResponse.info.ungerminated : false);
  const [pedigree, setPedigree] = useState(isEdit ? postResponse.info.pedigree : false);
  const [specialCare, setSpecialCare] = useState(isEdit ? postResponse.info.specialNeeds : false);
  const [size, setSize] = useState(isEdit ? postResponse.info.port : 'SMALL');

  const handleBoxClick = () => {
    inputImageRef.current.click();
  };

  function handleChangeImage(event: any) {
    const file = event.target.files[0]; 

    if (file) {
      if (!(file.size <= 2 * 1024 * 1024)) {
        popUplaert('A imagem deve ter no máximo 2MB', alertTypes.WARNING)
        return
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImage(base64Image.toString());
      };

      reader.readAsDataURL(file);
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };


  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecies(e.target.value);
  };

  const handleRaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRace(e.target.value);
  };

  const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSex(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleCastratedChange = (e: string) => {
    setCastrated(inputRadiusValueToBoolean(e));
  };

  const handleVaccinatedChange = (e: string) => {
    setVaccinated(inputRadiusValueToBoolean(e));
  };

  const handleWormedChange = (e: string) => {
    setWormed(inputRadiusValueToBoolean(e));
  };

  const handlePedigreeChange = (e: string) => {
    setPedigree(inputRadiusValueToBoolean(e));
  };

  const handleSpecialCareChange = (e: string) => {
    setSpecialCare(inputRadiusValueToBoolean(e));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      name: name,
      description: description,
      location: location,
      picture: image,
      info: {
        age: age,
        weight: weight,
        castrated: castrated,
        vaccinated: vaccinated,
        ungerminated: wormed,
        pedigree: pedigree,
        port: size,
        race: race,
        sex: sex,
        specialNeeds: specialCare,
        specie: species,
      }
    })

  };

  const inputRadiusValueToBoolean = (value: string) => {
    return value === 'true' ? true : false;
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <FormControl 
          isRequired
          mb={4}
          >
          <Input 
            placeholder="Nome do pet"
            onChange={handleNameChange}
            value={name}
          />
        </FormControl>
        <Textarea 
          placeholder='Conte um pouco sobre o pet'
          size="sm"
          mb={4}
          onChange={handleDescriptionChange}
          value={description}
        />
        <FormControl isRequired mb={4}>
          <Input 
            placeholder='Informe a localização do pet'
            onChange={handleLocationChange}
            value={location}
          />
        </FormControl>

        <Flex
          border='1px' 
          borderColor='blue.200'
          _hover={{ borderColor: 'blue.400' }}
          transition='0.2s'
          borderRadius={5}
          direction='column'
          p={2}
          h={200}
          alignItems="center" 
          justifyContent="center"
          cursor='pointer'
          onClick={handleBoxClick}
        >
          {image ? (
            <Image 
              w='100vw'
              h='100vh'
              src={image}
              alt='image input'
              />
          ): (
            <>
              <Text
                fontSize='xl'
                fontWeight='bold'
                >
                Adicionar foto do pet
              </Text>
              <AiOutlinePlusSquare size={50} />
            </>
          )}
          <input
            type="file"
            ref={inputImageRef}
            style={{ display: 'none' }}
            onChange={handleChangeImage}
          />
        </Flex>
        
        <Flex direction='row' gap={6} mt={2}>
        <Stack spacing={2} direction='row'>
        <FormControl>
        <FormLabel >Qual espécie:</FormLabel>
        <Select 
          variant='outline' 
          placeholder='Nenhum' 
          maxW="100%"
          onChange={handleSpeciesChange}
          value={species}
        >
          <option value='Gato'>Gato</option>
          <option value='Cachorro'>Cachorro</option>
          <option value='Coelho'>Coelho</option>
          <option value='Passarinho'>Passarinho</option>
          <option value='Cabrito'>Cabrito</option>
        </Select>
        </FormControl>
        
        <FormControl>
        <FormLabel >Qual raça:</FormLabel>
        <Select 
          variant='outline' 
          placeholder='Nenhum' 
          maxW="100%"
          onChange={handleRaceChange}
          value={race}
          >
          <option value='Vira lata'>Vira lata</option>
          <option value='Pug'>Pug</option>
          <option value='Siamês'>Siamês</option>
          <option value='Persa'>Persa</option>
          <option value='Não sei dizer'>Não sei dizer</option>
        </Select>
        </FormControl>

        <FormControl>        
          <FormLabel >Qual sexo:</FormLabel>
            <Select 
              variant='outline' 
              placeholder='Nenhum' 
              maxW="100%"
              onChange={handleSexChange}
              value={sex}
              >
              <option value='Macho'>Macho</option>
              <option value='Fêmea'>Fêmea</option>
            </Select>
          </FormControl>
          
        <FormControl>
        <FormLabel >Qual porte:</FormLabel>
          <Select 
          variant='outline' 
          placeholder='Nenhum' 
          maxW="100%"
          onChange={handleSizeChange}
          value={size}
          >
            <option value='BIG'>Grande</option>
            <option value='Médio'>Médio</option>
            <option value='Pequeno'>Pequeno</option>
          </Select>    
        </FormControl>                  
        </Stack>
        </Flex>
          
        <Flex direction='row' gap={6} mt={2}>
        <Stack spacing={2} direction='row'>
        <FormControl>  
        <FormLabel >Qual idade:</FormLabel> 
          <Input 
            placeholder='Idade'
            maxW="100%"
            onChange={handleAgeChange}
            value={age}
          />      
        </FormControl>
             
        <FormControl>
        <FormLabel >Qual peso:</FormLabel> 
          <Input 
            placeholder='Peso'
            maxW="100%"
            onChange={handleWeightChange}
            value={weight}
          />
        </FormControl>  
        </Stack>  
        </Flex>  

        <Flex direction='row' gap={6} pt={2}>
        <Stack spacing={2} direction='row'>
        <RadioGroup
          defaultValue='false' 
          pt={2}
          onChange={handleCastratedChange}
          value={castrated.valueOf().toString()}
          >
            <FormLabel>É castrado?</FormLabel>
              <Radio colorScheme='blue' value='true'>
                Sim
              </Radio>
              <Radio colorScheme='red' value='false'>
                Não
              </Radio>
            </RadioGroup>
          
          <RadioGroup 
          defaultValue='false' 
          pt={2}
          onChange={handleVaccinatedChange}
          value={vaccinated.valueOf().toString()}
          >
            <FormLabel>É vecinado?</FormLabel>
              <Radio colorScheme='blue' value='true'>
                Sim
              </Radio>
              <Radio colorScheme='red' value='false'>
                Não
              </Radio>
          </RadioGroup>
          
          <RadioGroup 
          defaultValue='false' 
          pt={2}
          onChange={handleWormedChange}
          value={wormed.valueOf().toString()}
          >
            <FormLabel>É vermifungado?</FormLabel>
              <Radio colorScheme='blue' value='true'>
                Sim
              </Radio>
              <Radio colorScheme='red' value='false'>
                Não
              </Radio>
          </RadioGroup>
          
          <RadioGroup 
          defaultValue='false' 
          pt={2}
          onChange={handlePedigreeChange}
          value={pedigree.valueOf().toString()}
          >
            <FormLabel>Tem pedigree?</FormLabel>
              <Radio colorScheme='blue' value='true'>
                Sim
              </Radio>
              <Radio colorScheme='red' value='false'>
                Não
              </Radio>
          </RadioGroup>
          
          <RadioGroup 
          defaultValue='false' 
          pt={2}
          onChange={handleSpecialCareChange}
          value={specialCare.valueOf().toString()}
          >
            <FormLabel>Cuidados especiais?</FormLabel>
              <Radio colorScheme='blue' value='true'>
                Sim
              </Radio>
              <Radio colorScheme='red' value='false'>
                Não
              </Radio>
            </RadioGroup>
          </Stack>
        </Flex>
       
        <Flex pt={6} justifyContent="center">
          <Button 
          type='submit'
          rightIcon={<FaPaw/>}
          colorScheme='blue'
          isLoading={isSubmittingState}
          >
            Criar post
          </Button>
        </Flex>
      </form>
    </>
  );
}
