const Header = () => {
    return (
      <header className="w-full h-16 flex items-center justify-between px-8">
        <span className="text-lg font-semibold">Bruma</span>
  
        <nav className="flex gap-6 text-sm">
          <a href="#">Inicio</a>
          <a href="#">Categorías</a>
          <a href="#">Contacto</a>
        </nav>
      </header>
    );
  };
  
  export default Header;
  