import type { WallpaperConfig } from '../types';

export interface WallpaperPreset {
  id: string;
  name: string;
  region: string;
  element?: string;
  thumbnail: string;
  url: string;
  description: string;
}

export const DEFAULT_WALLPAPER: WallpaperConfig = {
  presetId: 'default',
  blur: 'none',
  overlayOpacity: 0.65,
};

export const WALLPAPER_PRESETS: WallpaperPreset[] = [
  {
    id: 'default',
    name: 'Liquid Obsidian',
    region: 'Gốc (Mặc định)',
    thumbnail: '',
    url: '',
    description: 'Nền tối nguyên bản với hiệu ứng bong bóng nước tương tác',
  },
  {
    id: 'fontaine',
    name: 'Fontaine Thủy Triều',
    region: 'Fontaine (Thủy)',
    element: 'hydro',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=70&w=400&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=85&w=2560&auto=format&fit=crop',
    description: 'Ánh sáng lung linh nơi lòng đại dương Thủy Quốc',
  },
  {
    id: 'mondstadt',
    name: 'Thung Lũng Gió',
    region: 'Mondstadt (Phong)',
    element: 'anemo',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=70&w=400&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=2560&auto=format&fit=crop',
    description: 'Thảo nguyên xanh ngát và dòng thác huyền bí ngàn gió',
  },
  {
    id: 'liyue',
    name: 'Tuyệt Vân Gián Hoàng Hôn',
    region: 'Liyue (Nham)',
    element: 'geo',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=70&w=400&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=85&w=2560&auto=format&fit=crop',
    description: 'Đỉnh núi non bồng bềnh mây khói trong ánh hoàng hôn',
  },
  {
    id: 'inazuma',
    name: 'Đền Narukami & Anh Đào',
    region: 'Inazuma (Lôi)',
    element: 'electro',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=70&w=400&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=2560&auto=format&fit=crop',
    description: 'Hoa anh đào nở rộ bên mái chùa cổ kính dưới ánh hoàng hôn',
  },
  {
    id: 'sumeru',
    name: 'Rừng Mưa Dharma',
    region: 'Sumeru (Thảo)',
    element: 'dendro',
    thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=70&w=400&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=85&w=2560&auto=format&fit=crop',
    description: 'Rừng nhiệt đới rậm rạp chan hòa ánh nắng sớm',
  },
  {
    id: 'natlan',
    name: 'Hẻm Núi Hỏa Diệm',
    region: 'Natlan (Hỏa)',
    element: 'pyro',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=70&w=400&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=85&w=2560&auto=format&fit=crop',
    description: 'Những rặng núi đá đỏ rực rỡ và bầu trời ngập tràn nhiệt huyết',
  },
  {
    id: 'khaenriah',
    name: 'Dải Ngân Hà Tinh Tú',
    region: 'Khaenri\'ah (Vực Sâu)',
    thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=70&w=400&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=85&w=2560&auto=format&fit=crop',
    description: 'Vũ trụ sâu thẳm với cực quang rực rỡ và hàng triệu tinh tú',
  },
];

export function getActiveWallpaperUrl(config: WallpaperConfig): string {
  if (config.presetId === 'custom' && config.customUrl) {
    return config.customUrl;
  }
  const preset = WALLPAPER_PRESETS.find((p) => p.id === config.presetId);
  return preset?.url || '';
}

export function getBlurClass(blur: WallpaperConfig['blur']): string {
  switch (blur) {
    case 'sm':
      return 'backdrop-blur-[4px] blur-[4px]';
    case 'md':
      return 'backdrop-blur-[10px] blur-[10px]';
    case 'lg':
      return 'backdrop-blur-[20px] blur-[20px]';
    case 'none':
    default:
      return 'blur-none';
  }
}
