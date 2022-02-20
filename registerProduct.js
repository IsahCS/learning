// variaveis globais
const cardRegistra = document.querySelector("#box");
let msg = document.querySelector("#mensagem");
let url, descricao, valor, tamP, tamM, tamG;
let upload = "";

const card = () => {
    cardRegistra.innerHTML = `<div class="flex-item" id="cad-produto">
                                <div id="add-img">
                                    <button onclick="carregarImagem()" class="fas fa-plus"></button>
                                    <input class="fas fa-plus" type="file" id="carregar-img" accept="image/png, image/jpg" style="display:none">
                                    <a>Adicionar Imagem</a>
                                </div>
                                <div class="marge" id="descricao">
                                    <input type="text" class="input" id="desc-produto" placeholder="Descrição do Produto" >
                                </div>
                                <div class="marge" id="valor">
                                    <label>Valor do Produto</label>
                                    <input type="number" class="input" id="valor-produto">
                                </div>
                                <div class="marge" id="tam-produto">
                                    <button type="button" value="P" onclick="selecionar('P')" class="botao" id="p">P</button>
                                    <button type="button" value="M" onclick="selecionar('M')" class="botao" id="m">M</button>
                                    <button type="button" value="G" onclick="selecionar('G')" class="botao" id="g">G</button>
                                </div>
                             </div>`
    
                             let inputImg = document.querySelector("#carregar-img");
                             inputImg.addEventListener('change', readFile);
};

const carregarImagem = () => {
    document.querySelector('#carregar-img').click();
};

function readFile(){
    if (this.files && this.files[0]) {
        
        const read = new FileReader();
        read.addEventListener("load", (e) => {
        upload = e.target.result;
        document.querySelector("#add-img").style.backgroundImage = `url(${upload})`
        document.querySelector("#add-img").style.opacity = '1';
        document.querySelector("#add-img button").style.opacity = '0.3';
        document.querySelector("#add-img a").textContent = "";
      }); 
      read.readAsDataURL( this.files[0] );
    }
};

const salvarDados = () => {
    let infos = {
        url: upload,
        descricao:  document.querySelector("#desc-produto").value,
        valor: document.querySelector("#valor-produto").value,
        tamP:document.querySelector("#p").value,
        tamM:document.querySelector("#m").value,
        tamG:document.querySelector("#g").value,
    }    

    if(!validarEntradas()) {
        return;
    }

    let dados = JSON.parse(localStorage.getItem("dadosProduto"));
    let check;
    
    if(dados == null){
        localStorage.setItem("dadosProduto", JSON.stringify(dados));
        msg.innerText = 'Produto cadastrado';
        mensagem();  
    } else {
        check =  dados.find(dado => dado.descricao === infos.descricao);
    };
    
    if (!check ) {
        if(dados == null){
            localStorage.setItem("dadosProduto", "[]");
            dados = []
        }
        dados.push(infos);
        localStorage.setItem("dadosProduto", JSON.stringify(dados));
        msg.innerText = 'Produto cadastrado';
        mensagem();   
    } else{
        msg.innerText = 'Produto já cadastrado, informe um novo';
        mensagem();
        return false;
    };
    card();
};

const validarEntradas = () => {
    if ( document.getElementById("add-img").style.backgroundImage === "" ||
         document.getElementById("desc-produto").value === "" ||  
         document.getElementById("valor-produto").value === ""   ) { 
        
        msg.innerText = 'Preencha todos os campos';
        mensagem();
        return false;
    } 
    return true;
};

const mensagem = () => {
    $(msg).addClass('ver');
    setTimeout(function() {$(msg).removeClass('ver')}, 2000);
};

// inicializador
(() => {
    card();
})();