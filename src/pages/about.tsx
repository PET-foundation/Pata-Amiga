import { Flex } from "@chakra-ui/react";
import background from '/public/img/background.png'

function About() {
  return (
    <Flex alignContent='center' alignItems='center' h="100vh" justifyContent='center' backgroundImage={background.src}>
      <h1>Quem nós somos?</h1>
      <h3>Somos a Pata amiga, um fundação que ajuda animais de rua</h3>
    </Flex>
  );
}

export default About;
