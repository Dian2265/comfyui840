import React, { useState, useRef, useEffect } from "react";
import { ImageSelectionDialog } from "../../components/ImageSelectionDialog";

interface CreativeEditorProps {
  onClose: () => void;
}

interface Feature {
  title: string;
  gradient: string;
  author: string;
  avatar: string;
}

interface ToolCard {
  title: string;
  gradient: string;
  thumbnail: string;
  author: string;
  likes: number;
  category: string;
}

const toolboxData: ToolCard[] = [
  { title: '8K高清图像增强', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', thumbnail: '/-----1.png', author: '刘锐 AIGC', likes: 1234, category: '全部' },
  { title: 'AI 人像美化', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', thumbnail: '/-----2.png', author: '像素蛋糕', likes: 856, category: '最近使用' },
  { title: '智能背景替换', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', thumbnail: '/-----3.png', author: '刘锐 AIGC', likes: 2341, category: '收藏' },
  { title: '风格迁移工具', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', thumbnail: '/-----5.png', author: '像素蛋糕', likes: 567, category: '收藏' },
  { title: '商品图生成', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', thumbnail: '/-----6.png', author: '刘锐 AIGC', likes: 1890, category: '已购买' },
  { title: 'AI 布景', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', thumbnail: '/-----7.png', author: '像素蛋糕', likes: 723, category: '收藏' },
  { title: '镜头虚化', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', thumbnail: '/-----8.png', author: '刘锐 AIGC', likes: 445, category: '最近使用' },
  { title: 'AI 超清', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', thumbnail: '/-----9.png', author: '像素蛋糕', likes: 998, category: '全部' },
  { title: '虚拟试衣', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', thumbnail: '/-----1.png', author: '刘锐 AIGC', likes: 3421, category: '全部' },
  { title: '智能消除', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', thumbnail: '/-----2.png', author: '像素蛋糕', likes: 1567, category: '全部' },
  { title: '智能道具修复', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', thumbnail: '/-----3.png', author: '刘锐 AIGC', likes: 2890, category: '全部' },
  { title: 'AI 补草地', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', thumbnail: '/-----5.png', author: '像素蛋糕', likes: 987, category: '收藏' },
  { title: '证件照衣服', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', thumbnail: '/-----6.png', author: '刘锐 AIGC', likes: 654, category: '最近使用' },
  { title: 'AI 抠图', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', thumbnail: '/-----7.png', author: '像素蛋糕', likes: 4321, category: '全部' },
  { title: '人像美颜', gradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)', thumbnail: '/-----8.png', author: '刘锐 AIGC', likes: 5678, category: '最近使用' },
  { title: '智能修图', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', thumbnail: '/-----9.png', author: '像素蛋糕', likes: 2345, category: '全部' },
  { title: '照片修复', gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)', thumbnail: '/-----1.png', author: '刘锐 AIGC', likes: 3210, category: '全部' },
  { title: 'HDR 增强', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', thumbnail: '/-----2.png', author: '像素蛋糕', likes: 1876, category: '全部' },
  { title: '智能配色', gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', thumbnail: '/-----3.png', author: '刘锐 AIGC', likes: 1234, category: '已购买' },
  { title: '光线调整', gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', thumbnail: '/-----5.png', author: '像素蛋糕', likes: 2109, category: '全部' },
  { title: 'AI 滤镜', gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', thumbnail: '/-----6.png', author: '刘锐 AIGC', likes: 3456, category: '收藏' },
  { title: '智能裁剪', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', thumbnail: '/-----7.png', author: '像素蛋糕', likes: 876, category: '全部' },
  { title: '商品主图设计', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', thumbnail: '/-----8.png', author: '刘锐 AIGC', likes: 2567, category: '已购买' },
  { title: '背景生成', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', thumbnail: '/-----9.png', author: '像素蛋糕', likes: 1987, category: '收藏' },
  { title: '产品抠图', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', thumbnail: '/-----1.png', author: '刘锐 AIGC', likes: 4567, category: '已购买' },
  { title: '人像精修', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', thumbnail: '/-----2.png', author: '像素蛋糕', likes: 3890, category: '最近使用' },
  { title: '皮肤美化', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', thumbnail: '/-----3.png', author: '刘锐 AIGC', likes: 5234, category: '最近使用' },
  { title: '光影重塑', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', thumbnail: '/-----5.png', author: '像素蛋糕', likes: 1654, category: '全部' },
  { title: '色彩校正', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', thumbnail: '/-----6.png', author: '刘锐 AIGC', likes: 2876, category: '全部' },
  { title: '艺术风格化', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', thumbnail: '/-----7.png', author: '像素蛋糕', likes: 3123, category: '收藏' },
];

const featuresData = {
  recommend: [
    { title: '虚拟试衣', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: 'AI 布景', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' },
    { title: '智能消除', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: '智能道具修复', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' },
    { title: 'AI 补草地', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: '证件照衣服', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' },
    { title: '镜头虚化', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: 'AI 超清', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' },
    { title: 'AI 抠图', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: '人像美颜', gradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' },
    { title: '智能修图', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: '风格转换', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' },
    { title: '照片修复', gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: 'HDR 增强', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' },
    { title: '智能配色', gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: '光线调整', gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' },
    { title: 'AI 滤镜', gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: '智能裁剪', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' }
  ],
  favorite: [
    { title: '虚拟试衣', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: 'AI 超清', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' },
    { title: '智能消除', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: '人像美颜', gradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' },
    { title: 'AI 抠图', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' }
  ],
  purchased: [
    { title: 'AI 超清', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' },
    { title: '镜头虚化', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', author: '刘锐 AIGC', avatar: '/pixel-cake.png' },
    { title: 'HDR 增强', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', author: '像素蛋糕', avatar: '/pixel-cake.png' }
  ]
};

const thumbnailImages = [
  { url: "/-----1.png", thumb: "/-----1.png" },
  { url: "/-----2.png", thumb: "/-----2.png" },
  { url: "/-----3.png", thumb: "/-----3.png" },
  { url: "/-----5.png", thumb: "/-----5.png" },
  { url: "/-----6.png", thumb: "/-----6.png" },
  { url: "/-----7.png", thumb: "/-----7.png" },
  { url: "/-----8.png", thumb: "/-----8.png" },
  { url: "/-----9.png", thumb: "/-----9.png" },
  { url: "/-----1.png", thumb: "/-----1.png" },
  { url: "/-----2.png", thumb: "/-----2.png" },
];

export const CreativeEditor = ({ onClose }: CreativeEditorProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<'推荐' | '收藏' | '已购买'>('推荐');
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const [toolboxCategory, setToolboxCategory] = useState('全部');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showcaseOpen, setShowcaseOpen] = useState(true);
  const [showcaseTitle, setShowcaseTitle] = useState('虚拟换装试衣');
  const [selectedVersion, setSelectedVersion] = useState('v1.0');
  const [activeTool, setActiveTool] = useState(0);
  const [showcasePos, setShowcasePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [hoveredUpload, setHoveredUpload] = useState<'model' | 'cloth' | null>(null);
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [clothImage, setClothImage] = useState<string | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState<'model' | 'cloth' | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const getCurrentFeatures = (): Feature[] => {
    switch (selectedTab) {
      case '收藏': return featuresData.favorite;
      case '已购买': return featuresData.purchased;
      default: return featuresData.recommend;
    }
  };

  const handleFeatureClick = (title: string) => {
    setShowcaseTitle(title);
    setShowcaseOpen(true);
    setShowcasePos({ x: 0, y: 0 });
  };

  const handleShowcaseMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.upload-box') || target.closest('.generate-btn-inner') || target.closest('.close-btn-inner') || target.closest('.info-btn-inner') || target.tagName === 'SELECT') {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - showcasePos.x, y: e.clientY - showcasePos.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setShowcasePos({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
    if (isPanning && imageRef.current) {
      setPosition({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPanning(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isPanning, dragStart, panStart]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = scale * delta;
    if (newScale < 0.1 || newScale > 10) return;
    setScale(newScale);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.feature-showcase')) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#09090A] flex flex-col [font-family:'PingFang_SC',sans-serif]">
      <div className="h-10 bg-[#23252B] border-b border-black flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 pl-3">
            <button onClick={onClose} className="w-3 h-3 bg-[#ff5f57] border border-[rgba(255,255,255,0.3)] rounded-full hover:bg-[#ff4138] transition-colors" />
            <button className="w-3 h-3 bg-[#febc2e] border border-[rgba(255,255,255,0.3)] rounded-full hover:bg-[#ffaa00] transition-colors" />
            <button className="w-3 h-3 bg-[#28c840] border border-[rgba(255,255,255,0.3)] rounded-full hover:bg-[#34d44e] transition-colors" />
          </div>
          <div className="flex gap-1 bg-[rgba(255,255,255,0.04)] rounded-md p-0.5">
            <div className="px-4 h-6 flex items-center justify-center rounded bg-[#464951] text-white text-xs font-medium">创意</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-full px-2 py-0.5">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#FF5454] via-[#FFA339] via-[#FFEFA4] to-[#B19DFF] flex items-center justify-center text-[10px] font-medium">★</div>
            <span className="text-xs bg-gradient-to-r from-[#FF5454] via-[#FFA339] via-[#FFEFA4] to-white bg-clip-text text-transparent">375</span>
            <div className="w-px h-5 bg-white opacity-16" />
            <span className="text-xs bg-gradient-to-r from-[#FF5454] via-[#FFA339] to-[#FFEFA4] bg-clip-text text-transparent cursor-pointer">充值</span>
          </div>
          <div className="w-px h-5 bg-white opacity-16" />
          <div className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center cursor-pointer">👤</div>
          <div className="w-px h-5 bg-white opacity-16" />
          <button onClick={onClose} className="h-6 px-2 rounded bg-[#464951] text-white text-xs font-medium hover:opacity-90 transition-opacity">退出</button>
          <button className="h-6 px-2 rounded bg-[#FFDD4C] text-black text-xs font-medium hover:bg-[#ffd000] transition-colors">应用至精修</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="h-12 bg-[#23252B] border-b border-black flex items-center gap-2 px-1">
            <div className="flex items-center gap-0.5 px-1">
              <div className="flex items-center gap-0.5 px-2 py-2 rounded text-xs text-white cursor-pointer">
                <span>100%</span>
                <span className="text-[10px]">▼</span>
              </div>
              <button className="px-2 py-2 text-xs text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)] rounded transition-colors">合适</button>
              <button className="w-9 h-9 flex items-center justify-center text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)] rounded transition-colors">🖥</button>
            </div>
            <div className="w-px h-[18px] bg-[rgba(255,255,255,0.12)]" />
            <div className="flex items-center gap-0.5">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveTool(i)}
                  className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${
                    activeTool === i ? 'bg-[#3083FF] border border-[#FFDD4C]' : 'text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)]'
                  }`}
                >
                  {i === 0 ? '✋' : i === 1 ? '↔' : '🔍'}
                </button>
              ))}
            </div>
            <div className="w-px h-[18px] bg-[rgba(255,255,255,0.12)]" />
            <button className="w-9 h-9 flex items-center justify-center text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)] rounded transition-colors">💧</button>
            <div className="w-px h-[18px] bg-[rgba(255,255,255,0.12)]" />
            <div className="flex items-center gap-0.5">
              <button className="w-9 h-9 flex items-center justify-center text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)] rounded transition-colors">◉</button>
              <button className="w-9 h-9 flex items-center justify-center text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)] rounded transition-colors">🔧</button>
              <button className="w-9 h-9 flex items-center justify-center text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)] rounded transition-colors">📋</button>
            </div>
            <div className="w-px h-[18px] bg-[rgba(255,255,255,0.12)]" />
            <div className="flex items-center gap-0.5">
              <button className="w-9 h-9 flex items-center justify-center text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)] rounded transition-colors">⬚</button>
              <button className="w-9 h-9 flex items-center justify-center text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)] rounded transition-colors">🖌</button>
            </div>
            <div className="w-px h-[18px] bg-[rgba(255,255,255,0.12)]" />
            <button className="w-9 h-9 flex items-center justify-center text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)] rounded transition-colors">✂</button>
          </div>

          <div
            ref={canvasRef}
            className="flex-1 bg-[#09090A] relative overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
            onWheel={handleWheel}
            onMouseDown={handleCanvasMouseDown}
          >
            <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm rounded px-2 py-1 z-50">
              <span className="text-white text-xs font-medium">AI</span>
            </div>

            <img
              ref={imageRef}
              src={thumbnailImages[selectedImage].url}
              alt="Canvas"
              className="max-w-none max-h-none rounded-lg select-none pointer-events-none"
              style={{
                transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transformOrigin: 'center center',
                transition: 'transform 0.1s ease-out'
              }}
            />

            {showcaseOpen && (
              <div
                className="feature-showcase absolute w-[273px] bg-[#22252C] rounded-lg p-5 text-center shadow-2xl cursor-move select-none z-[100]"
                style={{
                  transform: `translate(${showcasePos.x}px, ${showcasePos.y}px)`,
                  top: '20px',
                  right: '20px'
                }}
                onMouseDown={handleShowcaseMouseDown}
              >
                <div className="flex items-center justify-between mb-5 cursor-move">
                  <div className="flex items-center gap-2 flex-1">
                    <h2 className="text-sm font-bold text-white text-left">{showcaseTitle}</h2>
                    <button
                      className="info-btn-inner w-4 h-4 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.6)] text-xs hover:bg-[rgba(255,255,255,0.2)] hover:text-white transition-all cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); setInfoDialogOpen(true); }}
                      title="查看工具介绍"
                    >
                      ℹ
                    </button>
                  </div>
                  <button
                    className="close-btn-inner w-5 h-5 flex items-center justify-center rounded bg-transparent text-[rgba(255,255,255,0.6)] text-base hover:bg-[rgba(255,255,255,0.1)] hover:text-[rgba(255,255,255,0.9)] transition-all cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setShowcaseOpen(false); }}
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col gap-5 mb-5 cursor-move">
                  <div className="text-left cursor-move">
                    <label className="text-white text-xs mb-2 block cursor-move">模特图片</label>
                    <div
                      className="upload-box w-full h-[127px] bg-[#3B404A] rounded flex items-center justify-center cursor-pointer hover:bg-[#454a56] transition-colors relative group overflow-hidden"
                      onMouseEnter={() => setHoveredUpload('model')}
                      onMouseLeave={() => setHoveredUpload(null)}
                    >
                      {!modelImage ? (
                        <>
                          <span className="text-5xl text-[rgba(255,255,255,0.3)] pointer-events-none group-hover:opacity-0 transition-opacity">+</span>
                          {hoveredUpload === 'model' && (
                            <div className="absolute inset-0 p-2 flex flex-col gap-2 pointer-events-none">
                              <div className="flex gap-2 h-[40px]">
                                <button className="flex-1 bg-[#5F636D] hover:bg-[#6F737D] text-white text-xs font-medium rounded transition-colors pointer-events-auto">
                                  导入
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImageDialogOpen('model');
                                  }}
                                  className="flex-1 bg-[#5F636D] hover:bg-[#6F737D] text-white text-xs font-medium rounded transition-colors pointer-events-auto"
                                >
                                  从项目选择
                                </button>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setModelImage('/-----1.png');
                                }}
                                className="w-full h-[56px] bg-[#5F636D] hover:bg-[#6F737D] rounded transition-colors flex items-center gap-3 px-3 pointer-events-auto"
                              >
                                <img
                                  src="/-----1.png"
                                  alt="示例图"
                                  className="w-12 h-12 rounded object-cover flex-shrink-0"
                                />
                                <span className="text-white text-xs font-medium">使用示例图</span>
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <img
                            src={modelImage}
                            alt="模特图片"
                            className="w-full h-full object-cover"
                          />
                          {hoveredUpload === 'model' && (
                            <div className="absolute inset-0 p-2 flex flex-col gap-2 pointer-events-none bg-black/40">
                              <div className="flex gap-2 h-[40px]">
                                <button className="flex-1 bg-[#5F636D] hover:bg-[#6F737D] text-white text-xs font-medium rounded transition-colors pointer-events-auto">
                                  导入
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImageDialogOpen('model');
                                  }}
                                  className="flex-1 bg-[#5F636D] hover:bg-[#6F737D] text-white text-xs font-medium rounded transition-colors pointer-events-auto"
                                >
                                  从项目选择
                                </button>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setModelImage('/-----1.png');
                                }}
                                className="w-full h-[56px] bg-[#5F636D] hover:bg-[#6F737D] rounded transition-colors flex items-center gap-3 px-3 pointer-events-auto"
                              >
                                <img
                                  src="/-----1.png"
                                  alt="示例图"
                                  className="w-12 h-12 rounded object-cover flex-shrink-0"
                                />
                                <span className="text-white text-xs font-medium">使用示例图</span>
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-left cursor-move">
                    <label className="text-white text-xs mb-2 block cursor-move">衣服图片</label>
                    <div
                      className="upload-box w-full h-[127px] bg-[#3B404A] rounded flex items-center justify-center cursor-pointer hover:bg-[#454a56] transition-colors relative group overflow-hidden"
                      onMouseEnter={() => setHoveredUpload('cloth')}
                      onMouseLeave={() => setHoveredUpload(null)}
                    >
                      {!clothImage ? (
                        <>
                          <span className="text-5xl text-[rgba(255,255,255,0.3)] pointer-events-none group-hover:opacity-0 transition-opacity">+</span>
                          {hoveredUpload === 'cloth' && (
                            <div className="absolute inset-0 p-2 flex flex-col gap-2 pointer-events-none">
                              <div className="flex gap-2 h-[40px]">
                                <button className="flex-1 bg-[#5F636D] hover:bg-[#6F737D] text-white text-xs font-medium rounded transition-colors pointer-events-auto">
                                  导入
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImageDialogOpen('cloth');
                                  }}
                                  className="flex-1 bg-[#5F636D] hover:bg-[#6F737D] text-white text-xs font-medium rounded transition-colors pointer-events-auto"
                                >
                                  从项目选择
                                </button>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setClothImage('/-----2.png');
                                }}
                                className="w-full h-[56px] bg-[#5F636D] hover:bg-[#6F737D] rounded transition-colors flex items-center gap-3 px-3 pointer-events-auto"
                              >
                                <img
                                  src="/-----2.png"
                                  alt="示例图"
                                  className="w-12 h-12 rounded object-cover flex-shrink-0"
                                />
                                <span className="text-white text-xs font-medium">使用示例图</span>
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <img
                            src={clothImage}
                            alt="衣服图片"
                            className="w-full h-full object-cover"
                          />
                          {hoveredUpload === 'cloth' && (
                            <div className="absolute inset-0 p-2 flex flex-col gap-2 pointer-events-none bg-black/40">
                              <div className="flex gap-2 h-[40px]">
                                <button className="flex-1 bg-[#5F636D] hover:bg-[#6F737D] text-white text-xs font-medium rounded transition-colors pointer-events-auto">
                                  导入
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImageDialogOpen('cloth');
                                  }}
                                  className="flex-1 bg-[#5F636D] hover:bg-[#6F737D] text-white text-xs font-medium rounded transition-colors pointer-events-auto"
                                >
                                  从项目选择
                                </button>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setClothImage('/-----2.png');
                                }}
                                className="w-full h-[56px] bg-[#5F636D] hover:bg-[#6F737D] rounded transition-colors flex items-center gap-3 px-3 pointer-events-auto"
                              >
                                <img
                                  src="/-----2.png"
                                  alt="示例图"
                                  className="w-12 h-12 rounded object-cover flex-shrink-0"
                                />
                                <span className="text-white text-xs font-medium">使用示例图</span>
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-white">版本选择:</span>
                    <select
                      value={selectedVersion}
                      onChange={(e) => setSelectedVersion(e.target.value)}
                      className="flex-1 h-7 bg-[#3B404A] border border-[#5F636D] rounded text-xs text-white px-2 cursor-pointer hover:bg-[#454a56] transition-colors"
                    >
                      <option value="v1.0">v1.0 - 标准版</option>
                      <option value="v2.0">v2.0 - 增强版</option>
                      <option value="v3.0">v3.0 - 专业版</option>
                    </select>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (showcaseTitle === 'AI 布景') {
                        setPurchaseDialogOpen(true);
                      }
                    }}
                    className="generate-btn-inner w-full h-[31px] bg-[#FFDB0A] rounded flex items-center justify-center gap-2 text-xs font-bold text-black cursor-pointer hover:bg-[#ffd000] transition-colors"
                  >
                    <span className="pointer-events-none">生成</span>
                    <span className="pointer-events-none">🌟</span>
                    <span className="pointer-events-none">0</span>
                  </button>
                  <div className="mt-2 text-xs text-white cursor-default">
                    {showcaseTitle === 'AI 布景' ? '剩余0次免费试用' : '剩余2次免费试用'}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-[120px] bg-[#2a2b2e] border-t border-[#ffffff1f] flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#ffffff1f]">
              <div className="flex items-center gap-2">
                <button className="h-6 px-2 bg-[#3a3b3e] hover:bg-[#4a4b4e] rounded text-xs text-[rgba(255,255,255,0.7)] cursor-pointer flex items-center gap-1.5 transition-colors">
                  <span>⚙</span>
                  <span>未筛选</span>
                </button>
                <button className="h-6 px-2 bg-[#3a3b3e] hover:bg-[#4a4b4e] rounded text-xs text-[rgba(255,255,255,0.7)] cursor-pointer flex items-center gap-1.5 transition-colors">
                  <span>↕</span>
                  <span>文件名</span>
                </button>
                <span className="text-xs text-[rgba(255,255,255,0.4)] ml-2">已选 <span className="text-white font-medium">1</span> 张（共100张）</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <button className="hover:opacity-70 transition-opacity">🚩</button>
                <div className="flex gap-0.5">
                  <span className="text-[#ffd700]">⭐</span>
                  <span className="text-[#ffd700]">⭐</span>
                  <span className="text-[#ffd700]">⭐</span>
                  <span className="text-[#ffd700]">⭐</span>
                  <span className="text-[#ffd700]">⭐</span>
                </div>
                <button className="hover:opacity-70 transition-opacity">🎨</button>
                <span className="text-[rgba(255,255,255,0.5)]">IMG_02</span>
              </div>
            </div>

            <div className="flex-1 flex items-center px-3 py-2 gap-2 overflow-x-auto">
              {thumbnailImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-[90px] h-[90px] rounded flex-shrink-0 cursor-pointer relative bg-[#1a1b1e] overflow-hidden transition-all ${
                    selectedImage === idx ? 'ring-2 ring-[#ffd700]' : 'hover:ring-2 hover:ring-[#ffffff33]'
                  }`}
                >
                  <img
                    src={img.thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-black/50 backdrop-blur-sm rounded px-1.5 py-0.5">
                    <span className="text-white text-[10px] font-medium">{idx + 1}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-1.5 py-1">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-[#ffd700] text-[10px]">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[280px] bg-[#23252B] border-l border-black flex flex-col overflow-hidden relative">
          <div className="flex items-center justify-between px-4 border-b border-[rgba(0,0,0,0.3)] h-12">
            <div className="flex items-center gap-3">
              {(['推荐', '收藏', '已购买'] as const).map((tab) => (
                <div
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`text-[13px] font-semibold cursor-pointer pb-0.5 ${
                    selectedTab === tab ? 'text-white border-b-2 border-white' : 'text-[rgba(255,255,255,0.3)]'
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>
            <button
              onClick={() => setToolboxOpen(true)}
              className="text-[13px] font-semibold text-[rgba(255,255,255,0.7)] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[rgba(255,255,255,0.08)]"
            >
              <span>🧰</span>
              <span>工具箱</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-[420px] flex flex-col gap-2">
            {getCurrentFeatures().map((feature, idx) => (
              <div
                key={idx}
                onClick={() => handleFeatureClick(feature.title)}
                className="bg-[rgba(255,255,255,0.04)] rounded p-1.5 flex items-center gap-3 cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-colors relative"
              >
                <div className="w-24 h-[52px] rounded bg-[#464951] flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full" style={{ background: feature.gradient }} />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="text-xs text-white">{feature.title}</div>
                  <div className="flex items-center gap-1.5">
                    <img src={feature.avatar} alt={feature.author} className="w-4 h-4 rounded-full" />
                    <span className="text-[10px] text-[rgba(255,255,255,0.6)]">{feature.author}</span>
                  </div>
                </div>
                <div className="absolute top-1 right-1 w-[18px] h-3 rounded-tl rounded-tr rounded-br-none rounded-bl bg-gradient-to-br from-[#FF5454] via-[#FFA339] via-[#FFEFA4] to-[#F3FFF5] shadow-[-1px_1px_2px_0px_rgba(0,0,0,0.35)]" />
              </div>
            ))}

            <div
              onClick={() => setToolboxOpen(true)}
              className="bg-[rgba(255,255,255,0.04)] rounded p-1.5 flex items-center gap-3 cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-colors relative"
            >
              <div className="w-24 h-[52px] rounded bg-[#464951] flex-shrink-0 overflow-hidden flex items-center justify-center">
                <span className="text-2xl">🧰</span>
              </div>
              <div className="text-xs text-white">探索更多工具</div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 w-full border-t border-black bg-[#23252B] shadow-[0_-4px_12px_rgba(0,0,0,0.3)] z-10">
            <div className="flex items-center justify-between px-4 py-1.5 border-b border-[rgba(0,0,0,0.3)]">
              <span className="text-[13px] font-semibold text-white">图层</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3">
              <select className="flex-1 h-7 bg-[rgba(255,255,255,0.12)] border border-[#5F636D] rounded text-xs text-[rgba(255,255,255,0.7)] px-2">
                <option>正常</option>
                <option>正片叠底</option>
                <option>滤色</option>
              </select>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[rgba(255,255,255,0.3)]">不透明度</span>
                <input
                  type="text"
                  defaultValue="88%"
                  className="w-[60px] h-7 bg-[rgba(255,255,255,0.08)] border border-[#464951] rounded text-[13px] text-[rgba(255,255,255,0.7)] px-1.5 text-right"
                />
              </div>
            </div>

            <div className="px-2 py-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1 p-2 rounded cursor-pointer transition-colors ${
                    i === 0 ? 'bg-[#464951]' : 'hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  <div className="w-8 h-8 rounded bg-[rgba(255,255,255,0.12)] flex-shrink-0" />
                  <span className="flex-1 text-xs text-[rgba(255,255,255,0.85)]">图层</span>
                  {i === 0 && <span className="text-xs text-[rgba(255,255,255,0.7)]">👁</span>}
                </div>
              ))}
            </div>

            <div className="flex justify-end items-center gap-4 px-4 py-2 border-t border-black">
              <button className="w-4 h-4 text-[rgba(255,255,255,0.7)] cursor-pointer">🎭</button>
              <button className="w-4 h-4 text-[rgba(255,255,255,0.7)] cursor-pointer">📁</button>
              <button className="w-4 h-4 text-[rgba(255,255,255,0.7)] cursor-pointer">🔒</button>
              <button className="w-4 h-4 text-[rgba(255,255,255,0.7)] cursor-pointer">🗑</button>
            </div>
          </div>
        </div>
      </div>

      {toolboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setToolboxOpen(false)}
        >
          <div
            className="w-[1200px] h-[80vh] bg-[#1A1B1F] rounded-lg shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.1)]">
              <h2 className="text-lg font-bold text-white">AI 工具箱</h2>
              <button
                onClick={() => setToolboxOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded bg-transparent text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-all"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.1)]">
              <div className="flex gap-3">
                {['全部', '最近使用', '收藏', '已购买'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setToolboxCategory(category)}
                    className={`px-5 h-8 rounded-md text-sm font-medium transition-all ${
                      toolboxCategory === category
                        ? 'bg-[#3A3B3E] text-white'
                        : 'bg-transparent text-[rgba(255,255,255,0.6)] hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-5 gap-4">
                {toolboxData
                  .filter(tool => toolboxCategory === '全部' || tool.category === toolboxCategory)
                  .map((tool, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        handleFeatureClick(tool.title);
                        setToolboxOpen(false);
                      }}
                      className="bg-transparent rounded-lg cursor-pointer hover:bg-[rgba(255,255,255,0.02)] transition-colors group"
                    >
                      <div className="w-full aspect-[3/4] rounded-lg mb-3 overflow-hidden">
                        <img
                          src={tool.thumbnail}
                          alt={tool.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="px-1">
                        <div className="text-sm font-medium text-white mb-2 group-hover:text-[#FFDD4C] transition-colors">
                          {tool.title}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FF5454] to-[#FFA339] flex items-center justify-center text-[10px]">
                              👤
                            </div>
                            <span className="text-xs text-[rgba(255,255,255,0.6)]">{tool.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-[rgba(255,255,255,0.4)]">👍</span>
                            <span className="text-xs text-[rgba(255,255,255,0.6)]">{tool.likes.toLocaleString()} 赞</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <ImageSelectionDialog
        open={imageDialogOpen !== null}
        onClose={() => setImageDialogOpen(null)}
        onSelect={(url) => {
          if (imageDialogOpen === 'model') {
            setModelImage(url);
          } else if (imageDialogOpen === 'cloth') {
            setClothImage(url);
          }
        }}
      />

      {infoDialogOpen && (
        <div
          className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setInfoDialogOpen(false)}
        >
          <div
            className="w-full max-w-5xl bg-[#1a1b1e] rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-[600px]">
              <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-6">
                  <div className="w-full h-64 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2]" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-white">工具介绍</h2>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-[#ffffffb2]">
                          当前版本: <span className="text-[#ffd700] font-medium">v1.0</span>
                        </span>
                        <span className="text-[#ffffff66]">
                          更新于 2024年10月22日
                        </span>
                      </div>
                    </div>
                    <p className="text-[#ffffffb2] text-sm leading-relaxed mb-4">
                      {showcaseTitle === 'AI 布景' && '智能场景替换工具，能够自动识别人物或商品，并为其生成适合的背景环境。支持多种场景风格，包括室内、室外、抽象等。'}
                      {showcaseTitle === '虚拟试衣' && '虚拟换装试衣工具，通过AI技术将衣服自然地穿戴到模特身上，保持真实的光影效果和服装褶皱。'}
                      {showcaseTitle === '虚拟换装试衣' && '虚拟换装试衣工具，通过AI技术将衣服自然地穿戴到模特身上，保持真实的光影效果和服装褶皱。'}
                      {showcaseTitle === '智能消除' && '智能物体移除工具，能够精准识别并移除图片中的不需要元素，自动填补背景内容，让画面更加干净。'}
                      {showcaseTitle === '智能道具修复' && '自动修复破损或缺失的物品，通过AI算法智能补全细节，恢复物品的完整性。'}
                      {showcaseTitle === 'AI 补草地' && '智能草地生成工具，能够在指定区域自动生成逼真的草地纹理，适用于户外场景修复。'}
                      {showcaseTitle === '证件照衣服' && '证件照服装更换工具，可以为证件照快速更换符合要求的正装，保持自然的光影效果。'}
                      {showcaseTitle === '镜头虚化' && '专业景深效果工具，模拟大光圈镜头效果，智能识别主体并对背景进行自然虚化。'}
                      {showcaseTitle === 'AI 超清' && '图像超分辨率增强工具，通过AI算法提升图片清晰度，恢复细节，最高支持8K输出。'}
                      {showcaseTitle === 'AI 抠图' && '智能抠图工具，自动识别主体边缘，精准分离前景与背景，支持头发丝级别的细节处理。'}
                      {showcaseTitle === '人像美颜' && '专业人像美化工具，智能识别面部特征，进行自然的美颜处理，保持真实感。'}
                      {showcaseTitle === '智能修图' && '全能修图工具，集成多种智能修复功能，一键优化图片质量。'}
                      {showcaseTitle === '风格转换' && '艺术风格迁移工具，将图片转换为各种艺术风格，如油画、水彩、素描等。'}
                      {showcaseTitle === '照片修复' && '老照片修复工具，修复划痕、褪色等问题，恢复照片原本的色彩和清晰度。'}
                      {showcaseTitle === 'HDR 增强' && '高动态范围增强工具，提升图片的明暗对比和色彩层次，让画面更具冲击力。'}
                      {showcaseTitle === '智能配色' && '智能配色方案生成工具，根据图片内容自动推荐和谐的配色方案。'}
                      {showcaseTitle === '光线调整' && '专业光线调整工具，智能识别光源方向，调整图片的光影效果。'}
                      {showcaseTitle === 'AI 滤镜' && '智能滤镜工具，提供多种AI驱动的滤镜效果，自适应图片内容。'}
                      {showcaseTitle === '智能裁剪' && '智能构图裁剪工具，根据画面内容自动推荐最佳裁剪方案。'}
                      {!['AI 布景', '虚拟试衣', '虚拟换装试衣', '智能消除', '智能道具修复', 'AI 补草地', '证件照衣服', '镜头虚化', 'AI 超清', 'AI 抠图', '人像美颜', '智能修图', '风格转换', '照片修复', 'HDR 增强', '智能配色', '光线调整', 'AI 滤镜', '智能裁剪'].includes(showcaseTitle) && '这是一款强大的AI创意工具，能够帮助您快速完成专业级的图片处理任务。'}
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
                    alt="刘锐 AIGC"
                    src="/pixel-cake.png"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm">刘锐 AIGC</h3>
                    <p className="text-[#ffffffb2] text-xs mt-1">AI 工具开发者</p>
                  </div>
                  <button
                    onClick={() => setInfoDialogOpen(false)}
                    className="w-6 h-6 flex items-center justify-center rounded text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-all"
                  >
                    ✕
                  </button>
                </div>

                <div className="h-px bg-[#ffffff1f]" />

                <div className="flex-1 overflow-y-auto space-y-4">
                  <h3 className="text-white font-semibold text-sm">相关工具合集</h3>
                  <div className="bg-[#1a1b1e] rounded-lg p-3 cursor-pointer hover:bg-[#20212480] transition-colors">
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded bg-gradient-to-br from-[#667eea] to-[#764ba2] flex-shrink-0" />
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

                <div className="h-px bg-[#ffffff1f]" />

                <div className="space-y-3">
                  <button className="w-full h-10 bg-[#ffd700] hover:bg-[#ffed4e] text-black font-medium text-sm rounded transition-colors">
                    购买 ¥99
                  </button>
                  <button className="w-full h-10 bg-transparent border border-white/20 text-white hover:bg-white/10 font-medium text-sm rounded transition-colors">
                    免费试用（剩余 2 次）
                  </button>
                  <button className="w-full h-10 bg-white/5 hover:bg-white/10 text-white font-medium text-sm rounded transition-colors">
                    收藏
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {purchaseDialogOpen && (
        <div
          className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPurchaseDialogOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#1a1b1e] rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#ffffff1f]">
              <h2 className="text-lg font-bold text-white">购买产品</h2>
              <button
                onClick={() => setPurchaseDialogOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded bg-transparent text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-all"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#30cfd0] to-[#330867] flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base mb-2">{showcaseTitle}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <img src="/pixel-cake.png" alt="作者" className="w-5 h-5 rounded-full" />
                    <span className="text-[rgba(255,255,255,0.6)] text-xs">像素蛋糕</span>
                  </div>
                  <p className="text-[rgba(255,255,255,0.6)] text-sm">
                    智能场景替换工具，支持多种场景风格
                  </p>
                </div>
              </div>

              <div className="bg-[#ffffff08] rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-sm">单次购买</span>
                  <span className="text-[#ffd700] text-xl font-bold">¥99</span>
                </div>
                <div className="space-y-2 text-xs text-[rgba(255,255,255,0.6)]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#ffd700]">✓</span>
                    <span>永久使用权限</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#ffd700]">✓</span>
                    <span>无限次数生成</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#ffd700]">✓</span>
                    <span>版本免费更新</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#ffd700]">✓</span>
                    <span>优先技术支持</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full h-11 bg-[#ffd700] hover:bg-[#ffed4e] text-black font-semibold text-sm rounded transition-colors">
                  立即购买 ¥99
                </button>
                <button
                  onClick={() => setPurchaseDialogOpen(false)}
                  className="w-full h-11 bg-transparent border border-white/20 text-white hover:bg-white/10 font-medium text-sm rounded transition-colors"
                >
                  取消
                </button>
              </div>

              <p className="text-center text-[rgba(255,255,255,0.4)] text-xs mt-4">
                购买后可在"已购买"标签页查看
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
