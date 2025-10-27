import { ChevronDown as ChevronDownIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Star, MessageCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "../../components/ui/dialog";
import { CreativeEditor } from "../CreativeEditor";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const authors = [
  {
    avatar: "/ellipse-19342.svg",
    name: "刘锐 AIGC",
    description: "修图课堂创始人",
    toolCount: "16 个 AI 工具",
    socialMedia: [
      { platform: "小红书", url: "#" },
      { platform: "抖音", url: "#" },
      { platform: "bilibili", url: "#" },
    ],
    toolPackages: [
      {
        id: 1,
        cover: "/-----6.png",
        title: "专业摄影工具包",
        description: "包含画质增强、背景处理、电商设计等专业摄影工具",
        price: "¥299",
        validity: "永久有效",
        isPurchased: false,
        categories: [
          {
            id: "enhance",
            label: "画质增强",
            tools: [
              { cover: "/-----6.png", name: "8K 高清图像增强", description: "超清晰度提升" },
              { cover: "/-----2.png", name: "智能降噪", description: "消除图像噪点" },
              { cover: "/-----1.png", name: "清晰度增强", description: "细节优化" },
              { cover: "/-----5.png", name: "锐化处理", description: "边缘增强" },
              { cover: "/-----7.png", name: "色彩还原", description: "真实色彩" },
              { cover: "/-----8.png", name: "对比度优化", description: "层次分明" },
            ]
          },
          {
            id: "background",
            label: "背景处理",
            tools: [
              { cover: "/-----2.png", name: "智能背景替换", description: "一键更换背景" },
              { cover: "/-----5.png", name: "背景虚化", description: "专业景深效果" },
            ]
          },
          {
            id: "ecommerce",
            label: "电商工具",
            tools: [
              { cover: "/-----5.png", name: "商品图生成", description: "电商图片生成" },
              { cover: "/-----3.png", name: "白底图处理", description: "标准电商白底" },
            ]
          }
        ]
      },
      {
        id: 2,
        cover: "/-----1.png",
        title: "人像美化套装",
        description: "提供人像美颜、光影调整、风格滤镜等美化功能",
        price: "¥199",
        validity: "一年有效",
        isPurchased: false,
        categories: [
          {
            id: "beauty",
            label: "人像美颜",
            tools: [
              { cover: "/-----1.png", name: "AI 人像美化", description: "智能美颜" },
              { cover: "/-----6.png", name: "磨皮美白", description: "自然肤质" },
            ]
          },
          {
            id: "lighting",
            label: "光影调整",
            tools: [
              { cover: "/-----6.png", name: "人像光影调整", description: "专业光影" },
              { cover: "/-----7.png", name: "智能补光", description: "补光增强" },
            ]
          },
          {
            id: "filter",
            label: "风格滤镜",
            tools: [
              { cover: "/-----9.png", name: "AI 滤镜", description: "多种滤镜效果" },
              { cover: "/-----8.png", name: "复古胶片", description: "胶片质感" },
            ]
          }
        ]
      },
      {
        id: 3,
        cover: "/-----3.png",
        title: "创意设计工具包",
        description: "风格转换、智能抠图等创意设计工具集合",
        price: "¥399",
        validity: "永久有效",
        isPurchased: true,
        purchaseDate: "2024-10-20",
        categories: [
          {
            id: "style",
            label: "风格转换",
            tools: [
              { cover: "/-----3.png", name: "风格迁移工具", description: "多种风格转换" },
              { cover: "/-----7.png", name: "艺术化处理", description: "艺术风格" },
            ]
          },
          {
            id: "cutout",
            label: "智能抠图",
            tools: [
              { cover: "/-----7.png", name: "智能抠图", description: "精准抠图" },
              { cover: "/-----2.png", name: "发丝级抠图", description: "细节完美" },
            ]
          }
        ]
      },
      {
        id: 4,
        cover: "/-----7.png",
        title: "视频剪辑工具包",
        description: "视频剪辑、特效处理、字幕生成等视频创作工具",
        price: "¥499",
        validity: "永久有效",
        isPurchased: false,
        categories: [
          {
            id: "editing",
            label: "视频剪辑",
            tools: [
              { cover: "/-----7.png", name: "智能剪辑", description: "AI 自动剪辑" },
              { cover: "/-----8.png", name: "转场特效", description: "丰富转场效果" },
              { cover: "/-----9.png", name: "视频调色", description: "专业调色" },
            ]
          },
          {
            id: "subtitle",
            label: "字幕工具",
            tools: [
              { cover: "/-----1.png", name: "自动字幕", description: "语音识别字幕" },
              { cover: "/-----2.png", name: "字幕翻译", description: "多语言翻译" },
            ]
          }
        ]
      },
      {
        id: 5,
        cover: "/-----9.png",
        title: "AI 绘画工具包",
        description: "文生图、图生图、线稿上色等 AI 绘画创作工具",
        price: "¥599",
        validity: "永久有效",
        isPurchased: true,
        purchaseDate: "2024-09-15",
        categories: [
          {
            id: "text2img",
            label: "文生图",
            tools: [
              { cover: "/-----9.png", name: "AI 文生图", description: "文字生成图片" },
              { cover: "/-----8.png", name: "风格化生成", description: "多种艺术风格" },
            ]
          },
          {
            id: "img2img",
            label: "图生图",
            tools: [
              { cover: "/-----6.png", name: "图片重绘", description: "AI 重新绘制" },
              { cover: "/-----5.png", name: "局部重绘", description: "指定区域重绘" },
            ]
          },
          {
            id: "coloring",
            label: "线稿上色",
            tools: [
              { cover: "/-----3.png", name: "自动上色", description: "智能配色" },
              { cover: "/-----2.png", name: "风格上色", description: "多种配色方案" },
            ]
          }
        ]
      },
      {
        id: 6,
        cover: "/-----8.png",
        title: "色彩管理套装",
        description: "色彩增强、调色、色调统一等专业色彩处理工具",
        price: "¥259",
        validity: "永久有效",
        isPurchased: false,
        categories: [
          {
            id: "color",
            label: "色彩增强",
            tools: [
              { cover: "/-----8.png", name: "色彩增强", description: "智能色彩优化" },
              { cover: "/-----5.png", name: "色温调整", description: "白平衡校正" },
              { cover: "/-----6.png", name: "饱和度调整", description: "色彩饱和度" },
            ]
          },
          {
            id: "grading",
            label: "调色工具",
            tools: [
              { cover: "/-----7.png", name: "专业调色", description: "电影级调色" },
              { cover: "/-----9.png", name: "一键调色", description: "快速调色" },
            ]
          }
        ]
      },
      {
        id: 7,
        cover: "/-----2.png",
        title: "智能修复工具包",
        description: "瑕疵修复、画质修复、老照片修复等修复工具",
        price: "¥179",
        validity: "一年有效",
        isPurchased: false,
        categories: [
          {
            id: "repair",
            label: "照片修复",
            tools: [
              { cover: "/-----2.png", name: "瑕疵修复", description: "消除瑕疵" },
              { cover: "/-----1.png", name: "老照片修复", description: "修复老照片" },
              { cover: "/-----3.png", name: "画质恢复", description: "恢复画质" },
            ]
          },
          {
            id: "remove",
            label: "智能去除",
            tools: [
              { cover: "/-----5.png", name: "去水印", description: "智能去水印" },
              { cover: "/-----6.png", name: "去杂物", description: "清除杂物" },
            ]
          }
        ]
      },
      {
        id: 8,
        cover: "/-----5.png",
        title: "批量处理套装",
        description: "批量压缩、批量转换、批量裁剪等高效处理工具",
        price: "¥149",
        validity: "永久有效",
        isPurchased: false,
        categories: [
          {
            id: "batch",
            label: "批量处理",
            tools: [
              { cover: "/-----5.png", name: "批量压缩", description: "快速压缩" },
              { cover: "/-----3.png", name: "批量转换", description: "格式转换" },
              { cover: "/-----2.png", name: "批量裁剪", description: "统一裁剪" },
              { cover: "/-----7.png", name: "批量水印", description: "添加水印" },
            ]
          }
        ]
      },
      {
        id: 9,
        cover: "/-----1.png",
        title: "3D 渲染工具包",
        description: "3D 建模、材质渲染、光影模拟等 3D 创作工具",
        price: "¥799",
        validity: "永久有效",
        isPurchased: false,
        categories: [
          {
            id: "3d",
            label: "3D 创作",
            tools: [
              { cover: "/-----1.png", name: "3D 建模", description: "快速建模" },
              { cover: "/-----6.png", name: "材质渲染", description: "真实材质" },
              { cover: "/-----7.png", name: "光影渲染", description: "光线追踪" },
            ]
          },
          {
            id: "animation",
            label: "动画制作",
            tools: [
              { cover: "/-----9.png", name: "关键帧动画", description: "动画制作" },
              { cover: "/-----8.png", name: "物理模拟", description: "物理引擎" },
            ]
          }
        ]
      },
      {
        id: 10,
        cover: "/-----6.png",
        title: "社交媒体套装",
        description: "封面制作、海报设计、社交图片优化等工具",
        price: "¥99",
        validity: "一年有效",
        isPurchased: false,
        categories: [
          {
            id: "social",
            label: "社交媒体",
            tools: [
              { cover: "/-----6.png", name: "封面制作", description: "自动生成封面" },
              { cover: "/-----3.png", name: "海报设计", description: "快速设计海报" },
              { cover: "/-----8.png", name: "尺寸适配", description: "多平台适配" },
            ]
          }
        ]
      }
    ]
  },
  {
    avatar: "/pixel-cake.png",
    name: "像素蛋糕",
    description: "官方账号",
    toolCount: "16 个 AI 工具",
    socialMedia: [
      { platform: "小红书", url: "#" },
      { platform: "抖音", url: "#" },
      { platform: "bilibili", url: "#" },
    ],
    toolPackages: [
      {
        id: 1,
        cover: "/-----3.png",
        title: "风格转换工具包",
        description: "多种风格转换和抠图工具，满足创意需求",
        price: "¥159",
        validity: "永久有效",
        categories: [
          {
            id: "style",
            label: "风格转换",
            tools: [
              { cover: "/-----3.png", name: "风格迁移工具", description: "多种风格转换" },
              { cover: "/-----8.png", name: "色彩增强", description: "色彩优化" },
            ]
          },
          {
            id: "cutout",
            label: "抠图工具",
            tools: [
              { cover: "/-----7.png", name: "智能抠图", description: "精准抠图" },
              { cover: "/-----2.png", name: "一键去背景", description: "快速去背景" },
            ]
          }
        ]
      },
      {
        id: 2,
        cover: "/-----8.png",
        title: "色彩调整套装",
        description: "专业的色彩增强和调整工具",
        price: "¥129",
        validity: "一年有效",
        categories: [
          {
            id: "color",
            label: "色彩调整",
            tools: [
              { cover: "/-----8.png", name: "色彩增强", description: "色彩优化" },
              { cover: "/-----5.png", name: "色调统一", description: "统一色调" },
            ]
          }
        ]
      },
      {
        id: 3,
        cover: "/-----5.png",
        title: "商品摄影套装",
        description: "电商产品图处理、白底图生成等工具",
        price: "¥189",
        validity: "永久有效",
        categories: [
          {
            id: "product",
            label: "商品处理",
            tools: [
              { cover: "/-----5.png", name: "商品图生成", description: "电商图片生成" },
              { cover: "/-----3.png", name: "白底图处理", description: "标准电商白底" },
              { cover: "/-----2.png", name: "影子生成", description: "自然阴影效果" },
            ]
          }
        ]
      },
      {
        id: 4,
        cover: "/-----7.png",
        title: "人像精修工具包",
        description: "专业人像修图、光影处理工具集",
        price: "¥259",
        validity: "永久有效",
        categories: [
          {
            id: "retouch",
            label: "人像精修",
            tools: [
              { cover: "/-----1.png", name: "精细磨皮", description: "保留肤质纹理" },
              { cover: "/-----6.png", name: "五官调整", description: "自然美化" },
              { cover: "/-----7.png", name: "光影重塑", description: "专业打光" },
            ]
          }
        ]
      },
      {
        id: 5,
        cover: "/-----9.png",
        title: "创意滤镜套装",
        description: "多种艺术风格滤镜和特效",
        price: "¥99",
        validity: "一年有效",
        categories: [
          {
            id: "filter",
            label: "创意滤镜",
            tools: [
              { cover: "/-----9.png", name: "AI 滤镜", description: "多种滤镜效果" },
              { cover: "/-----8.png", name: "复古胶片", description: "胶片质感" },
              { cover: "/-----3.png", name: "艺术化处理", description: "艺术风格" },
            ]
          }
        ]
      },
      {
        id: 6,
        cover: "/-----2.png",
        title: "智能抠图专业版",
        description: "发丝级抠图、批量处理功能",
        price: "¥169",
        validity: "永久有效",
        categories: [
          {
            id: "matting",
            label: "智能抠图",
            tools: [
              { cover: "/-----7.png", name: "智能抠图", description: "精准抠图" },
              { cover: "/-----2.png", name: "发丝级抠图", description: "细节完美" },
              { cover: "/-----1.png", name: "批量抠图", description: "高效处理" },
            ]
          }
        ]
      },
      {
        id: 7,
        cover: "/-----6.png",
        title: "图像修复工具包",
        description: "去噪、修复、画质提升工具",
        price: "¥219",
        validity: "永久有效",
        categories: [
          {
            id: "restore",
            label: "图像修复",
            tools: [
              { cover: "/-----6.png", name: "智能修复", description: "瑕疵去除" },
              { cover: "/-----2.png", name: "降噪处理", description: "画质提升" },
              { cover: "/-----5.png", name: "老照片修复", description: "还原记忆" },
            ]
          }
        ]
      },
      {
        id: 8,
        cover: "/-----1.png",
        title: "视频转图片套装",
        description: "视频帧提取、关键帧筛选工具",
        price: "¥149",
        validity: "一年有效",
        categories: [
          {
            id: "video",
            label: "视频处理",
            tools: [
              { cover: "/-----1.png", name: "视频帧提取", description: "批量导出" },
              { cover: "/-----6.png", name: "关键帧筛选", description: "智能识别" },
            ]
          }
        ]
      },
      {
        id: 9,
        cover: "/-----3.png",
        title: "背景生成器",
        description: "AI 生成各种风格背景图",
        price: "¥179",
        validity: "永久有效",
        categories: [
          {
            id: "background",
            label: "背景生成",
            tools: [
              { cover: "/-----5.png", name: "背景虚化", description: "专业景深效果" },
              { cover: "/-----2.png", name: "智能背景替换", description: "一键更换背景" },
              { cover: "/-----3.png", name: "AI 背景生成", description: "创意无限" },
            ]
          }
        ]
      },
      {
        id: 10,
        cover: "/-----8.png",
        title: "专业调色大师",
        description: "电影级调色、LUT 预设工具",
        price: "¥299",
        validity: "永久有效",
        categories: [
          {
            id: "grading",
            label: "专业调色",
            tools: [
              { cover: "/-----8.png", name: "电影级调色", description: "大片质感" },
              { cover: "/-----9.png", name: "LUT 预设", description: "一键应用" },
              { cover: "/-----5.png", name: "色彩分级", description: "精细控制" },
            ]
          }
        ]
      }
    ]
  },
];

const categories = [
  { id: "all", label: "全部", active: true },
  { id: "recent", label: "最近使用", active: false },
  { id: "favorite", label: "收藏", active: false },
  { id: "purchased", label: "已购买", active: false },
];

const aiTools = [
  {
    background: "url(..//-----6.png)",
    name: "8K 高清图像增强",
    description: "使用先进的 AI 算法，将普通图像提升至 8K 超高清分辨率，保留细节的同时增强画质，适用于专业摄影后期处理。",
    isRecent: true,
    isFavorite: false,
    isPurchased: true,
    author: {
      avatar: "/ellipse-19342.svg",
      name: "刘锐 AIGC",
      nickname: "刘锐 AIGC",
      description: "修图课堂创始人",
      likes: 1234,
      socialMedia: [
        { platform: "小红书", url: "#" },
        { platform: "抖音", url: "#" },
        { platform: "bilibili", url: "#" },
      ],
      toolPackages: [
        {
          id: 1,
          cover: "/-----6.png",
          title: "专业摄影工具包",
          description: "包含画质增强、背景处理、电商设计等专业摄影工具",
          price: "¥299",
          validity: "永久有效",
          categories: [
            {
              id: "enhance",
              label: "画质增强",
              tools: [
                { cover: "/-----6.png", name: "8K 高清图像增强", description: "超清晰度提升" },
                { cover: "/-----2.png", name: "智能降噪", description: "消除图像噪点" },
                { cover: "/-----1.png", name: "清晰度增强", description: "细节优化" },
                { cover: "/-----5.png", name: "锐化处理", description: "边缘增强" },
                { cover: "/-----7.png", name: "色彩还原", description: "真实色彩" },
                { cover: "/-----8.png", name: "对比度优化", description: "层次分明" },
              ]
            },
            {
              id: "background",
              label: "背景处理",
              tools: [
                { cover: "/-----2.png", name: "智能背景替换", description: "一键更换背景" },
                { cover: "/-----5.png", name: "背景虚化", description: "专业景深效果" },
              ]
            },
            {
              id: "ecommerce",
              label: "电商工具",
              tools: [
                { cover: "/-----5.png", name: "商品图生成", description: "电商图片生成" },
                { cover: "/-----3.png", name: "白底图处理", description: "标准电商白底" },
              ]
            }
          ]
        },
        {
          id: 2,
          cover: "/-----1.png",
          title: "人像美化套装",
          description: "提供人像美颜、光影调整、风格滤镜等美化功能",
          price: "¥199",
          validity: "一年有效",
          categories: [
            {
              id: "beauty",
              label: "人像美颜",
              tools: [
                { cover: "/-----1.png", name: "AI 人像美化", description: "智能美颜" },
                { cover: "/-----6.png", name: "磨皮美白", description: "自然肤质" },
              ]
            },
            {
              id: "lighting",
              label: "光影调整",
              tools: [
                { cover: "/-----6.png", name: "人像光影调整", description: "专业光影" },
                { cover: "/-----7.png", name: "智能补光", description: "补光增强" },
              ]
            },
            {
              id: "filter",
              label: "风格滤镜",
              tools: [
                { cover: "/-----9.png", name: "AI 滤镜", description: "多种滤镜效果" },
                { cover: "/-----8.png", name: "复古胶片", description: "胶片质感" },
              ]
            }
          ]
        },
        {
          id: 3,
          cover: "/-----3.png",
          title: "创意设计工具包",
          description: "风格转换、智能抠图等创意设计工具集合",
          price: "¥399",
          validity: "永久有效",
          categories: [
            {
              id: "style",
              label: "风格转换",
              tools: [
                { cover: "/-----3.png", name: "风格迁移工具", description: "多种风格转换" },
                { cover: "/-----7.png", name: "艺术化处理", description: "艺术风格" },
              ]
            },
            {
              id: "cutout",
              label: "智能抠图",
              tools: [
                { cover: "/-----1.png", name: "AI 智能抠图", description: "精准抠图" },
                { cover: "/-----8.png", name: "色彩增强", description: "色彩优化" },
              ]
            }
          ]
        }
      ]
    },
    remainingTrials: 3
  },
  {
    background: "url(..//-----1.png)",
    name: "AI 人像美化",
    description: "智能识别面部特征，自然美化人像照片，支持磨皮、美白、瘦脸等多种美颜效果，让照片更加出彩。",
    author: {
      avatar: "/pixel-cake.png",
      nickname: "像素蛋糕",
      likes: 856,
      toolPackages: [
        {
          id: 1,
          cover: "/-----3.png",
          title: "风格转换工具包",
          description: "多种风格转换和抠图工具，满足创意需求",
          price: "¥159",
          validity: "永久有效",
          categories: [
            {
              id: "style",
              label: "风格转换",
              tools: [
                { cover: "/-----3.png", name: "风格迁移工具", description: "多种风格转换" },
                { cover: "/-----8.png", name: "色彩增强", description: "色彩优化" },
              ]
            },
            {
              id: "cutout",
              label: "智能抠图",
              tools: [
                { cover: "/-----1.png", name: "AI 智能抠图", description: "精准抠图" },
              ]
            }
          ]
        }
      ]
    },
    remainingTrials: 3
  },
  {
    background: "url(..//-----2.png)",
    name: "智能背景替换",
    description: "一键更换照片背景，AI 自动识别主体并精准抠图，提供海量背景模板，让你的照片瞬间变身。",
    isRecent: true,
    isFavorite: true,
    isPurchased: false,
    author: {
      avatar: "/ellipse-19342.svg",
      name: "刘锐 AIGC",
      nickname: "刘锐 AIGC",
      description: "修图课堂创始人",
      likes: 2341,
      socialMedia: [
        { platform: "小红书", url: "#" },
        { platform: "抖音", url: "#" },
        { platform: "bilibili", url: "#" },
      ],
      toolPackages: [
        {
          id: 1,
          cover: "/-----6.png",
          title: "专业摄影工具包",
          description: "包含画质增强、背景处理、电商设计等专业摄影工具",
          price: "¥299",
          validity: "永久有效",
          categories: [
            {
              id: "enhance",
              label: "画质增强",
              tools: [
                { cover: "/-----6.png", name: "8K 高清图像增强", description: "超清晰度提升" },
                { cover: "/-----2.png", name: "智能降噪", description: "消除图像噪点" },
                { cover: "/-----1.png", name: "清晰度增强", description: "细节优化" },
                { cover: "/-----5.png", name: "锐化处理", description: "边缘增强" },
                { cover: "/-----7.png", name: "色彩还原", description: "真实色彩" },
                { cover: "/-----8.png", name: "对比度优化", description: "层次分明" },
              ]
            },
            {
              id: "background",
              label: "背景处理",
              tools: [
                { cover: "/-----2.png", name: "智能背景替换", description: "一键更换背景" },
                { cover: "/-----5.png", name: "背景虚化", description: "专业景深效果" },
              ]
            },
            {
              id: "ecommerce",
              label: "电商工具",
              tools: [
                { cover: "/-----5.png", name: "商品图生成", description: "电商图片生成" },
                { cover: "/-----3.png", name: "白底图处理", description: "标准电商白底" },
              ]
            }
          ]
        },
        {
          id: 2,
          cover: "/-----1.png",
          title: "人像美化套装",
          description: "提供人像美颜、光影调整、风格滤镜等美化功能",
          price: "¥199",
          validity: "一年有效",
          categories: [
            {
              id: "beauty",
              label: "人像美颜",
              tools: [
                { cover: "/-----1.png", name: "AI 人像美化", description: "智能美颜" },
                { cover: "/-----6.png", name: "磨皮美白", description: "自然肤质" },
              ]
            },
            {
              id: "lighting",
              label: "光影调整",
              tools: [
                { cover: "/-----6.png", name: "人像光影调整", description: "专业光影" },
                { cover: "/-----7.png", name: "智能补光", description: "补光增强" },
              ]
            },
            {
              id: "filter",
              label: "风格滤镜",
              tools: [
                { cover: "/-----9.png", name: "AI 滤镜", description: "多种滤镜效果" },
                { cover: "/-----8.png", name: "复古胶片", description: "胶片质感" },
              ]
            }
          ]
        },
        {
          id: 3,
          cover: "/-----3.png",
          title: "创意设计工具包",
          description: "风格转换、智能抠图等创意设计工具集合",
          price: "¥399",
          validity: "永久有效",
          categories: [
            {
              id: "style",
              label: "风格转换",
              tools: [
                { cover: "/-----3.png", name: "风格迁移工具", description: "多种风格转换" },
                { cover: "/-----7.png", name: "艺术化处理", description: "艺术风格" },
              ]
            },
            {
              id: "cutout",
              label: "智能抠图",
              tools: [
                { cover: "/-----1.png", name: "AI 智能抠图", description: "精准抠图" },
                { cover: "/-----8.png", name: "色彩增强", description: "色彩优化" },
              ]
            }
          ]
        }
      ]
    },
    remainingTrials: 3
  },
  {
    background: "url(..//-----3.png)",
    name: "风格迁移工具",
    description: "将照片转换为各种艺术风格，支持油画、水彩、素描等多种风格，让你的照片充满艺术气息。",
    author: {
      avatar: "/pixel-cake.png",
      nickname: "像素蛋糕",
      likes: 567,
      toolPackages: [
        {
          id: 1,
          cover: "/-----3.png",
          title: "风格转换工具包",
          description: "多种风格转换和抠图工具，满足创意需求",
          price: "¥159",
          validity: "永久有效",
          categories: [
            {
              id: "style",
              label: "风格转换",
              tools: [
                { cover: "/-----3.png", name: "风格迁移工具", description: "多种风格转换" },
                { cover: "/-----8.png", name: "色彩增强", description: "色彩优化" },
              ]
            },
            {
              id: "cutout",
              label: "智能抠图",
              tools: [
                { cover: "/-----1.png", name: "AI 智能抠图", description: "精准抠图" },
              ]
            }
          ]
        }
      ]
    },
    remainingTrials: 3
  },
  {
    background: "url(..//-----5.png)",
    name: "商品图生成",
    description: "专为电商设计的商品图生成工具，自动优化商品展示效果，提升转化率，支持批量处理。",
    isRecent: false,
    isFavorite: true,
    isPurchased: true,
    author: {
      avatar: "/ellipse-19342.svg",
      name: "刘锐 AIGC",
      nickname: "刘锐 AIGC",
      description: "修图课堂创始人",
      likes: 1890,
      socialMedia: [
        { platform: "小红书", url: "#" },
        { platform: "抖音", url: "#" },
        { platform: "bilibili", url: "#" },
      ],
      toolPackages: [
        {
          id: 1,
          cover: "/-----6.png",
          title: "专业摄影工具包",
          description: "包含画质增强、背景处理、电商设计等专业摄影工具",
          price: "¥299",
          validity: "永久有效",
          categories: [
            {
              id: "enhance",
              label: "画质增强",
              tools: [
                { cover: "/-----6.png", name: "8K 高清图像增强", description: "超清晰度提升" },
                { cover: "/-----2.png", name: "智能降噪", description: "消除图像噪点" },
              ]
            },
            {
              id: "background",
              label: "背景处理",
              tools: [
                { cover: "/-----2.png", name: "智能背景替换", description: "一键更换背景" },
              ]
            },
            {
              id: "ecommerce",
              label: "电商工具",
              tools: [
                { cover: "/-----5.png", name: "商品图生成", description: "电商图片生成" },
              ]
            }
          ]
        }
      ]
    },
    remainingTrials: 3
  },
  {
    background: "url(..//-----5.png)",
    name: "AI 修图助手",
    description: "智能修图助手，自动检测并修复照片瑕疵，支持去污点、去水印、修复模糊等功能。",
    author: {
      avatar: "/pixel-cake.png",
      nickname: "像素蛋糕",
      likes: 923,
      toolPackages: [
        {
          id: 1,
          cover: "/-----3.png",
          title: "风格转换工具包",
          description: "多种风格转换和抠图工具，满足创意需求",
          price: "¥159",
          validity: "永久有效",
          categories: [
            {
              id: "style",
              label: "风格转换",
              tools: [
                { cover: "/-----3.png", name: "风格迁移工具", description: "多种风格转换" },
                { cover: "/-----8.png", name: "色彩增强", description: "色彩优化" },
              ]
            },
            {
              id: "cutout",
              label: "智能抠图",
              tools: [
                { cover: "/-----1.png", name: "AI 智能抠图", description: "精准抠图" },
              ]
            }
          ]
        }
      ]
    },
    remainingTrials: 3
  },
  {
    background: "url(..//-----6.png)",
    name: "人像光影调整",
    description: "专业级人像光影调整工具，智能识别光源方向，自动优化人像光影效果，让照片更有质感。",
    isRecent: false,
    isFavorite: false,
    isPurchased: true,
    author: {
      avatar: "/ellipse-19342.svg",
      name: "刘锐 AIGC",
      nickname: "刘锐 AIGC",
      description: "修图课堂创始人",
      likes: 1456,
      socialMedia: [
        { platform: "小红书", url: "#" },
        { platform: "抖音", url: "#" },
        { platform: "bilibili", url: "#" },
      ],
      toolPackages: [
        {
          id: 1,
          cover: "/-----6.png",
          title: "专业摄影工具包",
          description: "包含画质增强、背景处理、电商设计等专业摄影工具",
          price: "¥299",
          validity: "永久有效",
          categories: [
            {
              id: "enhance",
              label: "画质增强",
              tools: [
                { cover: "/-----6.png", name: "8K 高清图像增强", description: "超清晰度提升" },
                { cover: "/-----2.png", name: "智能降噪", description: "消除图像噪点" },
              ]
            },
            {
              id: "background",
              label: "背景处理",
              tools: [
                { cover: "/-----2.png", name: "智能背景替换", description: "一键更换背景" },
              ]
            },
            {
              id: "ecommerce",
              label: "电商工具",
              tools: [
                { cover: "/-----5.png", name: "商品图生成", description: "电商图片生成" },
              ]
            }
          ]
        }
      ]
    },
    remainingTrials: 3
  },
  {
    background: "url(..//-----7.png)",
    name: "智能抠图",
    description: "AI 智能抠图工具，精准识别图像主体，自动抠图，支持复杂背景和细节处理。",
    author: {
      avatar: "/pixel-cake.png",
      nickname: "像素蛋糕",
      likes: 3421,
      toolPackages: [
        {
          id: 1,
          cover: "/-----3.png",
          title: "风格转换工具包",
          description: "多种风格转换和抠图工具，满足创意需求",
          price: "¥159",
          validity: "永久有效",
          categories: [
            {
              id: "style",
              label: "风格转换",
              tools: [
                { cover: "/-----3.png", name: "风格迁移工具", description: "多种风格转换" },
                { cover: "/-----8.png", name: "色彩增强", description: "色彩优化" },
              ]
            },
            {
              id: "cutout",
              label: "智能抠图",
              tools: [
                { cover: "/-----1.png", name: "AI 智能抠图", description: "精准抠图" },
              ]
            }
          ]
        }
      ]
    },
    remainingTrials: 3
  },
  {
    background: "url(..//-----8.png)",
    name: "色彩增强",
    description: "智能色彩增强工具，自动优化照片色彩，提升饱和度和对比度，让照片更加鲜艳生动。",
    isRecent: true,
    isFavorite: false,
    isPurchased: false,
    author: {
      avatar: "/ellipse-19342.svg",
      name: "刘锐 AIGC",
      nickname: "刘锐 AIGC",
      description: "修图课堂创始人",
      likes: 678,
      socialMedia: [
        { platform: "小红书", url: "#" },
        { platform: "抖音", url: "#" },
        { platform: "bilibili", url: "#" },
      ],
      toolPackages: [
        {
          id: 1,
          cover: "/-----6.png",
          title: "专业摄影工具包",
          description: "包含画质增强、背景处理、电商设计等专业摄影工具",
          price: "¥299",
          validity: "永久有效",
          categories: [
            {
              id: "enhance",
              label: "画质增强",
              tools: [
                { cover: "/-----6.png", name: "8K 高清图像增强", description: "超清晰度提升" },
                { cover: "/-----2.png", name: "智能降噪", description: "消除图像噪点" },
              ]
            },
            {
              id: "background",
              label: "背景处理",
              tools: [
                { cover: "/-----2.png", name: "智能背景替换", description: "一键更换背景" },
              ]
            },
            {
              id: "ecommerce",
              label: "电商工具",
              tools: [
                { cover: "/-----5.png", name: "商品图生成", description: "电商图片生成" },
              ]
            }
          ]
        }
      ]
    },
    remainingTrials: 3
  },
  {
    background: "url(..//-----9.png)",
    name: "AI 滤镜",
    description: "多种 AI 滤镜效果，一键应用，支持实时预览，让你的照片拥有独特的艺术风格。",
    author: {
      avatar: "/pixel-cake.png",
      nickname: "像素蛋糕",
      likes: 2109,
      toolPackages: [
        {
          id: 1,
          cover: "/-----3.png",
          title: "风格转换工具包",
          description: "多种风格转换和抠图工具，满足创意需求",
          price: "¥159",
          validity: "永久有效",
          categories: [
            {
              id: "style",
              label: "风格转换",
              tools: [
                { cover: "/-----3.png", name: "风格迁移工具", description: "多种风格转换" },
                { cover: "/-----8.png", name: "色彩增强", description: "色彩优化" },
              ]
            },
            {
              id: "cutout",
              label: "智能抠图",
              tools: [
                { cover: "/-----1.png", name: "AI 智能抠图", description: "精准抠图" },
              ]
            }
          ]
        }
      ]
    },
    remainingTrials: 3
  },
];

const sidebarItems = [
  { icon: "/--.svg", label: "我的主页", active: false },
  { icon: "/-----10.svg", label: "本地项目", active: false },
  { icon: "/---.svg", label: "云空间", active: false },
  { icon: "/ai----.svg", label: "AI 工具箱", active: true },
  { icon: "/delete.svg", label: "回收站", active: false },
];

export const Ai = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteTools, setFavoriteTools] = useState<Set<number>>(new Set());
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'wechat' | 'alipay' | 'card'>('wechat');
  const [packageDialogOpen, setPackageDialogOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [settlementDialogOpen, setSettlementDialogOpen] = useState(false);
  const [toolDetailDialogOpen, setToolDetailDialogOpen] = useState(false);
  const [selectedToolDetail, setSelectedToolDetail] = useState<any>(null);
  const [trialDialogOpen, setTrialDialogOpen] = useState(false);
  const [selectedTrialTool, setSelectedTrialTool] = useState<any>(null);
  const [showCreativeEditor, setShowCreativeEditor] = useState(false);
  const [toolDetailTab, setToolDetailTab] = useState<'intro' | 'versions'>('intro');
  const [toolVersionHistory, setToolVersionHistory] = useState<any[]>([]);
  const [toolCurrentVersion, setToolCurrentVersion] = useState<string>('');
  const [toolLastUpdated, setToolLastUpdated] = useState<string>('');
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showContactPopover, setShowContactPopover] = useState(false);
  const [contactPopoverPosition, setContactPopoverPosition] = useState({ top: 0, left: 0 });
  const [hoveredContactButton, setHoveredContactButton] = useState<string | null>(null);

  const filteredTools = aiTools.filter((tool) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'recent') return tool.isRecent;
    if (activeCategory === 'favorite') return tool.isFavorite;
    if (activeCategory === 'purchased') return tool.isPurchased;
    return true;
  });

  const toolsPerPage = 12;
  const totalFilteredPages = Math.ceil(filteredTools.length / toolsPerPage);
  const displayedTools = filteredTools.slice(
    (currentPage - 1) * toolsPerPage,
    currentPage * toolsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    const fetchToolVersionInfo = async () => {
      if (selectedToolDetail && toolDetailDialogOpen) {
        try {
          const { data: toolData } = await supabase
            .from('individual_tools')
            .select('id, current_version, last_updated')
            .eq('name', selectedToolDetail.name)
            .maybeSingle();

          if (toolData) {
            setToolCurrentVersion(toolData.current_version);
            setToolLastUpdated(toolData.last_updated);

            const { data: versions, error } = await supabase
              .from('individual_tool_versions')
              .select('*')
              .eq('tool_id', toolData.id)
              .order('release_date', { ascending: false });

            if (!error && versions) {
              setToolVersionHistory(versions);
              setSelectedVersionIndex(0);
            }
          }
        } catch (error) {
          console.error('Error fetching tool version info:', error);
        }
      }
    };

    fetchToolVersionInfo();
  }, [selectedToolDetail, toolDetailDialogOpen]);

  return (
    <div className="bg-[#101113] overflow-hidden w-full min-w-[1440px] min-h-[900px] flex flex-col">
      <header className="flex w-full items-center bg-[#101113] border-b border-[#ffffff1f]">
          <div className="flex h-10 items-center flex-1">
            <div className="inline-flex items-center justify-center gap-2 px-[13px] py-0">
              <div className="w-3 h-3 bg-[#ff5f57] rounded-full border-[0.5px] border-[#00000033]" />
              <div className="w-3 h-3 bg-[#febc2e] rounded-full border-[0.5px] border-[#00000033]" />
              <div className="w-3 h-3 bg-[#28c840] rounded-full border-[0.5px] border-[#00000033]" />
            </div>
          </div>

          <div className="flex w-[280px] items-center justify-center">
            <div className="relative w-full">
              <img
                className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4"
                alt="Search"
                src="/search-sm.svg"
              />
              <Input
                placeholder="搜索所有项目"
                className="h-6 w-full bg-[#ffffff14] border-[#464951] rounded-sm pl-8 pr-2 text-xs [font-family:'PingFang_SC-Regular',Helvetica] placeholder:text-[#ffffff4c]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end flex-1 h-10">
            <Button variant="ghost" className="h-auto px-2 py-0">
              <div className="flex h-6 items-center justify-center gap-1 pl-1.5 pr-2 py-1 bg-[#d7c09f33] rounded-sm">
                <img className="w-4 h-4" alt="Vip" src="/vip.svg" />
                <span className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-x-gold text-xs leading-4 whitespace-nowrap">
                  购买套餐
                </span>
              </div>
            </Button>

            <div className="flex w-5 h-10 items-center justify-center p-2">
              <Separator orientation="vertical" className="h-4 bg-[#464951]" />
            </div>

            <Button variant="ghost" className="h-10 w-10 p-0">
              <img
                className="w-10 h-10"
                alt="Frame"
                src="/frame-1321317139.svg"
              />
            </Button>

            <Button variant="ghost" className="h-10 w-10 p-0">
              <img
                className="w-10 h-10"
                alt="Frame"
                src="/frame-1321320520.svg"
              />
            </Button>

            <Button variant="ghost" className="h-10 w-10 p-0">
              <img
                className="w-10 h-10"
                alt="Button tool"
                src="/button-tool-2.svg"
              />
            </Button>

            <div className="flex w-5 h-10 items-center justify-center p-2">
              <Separator orientation="vertical" className="h-4 bg-[#464951]" />
            </div>

            <Button variant="ghost" className="h-10 w-10 p-0">
              <img
                className="w-10 h-10"
                alt="Button tool"
                src="/button-tool-1.svg"
              />
            </Button>

            <Button variant="ghost" className="h-auto w-[39px] p-0">
              <img
                className="w-[39px] h-10"
                alt="Button tool"
                src="/button-tool.svg"
              />
            </Button>
          </div>
        </header>

      <div className="flex flex-1 min-h-0">
        <aside className="flex flex-col w-[220px] h-full items-center gap-2 pt-3 pb-0 px-2 bg-[#101113] border-r border-[#ffffff1f]">
          <nav className="flex flex-col w-full gap-2 mt-10">
            {sidebarItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-8 w-full justify-start gap-2 px-3 py-[7px] rounded-sm hover:bg-[#ffffff1a] ${
                  item.active ? "bg-[#464951]" : ""
                }`}
              >
                <img className="w-4 h-4" alt={item.label} src={item.icon} />
                <span
                  className={`[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-xs ${
                    item.active ? "text-white" : "text-[#ffffffb2]"
                  }`}
                >
                  {item.label}
                </span>
              </Button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex w-full px-10 py-3.5 bg-[#101113] border-b border-[#ffffff1f]">
            <h1 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-normal text-white text-sm">
              AI 工具箱
            </h1>
          </div>

          <main className="flex-1 overflow-auto px-10 py-6">
          <section className="flex flex-col w-full max-w-[1140px] gap-6 mb-6">
            <div className="inline-flex items-center gap-1">
              <h2 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-[13px] leading-[18px]">
                热门作者
              </h2>
              <ChevronDownIcon className="w-4 h-4 text-white" />
            </div>

            <div className="flex items-center gap-2 w-full">
              {authors.map((author, index) => (
                <Card
                  key={index}
                  className="bg-[#1a1b1c] border-0 cursor-pointer hover:bg-[#ffffff0d] transition-colors w-[310px] h-[102px]"
                  onClick={() => {
                    setSelectedAuthor(author);
                    setSelectedPackage(author.toolPackages[0]);
                    setPackageDialogOpen(true);
                  }}
                >
                  <CardContent className="flex items-start gap-4 p-4">
                    {author.avatar ? (
                      <img
                        className="w-[70px] h-[70px] rounded-[35px] object-cover"
                        alt={author.name}
                        src={author.avatar}
                      />
                    ) : (
                      <div className="w-[70px] h-[70px] bg-white rounded-[35px]" />
                    )}
                    <div className="flex flex-col w-48 gap-1.5">
                      <div className="flex flex-col gap-1">
                        <h3 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-sm">
                          {author.name}
                        </h3>
                        <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffffb2] text-xs">
                          {author.description}
                        </p>
                      </div>
                      <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffffb2] text-xs">
                        {author.toolCount}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card
                className="bg-[#1a1b1c] border-0 w-[310px] h-[102px] cursor-pointer hover:bg-[#ffffff0d] transition-colors"
                onClick={() => setSettlementDialogOpen(true)}
              >
                <CardContent className="flex flex-col items-center justify-center gap-1 p-4 h-full">
                  <h3 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-sm text-center">
                    申请入驻
                  </h3>
                  <p className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffffb2] text-xs text-center">
                    额外曝光｜商业分成｜官方认证
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="flex flex-col w-full max-w-[1140px] gap-6">
            <div className="inline-flex items-center gap-1">
              <h2 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-[13px] leading-[18px]">
                AI 功能
              </h2>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="inline-flex items-center gap-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    onClick={() => setActiveCategory(category.id)}
                    className={`h-6 w-[76px] px-2 py-0 rounded-sm ${
                      activeCategory === category.id ? "bg-[#464951]" : ""
                    }`}
                  >
                    <span
                      className={`[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-xs ${
                        activeCategory === category.id ? "text-white" : "text-x-07"
                      }`}
                    >
                      {category.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-[15px] w-full">
              {displayedTools.map((tool, index) => (
                <div key={index} className="w-[216px] flex flex-col gap-3 cursor-pointer group">
                  <Dialog>
                  <div
                    className="w-[216px] h-72 rounded-sm border-[0.84px] border-[#ffffff1f] relative overflow-hidden"
                    style={{
                      background: `${tool.background} 50% 50% / cover`,
                    }}
                  >
                    <DialogTrigger asChild>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-stretch justify-end p-4 gap-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFavoriteTools(prev => {
                              const newSet = new Set(prev);
                              if (newSet.has(index)) {
                                newSet.delete(index);
                              } else {
                                newSet.add(index);
                              }
                              return newSet;
                            });
                          }}
                          className="flex-1 h-9 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white hover:text-white border border-white/20 text-[12px]"
                        >
                          <Star className={`h-4 w-4 mr-0.5 ${favoriteTools.has(index) ? 'fill-[#ffd700] text-[#ffd700]' : ''}`} />
                          {favoriteTools.has(index) ? '已收藏' : '收藏'}
                        </Button>

                            <Button className="flex-1 h-9 bg-white hover:bg-gray-100 text-black font-medium text-[12px]">
                              介绍
                            </Button>
                          <DialogContent className="max-w-5xl bg-[#1a1b1e] border-[#ffffff1f] p-0 gap-0">
                            <div className="flex h-[600px]">
                              <div className="flex-1 overflow-y-auto p-8">
                                <div className="space-y-6">
                                  <div
                                    className="w-full h-64 rounded-lg bg-cover bg-center"
                                    style={{
                                      backgroundImage: tool.background,
                                    }}
                                  />
                                  <div>
                                    <div className="flex items-center justify-between mb-4">
                                      <h2 className="text-2xl font-bold text-white">工具介绍</h2>
                                      {toolCurrentVersion && (
                                        <div className="flex items-center gap-3 text-xs">
                                          <span className="text-[#ffffffb2]">
                                            当前版本: <span className="text-[#ffd700] font-medium">v{toolCurrentVersion}</span>
                                          </span>
                                          {toolLastUpdated && (
                                            <span className="text-[#ffffff66]">
                                              更新于 {new Date(toolLastUpdated).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-[#ffffffb2] text-sm leading-relaxed mb-4">
                                      {tool.description}
                                    </p>
                                    <p className="text-[#ffffffb2] text-sm leading-relaxed">
                                      本工具采用最先进的人工智能技术，专为影楼摄影师和图像处理专业人士设计。通过深度学习算法，能够智能识别图像特征，自动进行优化处理，大幅提升工作效率。无论是批量处理还是精细调整，都能轻松应对，让您的创作更加高效便捷。
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">核心功能</h3>
                                    <ul className="space-y-2 text-[#ffffffb2] text-sm">
                                      <li>• <span className="text-white font-medium">智能识别</span>：自动检测图像主体，精准识别人像、物体和场景</li>
                                      <li>• <span className="text-white font-medium">一键优化</span>：智能调整曝光、色彩、对比度等参数，呈现最佳效果</li>
                                      <li>• <span className="text-white font-medium">批量处理</span>：支持同时处理多张图片，统一风格，节省时间</li>
                                      <li>• <span className="text-white font-medium">高清输出</span>：支持最高 8K 分辨率输出，保证画质清晰细腻</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">使用场景</h3>
                                    <ul className="space-y-2 text-[#ffffffb2] text-sm">
                                      <li>• <span className="text-white font-medium">影楼人像摄影</span>：婚纱照、写真集、证件照等专业人像处理</li>
                                      <li>• <span className="text-white font-medium">电商产品图</span>：商品主图优化，提升商品展示效果和转化率</li>
                                      <li>• <span className="text-white font-medium">社交媒体</span>：快速生成高质量内容，吸引更多关注和互动</li>
                                      <li>• <span className="text-white font-medium">个人创作</span>：日常照片美化，朋友圈、微博等社交分享</li>
                                      <li>• <span className="text-white font-medium">广告设计</span>：海报、宣传册等商业设计素材制作</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">技术优势</h3>
                                    <div className="space-y-3 text-[#ffffffb2] text-sm">
                                      <p>
                                        基于深度学习神经网络，本工具经过数百万张专业摄影作品的训练，能够准确理解摄影美学和艺术风格。相比传统的图像处理软件，AI 技术能够更智能地分析图像内容，做出最优的处理决策。
                                      </p>
                                      <p>
                                        采用云端处理架构，无需高配置电脑即可享受专业级的处理效果。所有计算都在强大的云服务器上完成，处理速度快，效果稳定可靠。同时支持离线使用，保护您的图像隐私安全。
                                      </p>
                                    </div>
                                  </div>

                                  {toolVersionHistory.length > 0 && (
                                    <div>
                                      <h3 className="text-lg font-semibold text-white mb-4">版本更新</h3>

                                      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                        {toolVersionHistory.map((version: any, idx: number) => (
                                          <button
                                            key={version.id}
                                            onClick={() => setSelectedVersionIndex(idx)}
                                            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                              selectedVersionIndex === idx
                                                ? 'bg-[#ffd700] text-black'
                                                : 'bg-[#ffffff1f] text-[#ffffffb2] hover:bg-[#ffffff2f]'
                                            }`}
                                          >
                                            v{version.version_number}
                                            {version.is_current && <span className="ml-1.5 text-xs">●</span>}
                                          </button>
                                        ))}
                                      </div>

                                      {toolVersionHistory[selectedVersionIndex] && (
                                        <div className="border border-[#ffffff1f] rounded-lg p-5">
                                          <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                              <span className="text-white text-lg font-semibold">
                                                v{toolVersionHistory[selectedVersionIndex].version_number}
                                              </span>
                                              {toolVersionHistory[selectedVersionIndex].is_current && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffd700] text-black">
                                                  当前版本
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-[#ffffffb2] text-xs">
                                              {new Date(toolVersionHistory[selectedVersionIndex].release_date).toLocaleDateString('zh-CN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                              })}
                                            </p>
                                          </div>

                                          {toolVersionHistory[selectedVersionIndex].changelog && (
                                            <p className="text-white text-sm mb-4 leading-relaxed">
                                              {toolVersionHistory[selectedVersionIndex].changelog}
                                            </p>
                                          )}

                                          {toolVersionHistory[selectedVersionIndex].new_features && toolVersionHistory[selectedVersionIndex].new_features.length > 0 && (
                                            <div className="mb-4">
                                              <h5 className="text-[#4ade80] text-sm font-semibold mb-2 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full"></span>
                                                新增功能
                                              </h5>
                                              <ul className="space-y-2 ml-4">
                                                {toolVersionHistory[selectedVersionIndex].new_features.map((feature: string, idx: number) => (
                                                  <li key={idx} className="text-[#ffffffb2] text-sm leading-relaxed flex items-start gap-2">
                                                    <span className="text-[#4ade80] mt-1">•</span>
                                                    <span className="flex-1">{feature}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}

                                          {toolVersionHistory[selectedVersionIndex].improvements && toolVersionHistory[selectedVersionIndex].improvements.length > 0 && (
                                            <div className="mb-4">
                                              <h5 className="text-[#60a5fa] text-sm font-semibold mb-2 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 bg-[#60a5fa] rounded-full"></span>
                                                优化改进
                                              </h5>
                                              <ul className="space-y-2 ml-4">
                                                {toolVersionHistory[selectedVersionIndex].improvements.map((improvement: string, idx: number) => (
                                                  <li key={idx} className="text-[#ffffffb2] text-sm leading-relaxed flex items-start gap-2">
                                                    <span className="text-[#60a5fa] mt-1">•</span>
                                                    <span className="flex-1">{improvement}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}

                                          {toolVersionHistory[selectedVersionIndex].bug_fixes && toolVersionHistory[selectedVersionIndex].bug_fixes.length > 0 && (
                                            <div>
                                              <h5 className="text-[#f87171] text-sm font-semibold mb-2 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 bg-[#f87171] rounded-full"></span>
                                                问题修复
                                              </h5>
                                              <ul className="space-y-2 ml-4">
                                                {toolVersionHistory[selectedVersionIndex].bug_fixes.map((fix: string, idx: number) => (
                                                  <li key={idx} className="text-[#ffffffb2] text-sm leading-relaxed flex items-start gap-2">
                                                    <span className="text-[#f87171] mt-1">•</span>
                                                    <span className="flex-1">{fix}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">用户评价</h3>
                                    <div className="space-y-4">
                                      <div className="bg-[#ffffff08] rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                          <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                              <span key={i} className="text-[#ffd700]">★</span>
                                            ))}
                                          </div>
                                          <span className="text-white text-xs font-medium">张女士 - 婚纱摄影师</span>
                                        </div>
                                        <p className="text-[#ffffffb2] text-sm leading-relaxed">
                                          "非常实用的工具！以前处理一组婚纱照需要一整天，现在只需要2-3小时就能完成，而且效果比手动调整还要好。客户满意度大幅提升！"
                                        </p>
                                      </div>
                                      <div className="bg-[#ffffff08] rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                          <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                              <span key={i} className="text-[#ffd700]">★</span>
                                            ))}
                                          </div>
                                          <span className="text-white text-xs font-medium">李先生 - 电商运营</span>
                                        </div>
                                        <p className="text-[#ffffffb2] text-sm leading-relaxed">
                                          "商品图片质量提升明显，转化率提高了30%。批量处理功能特别好用，节省了大量时间和人力成本。强烈推荐！"
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="w-80 bg-[#141517] p-6 border-l border-[#ffffff1f] flex flex-col gap-6">
                                <div className="flex items-start gap-3 relative">
                                  <img
                                    className="w-12 h-12 rounded-full"
                                    alt={tool.author.nickname}
                                    src={tool.author.avatar}
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-white font-medium text-sm">{tool.author.nickname}</h3>
                                      <button
                                        onMouseEnter={(e) => {
                                          const rect = e.currentTarget.getBoundingClientRect();
                                          setContactPopoverPosition({
                                            top: rect.bottom + 8,
                                            left: rect.left - 80
                                          });
                                          setHoveredContactButton('tool');
                                        }}
                                        onMouseLeave={() => {
                                          setHoveredContactButton(null);
                                        }}
                                        className="w-6 h-6 rounded-full bg-[#ffffff14] hover:bg-[#ffffff24] flex items-center justify-center transition-colors group"
                                      >
                                        <MessageCircle className="w-3.5 h-3.5 text-[#ffffffb2] group-hover:text-white transition-colors" />
                                      </button>
                                    </div>
                                    <p className="text-[#ffffffb2] text-xs mt-1">AI 工具开发者</p>
                                  </div>

                                  {hoveredContactButton === 'tool' && (
                                    <div
                                      onMouseEnter={() => setHoveredContactButton('tool')}
                                      onMouseLeave={() => setHoveredContactButton(null)}
                                      className="fixed z-[70] w-[220px] bg-[#1a1b1e] border border-[#ffffff1f] rounded-lg shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200"
                                      style={{
                                        top: `${contactPopoverPosition.top}px`,
                                        left: `${contactPopoverPosition.left}px`
                                      }}
                                    >
                                      <div className="flex flex-col items-center gap-3">
                                        <p className="text-white text-sm font-medium">扫码添加好友</p>
                                        <div className="w-[160px] h-[160px] bg-white rounded-lg flex items-center justify-center">
                                          <div className="text-center">
                                            <div className="w-[140px] h-[140px] bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                                              <svg className="w-32 h-32" viewBox="0 0 100 100">
                                                <rect x="0" y="0" width="100" height="100" fill="white"/>
                                                <rect x="10" y="10" width="15" height="15" fill="black"/>
                                                <rect x="30" y="10" width="5" height="5" fill="black"/>
                                                <rect x="40" y="10" width="10" height="5" fill="black"/>
                                                <rect x="55" y="10" width="5" height="5" fill="black"/>
                                                <rect x="75" y="10" width="15" height="15" fill="black"/>
                                                <rect x="10" y="15" width="5" height="5" fill="black"/>
                                                <rect x="20" y="15" width="5" height="5" fill="black"/>
                                                <rect x="35" y="15" width="5" height="5" fill="black"/>
                                                <rect x="50" y="15" width="10" height="5" fill="black"/>
                                                <rect x="75" y="15" width="5" height="5" fill="black"/>
                                                <rect x="85" y="15" width="5" height="5" fill="black"/>
                                                <rect x="10" y="20" width="5" height="5" fill="black"/>
                                                <rect x="15" y="20" width="5" height="5" fill="black"/>
                                                <rect x="20" y="20" width="5" height="5" fill="black"/>
                                                <rect x="30" y="20" width="5" height="5" fill="black"/>
                                                <rect x="75" y="20" width="5" height="5" fill="black"/>
                                                <rect x="80" y="20" width="5" height="5" fill="black"/>
                                                <rect x="85" y="20" width="5" height="5" fill="black"/>
                                                <rect x="10" y="25" width="15" height="15" fill="black"/>
                                                <rect x="40" y="25" width="5" height="5" fill="black"/>
                                                <rect x="50" y="25" width="5" height="5" fill="black"/>
                                                <rect x="75" y="25" width="15" height="15" fill="black"/>
                                                <rect x="30" y="30" width="10" height="5" fill="black"/>
                                                <rect x="45" y="30" width="15" height="5" fill="black"/>
                                                <rect x="10" y="40" width="5" height="5" fill="black"/>
                                                <rect x="20" y="40" width="10" height="5" fill="black"/>
                                                <rect x="35" y="40" width="5" height="5" fill="black"/>
                                                <rect x="45" y="40" width="10" height="5" fill="black"/>
                                                <rect x="60" y="40" width="5" height="5" fill="black"/>
                                                <rect x="70" y="40" width="10" height="5" fill="black"/>
                                                <rect x="85" y="40" width="5" height="5" fill="black"/>
                                                <rect x="15" y="45" width="5" height="5" fill="black"/>
                                                <rect x="30" y="45" width="15" height="5" fill="black"/>
                                                <rect x="50" y="45" width="5" height="5" fill="black"/>
                                                <rect x="60" y="45" width="10" height="5" fill="black"/>
                                                <rect x="75" y="45" width="10" height="5" fill="black"/>
                                                <rect x="10" y="50" width="10" height="5" fill="black"/>
                                                <rect x="25" y="50" width="5" height="5" fill="black"/>
                                                <rect x="35" y="50" width="10" height="5" fill="black"/>
                                                <rect x="50" y="50" width="15" height="5" fill="black"/>
                                                <rect x="70" y="50" width="5" height="5" fill="black"/>
                                                <rect x="80" y="50" width="10" height="5" fill="black"/>
                                                <rect x="10" y="55" width="5" height="5" fill="black"/>
                                                <rect x="25" y="55" width="10" height="5" fill="black"/>
                                                <rect x="40" y="55" width="5" height="5" fill="black"/>
                                                <rect x="50" y="55" width="10" height="5" fill="black"/>
                                                <rect x="65" y="55" width="15" height="5" fill="black"/>
                                                <rect x="85" y="55" width="5" height="5" fill="black"/>
                                                <rect x="20" y="60" width="5" height="5" fill="black"/>
                                                <rect x="30" y="60" width="10" height="5" fill="black"/>
                                                <rect x="45" y="60" width="10" height="5" fill="black"/>
                                                <rect x="60" y="60" width="5" height="5" fill="black"/>
                                                <rect x="70" y="60" width="15" height="5" fill="black"/>
                                                <rect x="10" y="75" width="15" height="15" fill="black"/>
                                                <rect x="30" y="75" width="5" height="5" fill="black"/>
                                                <rect x="40" y="75" width="10" height="5" fill="black"/>
                                                <rect x="55" y="75" width="10" height="5" fill="black"/>
                                                <rect x="70" y="75" width="5" height="5" fill="black"/>
                                                <rect x="80" y="75" width="5" height="5" fill="black"/>
                                                <rect x="10" y="80" width="5" height="5" fill="black"/>
                                                <rect x="20" y="80" width="5" height="5" fill="black"/>
                                                <rect x="35" y="80" width="15" height="5" fill="black"/>
                                                <rect x="55" y="80" width="5" height="5" fill="black"/>
                                                <rect x="65" y="80" width="10" height="5" fill="black"/>
                                                <rect x="80" y="80" width="10" height="5" fill="black"/>
                                                <rect x="10" y="85" width="5" height="5" fill="black"/>
                                                <rect x="15" y="85" width="5" height="5" fill="black"/>
                                                <rect x="20" y="85" width="5" height="5" fill="black"/>
                                                <rect x="30" y="85" width="10" height="5" fill="black"/>
                                                <rect x="45" y="85" width="5" height="5" fill="black"/>
                                                <rect x="55" y="85" width="15" height="5" fill="black"/>
                                                <rect x="75" y="85" width="5" height="5" fill="black"/>
                                                <rect x="85" y="85" width="5" height="5" fill="black"/>
                                              </svg>
                                            </div>
                                          </div>
                                        </div>
                                        <p className="text-[#ffffffb2] text-xs">微信：liurui_aigc</p>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <Separator className="bg-[#ffffff1f]" />

                                <div className="flex-1 overflow-y-auto space-y-4">
                                  <h3 className="text-white font-semibold text-sm">相关工具合集</h3>

                                  <div
                                    onClick={() => {
                                      setSelectedAuthor(tool.author);
                                      setSelectedPackage(tool.author.toolPackages?.[0]);
                                      setPackageDialogOpen(true);
                                    }}
                                    className="bg-[#1a1b1e] rounded-lg p-3 cursor-pointer hover:bg-[#20212480] transition-colors"
                                  >
                                    <div className="flex gap-3">
                                      <div className="w-20 h-20 rounded bg-[#2a2b2e] flex-shrink-0 overflow-hidden">
                                        <div
                                          className="w-full h-full"
                                          style={{ background: tool.background }}
                                        />
                                      </div>
                                      <div className="flex-1 flex flex-col justify-between min-w-0">
                                        <div>
                                          <h4 className="text-white font-medium text-sm mb-1 line-clamp-1">
                                            影楼人像AIGC合集
                                          </h4>
                                          <p className="text-[#ffffffb2] text-xs line-clamp-2">
                                            80款实用工具，永久买断
                                          </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-[#ffd700] text-sm font-semibold">¥799</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <Separator className="bg-[#ffffff1f]" />

                                <div className="space-y-3">
                                  <Button
                                    onClick={() => {
                                      setSelectedTool(tool);
                                      setPaymentDialogOpen(true);
                                    }}
                                    className="w-full h-10 bg-[#ffd700] hover:bg-[#ffed4e] text-black font-medium text-sm"
                                  >
                                    购买 ¥99
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedTrialTool(tool);
                                      setTrialDialogOpen(true);
                                    }}
                                    className="w-full h-10 bg-transparent border-white/20 text-white hover:bg-white/10 font-medium text-sm"
                                  >
                                    免费试用（剩余 {tool.remainingTrials} 次）
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    onClick={() => {
                                      setFavoriteTools(prev => {
                                        const newSet = new Set(prev);
                                        if (newSet.has(index)) {
                                          newSet.delete(index);
                                        } else {
                                          newSet.add(index);
                                        }
                                        return newSet;
                                      });
                                    }}
                                    className="w-full h-10 bg-white/5 hover:bg-white/10 text-white font-medium text-sm"
                                  >
                                    <Star className={`h-4 w-4 mr-2 ${favoriteTools.has(index) ? 'fill-[#ffd700] text-[#ffd700]' : ''}`} />
                                    {favoriteTools.has(index) ? '已收藏' : '收藏'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTrialTool(tool);
                          setTrialDialogOpen(true);
                        }}
                        className="w-full h-9 bg-[#ffd700] hover:bg-[#ffed4e] text-black font-medium text-[12px]"
                      >
                        使用
                      </Button>
                    </div>
                    </DialogTrigger>
                  </div>
                  </Dialog>
                  <div className="flex flex-col gap-2">
                    <h3 className="[font-family:'PingFang_SC-Medium',Helvetica] font-medium text-white text-sm">
                      {tool.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-6 h-6 rounded-full"
                          alt={tool.author.nickname}
                          src={tool.author.avatar}
                        />
                        <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffffb2] text-xs">
                          {tool.author.nickname}
                        </span>
                      </div>
                      <span className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-[#ffffffb2] text-xs">
                        {tool.author.likes.toLocaleString()} 赞
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 disabled:opacity-50 hover:bg-[#ffffff1a]"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeftIcon className="w-4 h-4 text-white" />
              </Button>

              {[...Array(totalFilteredPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <Button
                    key={pageNum}
                    variant="ghost"
                    className={`h-8 w-8 p-0 rounded-sm hover:bg-[#ffffff1a] ${
                      currentPage === pageNum ? "bg-[#464951]" : ""
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    <span
                      className={`[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-xs ${
                        currentPage === pageNum ? "text-white" : "text-[#ffffffb2]"
                      }`}
                    >
                      {pageNum}
                    </span>
                  </Button>
                );
              })}

              <Button
                variant="ghost"
                className="h-8 w-8 p-0 disabled:opacity-50 hover:bg-[#ffffff1a]"
                disabled={currentPage === totalFilteredPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRightIcon className="w-4 h-4 text-white" />
              </Button>
            </div>
          </section>
        </main>
        </div>
      </div>

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="max-w-4xl bg-[#1a1b1e] border-[#ffffff1f] p-0 gap-0">
          <div className="flex h-[560px]">
            <div className="flex-1 p-6 overflow-y-auto">
              <h2 className="text-xl font-bold text-white mb-4">购买产品</h2>

              {selectedPackage && (
                <div className="space-y-4">
                  <div className="flex gap-3 p-3 rounded-lg bg-[#ffffff08]">
                    <div
                      className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{
                        backgroundImage: `url(${selectedPackage.cover})`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-white mb-1 truncate">{selectedPackage.title}</h3>
                      <p className="text-[#ffffffb2] text-xs mb-2 line-clamp-2">{selectedPackage.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[#ffd700] text-xl font-bold">{selectedPackage.price}</span>
                        <span className="text-[#ffffffb2] text-xs">{selectedPackage.validity}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-2 text-sm">工具包包含</h3>
                    <div className="space-y-3">
                      {selectedPackage.categories.map((cat: any, idx: number) => (
                        <div key={idx}>
                          <div className="text-[#ffffffb2] text-xs font-medium mb-1.5">{cat.label}：</div>
                          <ul className="space-y-1 text-[#ffffff99] text-xs pl-3">
                            {cat.tools.map((tool: any, tidx: number) => (
                              <li key={tidx}>• {tool.name} - {tool.description}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-2 text-sm">服务保障</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-lg bg-[#ffffff05] border border-[#ffffff1f]">
                        <div className="text-[#ffd700] text-xs font-medium mb-0.5">✓ 正版保障</div>
                        <div className="text-[#ffffffb2] text-[10px]">官方授权正版工具</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#ffffff05] border border-[#ffffff1f]">
                        <div className="text-[#ffd700] text-xs font-medium mb-0.5">✓ 终身更新</div>
                        <div className="text-[#ffffffb2] text-[10px]">永久免费更新升级</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#ffffff05] border border-[#ffffff1f]">
                        <div className="text-[#ffd700] text-xs font-medium mb-0.5">✓ 售后支持</div>
                        <div className="text-[#ffffffb2] text-[10px]">专属技术支持服务</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#ffffff05] border border-[#ffffff1f]">
                        <div className="text-[#ffd700] text-xs font-medium mb-0.5">✓ 7天退款</div>
                        <div className="text-[#ffffffb2] text-[10px]">不满意无理由退款</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#ffd700]/10 border border-[#ffd700]/20">
                    <p className="text-[#ffd700] text-xs">
                      💡 提示：购买后立即获得使用权限，支持多平台使用
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="w-80 bg-[#141517] p-6 border-l border-[#ffffff1f] flex flex-col">
              <h3 className="text-white font-semibold mb-3 text-sm">选择支付方式</h3>

              <div className="space-y-2 mb-4">
                <button
                  onClick={() => setSelectedPaymentMethod('wechat')}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedPaymentMethod === 'wechat'
                      ? 'border-[#07c160] bg-[#07c160]/10'
                      : 'border-[#ffffff1f] bg-[#ffffff05] hover:bg-[#ffffff08]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#07c160] flex items-center justify-center text-white font-bold text-xs">
                      微
                    </div>
                    <div>
                      <div className="text-white font-medium text-xs">微信支付</div>
                      <div className="text-[#ffffffb2] text-[10px]">推荐使用</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPaymentMethod('alipay')}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedPaymentMethod === 'alipay'
                      ? 'border-[#1677ff] bg-[#1677ff]/10'
                      : 'border-[#ffffff1f] bg-[#ffffff05] hover:bg-[#ffffff08]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1677ff] flex items-center justify-center text-white font-bold text-xs">
                      支
                    </div>
                    <div>
                      <div className="text-white font-medium text-xs">支付宝</div>
                      <div className="text-[#ffffffb2] text-[10px]">安全便捷</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPaymentMethod('card')}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedPaymentMethod === 'card'
                      ? 'border-[#ffd700] bg-[#ffd700]/10'
                      : 'border-[#ffffff1f] bg-[#ffffff05] hover:bg-[#ffffff08]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#ffd700] flex items-center justify-center text-black font-bold text-xs">
                      卡
                    </div>
                    <div>
                      <div className="text-white font-medium text-xs">一卡通</div>
                      <div className="text-[#ffffffb2] text-[10px]">充值卡支付</div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="bg-white p-3 rounded-lg mb-3 flex-1 flex items-center justify-center">
                {selectedPaymentMethod === 'wechat' ? (
                  <img
                    src="/image copy.png"
                    alt="微信支付二维码"
                    className="w-full aspect-square max-w-[200px] rounded"
                  />
                ) : (
                  <div className="w-full aspect-square max-w-[200px] bg-gray-200 rounded flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-3xl mb-1">⊞</div>
                      <div className="text-[10px]">
                        {selectedPaymentMethod === 'alipay' && '支付宝扫码支付'}
                        {selectedPaymentMethod === 'card' && '请输入卡号密码'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="text-[#ffffffb2] text-[10px] mb-1">
                  {selectedPaymentMethod === 'card' ? '请在下方输入充值卡信息' : '请使用手机扫描二维码完成支付'}
                </p>
                <p className="text-[#ffd700] text-base font-bold mb-2">¥99.00</p>
                <div className="flex items-center justify-center gap-2 text-xs">
                  <button className="text-[#ffffffb2] hover:text-white transition-colors">
                    兑换码
                  </button>
                  <span className="text-[#ffffff33]">|</span>
                  <button className="text-[#ffffffb2] hover:text-white transition-colors">
                    复制链接
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={packageDialogOpen} onOpenChange={setPackageDialogOpen}>
        <DialogContent className="max-w-[1200px] w-[90vw] bg-[#1a1b1e] border-[#ffffff1f] p-0 gap-0 max-h-[85vh] h-[85vh] flex flex-col overflow-hidden">
          {selectedAuthor && selectedPackage && (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="p-6 border-b border-[#ffffff1f] flex items-center gap-4 flex-shrink-0 relative">
                {selectedAuthor.avatar ? (
                  <img
                    className="w-16 h-16 rounded-full"
                    alt={selectedAuthor.name}
                    src={selectedAuthor.avatar}
                  />
                ) : (
                  <div className="w-16 h-16 bg-white rounded-full" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white text-lg font-semibold">{selectedAuthor.name}</h3>
                    <button
                      id="contact-button-package"
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setContactPopoverPosition({
                          top: rect.bottom + 8,
                          left: rect.left - 80
                        });
                        setHoveredContactButton('package');
                      }}
                      onMouseLeave={() => {
                        setHoveredContactButton(null);
                      }}
                      className="w-7 h-7 rounded-full bg-[#ffffff14] hover:bg-[#ffffff24] flex items-center justify-center transition-colors group"
                    >
                      <MessageCircle className="w-4 h-4 text-[#ffffffb2] group-hover:text-white transition-colors" />
                    </button>
                  </div>
                  <p className="text-[#ffffffb2] text-sm mb-2">{selectedAuthor.description}</p>
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      className="text-[#ffd700] hover:text-[#ffed4e] transition-colors text-sm"
                    >
                      小红书
                    </a>
                    <a
                      href="#"
                      className="text-[#ffd700] hover:text-[#ffed4e] transition-colors text-sm"
                    >
                      抖音
                    </a>
                    <a
                      href="#"
                      className="text-[#ffd700] hover:text-[#ffed4e] transition-colors text-sm"
                    >
                      哔哩哔哩
                    </a>
                  </div>
                </div>

                {hoveredContactButton === 'package' && (
                  <div
                    onMouseEnter={() => setHoveredContactButton('package')}
                    onMouseLeave={() => setHoveredContactButton(null)}
                    className="fixed z-50 w-[220px] bg-[#1a1b1e] border border-[#ffffff1f] rounded-lg shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                      top: `${contactPopoverPosition.top}px`,
                      left: `${contactPopoverPosition.left}px`
                    }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-white text-sm font-medium">扫码添加好友</p>
                      <div className="w-[160px] h-[160px] bg-white rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-[140px] h-[140px] bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                            <svg className="w-32 h-32" viewBox="0 0 100 100">
                              <rect x="0" y="0" width="100" height="100" fill="white"/>
                              <rect x="10" y="10" width="15" height="15" fill="black"/>
                              <rect x="30" y="10" width="5" height="5" fill="black"/>
                              <rect x="40" y="10" width="10" height="5" fill="black"/>
                              <rect x="55" y="10" width="5" height="5" fill="black"/>
                              <rect x="75" y="10" width="15" height="15" fill="black"/>
                              <rect x="10" y="15" width="5" height="5" fill="black"/>
                              <rect x="20" y="15" width="5" height="5" fill="black"/>
                              <rect x="35" y="15" width="5" height="5" fill="black"/>
                              <rect x="50" y="15" width="10" height="5" fill="black"/>
                              <rect x="75" y="15" width="5" height="5" fill="black"/>
                              <rect x="85" y="15" width="5" height="5" fill="black"/>
                              <rect x="10" y="20" width="5" height="5" fill="black"/>
                              <rect x="15" y="20" width="5" height="5" fill="black"/>
                              <rect x="20" y="20" width="5" height="5" fill="black"/>
                              <rect x="30" y="20" width="5" height="5" fill="black"/>
                              <rect x="75" y="20" width="5" height="5" fill="black"/>
                              <rect x="80" y="20" width="5" height="5" fill="black"/>
                              <rect x="85" y="20" width="5" height="5" fill="black"/>
                              <rect x="10" y="25" width="15" height="15" fill="black"/>
                              <rect x="40" y="25" width="5" height="5" fill="black"/>
                              <rect x="50" y="25" width="5" height="5" fill="black"/>
                              <rect x="75" y="25" width="15" height="15" fill="black"/>
                              <rect x="30" y="30" width="10" height="5" fill="black"/>
                              <rect x="45" y="30" width="15" height="5" fill="black"/>
                              <rect x="10" y="40" width="5" height="5" fill="black"/>
                              <rect x="20" y="40" width="10" height="5" fill="black"/>
                              <rect x="35" y="40" width="5" height="5" fill="black"/>
                              <rect x="45" y="40" width="10" height="5" fill="black"/>
                              <rect x="60" y="40" width="5" height="5" fill="black"/>
                              <rect x="70" y="40" width="10" height="5" fill="black"/>
                              <rect x="85" y="40" width="5" height="5" fill="black"/>
                              <rect x="15" y="45" width="5" height="5" fill="black"/>
                              <rect x="30" y="45" width="15" height="5" fill="black"/>
                              <rect x="50" y="45" width="5" height="5" fill="black"/>
                              <rect x="60" y="45" width="10" height="5" fill="black"/>
                              <rect x="75" y="45" width="10" height="5" fill="black"/>
                              <rect x="10" y="50" width="10" height="5" fill="black"/>
                              <rect x="25" y="50" width="5" height="5" fill="black"/>
                              <rect x="35" y="50" width="10" height="5" fill="black"/>
                              <rect x="50" y="50" width="15" height="5" fill="black"/>
                              <rect x="70" y="50" width="5" height="5" fill="black"/>
                              <rect x="80" y="50" width="10" height="5" fill="black"/>
                              <rect x="10" y="55" width="5" height="5" fill="black"/>
                              <rect x="25" y="55" width="10" height="5" fill="black"/>
                              <rect x="40" y="55" width="5" height="5" fill="black"/>
                              <rect x="50" y="55" width="10" height="5" fill="black"/>
                              <rect x="65" y="55" width="15" height="5" fill="black"/>
                              <rect x="85" y="55" width="5" height="5" fill="black"/>
                              <rect x="20" y="60" width="5" height="5" fill="black"/>
                              <rect x="30" y="60" width="10" height="5" fill="black"/>
                              <rect x="45" y="60" width="10" height="5" fill="black"/>
                              <rect x="60" y="60" width="5" height="5" fill="black"/>
                              <rect x="70" y="60" width="15" height="5" fill="black"/>
                              <rect x="10" y="75" width="15" height="15" fill="black"/>
                              <rect x="30" y="75" width="5" height="5" fill="black"/>
                              <rect x="40" y="75" width="10" height="5" fill="black"/>
                              <rect x="55" y="75" width="10" height="5" fill="black"/>
                              <rect x="70" y="75" width="5" height="5" fill="black"/>
                              <rect x="80" y="75" width="5" height="5" fill="black"/>
                              <rect x="10" y="80" width="5" height="5" fill="black"/>
                              <rect x="20" y="80" width="5" height="5" fill="black"/>
                              <rect x="35" y="80" width="15" height="5" fill="black"/>
                              <rect x="55" y="80" width="5" height="5" fill="black"/>
                              <rect x="65" y="80" width="10" height="5" fill="black"/>
                              <rect x="80" y="80" width="10" height="5" fill="black"/>
                              <rect x="10" y="85" width="5" height="5" fill="black"/>
                              <rect x="15" y="85" width="5" height="5" fill="black"/>
                              <rect x="20" y="85" width="5" height="5" fill="black"/>
                              <rect x="30" y="85" width="10" height="5" fill="black"/>
                              <rect x="45" y="85" width="5" height="5" fill="black"/>
                              <rect x="55" y="85" width="15" height="5" fill="black"/>
                              <rect x="75" y="85" width="5" height="5" fill="black"/>
                              <rect x="85" y="85" width="5" height="5" fill="black"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#ffffffb2] text-xs">微信：liurui_aigc</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-1 min-h-0 overflow-hidden">
                <div className="w-[30%] border-r border-[#ffffff1f] flex flex-col min-h-0">
                  <div className="p-4 border-b border-[#ffffff1f] flex-shrink-0">
                    <h4 className="text-[#ffffffb2] text-xs font-medium">工具包列表</h4>
                  </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
                  {selectedAuthor.toolPackages.map((pkg: any) => (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        setSelectedPackage(pkg);
                      }}
                      className={`cursor-pointer rounded-lg border transition-all flex gap-3 p-3 relative ${
                        selectedPackage.id === pkg.id
                          ? 'border-[#ffd700] bg-[#ffd700]/10'
                          : 'border-[#ffffff1f] hover:border-[#ffffff3f] hover:bg-[#ffffff08]'
                      }`}
                    >
                      <img
                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                        alt={pkg.title}
                        src={pkg.cover}
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-white text-sm font-medium mb-1 line-clamp-1">
                          {pkg.title}
                        </h5>
                        <p className="text-[#ffffffb2] text-xs line-clamp-2">
                          {pkg.description}
                        </p>
                      </div>
                      {pkg.isPurchased && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#22c55e] border-2 border-[#1a1b1e] flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col min-w-0 min-h-0">
                <div className="p-6 border-b border-[#ffffff1f] bg-[#1a1b1e] flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {selectedPackage.isPurchased ? (
                        <>
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1.5">
                              <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            已购买
                          </span>
                          {selectedPackage.purchaseDate && (
                            <span className="text-[#ffffffb2] text-sm">
                              购买于 {selectedPackage.purchaseDate}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <span className="text-[#ff6b6b] text-2xl font-bold">
                            {selectedPackage.price}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#ffd700]/10 text-[#ffd700] border border-[#ffd700]/20">
                            {selectedPackage.validity}
                          </span>
                        </>
                      )}
                      <span className="text-[#ffffffb2] text-sm">
                        共 {selectedPackage.categories.reduce((acc: number, cat: any) => acc + cat.tools.length, 0)} 个工具
                      </span>
                    </div>
                    {selectedPackage.isPurchased ? (
                      <Button
                        disabled
                        className="bg-[#ffffff1f] text-[#ffffff66] font-medium px-8 h-10 flex-shrink-0 cursor-not-allowed hover:bg-[#ffffff1f]"
                      >
                        已拥有
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setPaymentDialogOpen(true);
                        }}
                        className="bg-[#ffd700] hover:bg-[#ffed4e] text-black font-medium px-8 h-10 flex-shrink-0"
                      >
                        立即购买
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 min-h-0" style={{ overflowY: 'auto' }}>
                  {selectedPackage.categories.map((cat: any) => (
                    <div key={cat.id} className="mb-8 last:mb-0">
                      <h4 className="text-white text-base font-semibold mb-4 flex items-center gap-2">
                        {cat.label}
                        <span className="text-[#ffffffb2] text-sm font-normal">
                          ({cat.tools.length})
                        </span>
                      </h4>
                      <div className="grid grid-cols-4 gap-4">
                        {cat.tools.map((tool: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex flex-col group"
                          >
                            <div
                              className="w-full aspect-[3/4] rounded-sm border border-[#ffffff1f] relative overflow-hidden"
                              style={{
                                background: `url(${tool.cover}) 50% 50% / cover`,
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <h6 className="text-white font-medium text-sm line-clamp-1 drop-shadow-lg">
                                  {tool.name}
                                </h6>
                              </div>

                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium py-2 px-4 rounded-md border border-white/20 transition-all"
                                >
                                  收藏
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const toolDetail = {
                                      background: `url(${tool.cover})`,
                                      name: tool.name,
                                      description: tool.description,
                                      author: {
                                        avatar: selectedAuthor.avatar || '/ellipse-19342.svg',
                                        nickname: selectedAuthor.name,
                                        likes: Math.floor(Math.random() * 3000) + 500
                                      },
                                      remainingTrials: 3
                                    };
                                    setSelectedToolDetail(toolDetail);
                                    setToolDetailDialogOpen(true);
                                  }}
                                  className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium py-2 px-4 rounded-md border border-white/20 transition-all"
                                >
                                  介绍
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className="w-full bg-[#ffd700] hover:bg-[#ffed4e] text-black text-sm font-medium py-2 px-4 rounded-md transition-all"
                                >
                                  使用
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={toolDetailDialogOpen} onOpenChange={setToolDetailDialogOpen}>
        <DialogContent className="max-w-5xl bg-[#1a1b1e] border-[#ffffff1f] p-0 gap-0">
          {selectedToolDetail && (
            <div className="flex h-[600px]">
              <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-6">
                      <div
                        className="w-full h-64 rounded-lg bg-cover bg-center"
                        style={{
                          backgroundImage: selectedToolDetail.background,
                        }}
                      />
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-bold text-white">工具介绍</h2>
                          {toolCurrentVersion && (
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-[#ffffffb2]">
                                当前版本: <span className="text-[#ffd700] font-medium">v{toolCurrentVersion}</span>
                              </span>
                              {toolLastUpdated && (
                                <span className="text-[#ffffff66]">
                                  更新于 {new Date(toolLastUpdated).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <p className="text-[#ffffffb2] text-sm leading-relaxed mb-4">
                          {selectedToolDetail.description}
                        </p>
                        <p className="text-[#ffffffb2] text-sm leading-relaxed">
                          本工具采用最先进的人工智能技术，专为影楼摄影师和图像处理专业人士设计。通过深度学习算法，能够智能识别图像特征，自动进行优化处理，大幅提升工作效率。无论是批量处理还是精细调整，都能轻松应对，让您的创作更加高效便捷。
                        </p>
                      </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">核心功能</h3>
                    <ul className="space-y-2 text-[#ffffffb2] text-sm">
                      <li>• <span className="text-white font-medium">智能识别</span>：自动检测图像主体，精准识别人像、物体和场景</li>
                      <li>• <span className="text-white font-medium">一键优化</span>：智能调整曝光、色彩、对比度等参数，呈现最佳效果</li>
                      <li>• <span className="text-white font-medium">批量处理</span>：支持同时处理多张图片，统一风格，节省时间</li>
                      <li>• <span className="text-white font-medium">高清输出</span>：支持最高 8K 分辨率输出，保证画质清晰细腻</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">使用场景</h3>
                    <ul className="space-y-2 text-[#ffffffb2] text-sm">
                      <li>• <span className="text-white font-medium">影楼人像摄影</span>：婚纱照、写真集、证件照等专业人像处理</li>
                      <li>• <span className="text-white font-medium">电商产品图</span>：商品主图优化，提升商品展示效果和转化率</li>
                      <li>• <span className="text-white font-medium">社交媒体</span>：快速生成高质量内容，吸引更多关注和互动</li>
                      <li>• <span className="text-white font-medium">个人创作</span>：日常照片美化，朋友圈、微博等社交分享</li>
                      <li>• <span className="text-white font-medium">广告设计</span>：海报、宣传册等商业设计素材制作</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">技术优势</h3>
                    <div className="space-y-3 text-[#ffffffb2] text-sm">
                      <p>
                        基于深度学习神经网络，本工具经过数百万张专业摄影作品的训练，能够准确理解摄影美学和艺术风格。相比传统的图像处理软件，AI 技术能够更智能地分析图像内容，做出最优的处理决策。
                      </p>
                      <p>
                        采用云端处理架构，无需高配置电脑即可享受专业级的处理效果。所有计算都在强大的云服务器上完成，处理速度快，效果稳定可靠。同时支持离线使用，保护您的图像隐私安全。
                      </p>
                    </div>
                  </div>

                  {toolVersionHistory.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">版本更新</h3>

                      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                        {toolVersionHistory.map((version: any, idx: number) => (
                          <button
                            key={version.id}
                            onClick={() => setSelectedVersionIndex(idx)}
                            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              selectedVersionIndex === idx
                                ? 'bg-[#ffd700] text-black'
                                : 'bg-[#ffffff1f] text-[#ffffffb2] hover:bg-[#ffffff2f]'
                            }`}
                          >
                            v{version.version_number}
                            {version.is_current && <span className="ml-1.5 text-xs">●</span>}
                          </button>
                        ))}
                      </div>

                      {toolVersionHistory[selectedVersionIndex] && (
                        <div className="border border-[#ffffff1f] rounded-lg p-5">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="text-white text-lg font-semibold">
                                v{toolVersionHistory[selectedVersionIndex].version_number}
                              </span>
                              {toolVersionHistory[selectedVersionIndex].is_current && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffd700] text-black">
                                  当前版本
                                </span>
                              )}
                            </div>
                            <p className="text-[#ffffffb2] text-xs">
                              {new Date(toolVersionHistory[selectedVersionIndex].release_date).toLocaleDateString('zh-CN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>

                          {toolVersionHistory[selectedVersionIndex].changelog && (
                            <p className="text-white text-sm mb-4 leading-relaxed">
                              {toolVersionHistory[selectedVersionIndex].changelog}
                            </p>
                          )}

                          {toolVersionHistory[selectedVersionIndex].new_features && toolVersionHistory[selectedVersionIndex].new_features.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-[#4ade80] text-sm font-semibold mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full"></span>
                                新增功能
                              </h5>
                              <ul className="space-y-2 ml-4">
                                {toolVersionHistory[selectedVersionIndex].new_features.map((feature: string, idx: number) => (
                                  <li key={idx} className="text-[#ffffffb2] text-sm leading-relaxed flex items-start gap-2">
                                    <span className="text-[#4ade80] mt-1">•</span>
                                    <span className="flex-1">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {toolVersionHistory[selectedVersionIndex].improvements && toolVersionHistory[selectedVersionIndex].improvements.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-[#60a5fa] text-sm font-semibold mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-[#60a5fa] rounded-full"></span>
                                优化改进
                              </h5>
                              <ul className="space-y-2 ml-4">
                                {toolVersionHistory[selectedVersionIndex].improvements.map((improvement: string, idx: number) => (
                                  <li key={idx} className="text-[#ffffffb2] text-sm leading-relaxed flex items-start gap-2">
                                    <span className="text-[#60a5fa] mt-1">•</span>
                                    <span className="flex-1">{improvement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {toolVersionHistory[selectedVersionIndex].bug_fixes && toolVersionHistory[selectedVersionIndex].bug_fixes.length > 0 && (
                            <div>
                              <h5 className="text-[#f87171] text-sm font-semibold mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-[#f87171] rounded-full"></span>
                                问题修复
                              </h5>
                              <ul className="space-y-2 ml-4">
                                {toolVersionHistory[selectedVersionIndex].bug_fixes.map((fix: string, idx: number) => (
                                  <li key={idx} className="text-[#ffffffb2] text-sm leading-relaxed flex items-start gap-2">
                                    <span className="text-[#f87171] mt-1">•</span>
                                    <span className="flex-1">{fix}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">用户评价</h3>
                    <div className="space-y-4">
                      <div className="bg-[#ffffff08] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-[#ffd700]">★</span>
                            ))}
                          </div>
                          <span className="text-white text-xs font-medium">张女士 - 婚纱摄影师</span>
                        </div>
                        <p className="text-[#ffffffb2] text-sm leading-relaxed">
                          "非常实用的工具！以前处理一组婚纱照需要一整天，现在只需要2-3小时就能完成，而且效果比手动调整还要好。客户满意度大幅提升！"
                        </p>
                      </div>
                      <div className="bg-[#ffffff08] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-[#ffd700]">★</span>
                            ))}
                          </div>
                          <span className="text-white text-xs font-medium">李先生 - 电商运营</span>
                        </div>
                        <p className="text-[#ffffffb2] text-sm leading-relaxed">
                          "商品图片质量提升明显，转化率提高了30%。批量处理功能特别好用，节省了大量时间和人力成本。强烈推荐！"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-80 bg-[#141517] p-6 border-l border-[#ffffff1f] flex flex-col gap-6">
                <div className="flex items-start gap-3">
                  <img
                    className="w-12 h-12 rounded-full"
                    alt={selectedToolDetail.author.nickname}
                    src={selectedToolDetail.author.avatar}
                  />
                  <div>
                    <h3 className="text-white font-medium text-sm">{selectedToolDetail.author.nickname}</h3>
                    <p className="text-[#ffffffb2] text-xs mt-1">AI 工具开发者</p>
                  </div>
                </div>

                <Separator className="bg-[#ffffff1f]" />

                <div className="flex-1 overflow-y-auto space-y-4">
                  <h3 className="text-white font-semibold text-sm">相关工具合集</h3>

                  <div
                    onClick={() => {
                      setToolDetailDialogOpen(false);
                      setPackageDialogOpen(true);
                    }}
                    className="bg-[#1a1b1e] rounded-lg p-3 cursor-pointer hover:bg-[#20212480] transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded bg-[#2a2b2e] flex-shrink-0 overflow-hidden">
                        <div
                          className="w-full h-full"
                          style={{ backgroundImage: selectedToolDetail.background, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="text-white font-medium text-sm mb-1 line-clamp-1">
                            影楼人像AIGC合集
                          </h4>
                          <p className="text-[#ffffffb2] text-xs line-clamp-2">
                            80款实用工具，永久买断
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#ffd700] text-sm font-semibold">¥799</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#ffffff1f]" />

                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setSelectedTool(selectedToolDetail);
                      setPaymentDialogOpen(true);
                    }}
                    className="w-full h-10 bg-[#ffd700] hover:bg-[#ffed4e] text-black font-medium text-sm"
                  >
                    购买 ¥99
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedTrialTool(selectedToolDetail);
                      setTrialDialogOpen(true);
                    }}
                    className="w-full h-10 bg-transparent border-white/20 text-white hover:bg-white/10 font-medium text-sm"
                  >
                    免费试用（剩余 {selectedToolDetail.remainingTrials} 次）
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full h-10 bg-white/5 hover:bg-white/10 text-white font-medium text-sm"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    收藏
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={settlementDialogOpen} onOpenChange={setSettlementDialogOpen}>
        <DialogContent className="max-w-[600px] bg-[#1a1b1e] border-[#ffffff1f] p-0 gap-0">
          <div className="flex flex-col p-8 gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-2xl font-bold">申请入驻</h2>
              <p className="text-[#ffffffb2] text-sm leading-relaxed">
                加入我们的创作者平台，获得更多曝光机会和商业收益
              </p>
            </div>

            <Separator className="bg-[#ffffff1f]" />

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-white text-lg font-semibold">入驻优势</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-white text-sm font-medium">额外曝光机会</h4>
                      <p className="text-[#ffffffb2] text-xs">
                        您的工具将在首页推荐位展示，获得更多用户关注和使用
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-white text-sm font-medium">商业分成收益</h4>
                      <p className="text-[#ffffffb2] text-xs">
                        按照实际销售额进行分成，最高可达70%的收益比例
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-white text-sm font-medium">官方认证标识</h4>
                      <p className="text-[#ffffffb2] text-xs">
                        获得官方认证徽章，提升用户信任度和品牌价值
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-white text-sm font-medium">技术支持服务</h4>
                      <p className="text-[#ffffffb2] text-xs">
                        专业的技术团队提供一对一支持，帮助您优化工具性能
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-[#ffffff1f]" />

              <div className="flex flex-col gap-4">
                <h3 className="text-white text-lg font-semibold">申请条件</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffd700]"></div>
                    <p className="text-[#ffffffb2] text-sm">拥有原创的 AI 工具或工具包</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffd700]"></div>
                    <p className="text-[#ffffffb2] text-sm">工具质量稳定，用户体验良好</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffd700]"></div>
                    <p className="text-[#ffffffb2] text-sm">承诺持续更新和维护</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <Button
                onClick={() => setSettlementDialogOpen(false)}
                variant="outline"
                className="flex-1 h-10 border-[#ffffff3d] bg-transparent text-white hover:bg-[#ffffff08] hover:border-[#ffffff5c] text-sm transition-all"
              >
                暂不申请
              </Button>
              <Button
                onClick={() => {
                  setSettlementDialogOpen(false);
                }}
                className="flex-1 h-10 bg-[#ffd700] hover:bg-[#ffed4e] text-black font-medium text-sm"
              >
                立即申请
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={trialDialogOpen} onOpenChange={setTrialDialogOpen}>
        <DialogContent className="max-w-md bg-[#1a1b1e] border-[#ffffff1f] p-6">
          <div className="flex flex-col gap-6">
            <h2 className="text-white text-lg font-semibold">选择图片</h2>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setTrialDialogOpen(false);
                  setShowCreativeEditor(true);
                }}
                className="w-full bg-[#2a2b2e] hover:bg-[#323337] rounded-lg p-4 flex items-center gap-4 transition-colors group"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#1a1b1e]">
                  <img
                    src="/-----6.png"
                    alt="示例图片"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white text-sm font-medium mb-1">使用内置图片进行体验</h3>
                  <p className="text-[#ffffffb2] text-xs">内含多张样片供挑选体验</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-[#ffffffb2] group-hover:text-white transition-colors">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                className="w-full bg-[#2a2b2e] hover:bg-[#323337] rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-colors group border-2 border-dashed border-[#ffffff1f] hover:border-[#ffffff3d]"
              >
                <div className="w-12 h-12 rounded-full bg-[#1a1b1e] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ffffffb2]">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-white text-sm font-medium mb-1">点击或拖拽导入图片</h3>
                  <p className="text-[#ffffffb2] text-xs">支持JPG/PNG/RAW格式</p>
                </div>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showCreativeEditor && (
        <CreativeEditor onClose={() => setShowCreativeEditor(false)} />
      )}
    </div>
  );
};
