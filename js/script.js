function createNode(Element){
    return document.createElement(Element);
}

function append(parent, Element){
    return parent.appendChild(Element);
}

const buscar = async() =>{
    let input = document.getElementById('inp-search')
    let chave = document.getElementById('inp-search').value
    let url = 'https://api.jikan.moe/v3/search/anime?q='+ chave

    const response = await fetch(url)
    const data = await response.json()

    let dados = data.results;

    mostrarTabela(dados)
}

function mostrarTabela(dados){
    document.getElementById("tbody").innerHTML=""
    return dados.map(function(dado){
        let tr = createNode('tr')
        let td_titulo = createNode('td')
        let td_ano = createNode('td')
        let td_score = createNode('td')
        let td_img = createNode('td')

        let data = new Date(Date.parse(dado.start_date)).getFullYear();
        td_titulo.innerHTML = `${dado.title}`;
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