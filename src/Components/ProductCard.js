import { useState } from 'react';

// Cartão de um vestido: foto, etiqueta, nome, preço, cores e botão "+"
export default function ProductCard({ dress, stockLeft, onAdd }) {
  // se a foto não existir, mostramos o bloco de cor
  const [imageFailed, setImageFailed] = useState(false);

  let label = '';
  if (stockLeft <= 0) label = 'Sold out';
  else if (stockLeft <= 3) label = 'Few items left';
  else if (dress.isNew) label = 'New';

  return (
    <article className="card">
      <div className="card-image" style={{ background: dress.bg }}>
        {dress.image && !imageFailed && (
          <img src={dress.image} alt={dress.name} onError={() => setImageFailed(true)} />
        )}
      </div>

      <div className="card-info">
        <div className="card-text">
          {label && <p>{label}</p>}
          <p className="card-name">{dress.name}</p>
          <p>{dress.price.toFixed(2)} EUR</p>
        </div>

        <button
          className="add"
          aria-label={`Adicionar ${dress.name} ao saco`}
          disabled={stockLeft <= 0}
          onClick={() => onAdd(dress.id)}
        >
          +
        </button>
      </div>

      {/* map → um quadradinho por cor disponível */}
      {dress.colors.length > 1 && (
        <div className="swatches">
          {dress.colors.map((color) => (
            <span key={color} style={{ background: color }} />
          ))}
        </div>
      )}
    </article>
  );
}