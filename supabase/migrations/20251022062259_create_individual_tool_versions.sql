/*
  # 单个工具版本信息数据库架构

  ## 新增表
  
  ### `individual_tools` 表
  - `id` (uuid, 主键) - 工具唯一标识
  - `name` (text) - 工具名称
  - `description` (text) - 工具描述
  - `cover_image` (text) - 封面图片
  - `current_version` (text) - 当前版本号
  - `last_updated` (timestamptz) - 最后更新时间
  - `created_at` (timestamptz) - 创建时间
  
  ### `individual_tool_versions` 表
  - `id` (uuid, 主键) - 版本唯一标识
  - `tool_id` (uuid, 外键) - 关联的工具ID
  - `version_number` (text) - 版本号
  - `release_date` (timestamptz) - 发布日期
  - `changelog` (text) - 更新日志
  - `new_features` (jsonb) - 新功能列表
  - `improvements` (jsonb) - 改进项列表
  - `bug_fixes` (jsonb) - 修复问题列表
  - `is_current` (boolean) - 是否为当前版本
  - `created_at` (timestamptz) - 创建时间
  
  ## 安全性
  - 启用所有表的行级安全 (RLS)
  - 添加公开读取策略
*/

-- 创建单个工具表
CREATE TABLE IF NOT EXISTS individual_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  cover_image text,
  current_version text DEFAULT '1.0.0',
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- 创建单个工具版本信息表
CREATE TABLE IF NOT EXISTS individual_tool_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid NOT NULL REFERENCES individual_tools(id) ON DELETE CASCADE,
  version_number text NOT NULL,
  release_date timestamptz DEFAULT now(),
  changelog text,
  new_features jsonb DEFAULT '[]'::jsonb,
  improvements jsonb DEFAULT '[]'::jsonb,
  bug_fixes jsonb DEFAULT '[]'::jsonb,
  is_current boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_individual_tool_versions_tool_id ON individual_tool_versions(tool_id);
CREATE INDEX IF NOT EXISTS idx_individual_tool_versions_release_date ON individual_tool_versions(release_date DESC);

-- 启用行级安全
ALTER TABLE individual_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE individual_tool_versions ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略
CREATE POLICY "Anyone can view individual tools"
  ON individual_tools
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view individual tool versions"
  ON individual_tool_versions
  FOR SELECT
  USING (true);

-- 只有认证用户可以插入和更新
CREATE POLICY "Authenticated users can insert individual tools"
  ON individual_tools
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update individual tools"
  ON individual_tools
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert individual tool versions"
  ON individual_tool_versions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update individual tool versions"
  ON individual_tool_versions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 插入示例数据
INSERT INTO individual_tools (id, name, description, current_version, last_updated)
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '8K 高清图像增强', '专业级图像画质提升工具，支持最高8K分辨率', '2.1.0', '2025-10-20 14:30:00'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '智能降噪', '消除图像噪点，还原清晰画质', '1.8.5', '2025-10-18 10:00:00'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '智能背景替换', '一键更换背景，AI智能识别主体', '3.0.2', '2025-10-22 09:15:00')
ON CONFLICT (id) DO NOTHING;

-- 插入版本历史示例数据
INSERT INTO individual_tool_versions (tool_id, version_number, release_date, changelog, new_features, improvements, bug_fixes, is_current)
VALUES 
  -- 8K 高清图像增强版本
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2.1.0', '2025-10-20 14:30:00', '性能优化和新增批量处理功能', 
   '["支持批量处理最多100张图片", "新增自定义增强强度调节", "支持导出预设配置"]'::jsonb,
   '["处理速度提升40%", "内存占用降低25%", "优化了边缘细节保留算法"]'::jsonb,
   '["修复了特定格式图片处理失败的问题", "修复了高分辨率图片内存溢出bug"]'::jsonb,
   true),
  
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2.0.0', '2025-09-15 10:00:00', '全新2.0版本，AI引擎升级', 
   '["全新第三代AI增强引擎", "支持8K分辨率处理", "新增实时预览功能"]'::jsonb,
   '["画质提升50%", "处理速度提升2倍", "优化了色彩还原准确度"]'::jsonb,
   '["修复了1.x版本已知问题"]'::jsonb,
   false),
  
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '1.5.2', '2025-08-10 16:20:00', '稳定性更新', 
   '[]'::jsonb,
   '["提升了处理稳定性", "优化了界面响应速度"]'::jsonb,
   '["修复了偶尔崩溃的问题", "修复了某些PNG文件透明度处理错误"]'::jsonb,
   false),
  
  -- 智能降噪版本
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '1.8.5', '2025-10-18 10:00:00', '降噪算法优化升级', 
   '["新增选区降噪功能", "支持自定义降噪强度"]'::jsonb,
   '["降噪效果提升30%", "细节保留能力增强", "处理速度提升20%"]'::jsonb,
   '["修复了高ISO图片处理异常", "修复了色彩偏移问题"]'::jsonb,
   true),
  
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '1.7.0', '2025-09-05 13:00:00', '新增AI智能降噪模式', 
   '["AI智能降噪模式", "支持RAW格式", "新增批量降噪"]'::jsonb,
   '["优化了暗部降噪效果", "改进了算法性能"]'::jsonb,
   '["修复了部分格式兼容性问题"]'::jsonb,
   false),
  
  -- 智能背景替换版本
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '3.0.2', '2025-10-22 09:15:00', '最新版本上线，新增视频背景替换', 
   '["支持视频背景替换（实验性）", "新增20+精美背景模板", "支持自定义背景上传"]'::jsonb,
   '["抠图准确度提升至99%", "边缘处理更自然", "处理速度提升3倍"]'::jsonb,
   '["修复了复杂背景识别错误", "修复了毛发边缘处理瑕疵"]'::jsonb,
   true),
  
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '2.5.0', '2025-09-28 11:00:00', '智能抠图算法升级', 
   '["全新第四代抠图算法", "支持毛发精细抠图", "新增背景虚化功能"]'::jsonb,
   '["抠图准确度提升40%", "毛发识别更精准", "优化了边缘融合效果"]'::jsonb,
   '["修复了透明背景保存问题"]'::jsonb,
   false)
ON CONFLICT DO NOTHING;