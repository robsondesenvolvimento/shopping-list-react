import React, { useState } from 'react';
import { TabelaCompras } from '../TabelaCompras';
import trashpreto from '../../commons/trash-preto.svg';
import trashcinza from '../../commons/trash-cinza.svg';
import turnleft from '../../commons/turn-left.svg';
import turnleftcinza from '../../commons/turn-left-cinza.svg';

function ListaCompras(props){

    const [produtos, setProdutos] = useState(props.produtos);
    const [produtosExluidos, setProdutosExcluidos] = useState([]);

    const handlerExcluirClick = (key) => {
        setProdutosExcluidos(produtosExluidos.concat(produtos.filter(prod => prod.codigo === key)));
        setProdutos(produtos.filter(prod => prod.codigo !== key));
    };

    const handlerExcluidosClick = (key) => {
        setProdutos(produtos.concat(produtosExluidos.filter(prod => prod.codigo === key)));
        setProdutosExcluidos(produtosExluidos.filter(prod => prod.codigo !== key));
    };

    return (
        <div className="p-4">
            <h3 className="alert alert-primary">Lista de compras</h3>
            <TabelaCompras produtos={produtos} handlerExcluirClick={handlerExcluirClick} imagem={[trashpreto,trashcinza]} descricaoTotal="Soma do valor de todos os produtos."/>

            <h3 className="alert alert-danger">Lista de compras excluidas</h3>
            <TabelaCompras produtos={produtosExluidos} handlerExcluirClick={handlerExcluidosClick} imagem={[turnleft,turnleftcinza]} descricaoTotal="Soma do valor de todos os produtos excluídos."/>
        </div>
    )

}

export default ListaCompras;