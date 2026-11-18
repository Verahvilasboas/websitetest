// Footer.js — rodapé que aparece em todas as páginas.

export default function Footer() {
  // ano atual
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>Coded by Vera · {year}</p>

      <a
        href="https://github.com/Verahvilasboas/websitetest"
        target="_blank"         
        rel="noopener noreferrer"  // 
      >
        Repository on GitHub ↗
      </a>
    </footer>
  );
}