import { Link } from "react-router-dom";

export default function CategoriesHeader() {
  return (
    <header className="w-full h-16 flex items-center justify-between px-8 bg-[var(--bg)] shadow-md">
      <span className="text-lg font-semibold">Bruma</span>

      <nav className="flex gap-6 text-sm">
        <Link to="/" className="hover:text-[var(--accent)] transition">
          Inicio
        </Link>
        <Link to="/categories" className="font-semibold text-[var(--accent)]">
          Categorías
        </Link>
        <a href="#" className="hover:text-[var(--accent)] transition">
          Contacto
        </a>
      </nav>
    </header>
  );
}
