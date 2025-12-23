import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  recipeId: string;
}

export default function LikeButton({ recipeId }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
      }
    };
    fetchUserData();
  }, []);

  const fetchLikes = useCallback(async () => {
    // Count all likes for the recipe
    const { data, error } = await supabase
      .from('recipe_likes')
      .select('*', { count: 'exact', head: true })
      .eq('recipe_id', recipeId);

    if (error) {
      console.error('Error fetching likes count:', error);
    } else {
      setLikes(data.length);
    }

    // Check if the current user has liked this recipe
    if (userId) {
      const { data: likeData, error: likeError } = await supabase
        .from('recipe_likes')
        .select('recipe_id')
        .eq('recipe_id', recipeId)
        .eq('user_id', userId)
        .single();
      
      if (likeError && likeError.code !== 'PGRST116') { // Ignore 'exact one row' error
        console.error('Error checking if liked:', likeError);
      }
      setIsLiked(!!likeData);
    }
  }, [recipeId, userId]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const handleLike = async () => {
    if (!userId) {
      alert('¡Necesitas iniciar sesión para dar Me gusta!');
      return;
    }

    const { error } = await supabase.from('recipe_likes').insert({ recipe_id: recipeId, user_id: userId });
    if (error) {
      console.error('Error liking recipe:', error);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleUnlike = async () => {
    if (!userId) return;

    const { error } = await supabase.from('recipe_likes').delete().eq('recipe_id', recipeId).eq('user_id', userId);
    if (error) {
      console.error('Error unliking recipe:', error);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  return (
    <button 
      onClick={isLiked ? handleUnlike : handleLike}
      className={`flex items-center gap-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
        isLiked 
          ? 'text-red-500 hover:text-red-600'
          : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200'
      }`}
      disabled={!userId}
    >
      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
      <span>{likes}</span>
    </button>
  );
}
