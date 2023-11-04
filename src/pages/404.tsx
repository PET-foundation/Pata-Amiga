import { Box, Text, Link, Heading } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

const NotFoundPage = () => {
   return (
    <Box 
      textAlign="center" 
      py={10} 
      px={6}
      h='100vh'
      backgroundImage='https://cdn.abcotvs.com/dip/images/831727_070615-cc-Sad-Cat-Thumb.jpg?w=1600'
      backgroundPosition='center'
      >
      <Heading as="h2" size="2xl" isTruncated mt={200} color='white'>
          404 - Página não encontrada
      </Heading>
      <Text mt={4} fontSize="xl" color='white'>
          Desculpe, mas a página que você está procurando não existe.
      </Text>
      <Link href="/" mt={6} color='black'>
          <FiArrowLeft /> Voltar para a página inicial
      </Link>
    </Box>
   )
}

export default NotFoundPage;
