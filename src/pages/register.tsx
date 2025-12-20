import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import PageTransition from "./components/pagetransition";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName, // Save full name to user metadata
          },
        },
      });

      if (error) {
        throw error;
      }
      
      setSuccess(true);

    } catch (error: any) {
      setError(error.message || "Error al registrar la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="py-24 px-6 max-w-lg mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-serif mb-6 text-center">Crear Cuenta</h1>
          
          {success ? (
            <div className="text-center text-green-700 bg-green-50 p-6 rounded-md">
              <h2 className="text-2xl font-semibold">¡Revisa tu correo!</h2>
              <p className="mt-2">Te hemos enviado un enlace de confirmación a <strong>{email}</strong>. Haz clic en él para activar tu cuenta.</p>
            </div>
          ) : (
            <>
              <p className="text-center text-stone-600 mb-8">
                Completa tus datos para unirte a la comunidad.
              </p>
              <form onSubmit={handleRegister} className="grid gap-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="p-4 rounded-md border bg-stone-50"
                  required
                />
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
                  placeholder="Crea una contraseña segura"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-4 rounded-md border bg-stone-50"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-4 rounded-md border bg-stone-50"
                  required
                />
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-500 text-white font-bold py-4 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 mt-2"
                >
                  {loading ? "Creando cuenta..." : "Registrarme"}
                </button>
              </form>
              <p className="text-center text-sm text-stone-500 mt-6">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="text-orange-500 hover:underline font-medium">
                  Inicia sesión
                </Link>
              </p>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
