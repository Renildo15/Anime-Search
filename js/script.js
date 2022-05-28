function createNode(element){
    return document.createElement(element);
}

function Append(parent, el){
    return parent.appendChild(el);
}

function carregarImagem(event, url){
    event.preventDefault();
    document.getElementById("imagem").innerHTML = `<img src = "${url}" width="200px"/>`
}


function ordenarPorTitulo(dados){
    dados.sort((a,b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0);

    if(document.getElementById("th_title").value = "1"){
        dados.reverse();
        mostrarTabela(dados);
        document.getElementById("th_title").value = "0";
    }else{
        mostrarTabela(dados);
        document.getElementById("th_title").value = "1";
    }
}


function ordenarAno(dados){
    dados.sort((a,b)=> a.start_date < b.start_date ? -1 : a.start_date > b.start_date ? 1 : 0);

    if(document.getElementById("th_year").value = "1"){
        dados.reverse();
        mostrarTabela(dados)
        document.getElementById("th_year").value = "0";
    }else{
        mostrarTabela(dados)
        document.getElementById("th_year").value = "1";
    }
}
function ordenarAno(dados){
    dados.sort((a,b)=> a.score < b.score ? -1 : a.score > b.score ? 1 : 0);

    if(document.getElementById("th_score").value = "1"){
        dados.reverse();
        mostrarTabela(dados)
        document.getElementById("th_score").value = "0";
    }else{
        mostrarTabela(dados)
        document.getElementById("th_score").value = "1";
    }
}


function mostrarTabela(dados){
    document.getElementById("tabela").style.visibility = "visible"
    let tbody = document.getElementById("tbody").innerHTML = ""

    return dados.map(function(dado) {
        let tr = createNode("tr");
        let td_title = createNode("td");
        let td_year = createNode("td");
        let td_score = createNode("td");
        let td_image = createNode("td");

        let data = new Date(Date.parse(dado.start_date)).getFullYear();

        td_title.innerHTML=`<a href ="${dado.url} target="blank">${dado.title}</a>`;
        td_year.innerHTML=`${dado.data}`;
        td_score.innerHTML = `${data.score}`;
        td_image.innerHTML = `<a href="#" onclick="carregarImagem(event,'${dado.image_url}')">Carregar</a>`

        Append(tr, td_title);
        Append(tr,td_year);
        Append(tr, td_score);
        Append(tr, td_image);
        Append(tbody, tr)
    })

}