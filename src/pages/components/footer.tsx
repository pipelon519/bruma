export default function Footer() {
    return (
      <footer className="relative bg-gray-900 text-white/80 py-24 mt-3 rounded-tl-3xl rounded-tr-3xl">
        
        {/* Fondo pincel */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/assets/brush-footer.svg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
  
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
  
          {/* Logo y frase */}
          <div>
            <h2 className="font-serif text-3xl text-white">Bruma</h2>
            <p className="mt-4 text-sm opacity-70 max-w-xs">
              Recetas honestas, momentos reales y experiencias compartidas.
            </p>
          </div>
  
          {/* Navegación */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-serif text-xl text-white">Navegación</h3>
            <a href="#" className="hover:text-[#7AD0AC] transition">Inicio</a>
            <a href="#" className="hover:text-[#7AD0AC] transition">Recetas</a>
            <a href="#" className="hover:text-[#7AD0AC] transition">Blog</a>
            <a href="#" className="hover:text-[#7AD0AC] transition">Contacto</a>
          </div>
  
          {/* Contacto / legal */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-serif text-xl text-white">Contacto</h3>
            <p className="text-sm opacity-70">contacto@bruma.com</p>
            <p className="text-sm opacity-70">© 2025 Bruma. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-[#7AD0AC] hover:text-white transition">IG</a>
              <a href="#" className="text-[#7AD0AC] hover:text-white transition">TW</a>
              <a href="#" className="text-[#7AD0AC] hover:text-white transition">FB</a>
            </div>
          </div>
  
        </div>
      </footer>
    )
  }
  