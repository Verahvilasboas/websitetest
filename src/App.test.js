import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


# Loja de vestidos em React — guia 

Exercício com os métodos de array `filter`, `map`, `find`, `some`, `forEach` e `sort`, num site de loja com categorias, pesquisa, saco e painel de filtros.


A estrutura

```
loja-cra/
  public/
    index.html
    images/            ← fotos dos vestidos
  src/
    index.js
    App.js
    styles.css
    pages/
      ShopPage.js
    components/
      Sidebar.js
      TopRight.js
      ProductGrid.js
      ProductCard.js
      FilterPanel.js
    data/
      dresses.js
```
