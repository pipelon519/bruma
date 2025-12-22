
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './searchbar';
import { useAuth } from "../../context/AuthContext";
import type { User } from '@supabase/supabase-js';

// --- PROFILE MENU ---
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
        <span className="font-semibold text-sm text-stone-700">{userName}</span>
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
            <NavLink to="/profile" className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-orange-50" onClick={() => setIsOpen(false)}>Mi Perfil</NavLink>
            <NavLink to="/my-recipes" className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-orange-50" onClick={() => setIsOpen(false)}>Mis Recetas</NavLink>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-orange-50">Cerrar Sesión</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// --- DESKTOP NAVIGATION COMPONENT ---
export default function DesktopNav() {
  const { user, signOut } = useAuth();
  const linkBase = "transition font-medium hover:text-orange-500";
  const activeLink = "text-orange-500 font-semibold";

  return (
    <div className="flex items-center justify-between h-full">
        <NavLink to="/" className="flex-shrink-0 text-lg font-semibold tracking-wider text-stone-800">
            Bruma
        </NavLink>

        <div className="flex-1 flex justify-center px-4">
            <SearchBar />
        </div>

        <nav className="flex items-center gap-4 md:gap-6 text-sm">
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
    </div>
  );
}
