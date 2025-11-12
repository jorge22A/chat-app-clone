import React, { useState, useRef, useEffect } from 'react';
import { usarChat } from '../contexto/ChatContexto';
import Mensaje from './Mensaje';
import '../estilos/VentanaChat.css';

const VentanaChat = () => {
  const { obtenerChatActivo, enviarMensaje } = usarChat();
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const refFinalMensajes = useRef(null);

  const chatActivo = obtenerChatActivo();

  const desplazarAlFinal = () => {
    refFinalMensajes.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    desplazarAlFinal();
  }, [chatActivo?.mensajes]);

  const manejarEnviarMensaje = (e) => {
    e.preventDefault();
    if (nuevoMensaje.trim()) {
      enviarMensaje(nuevoMensaje);
      setNuevoMensaje('');
    }
  };

  if (!chatActivo) {
    return (
      <div className="ventana-chat sin-chat">
        <div className="sin-chat-seleccionado">
          <h3>Selecciona un chat para empezar a conversar</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="ventana-chat">
      <div className="encabezado-chat">
        <div className="info-encabezado-chat">
          <div className="avatar-chat">{chatActivo.avatar}</div>
          <div>
            <div className="nombre-chat">{chatActivo.nombre}</div>
            <div className="estado-chat">
              <span className={`indicador-estado ${chatActivo.estado}`}></span>
              {chatActivo.estado === 'enLinea'
                ? 'En línea'
                : `Visto ${chatActivo.ultimaVez}`}
            </div>
          </div>
        </div>
      </div>

      <div className="contenedor-mensajes">
        {chatActivo.mensajes.map((mensaje) => (
          <Mensaje key={mensaje.id} mensaje={mensaje} />
        ))}
        <div ref={refFinalMensajes} />
      </div>

      <form
        onSubmit={manejarEnviarMensaje}
        className="formulario-entrada-mensaje"
      >
        <div className="contenedor-entrada">
          <input
            type="text"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="entrada-mensaje"
          />
          <button type="submit" className="boton-enviar">
            ➤
          </button>
        </div>
      </form>
    </div>
  );
};

export default VentanaChat;
