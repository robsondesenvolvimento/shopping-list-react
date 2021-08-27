import React from 'react';
import Imagem from '../../commons/trash.svg';
import './ListaCompras.css';

function TabelaCompras(props){

    const produtos = props.produtos;
    const handlerExcluirClick = props.handlerExcluirClick;

    return (
        <div className="p-4">
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
                        <tr key={value.codigo}>
                            <th scope="row">{value.codigo}</th>
                            <td>{value.produto}</td>
                            <td>{value.descricao}</td>
                            <td>{value.quantidade}</td>
                            <td>R$ {value.valor.toFixed(2)}</td>
                            <td><img className="bi me-2 icontrash" width="20" height="20" src={Imagem} alt="Lixeira" onClick={() => handlerExcluirClick(value.codigo)}/></td>
                        </tr>
                    ))}                    
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row"><abbr title="Soma total do valor de todos os produtos." class="initialism">Total</abbr></th>
                        <th colSpan="3" style={{"text-align": "left"}}></th>
                        <td className="h6">R$ {produtos.reduce((accumulator, currentValue) => accumulator + currentValue.valor, 0).toFixed(2)}</td>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )

}

export default TabelaCompras;