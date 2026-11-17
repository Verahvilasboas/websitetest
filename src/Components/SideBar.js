import React from 'react';


export default function Sidebar({
categories,
view,
openChangeView,
activefiltercount,
FilterOpen,
}) {
return ( <aside //sso ajuda quem navega por teclado ou voz a saltar diretamente para lá. Motores de busca e outras ferramentas percebem que aquilo não é o conteúdo principal.
//O código fica mais legível:
className="sidebar">
<button className="Menu-icon">
<span> </span> 

</button> </aside> ); }

   //* map → um link por categoria Este bloco desenha a lista de categorias à esquerda (|01| VIEW ALL, |02| MIDI | MAXI, ...). Em vez de escreveres seis botões à mão, o código pega no array categories e cria um botão para cada elemento. (dados vêm do dresses.js:) */} 
//A classe categories no CSS põe os botões em coluna e com espaço entre eles.
//As chavetas { } dentro do JSX querem dizer “aqui vem JavaScript”. O map percorre o array e, para cada categoria, devolve um botão. cat é a categoria da volta atual, por exemplo { id: 'all', label: 'View all' }. index é a posição dessa categoria no array, começando em 0: 0, 1, 2...


<nav className="categories"> {categories.map((cat, index) => ( 
<button>

</button>





))}


</nav>



</na>

