
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import PageTransition from './components/pagetransition';
import { User, Server, Save } from 'lucide-react';

type ProfileFormData = {
  full_name: string;
};

export default function ProfilePage() {
  const { user, session } = useAuth(); // We need the session for the update
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Initialize form with the user's current full_name
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<ProfileFormData>({
    defaultValues: {
      full_name: user?.user_metadata?.full_name || '',
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    if (!user || !session) return;
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: data.full_name }
    });

    if (error) {
      setMessage({ type: 'error', text: 'Error updating profile: ' + error.message });
    } else {
      setMessage({ type: 'success', text: '¡Perfil actualizado con éxito!' });
    }
  };

  if (!user) {
    return <div>Loading user profile...</div>; // Or a more sophisticated loader
  }

  return (
    <PageTransition>
      <div className="bg-stone-50 min-h-screen py-12 md:py-20">
        <div className="mx-auto max-w-xl px-6">
          <div className="mb-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-800">Mi Perfil</h1>
            <p className="mt-3 text-lg text-stone-600">Actualiza tu información personal.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email (Read-only) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 flex items-center gap-3">
                    <User className="text-stone-400"/>
                    <input 
                        id="email"
                        type="email"
                        value={user.email || ''}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                    />
                </div>
              </div>

              {/* Full Name (Editable) */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <div className="mt-1 flex items-center gap-3">
                    <Server className="text-stone-400"/>
                    <input 
                        {...register('full_name', { required: 'El nombre completo es requerido' })}
                        id="full_name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>}
              </div>

              {message && (
                  <div className={`p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {message.text}
                  </div>
              )}

              <div className="text-right">
                <button 
                  type="submit" 
                  disabled={isSubmitting || !isDirty}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:bg-indigo-400"
                >
                  <Save className="-ml-1 mr-3 h-5 w-5" />
                  {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
