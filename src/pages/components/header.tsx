
import { useState, useCallback, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './searchbar';
import { useAuth } from "../../context/AuthContext";
import type { User } from '@supabase/supabase-js';

// --- DESKTOP PROFILE MENU (No changes) ---
function ProfileMenu({ user, signOut }: { user: User; signOut: () => Promise<void> }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
    navigate("/");
  };

  const userName = user.user_metadata?.full_name || 'Usuario';

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 cursor-pointer">
        <UserCircle className="text-stone-500" size={28} />
        <span className="font-semibold text-sm text-stone-700 hidden md:inline">{userName}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
            onMouseLeave={() => setIsOpen(false)}
          >
            <NavLink to="/profile" className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-orange-50" onClick={() => setIsOpen(false)}>
              Mi Perfil
            </NavLink>
            <NavLink to="/my-recipes" className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-orange-50" onClick={() => setIsOpen(false)}>
              Mis Recetas
            </NavLink>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-orange-50">
              Cerrar Sesión
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- MAIN HEADER COMPONENT ---
const Header = () => {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = originalStyle; };
  }, [isMobileMenuOpen]);

  const handleLinkClick = useCallback(() => setIsMobileMenuOpen(false), []);
  const handleMenuToggle = () => setIsMobileMenuOpen(prev => !prev);

  const linkBase = "transition font-medium hover:text-orange-500";
  const activeLink = "text-orange-500 font-semibold";

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) => 
    `text-4xl font-serif ${isActive ? 'text-orange-500' : 'text-stone-800'} transition-colors hover:text-orange-500`;

  return (
    <header className="w-full h-16 md:h-20 flex items-center justify-between px-4 sm:px-6 md:px-8 bg-white/90 backdrop-blur-sm sticky top-0 z-30 border-b border-stone-100">
      <NavLink to="/" className="flex-shrink-0 text-lg font-semibold tracking-wider text-stone-800 z-50">
        Bruma
      </NavLink>

      <div className="flex-1 hidden md:flex justify-center px-4">
        <SearchBar />
      </div>

      {/* --- Desktop Navigation -- */}
      <nav className="hidden md:flex items-center gap-4 md:gap-6 text-sm">
        <NavLink to="/" end className={({ isActive }) => isActive ? activeLink : linkBase}>Inicio</NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? activeLink : linkBase}>Categorías</NavLink>
        <div className="h-6 border-l border-stone-200 mx-2"></div>
        {user ? <ProfileMenu user={user} signOut={signOut} /> : (
          <div className="flex items-center gap-2">
            <NavLink to="/login"><button className="font-semibold text-stone-600 px-3 py-2 rounded-full text-sm hover:bg-stone-100 transition-colors">Entrar</button></NavLink>
            <NavLink to="/register"><button className="bg-stone-800 text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">Registrarse</button></NavLink>
          </div>
        )}
      </nav>

      {/* --- Mobile Menu Trigger Button -- */}
      <button className="md:hidden z-50" onClick={handleMenuToggle}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* --- AESTHETIC MOBILE MENU V2 (with Search) -- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 flex flex-col"
          >
            {/* Centered content block */}
            <div className="flex-grow flex flex-col items-center justify-center gap-16">
              {/* Main navigation */}
              <nav className="flex flex-col items-center gap-8 text-center">
                <NavLink to="/" end onClick={handleLinkClick} className={mobileLinkClass}>Inicio</NavLink>
                <NavLink to="/categories" onClick={handleLinkClick} className={mobileLinkClass}>Categorías</NavLink>
                {user && (
                    <NavLink to="/my-recipes" onClick={handleLinkClick} className={mobileLinkClass}>Mis Recetas</NavLink>
                )}
              </nav>
              
              {/* Search Bar */}
              <div className="w-full max-w-sm px-6">
                <SearchBar onSearch={handleLinkClick} />
              </div>
            </div>

            {/* Footer section for auth actions */}
            <div className="p-6 border-t border-stone-100 w-full max-w-md mx-auto">
              {user ? (
                <div className="flex flex-col items-center gap-4">
                  <NavLink to="/profile" onClick={handleLinkClick} className="font-semibold text-stone-700 hover:text-orange-500 transition-colors">
                    Mi Perfil
                  </NavLink>
                  <button onClick={async () => { await signOut(); handleLinkClick(); }} className="text-sm text-stone-500 hover:text-orange-500 transition-colors">
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <NavLink to="/login" onClick={handleLinkClick} className="w-full">
                    <button className="font-semibold text-stone-800 px-6 py-3 rounded-full text-base w-full bg-stone-100 hover:bg-stone-200 transition-colors">Entrar</button>
                  </NavLink>
                  <NavLink to="/register" onClick={handleLinkClick} className="w-full">
                    <button className="bg-stone-800 text-white font-semibold px-6 py-3 rounded-full text-base w-full hover:bg-orange-600 transition-colors">Registrarse</button>
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
