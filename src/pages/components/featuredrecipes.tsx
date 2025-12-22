
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Recipe } from '../types';
import FeaturedRecipeSkeleton from './featuredrecipeskeleton';

export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) {
          throw new Error('No se pudieron cargar las recetas.');
        }

        setRecipes(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <section className="py-28 bg-[var(--bg)]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-20 text-center">
            <h2 className="font-serif text-5xl md:text-6xl">
              recetas destacadas
            </h2>
            <p className="mt-4 text-lg opacity-70 max-w-xl mx-auto">
              platos que no buscan impresionar, solo salir bien
            </p>
          </div>

          <div className="flex flex-col gap-32">
            {loading ? (
              <>
                <FeaturedRecipeSkeleton />
                <FeaturedRecipeSkeleton />
              </>
            ) : error ? (
              <div className="text-center text-red-500">
                <p>{error}</p>
              </div>
            ) : (
              recipes.map((recipe, index) => {
                const reverse = index % 2 !== 0;
                const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

                return (
                  <div
                    key={recipe.id}
                    className={`grid md:grid-cols-2 gap-16 items-center ${
                      reverse ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`${reverse ? 'md:order-2' : ''}`}>
                      <Link to={`/recipe/${recipe.id}`}>
                        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-black/5 dark:bg-white/5 transition-transform duration-300 hover:scale-105">
                          <img
                            src={recipe.image || '/assets/recetas/placeholder.jpg'}
                            alt={recipe.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </Link>
                    </div>

                    <div className={`${reverse ? 'md:order-1' : ''}`}>
                      <h3 className="font-serif text-4xl md:text-5xl leading-tight">
                        {recipe.title}
                      </h3>
                      <p className="mt-6 text-lg opacity-75 max-w-md">
                        {recipe.description}
                      </p>
                      <div className="mt-8 flex gap-6 text-sm opacity-70">
                        <span>⏱ {totalTime > 0 ? `${totalTime} min` : 'N/A'}</span>
                        <span>🔥 {recipe.difficulty || 'N/A'}</span>
                      </div>
                      <Link to={`/recipe/${recipe.id}`}>
                        <button className="mt-10 inline-block rounded-full border border-current px-8 py-4 text-sm tracking-wide hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">
                          ver receta
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </motion.section>
  );
}
