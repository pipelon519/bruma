
import { useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './searchbar';
import { useAuth } from "../../context/AuthContext";

// --- MOBILE NAVIGATION COMPONENT ---
export default function MobileNav() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = originalStyle; };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) => 
    `text-4xl font-serif ${isActive ? 'text-orange-500' : 'text-stone-800'} transition-colors hover:text-orange-500`;

  return (
    <div className="flex items-center justify-between h-full">
      <NavLink to="/" className="flex-shrink-0 text-lg font-semibold tracking-wider text-stone-800">
        Bruma
      </NavLink>

      <button onClick={toggleMenu} className="z-50">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 flex flex-col"
          >
            <div className="flex-grow flex flex-col items-center justify-center gap-16">
              <nav className="flex flex-col items-center gap-8 text-center">
                <NavLink to="/" end onClick={closeMenu} className={mobileLinkClass}>Inicio</NavLink>
                <NavLink to="/categories" onClick={closeMenu} className={mobileLinkClass}>Categorías</NavLink>
                {user && (
                  <>
                    <NavLink to="/my-recipes" onClick={closeMenu} className={mobileLinkClass}>Mis Recetas</NavLink>
                    <NavLink to="/my-favorites" onClick={closeMenu} className={mobileLinkClass}>Mis Favoritos</NavLink>
                  </>
                )}
              </nav>
              
              <div className="w-full max-w-sm px-6">
                <SearchBar onSearch={closeMenu} />
              </div>
            </div>

            <div className="p-6 border-t border-stone-100 w-full max-w-md mx-auto">
              {user ? (
                <div className="flex flex-col items-center gap-4">
                  <NavLink to="/profile" onClick={closeMenu} className="font-semibold text-stone-700 hover:text-orange-500 transition-colors">Mi Perfil</NavLink>
                  <button onClick={async () => { await signOut(); closeMenu(); }} className="text-sm text-stone-500 hover:text-orange-500 transition-colors">Cerrar Sesión</button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <NavLink to="/login" onClick={closeMenu} className="w-full"><button className="font-semibold text-stone-800 px-6 py-3 rounded-full text-base w-full bg-stone-100 hover:bg-stone-200 transition-colors">Entrar</button></NavLink>
                  <NavLink to="/register" onClick={closeMenu} className="w-full"><button className="bg-stone-800 text-white font-semibold px-6 py-3 rounded-full text-base w-full hover:bg-orange-600 transition-colors">Registrarse</button></NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
