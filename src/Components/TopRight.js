// Coluna da direita: pesquisa sublinhada, saco, conta e ajuda

export default function TopRight({ search, onSearch , userName , bagCount}) {
  return (
//search
    <aside className="top-right">
      <input
        className="search"
        placeholder="SEARCH"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <div className="account">
  <button>{userName}</button>
        <button>
          Bag <span className="bag-count">{bagCount}</span>
        </button>
    
      </div>
    </aside>
  );
}