import React from 'react';
import { ProveedorChat } from './contexto/ChatContexto';
import ListaChats from './componentes/ListaChats';
import VentanaChat from './componentes/VentanaChat';
import './estilos/App.css';

function App() {
  return (
    <ProveedorChat>
      <div className="app">
        <div className="contenedor-app">
          <ListaChats />
          <VentanaChat />
        </div>
      </div>
    </ProveedorChat>
  );
}

export default App;
