import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// 论坛相关的类型定义
export interface ForumPost {
  id: string;
  user_id?: string;
  user_name: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ForumPostImage {
  id: string;
  post_id: string;
  image_url: string;
  image_name?: string;
  created_at: string;
}

export interface ForumComment {
  id: string;
  post_id: string;
  user_id?: string;
  user_name: string;
  content: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ForumPostWithImages extends ForumPost {
  images: ForumPostImage[];
  comments_count?: number;
}

export interface ForumCommentWithReplies extends ForumComment {
  replies?: ForumComment[];
}
