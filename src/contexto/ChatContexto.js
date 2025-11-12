import React, { createContext, useContext, useState } from 'react';

const ChatContexto = createContext();

export const usarChat = () => {
  const contexto = useContext(ChatContexto);
  if (!contexto) {
    throw new Error('usarChat debe usarse dentro de ProveedorChat');
  }
  return contexto;
};

export const ProveedorChat = ({ children }) => {
  const [chats, setChats] = useState([
    {
      id: 1,
      nombre: 'Ana García',
      avatar: '👩',
      estado: 'enLinea',
      ultimaVez: null,
      mensajes: [
        {
          id: 1,
          texto: '¡Hola! ¿Cómo estás?',
          esUsuario: false,
          timestamp: new Date(),
        },
        {
          id: 2,
          texto: '¡Hola Ana! Todo bien, gracias',
          esUsuario: true,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: 2,
      nombre: 'Carlos López',
      avatar: '👨',
      estado: 'desconectado',
      ultimaVez: 'Hace 2 horas',
      mensajes: [
        {
          id: 1,
          texto: 'Nos vemos mañana',
          esUsuario: false,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: 3,
      nombre: 'María Rodríguez',
      avatar: '👩‍💼',
      estado: 'enLinea',
      ultimaVez: null,
      mensajes: [
        {
          id: 1,
          texto: '¿Vamos al cine?',
          esUsuario: false,
          timestamp: new Date(),
        },
      ],
    },
  ]);

  const [chatActivo, setChatActivo] = useState(1);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const agregarChat = (nombre) => {
    const nuevoChat = {
      id: Date.now(),
      nombre,
      avatar: '👤',
      estado: 'enLinea',
      ultimaVez: null,
      mensajes: [],
    };
    setChats((prev) => [...prev, nuevoChat]);
    setChatActivo(nuevoChat.id);
  };

  const enviarMensaje = (texto) => {
    if (!texto.trim()) return;

    const nuevoMensaje = {
      id: Date.now(),
      texto: texto.trim(),
      esUsuario: true,
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatActivo
          ? { ...chat, mensajes: [...chat.mensajes, nuevoMensaje] }
          : chat
      )
    );

    // Respuesta automática después de delay
    setTimeout(() => {
      const respuestas = [
        '¡Interesante!',
        'Cuéntame más...',
        'Estoy de acuerdo',
        '¿En serio?',
        'Jajaja, qué bueno',
        'No tenía idea',
        'Qué emocionante',
        'Me encanta eso',
      ];
      const respuestaAleatoria =
        respuestas[Math.floor(Math.random() * respuestas.length)];

      const mensajeAutomatico = {
        id: Date.now() + 1,
        texto: respuestaAleatoria,
        esUsuario: false,
        timestamp: new Date(),
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatActivo
            ? { ...chat, mensajes: [...chat.mensajes, mensajeAutomatico] }
            : chat
        )
      );
    }, 1000 + Math.random() * 2000);
  };

  const chatsFiltrados = chats.filter((chat) =>
    chat.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  const valor = {
    chats: chatsFiltrados,
    chatActivo,
    setChatActivo,
    enviarMensaje,
    agregarChat,
    terminoBusqueda,
    setTerminoBusqueda,
    obtenerChatActivo: () => chats.find((chat) => chat.id === chatActivo),
  };

  return (
    <ChatContexto.Provider value={valor}>{children}</ChatContexto.Provider>
  );
};
