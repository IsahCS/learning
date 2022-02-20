const botaoExcluir = document.querySelector("#botaoExcluir");
const vazio = document.querySelector("#null");
let infos_container = document.querySelector("#card");
let keys = Object.keys(localStorage);
let id;

const montarCard = () => {
    const dadosLocal = JSON.parse(localStorage.getItem("dadosProduto"));

    if(keys == '' || dadosLocal == ''){
        vazio.innerText = "Cadastre uma camisa"
    }
    
    dadosLocal.forEach((shirt, index) => { 
        const camisaId = `camisa-${index}`;
        infos_container.innerHTML +=   `<li class="card-camisa" id="${camisaId}">
                                            <div id="add-image">                                         
                                                <i class="fas fa-trash-alt" id="img-${index}" title="Excluir Produto" onclick="excluir()"></i>       
                                                <img class="card-image" alt="${shirt.url}" src="${shirt.url}">
                                            </div>
                                            <div class="marge" id="descricao">${shirt.descricao}</div>
                                            <div class="marge" id="valor">R$${shirt.valor}</div>
                                            <div class="marge" id="tam-produto">
                                                <button type="button" value="${shirt.tamP}" onclick="selecionar('P')" class="botao" id="p">P</button>
                                                <button type="button" value="${shirt.tamM}" onclick="selecionar('M')" class="botao" id="m">M</button>
                                                <button type="button" value="${shirt.tamG}" onclick="selecionar('G')" class="botao" id="g">G</button>
                                            </div>
                                        </li>`    
    });   
};

const excluir = () => {
    const ultimoTrashId = event.target.id;
    const separaId = ultimoTrashId.split("-");
    id = separaId[1];
    $(botaoExcluir).addClass('ver');
};

const deletes = (botao) => {
    switch(botao){
        case 'sim':
            const dadosLocal = JSON.parse(localStorage.getItem("dadosProduto"));
            const camisasFiltradas = dadosLocal.filter((element, i) => id != i );
            const camisasFiltradasJSON =  JSON.stringify(camisasFiltradas);
            localStorage.setItem("dadosProduto", camisasFiltradasJSON);
            $(botaoExcluir).removeClass('ver');
            infos_container.innerHTML = "";
            montarCard();
        break;
        case 'nao':
             $(botaoExcluir).removeClass('ver');
        break;
    }
};

(() => {
    montarCard();
})();
