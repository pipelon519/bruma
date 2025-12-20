export type Recipe = {
  id: string // Corrected type: from number to string
  title: string
  description: string
  time: string
  difficulty: string
  category: string
  image: string
  ingredients: string[]
  steps: string[]
  notes: string
}
