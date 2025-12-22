
// src/pages/types.ts

/**
 * Represents the definitive structure of a recipe object, consistent with the Supabase database schema.
 * This is the single source of truth for recipe types throughout the application.
 */
export interface Recipe {
  id: string; // Changed from number to string (UUID)
  created_at: string;
  user_id: string;
  title: string;
  description: string;
  image?: string; // Changed from image_url, marked as optional
  
  // Detailed fields (marked as optional as they might not exist on old records)
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  difficulty?: 'Fácil' | 'Intermedia' | 'Difícil';
  category?: string;

  // Content arrays (corrected from string to string[])
  ingredients: string[];
  steps: string[]; // Changed from instructions to steps
}
