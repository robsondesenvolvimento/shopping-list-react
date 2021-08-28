import React, { useState } from 'react';
import { TabelaCompras } from '../TabelaCompras';
import trashpreto from '../../commons/trash-preto.svg';
import trashcinza from '../../commons/trash-cinza.svg';
import turnleft from '../../commons/turn-left.svg';
import turnleftcinza from '../../commons/turn-left-cinza.svg';
import star from '../../commons/star.svg';
import starcinza from '../../commons/star-cinza.svg';

function ListaCompras(props){

    const [produtos, setProdutos] = useState(props.produtos);
    const [produtosExluidos, setProdutosExcluidos] = useState([]);

    const handlerExcluirClick = (key) => {
        const prodExcl = produtos.filter(prod => prod.codigo === key);
        prodExcl[0].favorito = false;
        setProdutosExcluidos(produtosExluidos.concat(prodExcl));

        setProdutos(produtos.filter(prod => prod.codigo !== key));
    };

    const handlerExcluidosClick = (key) => {
        setProdutos(produtos.concat(produtosExluidos.filter(prod => prod.codigo === key)));
        setProdutosExcluidos(produtosExluidos.filter(prod => prod.codigo !== key));
    };

    const handlerFavoritoClick = (key) => {
        const listaProdFav = produtos.map(value => {

            if(value.favorito === true && value.codigo === key)
                value.favorito = false;
            else if(value.favorito === false && value.codigo === key)
                value.favorito = true;
            return value;
        });

        setProdutos(listaProdFav);
    }

    const handlerFormSubmit = (event) => {
        event.preventDefault();
        const produto = document.getElementById("fproduto").value;
        const descricao = document.getElementById("fdescricao").value;
        const quantidade = document.getElementById("fquantidade").value;
        const valor = document.getElementById("fvalor").value;

        const codigo = Number.parseInt(produtos.map(value => value.codigo).reduce((a,b) => Math.max(a,b))) + 1;

        var prod = { 
            codigo: codigo, 
            produto: produto, 
            descricao: descricao, 
            quantidade: Number.parseInt(quantidade), 
            valor: Number.parseFloat(valor),
            favorito: false
        };

        setProdutos(produtos.concat(prod))
    };

    return (
        <div className="p-4">
            <div className="p-4">
                <form className="form-inline" onSubmit={handlerFormSubmit}>
                    <div className="form-group">
                        <div className="col p-1">
                            <input type="text" id="fproduto" maxlength="30" className="form-control form-control-sm" placeholder="Produto" required/>
                        </div>
                        <div className="col p-1">
                            <input type="text" id="fdescricao" maxlength="30" className="form-control form-control-sm" placeholder="Descrição" required/>
                        </div>
                        <div className="col p-1">
                            <input type="number" id="fquantidade" pattern="[0-9]+" min="1" max="50" title="Quantidade de produtos." className="form-control form-control-sm" placeholder="Quantidade" required/>
                        </div>
                        <div className="col p-1">
                            <input type="text" id="fvalor" pattern="[0-9]+(\.[0-9]+)?" className="form-control form-control-sm" placeholder="Valor" required/>
                        </div>
                            <div className="col p-1">
                        <button type="submit" className="btn btn-primary mb-2">Inserir produto</button>
                        </div>
                    </div>
                </form>
            </div>

            <h3 className="alert alert-primary">Lista de compras</h3>
            <TabelaCompras produtos={produtos} tipoLista="produtos" handlerExcluirClick={handlerExcluirClick} handlerFavoritoClick={(handlerFavoritoClick)} descricaoTotal="Soma do valor de todos os produtos."/>

            <h3 className="alert alert-danger">Lista de compras excluidas</h3>
            <TabelaCompras produtos={produtosExluidos} tipoLista="excluidos" handlerExcluirClick={handlerExcluidosClick} handlerFavoritoClick={() => {}} descricaoTotal="Soma do valor de todos os produtos excluídos."/>
        </div>
    )

}

export default ListaCompras;