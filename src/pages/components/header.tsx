import { NavLink } from "react-router-dom";

const Header = () => {
  const linkBase =
    "transition font-medium hover:text-[var(--accent)]";

  const activeLink =
    "text-[var(--accent)] font-semibold border-b-2 border-[var(--accent)]";

  return (
    <header className="w-full h-16 flex items-center justify-between px-8">
      <span className="text-lg font-semibold">Bruma</span>

      <nav className="flex gap-6 text-sm">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? activeLink : linkBase
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive ? activeLink : linkBase
          }
        >
          Categorías
        </NavLink>

        {/* Contacto todavía no existe, así que no finjamos */}
        <span className="opacity-40 cursor-not-allowed">
          Contacto
        </span>
      </nav>
    </header>
  );
};

export default Header;
