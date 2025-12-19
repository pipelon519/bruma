import { Link } from "react-router-dom";
const Header = () => {
    return (
      <header className="w-full h-16 flex items-center justify-between px-8">
        <span className="text-lg font-semibold">Bruma</span>
  
        <nav className="flex gap-6 text-sm">
          <Link to="/" className="font-semibold text-[var(--accent)]">Inicio</Link>
          <Link to="/categories" className="hover:text-[var(--accent)] transition">Categorías</Link>
          <a href="#" className="hover:text-[var(--accent)] transition">Contacto</a>
        </nav>
      </header>
    );
  };
  
  export default Header;
  