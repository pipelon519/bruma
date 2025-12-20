import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import PageTransition from "./components/pagetransition";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation(); // 1. Get location info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Determine where to redirect after login
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // 3. Redirect to the previous page, or home as a fallback
      navigate(from, { replace: true });

    } catch (error: any) {
      setError(error.message || "Error al iniciar sesión. Revisa tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="py-24 px-6 max-w-lg mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-serif mb-6 text-center">Iniciar Sesión</h1>
          <p className="text-center text-stone-600 mb-8">
            Bienvenido de nuevo. ¡Tus recetas te esperan!
          </p>
          <form onSubmit={handleLogin} className="grid gap-6">
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-md border bg-stone-50"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 rounded-md border bg-stone-50"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 text-white font-bold py-4 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <p className="text-center text-sm text-stone-500 mt-6">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-orange-500 hover:underline font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
