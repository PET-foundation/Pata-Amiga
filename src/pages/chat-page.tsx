import React, { useEffect, useState } from 'react';
import { Box, Input, Button, VStack } from '@chakra-ui/react';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Socket, io } from 'socket.io-client';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

interface ChatMessage {
  content: string;
  sender: string;
  recipient: string;
}

var stompClient =null;
export default function ChatPage() {
  const [socket, setSocket] = useState(null);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState('CHATROOM');
  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: '',
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    const socket = io('ws://localhost:8080/ws'); // Conecte-se ao seu servidor Socket.io
    setSocket(socket);

    socket.on('connect', () => {
      setUserData({ ...userData, connected: true });
      socket.emit('join', { username: userData.username });
    });

    socket.on('publicMessage', (message) => {
      setPublicChats([...publicChats, message]);
    });

    socket.on('privateMessage', (message) => {
      const senderName = message.senderName;
      if (privateChats.get(senderName)) {
        privateChats.get(senderName).push(message);
      } else {
        privateChats.set(senderName, [message]);
      }
      setPrivateChats(new Map(privateChats));
    });

    socket.on('error', (err) => {
      console.log(err);
    });
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (socket) {
      socket.emit('publicMessage', {
        senderName: userData.username,
        message: userData.message,
      });
      setUserData({ ...userData, message: '' });
    }
  };

  const sendPrivateValue = () => {
    if (socket) {
      const message = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
      };
      if (userData.username !== tab) {
        const chats = privateChats.get(tab) || [];
        chats.push(message);
        privateChats.set(tab, chats);
        setPrivateChats(new Map(privateChats));
      }
      socket.emit('privateMessage', message);
      setUserData({ ...userData, message: '' });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          {/* Seu código do chat aqui */}
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
}

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}; */
