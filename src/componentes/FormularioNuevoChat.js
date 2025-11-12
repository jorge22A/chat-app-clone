import React, { useState } from 'react';
import { usarChat } from '../contexto/ChatContexto';
import '../estilos/ListaChats.css';

const FormularioNuevoChat = ({ onCerrar }) => {
  const [nombreContacto, setNombreContacto] = useState('');
  const { agregarChat } = usarChat();

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombreContacto.trim()) {
      agregarChat(nombreContacto.trim());
      setNombreContacto('');
      onCerrar();
    }
  };

  return (
    <div className="superposicion-modal">
      <div className="contenido-modal">
        <h3>Nuevo Chat</h3>
        <form onSubmit={manejarEnvio}>
          <input
            type="text"
            value={nombreContacto}
            onChange={(e) => setNombreContacto(e.target.value)}
            placeholder="Nombre del contacto"
            className="entrada-modal"
            autoFocus
          />
          <div className="acciones-modal">
            <button type="button" onClick={onCerrar} className="boton-cancelar">
              Cancelar
            </button>
            <button type="submit" className="boton-confirmar">
              Crear Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioNuevoChat;
