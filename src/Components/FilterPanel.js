
import { useState } from 'react';
 
// FilterPanel.js — painel de filtros que abre do lado DIREITO,
// com grupos numerados (|01| Sort by, |02| Colour...) e "Close" sempre visível.
 
const sortOptions = [
  { id: 'asc', label: 'Price: low to high' },
  { id: 'desc', label: 'Price: high to low' },
  { id: 'new', label: 'New' },
];
 
const VISIBLE_COLORS = 6;
 
export default function FilterPanel({
  isOpen,
  onClose,
  options, 
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

     
 <aside className="filter-panel" onClick={(e) => e.stopPropagation()}>
 

        <div className="filter-top">
          <button className="filter-close" onClick={onClose} aria-label="Fechar filtros">
            Close ✕
          </button>
        </div>
 
        <div className="filter-body">
          {/* cada grupo: título numerado à esquerda, opções à direita */}
          <section className="filter-group">
            <h3 className="filter-label">|01| Sort by</h3>
            <div className="filter-options">
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
          </section>
 
          <section className="filter-group">
            <h3 className="filter-label">|02| Colour</h3>
            <div className="filter-options">
              {visibleColors.map((color) => (
                <button
                  key={color.hex}
                  className={filters.colors.includes(color.name) ? 'f-item f-color active' : 'f-item f-color'}
                  onClick={() => toggle('colors', color.name)}
                >
                  <span className="swatch" style={{ background: color.hex }} />
                  {color.name}
                </button>
              ))}
              {options.colors.length > VISIBLE_COLORS && (
                <button className="f-item f-more" onClick={() => setShowAllColors(!showAllColors)}>
                  {showAllColors ? 'View less' : 'View more'}
                </button>
              )}
            </div>
          </section>
 
          <section className="filter-group">
            <h3 className="filter-label">|03| Size</h3>
            <div className="filter-options">
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
          </section>
 
          <section className="filter-group">
            <h3 className="filter-label">|04| Price</h3>
            <div className="filter-options">
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
                {filters.priceMin.toFixed(2).replace('.', ',')} EUR –{' '}
                {filters.priceMax.toFixed(2).replace('.', ',')} EUR
              </p>
            </div>
          </section>
 
          <section className="filter-group">
            <h3 className="filter-label">|05| Style</h3>
            <div className="filter-options">
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
          </section>
        </div>
 
        {/* fundo: limpar + ver resultados */}
        <div className="filter-actions">
          <button className="f-clear" onClick={onClear}>Clear</button>
          <button className="view-results" onClick={onClose}>
            View results ({resultCount})
          </button>
        </div>

      </aside>

    </div>
  ); }