//O ShopPage.js é o cérebro da página. Guarda o estado, calcula que vestidos mostrar e 
//passa tudo aos componentes que desenham o ecrã.

import { useState } from 'react';

import Sidebar from '../Components/SideBar';
import TopRight from '../Components/TopRight';
import ProductGrid from '../Components/ProductGrid';
import FilterPanel from '../Components/FilterPanel';

import {
  categories,
  colorOptions,
  sizeOptions,
  styleOptions,
  dresses,
} from '../Data/dresses';

console.log({ Sidebar, TopRight, ProductGrid, FilterPanel });

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

// método para qualquer projeto
//Olhar para o design e lista tudo aquilo em que se pode clicar ou escrever.
//Para cada um, perguntar: depois do clique, o que é que tem de ser lembrado?
//Isso é um estado. O valor inicial é o aspeto da página quando abre.
//O resto calcula-se com filter, map, find, forEach e companhia.

export default function ShopPage() {
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