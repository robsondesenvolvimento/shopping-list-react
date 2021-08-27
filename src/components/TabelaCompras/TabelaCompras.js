import React from 'react';
import './TabelaCompras.css';

function TabelaCompras(props){

    const produtos = props.produtos.sort((a,b) => a.codigo - b.codigo);
    const handlerClick = props.handlerExcluirClick;
    const imagem = props.imagem;
    const descricaoTotal = props.descricaoTotal;

    return (
        <div className="p-4">
            <table className="table table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th className="w-10">Código</th>
                        <th scope="col" className="w-25">Nome</th>
                        <th scope="col" className="w-25">Descrição</th>
                        <th scope="col" className="w-10">Quantidade</th>
                        <th scope="col" className="w-5">Valor</th>
                        <th className="w-5"><img className="bi me-2" width="20" height="20" src={imagem[1]} alt="Lixeira"/></th>
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
                            <td><img className="bi me-2 icontrash" width="20" height="20" src={imagem[0]} alt="Lixeira" onClick={() => handlerClick(value.codigo)}/></td>
                        </tr>
                    ))}                    
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row"><abbr title={descricaoTotal} class="initialism">Total</abbr></th>
                        <th colSpan="2" style={{"text-align": "left"}}></th>
                        <td className="h6">{produtos.reduce((accumulator, currentValue) => accumulator + currentValue.quantidade, 0)}</td>
                        <td className="h6">R$ {produtos.reduce((accumulator, currentValue) => accumulator + currentValue.valor, 0).toFixed(2)}</td>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )

}

export default TabelaCompras;