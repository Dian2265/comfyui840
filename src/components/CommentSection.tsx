import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { supabase, ForumComment } from '../lib/supabase';
import { MessageCircle, Reply } from 'lucide-react';

interface CommentSectionProps {
  postId: string;
  currentUserName?: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId, currentUserName = '匿名用户' }) => {
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
    
    // 订阅评论变化
    const subscription = supabase
      .channel(`comments:${postId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'forum_comments', filter: `post_id=eq.${postId}` },
        () => {
          loadComments();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [postId]);

  const loadComments = async () => {
    const { data, error } = await supabase
      .from('forum_comments')
      .select('*')
      .eq('post_id', postId)
      .is('parent_id', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading comments:', error);
      return;
    }

    // 加载每个评论的回复
    const commentsWithReplies = await Promise.all(
      (data || []).map(async (comment) => {
        const { data: replies } = await supabase
          .from('forum_comments')
          .select('*')
          .eq('parent_id', comment.id)
          .order('created_at', { ascending: true });

        return {
          ...comment,
          replies: replies || [],
        };
      })
    );

    setComments(commentsWithReplies as any);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('forum_comments')
        .insert({
          post_id: postId,
          user_name: currentUserName,
          content: newComment.trim(),
        });

      if (error) throw error;

      setNewComment('');
      loadComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('评论失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('forum_comments')
        .insert({
          post_id: postId,
          user_name: currentUserName,
          content: replyContent.trim(),
          parent_id: parentId,
        });

      if (error) throw error;

      setReplyContent('');
      setReplyingTo(null);
      loadComments();
    } catch (error) {
      console.error('Error submitting reply:', error);
      alert('回复失败，请重试');
    } finally {
      setIsSubmitting(false);
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

  const CommentItem: React.FC<{ comment: ForumComment & { replies?: ForumComment[] } }> = ({ comment }) => {
    return (
      <div className="mb-4">
        <div className="bg-[#2A2B2E] rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-white font-medium">{comment.user_name}</span>
              <span className="text-[rgba(255,255,255,0.5)] text-sm ml-2">
                {formatDate(comment.created_at)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="text-[rgba(255,255,255,0.6)] hover:text-white"
            >
              <Reply className="w-4 h-4 mr-1" />
              回复
            </Button>
          </div>
          <p className="text-white text-sm mb-2">{comment.content}</p>
          
          {replyingTo === comment.id && (
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="回复评论..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="bg-[#1A1B1F] border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.4)]"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitReply(comment.id);
                  }
                }}
              />
              <Button
                onClick={() => handleSubmitReply(comment.id)}
                disabled={isSubmitting || !replyContent.trim()}
                className="bg-[#FFDD4C] text-black hover:bg-[#FFD700]"
              >
                发送
              </Button>
            </div>
          )}
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-6 mt-2 space-y-2">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="bg-[#1A1B1F] rounded-lg p-3 border-l-2 border-[rgba(255,255,255,0.1)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white text-sm font-medium">{reply.user_name}</span>
                  <span className="text-[rgba(255,255,255,0.5)] text-xs">
                    {formatDate(reply.created_at)}
                  </span>
                </div>
                <p className="text-white text-sm">{reply.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="bg-[#1A1B1F] border-[rgba(255,255,255,0.1)]">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-white" />
          <h3 className="text-lg font-semibold text-white">评论 ({comments.length})</h3>
        </div>

        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="flex gap-2">
            <Input
              placeholder="写下你的评论..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="bg-[#2A2B2E] border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.4)]"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="bg-[#FFDD4C] text-black hover:bg-[#FFD700]"
            >
              评论
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-[rgba(255,255,255,0.5)] text-center py-8">还没有评论，快来第一个评论吧！</p>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
