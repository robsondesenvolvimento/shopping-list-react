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
            valor: Number.parseFloat(valor) 
        };

        setProdutos(produtos.concat(prod))
    }

    return (
        <div className="p-4">
            <div className="p-4">
                <form className="form-inline" onSubmit={handlerFormSubmit}>
                    <div className="form-group">
                        <div className="col p-1">
                            <input type="text" id="fproduto" className="form-control form-control-sm" placeholder="Produto"/>
                        </div>
                        <div className="col p-1">
                            <input type="text" id="fdescricao" className="form-control form-control-sm" placeholder="Descrição"/>
                        </div>
                        <div className="col p-1">
                            <input type="text" id="fquantidade" className="form-control form-control-sm" placeholder="Quantidade"/>
                        </div>
                        <div className="col p-1">
                            <input type="text" id="fvalor" className="form-control form-control-sm" placeholder="Valor"/>
                        </div>
                            <div className="col p-1">
                        <button type="submit" className="btn btn-primary mb-2">Inserir produto</button>
                        </div>
                    </div>
                </form>
            </div>

            <h3 className="alert alert-primary">Lista de compras</h3>
            <TabelaCompras produtos={produtos} handlerExcluirClick={handlerExcluirClick} imagem={[trashpreto,trashcinza]} descricaoTotal="Soma do valor de todos os produtos."/>

            <h3 className="alert alert-danger">Lista de compras excluidas</h3>
            <TabelaCompras produtos={produtosExluidos} handlerExcluirClick={handlerExcluidosClick} imagem={[turnleft,turnleftcinza]} descricaoTotal="Soma do valor de todos os produtos excluídos."/>
        </div>
    )

}

export default ListaCompras;