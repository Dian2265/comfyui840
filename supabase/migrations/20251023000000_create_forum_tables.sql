/*
  # 内部论坛数据库架构

  ## 新增表
  
  ### `forum_posts` 表 - 论坛帖子
  - `id` (uuid, 主键) - 帖子唯一标识
  - `user_id` (uuid) - 用户ID（如果使用认证，否则可为空）
  - `user_name` (text) - 用户名
  - `title` (text) - 帖子标题
  - `content` (text) - 帖子内容
  - `created_at` (timestamptz) - 创建时间
  - `updated_at` (timestamptz) - 更新时间
  
  ### `forum_post_images` 表 - 帖子图片
  - `id` (uuid, 主键) - 图片唯一标识
  - `post_id` (uuid, 外键) - 关联的帖子ID
  - `image_url` (text) - 图片URL
  - `image_name` (text) - 图片名称
  - `created_at` (timestamptz) - 创建时间
  
  ### `forum_comments` 表 - 评论
  - `id` (uuid, 主键) - 评论唯一标识
  - `post_id` (uuid, 外键) - 关联的帖子ID
  - `user_id` (uuid) - 用户ID（如果使用认证，否则可为空）
  - `user_name` (text) - 用户名
  - `content` (text) - 评论内容
  - `parent_id` (uuid, 外键, 可选) - 父评论ID（支持回复评论）
  - `created_at` (timestamptz) - 创建时间
  - `updated_at` (timestamptz) - 更新时间
  
  ## 安全性
  - 启用所有表的行级安全 (RLS)
  - 添加公开读取策略
  - 允许认证用户插入和更新
*/

-- 创建论坛帖子表
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  user_name text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建帖子图片表
CREATE TABLE IF NOT EXISTS forum_post_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  image_name text,
  created_at timestamptz DEFAULT now()
);

-- 创建评论表
CREATE TABLE IF NOT EXISTS forum_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id uuid,
  user_name text NOT NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES forum_comments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_forum_posts_created_at ON forum_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_post_images_post_id ON forum_post_images(post_id);
CREATE INDEX IF NOT EXISTS idx_forum_comments_post_id ON forum_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_forum_comments_parent_id ON forum_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_forum_comments_created_at ON forum_comments(created_at DESC);

-- 启用行级安全
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_post_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略
CREATE POLICY "Anyone can view forum posts"
  ON forum_posts
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view forum post images"
  ON forum_post_images
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view forum comments"
  ON forum_comments
  FOR SELECT
  USING (true);

-- 允许认证用户插入和更新
CREATE POLICY "Authenticated users can insert forum posts"
  ON forum_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update forum posts"
  ON forum_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete forum posts"
  ON forum_posts
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert forum post images"
  ON forum_post_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert forum comments"
  ON forum_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update forum comments"
  ON forum_comments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete forum comments"
  ON forum_comments
  FOR DELETE
  TO authenticated
  USING (true);

-- 如果没有认证系统，允许所有人插入（仅用于开发/内部使用）
-- 注意：在生产环境中应该移除这些策略，只使用认证策略
CREATE POLICY "Anyone can insert forum posts (internal use)"
  ON forum_posts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update forum posts (internal use)"
  ON forum_posts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete forum posts (internal use)"
  ON forum_posts
  FOR DELETE
  USING (true);

CREATE POLICY "Anyone can insert forum post images (internal use)"
  ON forum_post_images
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can insert forum comments (internal use)"
  ON forum_comments
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update forum comments (internal use)"
  ON forum_comments
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete forum comments (internal use)"
  ON forum_comments
  FOR DELETE
  USING (true);
