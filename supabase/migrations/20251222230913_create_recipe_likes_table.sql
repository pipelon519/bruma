-- Corregido: recipe_id ahora es de tipo TEXT para que coincida con la tabla de recetas.
CREATE TABLE public.recipe_likes (
    recipe_id TEXT NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (recipe_id, user_id)
);

-- Índice para acelerar la búsqueda de likes por usuario.
CREATE INDEX idx_recipe_likes_user_id ON public.recipe_likes(user_id);
