import ProductCard from './ProductCard';

// Grelha de produtos. "view" decide quantas colunas:
// 1 → um vestido grande, 2 → duas colunas, 3 → quatro colunas
export default function ProductGrid({ dresses, view, getStockLeft, onAdd }) {
  if (dresses.length === 0) {
    return <p className="empty">No results</p>;
  }

  return (
    <section className={`grid view-${view}`}>
      {dresses.map((dress) => (
        <ProductCard
          key={dress.id}
          dress={dress}
          stockLeft={getStockLeft(dress)}
          onAdd={onAdd}
        />
      ))}
    </section>
  );
}