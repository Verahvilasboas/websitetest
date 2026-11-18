
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
 
// App.js — decide que página mostrar consoante o endereço (URL).
// BrowserRouter → liga o "GPS" do site
// Routes        → lista de caminhos possíveis
// Route         → um caminho e a página que lhe corresponde
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />        {/* localhost:3000/      */}
        <Route path="/loja" element={<ShopPage />} />    {/* localhost:3000/loja  */}
      </Routes>
    </BrowserRouter>
  );
}
 