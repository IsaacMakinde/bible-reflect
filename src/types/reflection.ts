export interface NewReflection {
  content: string;
  tone: string;
  word_count: number;
  reference_verse: string;
}

export interface Reflection extends NewReflection {
  id: number;
  user_id: string;
  user_name: string;
  created_at: number;
  updated_at: string;
  entry_date: number;
}
