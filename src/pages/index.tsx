import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Link } from '@chakra-ui/next-js'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Link href='/about' color='blue.400' _hover={{ color: 'blue.500' }}>
      About
    </Link>
  )
}
