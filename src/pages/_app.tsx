import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { extendTheme } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

export const theme = extendTheme({ colors });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ChakraProvider>
      <NextNProgress
        color={'#f6e05e'}
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow
      />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}
