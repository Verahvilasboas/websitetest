//O ShopPage.js é o cérebro da página. Guarda o estado, calcula que vestidos mostrar e 
//passa tudo aos componentes que desenham o ecrã.

import { useState, useEffect } from 'react';

import Sidebar from '../Components/SideBar';
import TopRight from '../Components/TopRight';
import ProductGrid from '../Components/ProductGrid';
import FilterPanel from '../Components/FilterPanel';



// método para qualquer projeto
//Olhar para o design e lista tudo aquilo em que se pode clicar ou escrever.
//Para cada um, perguntar: depois do clique, o que é que tem de ser lembrado?
//Isso é um estado. O valor inicial é o aspeto da página quando abre.
//O resto calcula-se com filter, map, find, forEach etc


//O endereço da API fica guardado num só sítio. Se um dia a API mudar de endereço, mudar só aqui.
const API_URL = 'http://localhost:4000';

//Dois estados: data guarda os dados quando chegarem e error guarda uma mensagem se algo falhar. Começam a null, ou seja, "ainda não há nada".
export default function ShopPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

//Corre o código lá dentro uma vez, quando a página abre. O [] no fim quer dizer "só uma vez".

  useEffect(() => {

    Promise.all([
//Faz os 5 pedidos ao mesmo tempo e só continua quando todos chegarem.
      fetch(`${API_URL}/categories`).then((res) => res.json()),
////Pede os vestidos à API. Quando a resposta chega, o res.json() transforma o texto JSON de volta em objeto JavaScript.
// É o contrário do JSON.stringify que usasmos no servidor.

      fetch(`${API_URL}/colorOptions`).then((res) => res.json()),
      fetch(`${API_URL}/sizeOptions`).then((res) => res.json()),
      fetch(`${API_URL}/styleOptions`).then((res) => res.json()),
      fetch(`${API_URL}/dresses`).then((res) => res.json()),
    ])
      .then(([categories, colorOptions, sizeOptions, styleOptions, dresses]) => {
        setData({ categories, colorOptions, sizeOptions, styleOptions, dresses });
      })

//Recebe as 5 respostas pela mesma ordem dos pedidos e guarda-as no estado data.js

      .catch(() => setError('Não foi possível carregar os vestidos.'));
  }, []);
//Se algum pedido falhar (por exemplo, a API está desligada), guarda a mensagem de erro.

  if (error) return <p>{error}</p>;
  if (!data) return <p>A carregar...</p>;
//Decide o que mostrar: se houve erro, mostra o erro; se os dados ainda não chegaram, mostra "A carregar..."; 
//se já chegaram, mostra a loja e passa-lhe os 5 arrays.
  return <ShopContent {...data} />;
}
function ShopContent({categories, colorOptions, sizeOptions,styleOptions, dresses}) { 
// map → só os preços; Math.min/max com "..." dá o mais barato e o mais caro
const prices = dresses.map((d) => d.price);
const MIN_PRICE = Math.min(...prices);
const MAX_PRICE = Math.max(...prices);

const emptyFilters = {
  sortBy: 'none',
  colors: [],
  sizes: [],
  styles: [],
  priceMin: MIN_PRICE,
  priceMax: MAX_PRICE,
};
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState(3);
  const [bag, setBag] = useState([]); // ids dos vestidos no saco
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(emptyFilters);

  // quantas peças ainda há (stock menos as que já estão no saco)
  const getStockLeft = (dress) =>
    dress.stock - bag.filter((id) => id === dress.id).length;

  // quero ver um filter → categoria, pesquisa, preço, cores, tamanhos e estilo
  const filteredDresses = dresses
    .filter((d) => activeCategory === 'all' || d.categories.includes(activeCategory))
    .filter((d) => d.name.toLowerCase().includes(search.trim().toLowerCase()))
    .filter((d) => d.price >= filters.priceMin && d.price <= filters.priceMax)
    // some → o vestido tem pelo menos uma das cores / tamanhos escolhidos?
    .filter((d) => filters.colors.length === 0 || d.colors.some((c) => filters.colors.includes(c)))
    .filter((d) => filters.sizes.length === 0 || d.sizes.some((s) => filters.sizes.includes(s)))
    .filter((d) => filters.styles.length === 0 || filters.styles.includes(d.style));

  // sort → ordena (usamos [...] para não mexer no array original)
  const sortedDresses = [...filteredDresses].sort((a, b) => {
    if (filters.sortBy === 'asc') return a.price - b.price;
    if (filters.sortBy === 'desc') return b.price - a.price;
    if (filters.sortBy === 'new') return Number(b.isNew) - Number(a.isNew);
    return 0;
  });

  // quantos filtros estão ativos (aparece como "Filters (2)")
  const activeFilterCount =
    (filters.sortBy !== 'none' ? 1 : 0) +
    filters.colors.length +
    filters.sizes.length +
    filters.styles.length +
    (filters.priceMin !== MIN_PRICE || filters.priceMax !== MAX_PRICE ? 1 : 0);

  // find → vai buscar o vestido pelo id antes de o pôr no saco
  const addToBag = (id) => {
    const dress = dresses.find((d) => d.id === id);
    if (dress && getStockLeft(dress) > 0) {
      setBag([...bag, id]);
    }
  };

  // some → há alguma peça quase esgotada nesta lista?
  const hasFewItemsLeft = sortedDresses.some((d) => {
    const left = getStockLeft(d);
    return left > 0 && left <= 3;
  });

  // forEach → soma o total do saco
  let bagTotal = 0;
  bag.forEach((id) => {
    bagTotal += dresses.find((d) => d.id === id).price;
  });

  return (
    <div className="shop">
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        view={view}
        onChangeView={setView}
        onOpenFilters={() => setFiltersOpen(!filtersOpen)}
        activeFilterCount={activeFilterCount}
        filtersOpen={filtersOpen}
      />

      <main className="content">
        <div className="status">
          <span>{sortedDresses.length} items</span>
          {hasFewItemsLeft && <span>Some items are almost sold out</span>}
          {bag.length > 0 && <span>Bag total: {bagTotal.toFixed(2)} EUR</span>}
        </div>

        <ProductGrid
          dresses={sortedDresses}
          view={view}
          getStockLeft={getStockLeft}
          onAdd={addToBag}
          colorOptions={colorOptions}
        />
      </main>

      <TopRight
        search={search}
        onSearch={setSearch}
        bagCount={bag.length}
        userName="Vera"
      />

      <FilterPanel
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        options={{
          colors: colorOptions,
          sizes: sizeOptions,
          styles: styleOptions,
          minPrice: MIN_PRICE,
          maxPrice: MAX_PRICE,
        }}
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(emptyFilters)}
        resultCount={sortedDresses.length}
      />
    </div>


  );
}