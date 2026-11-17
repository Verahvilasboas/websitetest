// SideBar.js — coluna da esquerda: menu, categorias numeradas, filtros e escolha de vista.
//
// PROPS: tudo o que está entre { } na linha da função são valores que o ShopPage.js
// envia para aqui, com <Sidebar categories={...} activeCategory={...} ... />.
// Os nomes têm de ser EXATAMENTE iguais (maiúsculas incluídas):
// activeFilterCount não é o mesmo que activefiltercount.

export default function Sidebar({
  categories,         // lista de categorias (vem do dresses.js, através do ShopPage)
  activeCategory,     // id da categoria escolhida, por exemplo 'all'
  onSelectCategory,   // função para mudar a categoria (é o setActiveCategory do ShopPage)
  view,               // vista atual: 1, 2 ou 3
  onChangeView,       // função para mudar a vista (é o setView do ShopPage)
  onOpenFilters,      // função para abrir/fechar o painel de filtros
  activeFilterCount,  // quantos filtros estão ativos, para mostrar "Filters (2)"
  filtersOpen,        // true se o painel de filtros está aberto
}) {
  return (
    // <aside> diz ao browser que isto é conteúdo lateral, não o conteúdo principal.
    // Isso ajuda quem navega por teclado ou voz a saltar diretamente para lá,
    // e os motores de busca percebem o que é a parte principal da página.
    <aside className="sidebar">

      {/* Ícone do menu: TRES <span> vazios que o CSS transforma em 3 traços */}
      <button className="menu-icon" aria-label="Menu">
        <span />
        <span />
        <span />
      </button>

      {/* A classe "categories" no CSS põe os botões em coluna e com espaço entre eles */}
      <nav className="categories">

        {/*
          map → um botão por categoria.
          Em vez de escrever seis botões à mão, o map percorre o array categories
          e, para cada categoria, devolve um botão.
          As chavetas { } dentro do JSX querem dizer "aqui vem JavaScript".
          - cat   → a categoria da volta atual, por exemplo { id: 'all', label: 'View all' }
          - index → a posição no array, começando em 0: 0, 1, 2...
        */}
        {categories.map((cat, index) => (
          <button
            // key: obrigatório no map, para o React distinguir cada botão. Tem de ser único.
            key={cat.id}

            // ternário (if/else curto): se esta é a categoria ativa, junta a classe "active"
            className={cat.id === activeCategory ? 'category active' : 'category'}

            // Quando clico, chama onSelectCategory com o id da categoria.
            // Essa função é o setActiveCategory do ShopPage, por isso clicar em "Mini"
            // faz setActiveCategory('mini') e a grelha volta a ser filtrada.
            // A seta () => é importante: sem ela a função corria logo ao desenhar a página.
            onClick={() => onSelectCategory(cat.id)}
          >
            {/*
              Número entre barras, por exemplo |01|:
              index + 1         → 1 (para começar em 1 e não em 0)
              String(...)       → "1" (padStart só funciona em texto)
              .padStart(2, '0') → "01" (acrescenta zeros à esquerda até ter 2 caracteres)
            */}
            <span className="num">|{String(index + 1).padStart(2, '0')}|</span>

            {/* Texto da categoria; aparece em maiúsculas por causa do CSS */}
            {cat.label}
          </button>
        ))}

        {/*
          Botão dos filtros:
          - se o painel está aberto, junta a classe "open" (fica a negrito)
          - && → só mostra "(2)" se houver pelo menos um filtro ativo
        */}
        <button
          className={filtersOpen ? 'link filters-btn open' : 'link filters-btn'}
          onClick={onOpenFilters}
        >
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>

        <button className="link">In store</button>
      </nav>

      {/* Escolha de vista: 1 = um vestido grande, 2 = duas colunas, 3 = quatro colunas */}
      <div className="view">
        <span>View</span>
        <div>
          {/* map sobre um array escrito na hora: [1, 2, 3] → três botões */}
          {[1, 2, 3, 4].map((n) => (
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





