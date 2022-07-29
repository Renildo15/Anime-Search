function createNode(Element){
    return document.createElement(Element);
}

function append(parent, Element){
    return parent.appendChild(Element);
}

const buscar = async() =>{
    let input = document.getElementById('inp-search')
    let tam = JSON.stringify(input.value).length - 2;

    if(input.value == "" || tam < 2){
        document.getElementById("msg-erro").style.visibility = "visible";
        setTimeout(() => {
            document.getElementById("msg-erro").style.visibility = "hidden";
        }, 5000);
        
    }else{
        document.getElementById("msg-erro").style.visibility = "hidden";
        document.getElementById("loader").style.visibility = "visible";
        document.getElementById("btn-search").style.visibility = "hidden";
    }
   
    let chave = document.getElementById('inp-search').value
    let url = 'https://api.jikan.moe/v3/search/anime?q='+ chave

    const response = await fetch(url)
    const data = await response.json()

    let dados = data.results;

    document.getElementById("titulo").setAttribute("onclick","ordenarPorTitulo("+JSON.stringify(dados)+")")
    document.getElementById("ano").setAttribute("onclick","ordenarPorAno("+JSON.stringify(dados)+")")
    document.getElementById("score").setAttribute("onclick","ordenarPorScore("+JSON.stringify(dados)+")")

    document.getElementById("loader").style.visibility = "hidden"
    mostrarTabela(dados)
    document.getElementById("btn-search").style.visibility = "visible";
}

function mostrarTabela(dados){
    document.getElementById("tabela").style.visibility = "visible"
    document.getElementById("tbody").innerHTML=""
    return dados.map(function(dado){
        let tr = createNode('tr')
        let td_titulo = createNode('td')
        let td_ano = createNode('td')
        let td_score = createNode('td')
        let td_img = createNode('td')

        let data = new Date(Date.parse(dado.start_date)).getFullYear();
        td_titulo.innerHTML = `<a href="${dado.url} target="_blank">${dado.title}<a/>`;
        td_ano.innerHTML = `${data}`;
        td_score.innerHTML = `${dado.score}`;
        td_img.innerHTML = `<a href="#" onclick="carregarImagem(event,'${dado.image_url}')">Carregar</a>` 

        append(tr, td_titulo);
        append(tr, td_ano);
        append(tr, td_score);
        append(tr, td_img);
        append(tbody, tr)
    })
}

const carregarImagem = (event, url) =>{
    event.preventDefault()
    document.getElementById("imagem").innerHTML = `<img src="${url} width="200px"/>"`
}

function ordenarPorTitulo(dados){
    dados.sort((a,b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0);

    if(document.getElementById("titulo").value == "1"){
        dados.reverse();
        mostrarTabela(dados);
        document.getElementById("titulo").value = "0"
    }else{
        mostrarTabela(dados);
        document.getElementById("titulo").value = "1"
    }
}

function ordenarPorAno(dados){
    dados.sort((a,b) => a.start_date < b.start_date ? -1 : a.start_date > b.start_date ? 1 : 0);

    if(document.getElementById("ano").value == "1"){
        dados.reverse();
        mostrarTabela(dados);
        document.getElementById("ano").value = "0"
    }else{
        mostrarTabela(dados)
        document.getElementById("ano").value = "1"
    }
}

function ordenarPorScore(dados){
    dados.sort((a,b) => a.score < b.score ? -1 : a.score > b.score ? 1 : 0);

    if(document.getElementById("score").value == "1"){
        dados.reverse();
        mostrarTabela(dados)
        document.getElementById("score").value = "0";
    }else{
        mostrarTabela(dados)
        document.getElementById("score").value = "1";
    }
}