import React, { useState } from "react";

interface ImageSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
}

interface ProjectImage {
  id: number;
  url: string;
  name: string;
  type: string;
  starred: boolean;
}

const projectImages: ProjectImage[] = [
  { id: 1, url: '/-----1.png', name: 'IMG_001.png', type: '人物', starred: true },
  { id: 2, url: '/-----2.png', name: 'IMG_002.png', type: '风景', starred: false },
  { id: 3, url: '/-----3.png', name: 'IMG_003.png', type: '人物', starred: true },
  { id: 4, url: '/-----5.png', name: 'IMG_005.png', type: '产品', starred: false },
  { id: 5, url: '/-----6.png', name: 'IMG_006.png', type: '人物', starred: true },
  { id: 6, url: '/-----7.png', name: 'IMG_007.png', type: '风景', starred: false },
  { id: 7, url: '/-----8.png', name: 'IMG_008.png', type: '产品', starred: true },
  { id: 8, url: '/-----9.png', name: 'IMG_009.png', type: '人物', starred: false },
];

export const ImageSelectionDialog = ({ open, onClose, onSelect }: ImageSelectionDialogProps): JSX.Element | null => {
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [searchName, setSearchName] = useState<string>('');
  const [showStarredOnly, setShowStarredOnly] = useState<boolean>(false);

  if (!open) return null;

  const filteredImages = projectImages.filter(img => {
    const typeMatch = selectedType === '全部' || img.type === selectedType;
    const nameMatch = searchName === '' || img.name.toLowerCase().includes(searchName.toLowerCase());
    const starMatch = !showStarredOnly || img.starred;
    return typeMatch && nameMatch && starMatch;
  });

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#1A1B1F] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.1)]">
          <h2 className="text-lg font-bold text-white">从项目选择图片</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded bg-transparent text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-all"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.1)] space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[rgba(255,255,255,0.7)]">图片类型:</span>
              <div className="flex gap-2">
                {['全部', '人物', '风景', '产品'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 h-8 rounded text-sm font-medium transition-all ${
                      selectedType === type
                        ? 'bg-[#3A3B3E] text-white'
                        : 'bg-transparent text-[rgba(255,255,255,0.6)] hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-2 bg-[#2A2B2E] rounded px-3 h-9">
              <span className="text-[rgba(255,255,255,0.4)]">🔍</span>
              <input
                type="text"
                placeholder="搜索文件名..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white placeholder-[rgba(255,255,255,0.4)] outline-none"
              />
            </div>

            <button
              onClick={() => setShowStarredOnly(!showStarredOnly)}
              className={`flex items-center gap-2 px-4 h-9 rounded text-sm font-medium transition-all ${
                showStarredOnly
                  ? 'bg-[#3A3B3E] text-white'
                  : 'bg-transparent text-[rgba(255,255,255,0.6)] hover:text-white'
              }`}
            >
              <span className={showStarredOnly ? 'text-[#ffd700]' : ''}>⭐</span>
              <span>仅显示星标</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <span className="text-5xl mb-4 opacity-30">📁</span>
              <p className="text-[rgba(255,255,255,0.6)] text-sm">未找到符合条件的图片</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {filteredImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => {
                    onSelect(img.url);
                    onClose();
                  }}
                  className="relative bg-[#2A2B2E] rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#FFDD4C] transition-all group"
                >
                  <div className="aspect-square w-full">
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2">
                    {img.starred && (
                      <span className="text-[#ffd700] text-sm drop-shadow-lg">⭐</span>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium truncate">{img.name}</p>
                    <p className="text-[rgba(255,255,255,0.6)] text-xs mt-0.5">{img.type}</p>
                  </div>
                  <div className="absolute inset-0 bg-[#FFDD4C]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded">选择</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between">
          <span className="text-sm text-[rgba(255,255,255,0.6)]">
            共 {filteredImages.length} 张图片
          </span>
          <button
            onClick={onClose}
            className="px-4 h-9 bg-[#3A3B3E] hover:bg-[#4A4B4E] text-white text-sm font-medium rounded transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
};
