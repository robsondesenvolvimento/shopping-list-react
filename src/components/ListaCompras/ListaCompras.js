import React, { useState } from 'react';
import Imagem from '../../trash.svg';

function ListaCompras(props){

    const [produtos] = useState(props.produtos);

    return (
        <div>
            <table className="table table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Código</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Valor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((value, index) => (
                        <tr key={index}>
                            <th scope="row">{value.codigo}</th>
                            <td>{value.produto}</td>
                            <td>{value.descricao}</td>
                            <td>{value.quantidade}</td>
                            <td>R$ {value.valor}</td>
                            <td><img className="bi me-2" width="20" height="20" src={Imagem} alt="Lixeira"/></td>
                        </tr>
                    ))}                    
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row">Total</th>
                        <th colSpan="3" style={{"text-align": "left"}}></th>
                        <td>R$ {produtos.reduce((accumulator, currentValue) => accumulator + currentValue.valor, 0)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )

}

export default ListaCompras;