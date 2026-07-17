import { C, COLOR_HEX } from './tokens';

import topsIcon        from './assets/icons/tops.png';
import bottomsIcon     from './assets/icons/bottoms.png';
import outerwearIcon   from './assets/icons/outerwear.png';
import shoesIcon       from './assets/icons/shoes.png';
import accessoriesIcon from './assets/icons/accessories.png';

export const ShuffleIcon = ({ size = 20, color = C.dark }) => (
  <svg width={size} height={size} viewBox="0 0 17.302 17.302" fill={color}>
    <path d="M10.896 17.302L10.896 15.175L13.637 15.175L9.804 11.359L11.306 9.88L15.168 13.686L15.168 10.931L17.302 10.931L17.302 17.302ZM1.47 17.298L0 15.788L13.67 2.134L10.896 2.134L10.896 0L17.302 0L17.302 6.384L15.168 6.384L15.168 3.634ZM6.052 7.514L0 1.51L1.486 0L7.566 6.014Z"/>
  </svg>
);

export const PlusIcon = ({ size = 14, color = '#FFF' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill={color}>
    <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z"/>
  </svg>
);

export const BellIcon = ({ size = 20, color = C.primary }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

export const SearchIcon = ({ size = 14, color = C.muted }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

export const LockIcon = ({ size = 14, color = C.primary }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export const UnlockIcon = ({ size = 14, color = C.mutedLight }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);

export const HeartIcon = ({ size = 16, color = C.white, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export const TrashIcon = ({ size = 14, color = C.primaryDeep }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

export const ChevronRight = ({ size = 16, color = C.muted }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export const WardrobeIcon = ({ size = 20, color = C.dark }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.86H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.86l.58-3.57a2 2 0 0 0-1.34-2.11z"/>
  </svg>
);

export const BookmarkIcon = ({ size = 20, color = C.dark, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

export const CloseIcon = ({ size = 18, color = C.muted }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);

const CATEGORY_ICON = {
  Tops:      topsIcon,
  Bottoms:   bottomsIcon,
  Outerwear: outerwearIcon,
  Shoes:     shoesIcon,
  Footwear:  shoesIcon,
  Accessory: accessoriesIcon,
};

const DARK_BG_COLORS = new Set(['Black', 'Navy', 'Burgundy']);

export const ClothingPlaceholder = ({ category, color, width = 100, height = 100, style = {} }) => {
  const bg   = COLOR_HEX[color] || '#E8E0E0';
  const icon = CATEGORY_ICON[category] || accessoriesIcon;
  const imgFilter = DARK_BG_COLORS.has(color) ? 'brightness(0) invert(1)' : 'none';

  return (
    <div style={{ width, height, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <img
        src={icon}
        alt={category}
        style={{
          width: '65%', height: '65%', objectFit: 'contain',
          filter: imgFilter,
          opacity: DARK_BG_COLORS.has(color) ? 0.75 : 0.55,
        }}
      />
    </div>
  );
};
