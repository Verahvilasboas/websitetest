

export default function Sidebar({
categories,
view,
openChangeView,
activefiltercount,
FilterOpen,
})

 

 //sso ajuda quem navega por teclado ou voz a saltar diretamente para lá. Motores de busca e outras ferramentas percebem que aquilo não é o conteúdo principal.
//O código fica mais legível:



   //* map → um link por categoria Este bloco desenha a lista de categorias à esquerda (|01| VIEW ALL, |02| MIDI | MAXI, ...). Em vez de escreveres seis botões à mão, o código pega no array categories e cria um botão para cada elemento. (dados vêm do dresses.js:) */} 
//A classe categories no CSS põe os botões em coluna e com espaço entre eles.
//As chavetas { } dentro do JSX querem dizer “aqui vem JavaScript”. O map percorre o array e, para cada categoria, devolve um botão. cat é a categoria da volta atual, por exemplo { id: 'all', label: 'View all' }. index é a posição dessa categoria no array, começando em 0: 0, 1, 2...
//// Quando clico no botão, chama a função onSelectCategory com o id da categoria. Essa função vem do ShopPage.js, que a passa ao Sidebar com onSelectCategory={setActiveCategory}. Por isso clicar em “Mini” faz setActiveCategory('mini'), o estado muda e a grelha volta a ser filtrada.

{return (
    <aside className="sidebar">
      <button className="menu-icon" aria-label="Menu">
        <span />
        <span />
      </button>

      <nav className="categories">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            className={cat.id === activeCategory ? 'category active' : 'category'}
            onClick={() => onSelectCategory(cat.id)}
          >
            <span className="num">|{String(index + 1).padStart(2, '0')}|</span>
            {cat.label}
          </button>
        ))}

        <button className={filtersOpen ? 'link filters-btn open' : 'link filters-btn'} onClick={onOpenFilters}>
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
        <button className="link">In store</button>
      </nav>

      <div className="view">
        <span>View</span>
        <div>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={view === n ? 'active' : ''}
              onClick={() => onChangeView(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}



 





