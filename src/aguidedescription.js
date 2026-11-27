

//# Loja de vestidos em React — guia 

//Exercício com os métodos de array `filter`, `map`, `find`, `some`, `forEach` e `sort`, num site de loja com categorias, pesquisa, saco e painel de filtros.


//A estrutura
//
//```
lojaDress/
  public/
    index.html
    images/ 
  src/
    index.js
    App.js
    styles.css
    pages/
      HomePage.js
      ShopPage.js
    components/
      Sidebar.js
      TopRight.js
      ProductGrid.js
      ProductCard.js
      FilterPanel.js
    data/
      dresses.js
```


// FOTOS: por as imagens na pasta public/images com estes nomes de exemplo:

// (paris.jpg, london.jpg, ...). Se uma foto não existir,
// aparece o bloco de cor "bg" no lugar dela. prevalece o valor de cor que colocar no ... bg: 



//filter 	ShopPage.js	categoria, pesquisa, preço, cores, tamanhos, estilo
//map  ProductGrid.js, Sidebar.js, FilterPanel.js	desenhar cartões, categorias e opções
//find	 ShopPage.js	ir buscar o vestido pelo id ao pôr no saco
//some	 ShopPage.js	o vestido tem alguma cor/tamanho escolhido? há peças quase esgotadas?
//forEach	ShopPage.js	somar o total do saco
//sort ShopPage.js	ordenar preco ou novidade



/////// creation of API

/* 
//sumario

//1 - npm init -y
2 - cd API
3 - CORRER O TEST NO TERMINAL (Para que serve:
O server.js vai usar o data.js. Se fosses direta ao servidor e algo falhasse, não sabias se o erro estava no server.js ou no data.js. Testando primeiro o data.js sozinho, ficas a saber que essa peça está boa. Se depois algo falhar, o problema só pode estar no servidor.)

//para ver as cores:

//node -e "console.log(require('./data.js').dresses.map(d => d.colors))"

para ver o detalhe dos vestidos:

node -e "console.log(require('./data.js').dresses)”

so os nomes dos vestidos
node -e "console.log(require('./data.js').dresses.map(d => d.name))"


na pagina criada do server colocar "// 1. Ir buscar o módulo http do Node
const http = require('http');

// Ir buscar os dados ao data.js
const { categories, colorOptions, sizeOptions, styleOptions, dresses } = require('./data.js');

const server = http.createServer((req, res) => {
  // CORS: deixa o React (porta 3000) pedir dados a esta API
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/dresses') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dresses));
  } else if (req.url === '/categories') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(categories));
  } else if (req.url === '/colorOptions') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(colorOptions));
  } else if (req.url === '/sizeOptions') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(sizeOptions));
  } else if (req.url === '/styleOptions') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(styleOptions));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});

server.listen(4000, () => {
  console.log('Servidor a correr em http://localhost:4000');
});



depois temos de correr "node server.js”


http://localhost:4000/


deppois abro de novo o API/SERVER E apago o que coloquei para substituir por outra info, 
---->

const http = require('http');

// Ir buscar os dados ao data.js
const { categories, colorOptions, sizeOptions, styleOptions, dresses } = require('./data.js');

const server = http.createServer((req, res) => {
  if (req.url === '/dresses') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dresses));
  } else {
    res.end('Rota não encontrada');
  }
});

server.listen(4000, () => {
  console.log('Servidor a correr em http://localhost:4000');
});


correr novamente o node server.js.


http://localhost:4000 vai aparecer rota nao encontrada
mas se manter o anterior convem  correr isto 

//      lsof -ti :4000 | xargs kill



http://localhost:4000/dresses


para reiniciar o servidor, usa sempre o mesmo terminal: Ctrl + C, seta ↑, Enter.
as 5 rotas no browser:

http://localhost:4000/dresses
http://localhost:4000/categories
http://localhost:4000/colorOptions
http://localhost:4000/sizeOptions
http://localhost:4000/styleOptions

Done -----
Next: descobrir onde o dresses.js é usado

No VS Code, carregar Cmd + Shift + F para pesquisar em todos os ficheiros.
Escrever: Data/dresses
Aparece a lista de ficheiros que fazem import ... from '../Data/dresses' 




*/