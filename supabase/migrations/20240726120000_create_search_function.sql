-- Create a function to search for recipes
create or replace function public.search_recipes(search_term text)
returns setof public.recipes as $$
begin
  return query
    select r.*
    from public.recipes r
    left join public.categories c on r.category_id = c.id
    where
      -- Match against the recipe title (using ILIKE for case-insensitivity)
      r.title ilike '%' || search_term || '%'
      -- Match against the category name
      or c.name ilike '%' || search_term || '%'
      -- Match against ingredients array (using a more advanced query)
      -- This part checks if any element in the ingredients array contains the search term.
      -- We unnest the array to check each ingredient individually.
      or exists (
        select 1
        from unnest(r.ingredients) as ingredient
        where ingredient ilike '%' || search_term || '%'
      );
end;
$$ language plpgsql stable security definer;