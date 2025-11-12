import React, { useState } from 'react';
import { usarChat } from '../contexto/ChatContexto';
import FormularioNuevoChat from './FormularioNuevoChat';
import '../estilos/ListaChats.css';

const ListaChats = () => {
  const {
    chats,
    chatActivo,
    setChatActivo,
    terminoBusqueda,
    setTerminoBusqueda,
  } = usarChat();
  const [mostrarFormularioNuevoChat, setMostrarFormularioNuevoChat] =
    useState(false);

  return (
    <div className="lista-chats">
      <div className="encabezado-lista-chats">
        <h2>Chats</h2>
        <button
          className="boton-nuevo-chat"
          onClick={() => setMostrarFormularioNuevoChat(true)}
        >
          +
        </button>
      </div>

      <div className="contenedor-busqueda">
        <input
          type="text"
          placeholder="Buscar chats..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          className="entrada-busqueda"
        />
      </div>

      <div className="contenedor-chats">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`elemento-chat ${
              chatActivo === chat.id ? 'activo' : ''
            }`}
            onClick={() => setChatActivo(chat.id)}
          >
            <div className="avatar-chat">{chat.avatar}</div>
            <div className="info-chat">
              <div className="nombre-chat">{chat.nombre}</div>
              <div className="estado-chat">
                <span className={`indicador-estado ${chat.estado}`}></span>
                {chat.estado === 'enLinea' ? 'En línea' : chat.ultimaVez}
              </div>
            </div>
            {chat.mensajes.length > 0 && (
              <div className="ultimo-mensaje">
                {chat.mensajes[chat.mensajes.length - 1].texto.slice(0, 20)}...
              </div>
            )}
          </div>
        ))}
      </div>

      {mostrarFormularioNuevoChat && (
        <FormularioNuevoChat
          onCerrar={() => setMostrarFormularioNuevoChat(false)}
        />
      )}
    </div>
  );
};

export default ListaChats;
