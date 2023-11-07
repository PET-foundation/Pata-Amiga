import { Client } from '@stomp/stompjs';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import SockJS from 'sockjs-client';

export function createStompClient() {
  const socket = new SockJS(`http://localhost:8080/connect`)
  const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
  });

  return stompClient;
}
