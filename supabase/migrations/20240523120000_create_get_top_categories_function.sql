create or replace function get_top_categories(limit_count int)
returns table (name text, recipe_count bigint)
as $$
begin
  return query
  select
    r.category as name,
    count(r.id)::bigint as recipe_count
  from
    public.recipes as r
  where
    r.category is not null and r.category <> ''
  group by
    r.category
  order by
    recipe_count desc
  limit
    limit_count;
end;
$$ language plpgsql;