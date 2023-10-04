import { PostResponse } from '@/service/axios/user/userResponses';
import { popUplaert } from '@/utils/alerts/popUpAlert';
import { Post } from '@/utils/types/CreatePost';
import { alertTypes } from '@/utils/types/alertTypes';
import { Box, Button, Flex, FormControl, Image, Input, Radio, RadioGroup, Select, Stack, Text, Textarea } from '@chakra-ui/react';
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

  const handleSexChange = (e: string) => {
    setSex(e);
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
            placeholder="name"
            onChange={handleNameChange}
            value={name}
          />
        </FormControl>
        <Textarea 
          placeholder='Informe a descrição do animal, como onde foi encontrado, se tem alguma doença, se é dócil, etc.'
          size="sm"
          mb={4}
          onChange={handleDescriptionChange}
          value={description}
        />
        <FormControl isRequired mb={4}>
          <Input 
            placeholder='Informe a localização do animal'
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
              w='100%'
              h='100%'
              src={image}/>
          ): (
            <>
              <Text
                fontSize='xl'
                fontWeight='bold'
                >
                Preview da Image
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
        <Flex direction='row' gap={5} mt={2}>
        <Select 
          variant='filled' 
          placeholder='espécie' 
          maxW="49%"
          onChange={handleSpeciesChange}
          value={species}
        >
          <option value='Gato'>Gato</option>
          <option value='Cachorro'>Cachorro</option>
          <option value='Coelho'>Coelho</option>
          <option value='Passarinho'>Passarinho</option>
          <option value='Sapo'>Sapo</option>
        </Select>
        <Select 
          variant='filled' 
          placeholder='raça' 
          maxW="49%"
          onChange={handleRaceChange}
          value={race}
          >
          <option value='Vira lata'>Vira lata</option>
          <option value='siamês'>siamês</option>
          <option value='option2'>bonito</option>
          <option value='option2'>fofo</option>
          <option value='option2'>arroz</option>
        </Select>
        </Flex>
        <Flex direction='row' gap={5} pt={4}>
          <RadioGroup defaultValue='M' pt={2}
            onChange={handleSexChange}
            value={sex}
          >
            <Stack spacing={5} direction='row'>
              <Radio colorScheme='blue' value='M'>
                Macho
              </Radio>
              <Radio colorScheme='pink' value='F'>
                Femêa
              </Radio>
            </Stack>
          </RadioGroup>
          <Input 
            placeholder='idade. Ex.: 2 anos e 3 meses'
            maxW="36%"
            onChange={handleAgeChange}
            value={age}
          />
          <Input 
            placeholder='peso. Ex.: 2kg e 300g'
            maxW="36%"
            onChange={handleWeightChange}
            value={weight}
          />
        </Flex>
        <Flex direction='row' gap={6} pt={4}>
        <RadioGroup 
          defaultValue='false' 
          pt={2}
          onChange={handleCastratedChange}
          value={castrated.valueOf().toString()}
          >
            <Text>É castrado?</Text>
            <Stack spacing={5} direction='row'>
              <Radio colorScheme='blue' value='true'>
                Sim
              </Radio>
              <Radio colorScheme='red' value='false'>
                Não
              </Radio>
            </Stack>
          </RadioGroup>
          <RadioGroup 
          defaultValue='false' 
          pt={2}
          onChange={handleVaccinatedChange}
          value={vaccinated.valueOf().toString()}
          >
            <Text>É vecinado?</Text>
            <Stack spacing={5} direction='row'>
              <Radio colorScheme='blue' value='true'>
                Sim
              </Radio>
              <Radio colorScheme='red' value='false'>
                Não
              </Radio>
            </Stack>
          </RadioGroup>
          <RadioGroup 
          defaultValue='false' 
          pt={2}
          onChange={handleWormedChange}
          value={wormed.valueOf().toString()}
          >
            <Text>É vermifungado?</Text>
            <Stack spacing={5} direction='row'>
              <Radio colorScheme='blue' value='true'>
                Sim
              </Radio>
              <Radio colorScheme='red' value='false'>
                Não
              </Radio>
            </Stack>
          </RadioGroup>
          <RadioGroup 
          defaultValue='false' 
          pt={2}
          onChange={handlePedigreeChange}
          value={pedigree.valueOf().toString()}
          >
            <Text>Tem pedigree?</Text>
            <Stack spacing={5} direction='row'>
              <Radio colorScheme='blue' value='true'>
                Sim
              </Radio>
              <Radio colorScheme='red' value='false'>
                Não
              </Radio>
            </Stack>
          </RadioGroup>
          <RadioGroup 
          defaultValue='false' 
          pt={2}
          onChange={handleSpecialCareChange}
          value={specialCare.valueOf().toString()}
          >
            <Text>Cuidados especiais?</Text>
            <Stack spacing={5} direction='row'>
              <Radio colorScheme='blue' value='true'>
                Sim
              </Radio>
              <Radio colorScheme='red' value='false'>
                Não
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        <Flex direction='row' gap={5} pt={4}>
        <Select 
        variant='filled' 
        placeholder='porte' 
        maxW="60%"
        onChange={handleSizeChange}
        value={size}
        >
          <option value='BIG'>Grande</option>
          <option value='SMALL'>pequeno</option>
          <option value='MEDIUM'>médio</option>
        </Select>
        </Flex>
        <Flex pt={4} justifyContent="center">
          <Button 
          type='submit'
          rightIcon={<FaPaw/>}
          colorScheme='messenger'
          isLoading={isSubmittingState}
          >
            Criar post
          </Button>
        </Flex>
      </form>
    </>
  );
}
