import React, { useState } from 'react';
import { TabelaCompras } from '../TabelaCompras';

function ListaCompras(props){

    const [produtos, setProdutos] = useState([].concat(
        { codigo: 1, produto: "Blusa", descricao: "Blusa XL", quantidade: 1, valor: 100.12, favorito: true },
        { codigo: 2, produto: "Calça", descricao: "Calça jeans", quantidade: 1, valor: 98.12, favorito: false },
        { codigo: 3, produto: "Meia", descricao: "Algodão", quantidade: 1, valor: 10.19, favorito: false },
        { codigo: 4, produto: "Camisa", descricao: "Polo", quantidade: 1, valor: 50.12, favorito: true },
        { codigo: 5, produto: "Notebook", descricao: "Nova gerção", quantidade: 1, valor: 3050.40, favorito: false },
        { codigo: 6, produto: "Celular", descricao: "Samsung", quantidade: 1, valor: 2080.00, favorito: false }
        ));

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

        let codigo = 0;

        if(produtos.length <= 0 && produtosExluidos.length <= 0){
            codigo = 1;
        }
        else {
            let produtosMax = 0;
            let prodExcluidosMax = 0;

            if(produtos.length > 0)
                produtosMax = Number.parseInt(produtos.map(value => value.codigo).reduce((a,b) => Math.max(a,b)));
            if(produtosExluidos.length > 0)
                prodExcluidosMax = Number.parseInt(produtosExluidos.map(value => value.codigo).reduce((a,b) => Math.max(a,b)));

            codigo = produtosMax > prodExcluidosMax?produtosMax:prodExcluidosMax;
            codigo += 1;
        }        

        if(Number.isNaN(codigo)) codigo = 1;

        var prod = { 
            codigo: codigo, 
            produto: produto, 
            descricao: descricao, 
            quantidade: Number.parseInt(quantidade), 
            valor: Number.parseFloat(valor),
            favorito: false
        };

        setProdutos(produtos.concat(prod));

        document.getElementById("formprodutos").reset();
    };

    return (
        <div className="p-4">
            <div className="p-4">
                <form className="form-inline" onSubmit={handlerFormSubmit} id="formprodutos">
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
                        <button type="submit" className="btn btn-primary mb-2" title="Inserir novo produto.">Inserir produto</button>
                        </div>
                    </div>
                </form>
            </div>

            <h3 className="alert alert-primary">
                Lista de compras &nbsp;
                <span class="badge bg-primary rounded-pill">{produtos.length}+</span>
            </h3>
            <TabelaCompras produtos={produtos} tipoLista="produtos" handlerExcluirClick={handlerExcluirClick} handlerFavoritoClick={(handlerFavoritoClick)} descricaoTotal="Soma do valor de todos os produtos."/>

            <h3 className="alert alert-danger">
                Lista de compras excluidas &nbsp;
                <span class="badge bg-danger rounded-pill">{produtosExluidos.length}+</span>
            </h3>
            <TabelaCompras produtos={produtosExluidos} tipoLista="excluidos" handlerExcluirClick={handlerExcluidosClick} handlerFavoritoClick={() => {}} descricaoTotal="Soma do valor de todos os produtos excluídos."/>
        </div>
    )

}

export default ListaCompras;