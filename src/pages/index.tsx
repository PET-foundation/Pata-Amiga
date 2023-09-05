import { Link } from '@chakra-ui/next-js'
import {  Image } from '@chakra-ui/react'


export default function Home() {
  return (
    <div>
      <Image
        borderRadius='full'
        boxSize='150px'
        src='https://bit.ly/dan-abramov'
        alt='Dan Abramov'
      />
      <Link href='/about' _hover={{color: '#0037a4'}}>About</Link>
    </div>
  )
}
