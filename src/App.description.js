

//# Loja de vestidos em React — guia 

//Exercício com os métodos de array `filter`, `map`, `find`, `some`, `forEach` e `sort`, num site de loja com categorias, pesquisa, saco e painel de filtros.


//A estrutura
//
//```
loja-cra/
  public/
    index.html
    images/            ← fotos dos vestidos
  src/
    index.js
    App.js
    styles.css
    pages/
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


// FOTOS: por as imagens na pasta public/images com estes nomes
// (paris.jpg, london.jpg, ...). Se uma foto não existir,
// aparece o bloco de cor "bg" no lugar dela.



Onde está cada método
Método	Ficheiro	Para que serve
filter	ShopPage.js	categoria, pesquisa, preço, cores, tamanhos, estilo
map	ProductGrid.js, Sidebar.js, FilterPanel.js	desenhar cartões, categorias e opções
find	ShopPage.js	ir buscar o vestido pelo id ao pôr no saco
some	ShopPage.js	o vestido tem alguma cor/tamanho escolhido? há peças quase esgotadas?
forEach	ShopPage.js	somar o total do saco
sort	ShopPage.js	ordenar por preço ou novidades