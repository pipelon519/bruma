import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { UserCircle } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

// A new component for the profile menu
function ProfileMenu({ user }: { user: User }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const userName = user.user_metadata?.full_name || 'Usuario';

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 cursor-pointer">
        <UserCircle className="text-stone-500" size={28} />
        <span className="font-semibold text-sm text-stone-700">{userName}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button 
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-orange-50"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}


const Header = () => {
  // State to hold the user session information
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 1. Check for an existing session when the component mounts
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    // 2. Listen for authentication state changes (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // 3. Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const linkBase =
    "transition font-medium hover:text-[var(--accent)]";

  const activeLink =
    "text-[var(--accent)] font-semibold border-b-2 border-[var(--accent)]";

  return (
    <header className="w-full h-20 flex items-center justify-between px-8 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <span className="text-lg font-semibold">Bruma</span>

      <nav className="flex items-center gap-6 text-sm">
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

        {/* Updated Auth controls based on the new local state */}
        {user ? (
          <ProfileMenu user={user} />
        ) : (
          <div className="flex items-center gap-2">
            <NavLink to="/login">
              <button className="font-semibold text-[var(--text)]-600 px-4 py-2 rounded-full text-sm hover:bg-orange-50 transition-colors">
                Iniciar Sesión
              </button>
            </NavLink>
            <NavLink to="/register">
              <button className="bg-[var(--text)] text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                Registrarse
              </button>
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
