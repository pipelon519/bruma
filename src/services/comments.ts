import { supabase } from "../lib/supabase"

// 1. Define the TypeScript type for a comment based on your database table
export type Comment = {
  id: number
  recipe_id: string // Foreign key to your recipes table
  author: string
  text: string
  created_at: string
}

/**
 * Fetches all comments for a specific recipe from the 'comments' table.
 * @param recipeId The ID of the recipe.
 * @returns A promise that resolves to an array of comments.
 */
export async function getComments(recipeId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("recipe_id", recipeId) // Filter by the recipe ID
    .order("created_at", { ascending: false }) // Show newest comments first

  if (error) {
    console.error("Error fetching comments:", error)
    throw new Error(error.message)
  }

  return data || []
}

/**
 * Adds a new comment to a recipe.
 * @param recipeId The ID of the recipe.
 * @param author The name of the commenter.
 * @param text The content of the comment.
 * @returns A promise that resolves to the newly created comment.
 */
export async function addComment(
  recipeId: string,
  author: string,
  text: string,
): Promise<Comment> {
  // Note: For a real app, you would get the author from the logged-in user.
  // For now, we pass it as an argument.

  const { data, error } = await supabase
    .from("comments")
    .insert([{ recipe_id: recipeId, author, text }])
    .select()
    .single() // Return the newly inserted row

  if (error) {
    console.error("Error adding comment:", error)
    throw new Error(error.message)
  }

  return data
}
