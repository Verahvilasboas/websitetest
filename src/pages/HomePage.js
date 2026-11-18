
import { Link } from 'react-router-dom';

 
// HomePage.js — página inicial: flor grande, nome da loja e botão para a coleção.
export default function HomePage() {
  return (
    <main className="home">
      <div className="home-flower">

      </div>
 
      <h1 className="home-title">Bloom</h1>
      <p className="home-subtitle">Vestidos para cada cidade</p>
 

      <Link to="/loja" className="home-button">
        Ver coleção
      </Link>
    </main>
  );
}
 