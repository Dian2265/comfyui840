import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { supabase, ForumPostWithImages } from '../lib/supabase';
import { MessageCircle, Image as ImageIcon } from 'lucide-react';
import { CommentSection } from './CommentSection';

interface PostListProps {
  currentUserName?: string;
  onPostClick?: (postId: string) => void;
}

export const PostList: React.FC<PostListProps> = ({ currentUserName, onPostClick }) => {
  const [posts, setPosts] = useState<ForumPostWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();

    // 订阅帖子变化
    const subscription = supabase
      .channel('forum_posts')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'forum_posts' },
        () => {
          loadPosts();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { data: postsData, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // 加载每个帖子的图片和评论数
      const postsWithDetails = await Promise.all(
        (postsData || []).map(async (post) => {
          const [imagesResult, commentsResult] = await Promise.all([
            supabase
              .from('forum_post_images')
              .select('*')
              .eq('post_id', post.id),
            supabase
              .from('forum_comments')
              .select('id', { count: 'exact', head: true })
              .eq('post_id', post.id),
          ]);

          return {
            ...post,
            images: imagesResult.data || [],
            comments_count: commentsResult.count || 0,
          };
        })
      );

      setPosts(postsWithDetails);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const handlePostClick = (postId: string) => {
    if (onPostClick) {
      onPostClick(postId);
    } else {
      setExpandedPost(expandedPost === postId ? null : postId);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-[rgba(255,255,255,0.5)]">加载中...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[rgba(255,255,255,0.5)]">还没有帖子，快来第一个发帖吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="bg-[#1A1B1F] border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] transition-colors cursor-pointer"
          onClick={() => handlePostClick(post.id)}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                <div className="flex items-center gap-4 text-sm text-[rgba(255,255,255,0.6)]">
                  <span>{post.user_name}</span>
                  <span>·</span>
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-white mb-4 whitespace-pre-wrap">{post.content}</p>

            {post.images && post.images.length > 0 && (
              <div className="mb-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                {post.images.slice(0, 6).map((image) => (
                  <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden bg-[#2A2B2E]">
                    <img
                      src={image.image_url}
                      alt={image.image_name || '图片'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {post.images.length > 6 && (
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-[#2A2B2E] flex items-center justify-center">
                    <span className="text-white text-sm">+{post.images.length - 6}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center gap-2 text-[rgba(255,255,255,0.6)]">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{post.comments_count || 0} 条评论</span>
              </div>
              {post.images && post.images.length > 0 && (
                <div className="flex items-center gap-2 text-[rgba(255,255,255,0.6)]">
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-sm">{post.images.length} 张图片</span>
                </div>
              )}
            </div>

            {expandedPost === post.id && (
              <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                <CommentSection postId={post.id} currentUserName={currentUserName} />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
