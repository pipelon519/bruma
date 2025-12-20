import { useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { UserCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { User } from '@supabase/supabase-js';
import SearchBar from './searchbar';

// --- Desktop Profile Menu (No changes) ---
function ProfileMenu({ user }: { user: User }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5" onMouseLeave={() => setIsOpen(false)}>
          <NavLink to="/my-recipes" className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-orange-50" onClick={() => setIsOpen(false)}>
            Mis Recetas
          </NavLink>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-orange-50">
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

// --- Main Header Component (DEFINITIVELY CORRECTED VERSION) ---
const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // *** CORRECTED AUTHENTICATION LOGIC ***
  useEffect(() => {
    // 1. Set user from the initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // 3. Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Scroll-lock effect for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleLinkClick = useCallback(() => setIsMobileMenuOpen(false), []);

  const linkBase = "transition font-medium hover:text-orange-500";
  const activeLink = "text-orange-500 font-semibold";

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };
  
  return (
    <header className="w-full h-20 flex items-center justify-between px-4 sm:px-6 md:px-8 bg-white/80 backdrop-blur-sm sticky top-0 z-30 border-b border-stone-100">
      <NavLink to="/" className="flex-shrink-0 text-lg font-semibold tracking-wider text-stone-800">
        Bruma
      </NavLink>

      <div className="flex-1 justify-center px-4 hidden md:flex">
        <SearchBar />
      </div>

      <nav className="hidden md:flex items-center gap-4 md:gap-6 text-sm bg-white backdrop-blur-sm">
        <NavLink to="/" end className={({ isActive }) => isActive ? activeLink : linkBase}>Inicio</NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? activeLink : linkBase}>Categorías</NavLink>
        <div className="h-6 border-l border-stone-200 mx-2"></div>
        {user ? <ProfileMenu user={user} /> : (
          <div className="flex items-center gap-1 md:gap-2">
            <NavLink to="/login"><button className="font-semibold text-stone-600 px-3 py-2 rounded-full text-sm hover:bg-stone-100 transition-colors">Entrar</button></NavLink>
            <NavLink to="/register"><button className="bg-stone-800 text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">Registrarse</button></NavLink>
          </div>
        )}
      </nav>

      <button className="md:hidden z-30" onClick={() => setIsMobileMenuOpen(true)}>
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b bg-white">
                <h2 className="font-semibold">Menú</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
              </div>
              <div className="p-6">
                <SearchBar onSearch={handleLinkClick} />
              </div>
              <nav className="flex flex-col items-start gap-1 p-6 border-t">
                <NavLink to="/" end onClick={handleLinkClick} className="text-lg font-medium p-3 w-full rounded-md hover:bg-stone-100">Inicio</NavLink>
                <NavLink to="/categories" onClick={handleLinkClick} className="text-lg font-medium p-3 w-full rounded-md hover:bg-stone-100">Categorías</NavLink>
              </nav>
              <div className="mt-auto p-6 border-t">
                {user ? (
                  <div className="flex flex-col items-start gap-4">
                    <NavLink to="/my-recipes" onClick={handleLinkClick} className="text-lg font-medium p-3 w-full rounded-md hover:bg-stone-100">Mis Recetas</NavLink>
                    <button onClick={async () => { await supabase.auth.signOut(); handleLinkClick(); }} className="text-lg text-stone-600 p-3 w-full text-left rounded-md hover:bg-stone-100">Cerrar Sesión</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <NavLink to="/login" onClick={handleLinkClick} className="w-full"><button className="font-semibold text-stone-800 px-6 py-3 rounded-full text-base bg-stone-100 w-full">Entrar</button></NavLink>
                    <NavLink to="/register" onClick={handleLinkClick} className="w-full"><button className="bg-stone-800 text-white font-semibold px-6 py-3 rounded-full text-base w-full">Registrarse</button></NavLink>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
