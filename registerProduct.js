cardRegistra = document.querySelector("#box")

function card(){
    cardRegistra.innerHTML = `<div class="flex-item" id="cad-produto">
                                <div id="add-img">
                                    <button onclick="document.querySelector('#carregar-img').click()" class="fas fa-plus"></button>
                                    <input class="fas fa-plus" type="file" id="carregar-img" accept="image/png, image/jpg" style="display:none">
                                    <a>Adicionar Imagem</a>
                                </div>
                                <div class="marge" id="descricao">
                                    <input type="text" class="input" id="desc-produto" placeholder="Descrição do Produto" >
                                </div>
                                <div class="marge" id="valor">
                                    <label>Valor do Produto</label>
                                    <input type="text" class="input" id="valor-produto" value="R$">
                                </div>
                                <div class="marge" id="tam-produto">
                                    <button type="button" value="P" onclick="selecionar('P')" class="botao" id="p">P</button>
                                    <button type="button" value="M" onclick="selecionar('M')" class="botao" id="m">M</button>
                                    <button type="button" value="G" onclick="selecionar('G')" class="botao" id="g">G</button>
                                </div>
                             </div>`
};
card();

let inputImg = document.querySelector("#carregar-img");
var upload = "";
let msg = document.querySelector("#mensagem");
    
inputImg.addEventListener('change', readFile);

function readFile() {
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
}
let url, descricao, valor, tamP, tamM, tamG;

// function pegarId(){
//     let ultimoId = localStorage.getItem("Id") || "-1";
//     let novoId = JSON.parse(ultimoId) + 1;
//     localStorage.setItem("Id", JSON.stringify(novoId))
//     return novoId;
// }

async function salvarDados(){
    
    let infos = {
        url: upload,
        descricao:  document.querySelector("#desc-produto").value,
        valor: document.querySelector("#valor-produto").value,
        tamP:document.querySelector("#p").value,
        tamM:document.querySelector("#m").value,
        tamG:document.querySelector("#g").value,
        // transactionId: pegarId()
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
            localStorage.setItem("dadosProduto", "[]")
            dados = []
        }
        dados.push(infos)
        localStorage.setItem("dadosProduto", JSON.stringify(dados))
        msg.innerText = 'Produto cadastrado';
        mensagem();   
    } else{
        msg.innerText = 'Produto já cadastrado, informe um novo';
        mensagem();
        return false;
    };
    console.log("chegou no card")
    card()
}    

function validarEntradas(){

    if ( document.getElementById("add-img").value === "" ||
         document.getElementById("desc-produto").value === "" ||  
         document.getElementById("valor-produto").value === ""   ) { 
        
        msg.innerText = 'Preencha todos os campos';
        mensagem();
        return false;
    } 
    return true;
}

function mensagem(){
    $(msg).addClass('ver');
    setTimeout(function() {$(msg).removeClass('ver')}, 2000);
}
