import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Link, useLocation } from 'react-router-dom'; // 1. Import useLocation
import type { User } from '@supabase/supabase-js';

// Define types for clarity
type Comment = {
  id: number;
  created_at: string;
  content: string;
  user_full_name: string;
};

type CommentsProps = {
  recipeId: string;
};

export default function Comments({ recipeId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation(); // 2. Get the current location

  // Check user session
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('recipe_id', recipeId)
        .order('created_at', { ascending: false });

      if (!error) {
        setComments(data || []);
      }
      setLoading(false);
    };

    fetchComments();
  }, [recipeId]);

  // Handle new comment submission
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || newComment.trim() === '') return;

    const { data, error } = await supabase
      .from('comments')
      .insert({
        content: newComment.trim(),
        recipe_id: recipeId,
        user_id: user.id,
        user_full_name: user.user_metadata.full_name || 'Usuario Anónimo'
      })
      .select()
      .single();

    if (!error && data) {
      setComments([data, ...comments]);
      setNewComment('');
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Comentarios</h2>

        {/* Comment Form */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
              rows={3}
              placeholder="Escribe tu comentario..."
            />
            <button
              type="submit"
              className="mt-3 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              Publicar Comentario
            </button>
          </form>
        ) : (
          <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8">
            <p className="text-gray-600">¿Quieres dejar un comentario?</p>
            {/* 3. Pass the location state to the login link */}
            <Link to="/login" state={{ from: location }}>
              <button className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
                Inicia sesión
              </button>
            </Link>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {loading ? (
            <p>Cargando comentarios...</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="p-4 bg-white rounded-lg shadow">
                <p className="font-semibold text-gray-800">{comment.user_full_name}</p>
                <p className="text-gray-600 mt-1">{comment.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aún no hay comentarios. ¡Sé el primero en comentar!</p>
          )}
        </div>
      </div>
    </div>
  );
}
