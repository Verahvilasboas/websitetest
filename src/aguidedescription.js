

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



//“Lifting state up” (traduzido frequentemente como “elevar o estado” ou “promover o estado”) é um padrão em frameworks de interface como o React, Consiste em mover o estado de um componente filho para o componente pai mais próximo em comum.
ver single responsability principle 
Quando usar

• Dois ou mais componentes irmãos precisam partilhar ou reagir aos mesmos dados.
• O componente pai precisa de ler ou controlar o estado que antes estava apenas num filho.

Como funciona

1. Remove o estado do componente filho.
2. Cria o estado e as funções de atualização no componente pai.
3. Passa o valor do estado e as funções de alteração via props (ou parâmetros) para os componentes filhos.



O React vê que a key 1 continua a existir e pensa que
 é o mesmo elemento de antes. Em vez de apagar o cartão do London, reutiliza-o e só troca os textos. 
Se o cartão tiver estado próprio, como o imageFailed e o imageLoaded do teu ProductCard, esse estado 
fica “colado” ao cartão errado. Podes acabar com o Tokyo sem foto porque a do London tinha falhado.

por sso no product grid    convem usar um key //{dresses.map((dress) => (
 <ProductCard
          key={dress.id}
          dress={dress}
          stockLeft={getStockLeft(dress)}
          onAdd={onAdd}
        />
      ))}
    </section>

Quando o index é aceitável

Só quando a lista nunca muda de ordem, nunca é filtrada e não ganha nem perde elementos. É o caso dos teus botões de vista [1, 2, 3]. 
Mesmo assim, se houver um valor único disponível, é melhor usá-lo.

A key identifica cada elemento entre renders. Uso um id estável, como o dress.id, porque com o index, quando a lista é filtrada ou ordenada, 
o React pode reutilizar o elemento errado e misturar o estado entre cartões.

se ussasse o index poderia apresentar no id 2 o nome errado , confundir se





A regra é esta: algo só deve ser estado se não puder ser calculado a partir do estado e dos props que já tens. Na tua loja, 
filteredDresses calcula-se sempre a partir de dresses + activeCategory + search + filters, por isso não é estado.

Há situações em que essa lista deixa de poder ser calculada e passa a ter de ser guardada.

1. Os resultados vêm de um servidor (o caso mais comum)

Com milhares de vestidos, não se descarregam todos para filtrar no browser. Envia-se o filtro para uma API 
e ela devolve só os resultados. Como a resposta chega mais tarde (é assíncrona),
 não dá para a calcular na hora: tens de a guardar quando chega.




Com 8 vestidos, não traz problemas de performance. Com milhares, recalcular os filtros a cada render pesaria. o useMemo pode ser a solução. 
import { useMemo } from 'react';

Tem duas partes:

Uma função que faz o cálculo e devolve o resultado.
Um array de dependências: os valores que, se mudarem, obrigam a recalcular.


prop drilling”
//E o addToBag atravessa dois componentes até chegar ao “+”: ShopPage → ProductGrid → ProductCard. O ProductGrid nem usa o onAdd: só o passa ao filho.

Passar props por componentes que não precisam deles chama-se prop drilling, “perfurar” a árvore de componentes. Numa loja pequena está bem. Numa app grande, com 5 ou 6 níveis, 
fica difícil de manter: para acrescentar um valor novo tens de mexer em todos os ficheiros do caminho.

Solução 1: Context, para evitar passar props de nível em nível

O Context é como uma “estação de rádio”: um componente lá em cima emite os valores, 
e qualquer componente cá em baixo pode sintonizá-los diretamente, sem os receber por props.

//ex import { createContext, useContext, useState } from 'react';

Vantagem extra: o saco passa a estar disponível em todas as páginas. 
Hoje, como o bag vive no ShopPage, se formos à página inicial e voltares, o saco fica vazio.