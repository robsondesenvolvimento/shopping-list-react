import React from 'react';
import { StarIcon, StarFillIcon, TrashIcon, ReplyIcon } from '@primer/octicons-react'
import './TabelaCompras.css';

function TabelaCompras(props) {

    let produtos = props.produtos === undefined?[]:props.produtos;
    if(produtos.length > 0){
        produtos = produtos.sort((a, b) => a.codigo - b.codigo);
        produtos = produtos.sort((a, b) => !a.favorito - !b.favorito);
    }
    const handlerClick = props.handlerExcluirClick === undefined?() => {}:props.handlerExcluirClick;
    const handlerFavoritoClick = props.handlerFavoritoClick === undefined?() => {}:props.handlerFavoritoClick;
    const descricaoTotal = props.descricaoTotal === undefined?"":props.descricaoTotal;
    const tipoLista = props.tipoLista === undefined?"produtos":props.tipoLista;

    return (
        <div className="p-4">
            <table className="table table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" className="w-5">Código</th>
                        <th scope="col" className="w-5">Favorito</th>
                        <th scope="col" className="w-25">Nome</th>
                        <th scope="col" className="w-25">Descrição</th>
                        <th scope="col" className="w-10">Quantidade</th>
                        <th scope="col" className="w-5">Valor</th>
                        <th scope="col" className="w-5">{tipoLista === "produtos" ? <TrashIcon size={16} /> : <ReplyIcon size={16} />}</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((value, index) => (
                        <tr key={value.codigo}>
                            <th scope="row">{value.codigo}</th>
                            <td>
                                {
                                    tipoLista === "produtos" ?
                                        <div className="icontrash" onClick={() => handlerFavoritoClick(value.codigo)} title={`Tornar favorito item ${value.codigo}`}>{value.favorito ? <StarFillIcon size={16} /> : <StarIcon size={16} />}</div> :
                                        <div title={`Tornar favorito item ${value.codigo}`}>{value.favorito ? <StarFillIcon size={16} /> : <StarIcon size={16} />}</div>
                                }
                            </td>
                            <td>{value.produto}</td>
                            <td>{value.descricao}</td>
                            <td>{value.quantidade}</td>
                            <td>R$ {value.valor.toFixed(2)}</td>
                            <td><div className="icontrash" href="/#" onClick={() => handlerClick(value.codigo)} title={tipoLista === "produtos" ? `Excluir produto item ${value.codigo}` : `Restaurar produto item ${value.codigo}`}>{tipoLista === "produtos" ? <TrashIcon size={16} /> : <ReplyIcon size={16} />}</div></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row"><abbr title={descricaoTotal} class="initialism">Total</abbr></th>
                        <th colSpan="3" style={{ "text-align": "left" }}></th>
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