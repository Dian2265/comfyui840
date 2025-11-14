import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { supabase } from '../lib/supabase';
import { ImagePlus, X } from 'lucide-react';

interface CreatePostProps {
  onPostCreated: () => void;
  currentUserName?: string;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated, currentUserName = '匿名用户' }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files];
    setImages(newImages);

    // 创建预览
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
    // 释放预览 URL
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      // 尝试上传到 Supabase Storage
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('forum-images')
        .upload(fileName, file);

      if (!error && data) {
        const { data: { publicUrl } } = supabase.storage
          .from('forum-images')
          .getPublicUrl(fileName);
        return publicUrl;
      }
    } catch (error) {
      console.warn('Storage upload failed, using data URL:', error);
    }

    // 如果存储桶不存在或上传失败，使用 base64 数据 URL 作为后备方案
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('请填写标题和内容');
      return;
    }

    setIsSubmitting(true);

    try {
      // 创建帖子
      const { data: post, error: postError } = await supabase
        .from('forum_posts')
        .insert({
          user_name: currentUserName,
          title: title.trim(),
          content: content.trim(),
        })
        .select()
        .single();

      if (postError) throw postError;

      // 上传图片
      if (images.length > 0 && post) {
        const imageUploads = images.map(async (file) => {
          const imageUrl = await uploadImage(file);
          return {
            post_id: post.id,
            image_url: imageUrl,
            image_name: file.name,
          };
        });

        const imageData = await Promise.all(imageUploads);

        const { error: imageError } = await supabase
          .from('forum_post_images')
          .insert(imageData);

        if (imageError) {
          console.error('Error uploading images:', imageError);
        }
      }

      // 清理预览 URL
      imagePreviews.forEach(url => URL.revokeObjectURL(url));

      // 重置表单
      setTitle('');
      setContent('');
      setImages([]);
      setImagePreviews([]);
      
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('发布失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6 bg-[#1A1B1F] border-[rgba(255,255,255,0.1)]">
      <CardHeader>
        <CardTitle className="text-white">发表新帖子</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="帖子标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#2A2B2E] border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.4)]"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <textarea
              placeholder="分享你的想法..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full rounded-md border border-[rgba(255,255,255,0.1)] bg-[#2A2B2E] px-3 py-2 text-sm text-white placeholder:text-[rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgba(255,255,255,0.2)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
            />
          </div>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`预览 ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
                disabled={isSubmitting}
              />
              <Button
                type="button"
                variant="outline"
                className="bg-[#2A2B2E] border-[rgba(255,255,255,0.1)] text-white hover:bg-[#3A3B3E]"
                disabled={isSubmitting}
              >
                <ImagePlus className="w-4 h-4 mr-2" />
                添加图片
              </Button>
            </label>

            <Button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="bg-[#FFDD4C] text-black hover:bg-[#FFD700]"
            >
              {isSubmitting ? '发布中...' : '发布'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
