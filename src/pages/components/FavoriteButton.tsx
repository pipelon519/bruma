
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Heart } from 'lucide-react';
import { Tooltip } from 'react-tooltip';


interface FavoriteButtonProps {
  recipeId: string;
}

const FavoriteButton = ({ recipeId }: FavoriteButtonProps) => {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkFavoriteStatus = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('favorite_recipes')
        .select('*')
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }
      
      setIsFavorited(!!data);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, recipeId]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const toggleFavorite = async () => {
    if (!user) {
      alert('Por favor, inicia sesión para guardar tus recetas favoritas.');
      return;
    }

    setIsLoading(true);
    
    if (isFavorited) {
      // Remove from favorites
      const { error } = await supabase
        .from('favorite_recipes')
        .delete()
        .match({ user_id: user.id, recipe_id: recipeId });

      if (error) {
        console.error('Error removing favorite:', error);
      } else {
        setIsFavorited(false);
      }
    } else {
      // Add to favorites
      const { error } = await supabase
        .from('favorite_recipes')
        .insert({ user_id: user.id, recipe_id: recipeId });
      
      if (error) {
        console.error('Error adding favorite:', error);
      } else {
        setIsFavorited(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={toggleFavorite}
        disabled={isLoading}
        className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200 disabled:opacity-50"
        aria-label={isFavorited ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        data-tooltip-id="favorite-tooltip"
        data-tooltip-content={isFavorited ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        <Heart
          className={`h-6 w-6 transition-all duration-300 ${isFavorited ? 'text-red-500 fill-current' : 'text-stone-500'}`}
        />
      </button>
      <Tooltip id="favorite-tooltip" place="top" effect="solid" />
    </>
  );
};

export default FavoriteButton;
