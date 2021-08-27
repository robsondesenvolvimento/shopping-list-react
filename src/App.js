import React, { useState, useEffect } from 'react';
import { ListaCompras } from './components/ListaCompras';
import './App.css';

function App() {

  const [produtos] = useState([].concat(
    { codigo: 1, produto: "Blusa", descricao: "Blusa XL", quantidade: 1, valor: 100.12 },
    { codigo: 2, produto: "Calça", descricao: "Calça jeans", quantidade: 1, valor: 98.12 },
    { codigo: 3, produto: "Meia", descricao: "Algodão", quantidade: 1, valor: 10.19 },
    { codigo: 4, produto: "Camisa", descricao: "Polo", quantidade: 1, valor: 50.12 }
    ));

  return (
    <div className="App">
      <ListaCompras produtos={produtos}/>
    </div>
  );
}

export default App;
