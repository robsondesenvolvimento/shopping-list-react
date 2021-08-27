import React, { useState } from 'react';
import { ListaCompras } from './components/ListaCompras';
import './App.css';

function App() {

  const [produtos] = useState([].concat(
    { codigo: 1, produto: "Blusa", descricao: "Blusa XL", quantidade: 1, valor: 100.12, favorito: true },
    { codigo: 2, produto: "Calça", descricao: "Calça jeans", quantidade: 1, valor: 98.12, favorito: false },
    { codigo: 3, produto: "Meia", descricao: "Algodão", quantidade: 1, valor: 10.19, favorito: false },
    { codigo: 4, produto: "Camisa", descricao: "Polo", quantidade: 1, valor: 50.12, favorito: true },
    { codigo: 5, produto: "Notebook", descricao: "Nova gerção", quantidade: 1, valor: 3050.40, favorito: false },
    { codigo: 6, produto: "Celular", descricao: "Samsung", quantidade: 1, valor: 2080.00, favorito: false }
    ));

  

  return (
    <div className="App">
      <ListaCompras produtos={produtos} />
    </div>
  );
}

export default App;
