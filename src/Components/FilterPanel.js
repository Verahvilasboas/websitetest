import { useState } from 'react';

// Painel de filtros: abre à esquerda, por cima da grelha.
// Tudo em texto simples; a opção escolhida fica sublinhada.

const sortOptions = [
  { id: 'asc', label: 'Ascending price' },
  { id: 'desc', label: 'Descending price' },
  { id: 'new', label: 'New' },
];

const VISIBLE_COLORS = 7;

export default function FilterPanel({
  isOpen,
  onClose,
  options, // { colors, sizes, styles, minPrice, maxPrice }
  filters,
  onChange,
  onClear,
  resultCount,
}) {
  const [showAllColors, setShowAllColors] = useState(false);

  if (!isOpen) return null;

  // junta ou tira um valor de uma lista (cores, tamanhos, estilos)
  const toggle = (key, value) => {
    const list = filters[key];
    const next = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    onChange({ ...filters, [key]: next });
  };

  const setSort = (id) =>
    onChange({ ...filters, sortBy: filters.sortBy === id ? 'none' : id });

  // barra de preço com dois pontos: o mínimo nunca passa o máximo
  const setMin = (value) =>
    onChange({ ...filters, priceMin: Math.min(Number(value), filters.priceMax) });
  const setMax = (value) =>
    onChange({ ...filters, priceMax: Math.max(Number(value), filters.priceMin) });

  const visibleColors = showAllColors
    ? options.colors
    : options.colors.slice(0, VISIBLE_COLORS);

  const minPercent =
    ((filters.priceMin - options.minPrice) / (options.maxPrice - options.minPrice)) * 100;
  const maxPercent =
    ((filters.priceMax - options.minPrice) / (options.maxPrice - options.minPrice)) * 100;

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-panel" onClick={(e) => e.stopPropagation()}>
        <div className="filter-group">
          {sortOptions.map((opt) => (
            <button
              key={opt.id}
              className={filters.sortBy === opt.id ? 'f-item active' : 'f-item'}
              onClick={() => setSort(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="filter-group">
          {visibleColors.map((color) => (
            <button
              key={color.hex}
              className={filters.colors.includes(color.hex) ? 'f-item f-color active' : 'f-item f-color'}
              onClick={() => toggle('colors', color.hex)}
            >
              <span className="swatch" style={{ background: color.hex }} />
              {color.name}
            </button>
          ))}
          {options.colors.length > VISIBLE_COLORS && (
            <button className="f-item" onClick={() => setShowAllColors(!showAllColors)}>
              {showAllColors ? 'View less' : 'View more'}
            </button>
          )}
        </div>

        <div className="filter-group">
          {options.sizes.map((size) => (
            <button
              key={size}
              className={filters.sizes.includes(size) ? 'f-item active' : 'f-item'}
              onClick={() => toggle('sizes', size)}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <div className="range">
            <div className="range-track" />
            <div
              className="range-fill"
              style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
            />
            <input
              type="range"
              min={options.minPrice}
              max={options.maxPrice}
              step="10"
              value={filters.priceMin}
              onChange={(e) => setMin(e.target.value)}
              aria-label="Preço mínimo"
            />
            <input
              type="range"
              min={options.minPrice}
              max={options.maxPrice}
              step="10"
              value={filters.priceMax}
              onChange={(e) => setMax(e.target.value)}
              aria-label="Preço máximo"
            />
          </div>
          <p className="range-label">
            {filters.priceMin.toFixed(2).replace('.', ',')} EUR -{' '}
            {filters.priceMax.toFixed(2).replace('.', ',')} EUR
          </p>
        </div>

        <div className="filter-group">
          {options.styles.map((style) => (
            <button
              key={style}
              className={filters.styles.includes(style) ? 'f-item active' : 'f-item'}
              onClick={() => toggle('styles', style)}
            >
              {style}
            </button>
          ))}
        </div>

        <div className="filter-actions">
          <button className="f-item" onClick={onClear}>Clear</button>
          <button className="f-item view-results" onClick={onClose}>
            View results ({resultCount})
          </button>
        </div>
      </div>
    </div>
  );
}
