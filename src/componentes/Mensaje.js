import React from 'react';
import '../estilos/Mensaje.css';

const Mensaje = ({ mensaje }) => {
  const formatearTiempo = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`mensaje ${
        mensaje.esUsuario ? 'mensaje-usuario' : 'mensaje-recibido'
      }`}
    >
      <div className="burbuja-mensaje">
        <div className="texto-mensaje">{mensaje.texto}</div>
        <div className="tiempo-mensaje">
          {formatearTiempo(mensaje.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default Mensaje;
