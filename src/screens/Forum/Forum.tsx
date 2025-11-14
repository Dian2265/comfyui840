import React, { useState } from 'react';
import { CreatePost } from '../../components/CreatePost';
import { PostList } from '../../components/PostList';
import { MessageSquare } from 'lucide-react';

export const Forum: React.FC = () => {
  const [currentUserName, setCurrentUserName] = useState(() => {
    // 从 localStorage 获取用户名，如果没有则使用默认值
    return localStorage.getItem('forum_user_name') || '匿名用户';
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    // 刷新帖子列表
    setRefreshKey(prev => prev + 1);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value.trim() || '匿名用户';
    setCurrentUserName(newName);
    localStorage.setItem('forum_user_name', newName);
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-8 h-8 text-[#FFDD4C]" />
            <h1 className="text-3xl font-bold text-white">内部论坛</h1>
          </div>
          <p className="text-[rgba(255,255,255,0.6)] mb-4">
            在这里分享想法、交流经验、互相帮助
          </p>
          
          {/* 用户名设置 */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-[rgba(255,255,255,0.7)]">用户名：</label>
            <input
              type="text"
              value={currentUserName === '匿名用户' ? '' : currentUserName}
              onChange={handleNameChange}
              placeholder="匿名用户"
              className="px-3 py-1.5 rounded-md bg-[#2A2B2E] border border-[rgba(255,255,255,0.1)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#FFDD4C] placeholder:text-[rgba(255,255,255,0.4)]"
            />
          </div>
        </div>

        {/* 发帖组件 */}
        <CreatePost 
          onPostCreated={handlePostCreated}
          currentUserName={currentUserName}
        />

        {/* 帖子列表 */}
        <div key={refreshKey}>
          <PostList currentUserName={currentUserName} />
        </div>
      </div>
    </div>
  );
};
