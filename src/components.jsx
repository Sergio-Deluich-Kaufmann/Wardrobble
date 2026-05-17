import { useState, useRef } from 'react';
import { C, T, COLOR_HEX } from './tokens';
import {
  BellIcon, ShuffleIcon, WardrobeIcon, BookmarkIcon,
  PlusIcon, CloseIcon, TrashIcon, ClothingPlaceholder,
} from './icons';

export const TopAppBar = ({ onBack, title }) => (
  <div style={{
    position: 'absolute', left: 0, top: 0, right: 0, height: 64, zIndex: 100,
    background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(220,192,191,0.1)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 24px',
  }}>
    {onBack ? (
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        {title && <span style={{ ...T.bodySm, color: C.dark }}>{title}</span>}
      </button>
    ) : (
      <span style={{ ...T.logo, color: C.darkAlt }}>Wardrobble</span>
    )}
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
      <BellIcon size={20} color={C.primary} />
    </button>
  </div>
);

export const BottomNav = ({ active, onChange }) => {
  const tabs = [
    { key: 'shuffle',  label: 'Shuffle',  Icon: ShuffleIcon  },
    { key: 'wardrobe', label: 'Wardrobe', Icon: WardrobeIcon },
    { key: 'saved',    label: 'Saved',    Icon: BookmarkIcon },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, zIndex: 100,
      background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: C.shadow,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px',
    }}>
      {tabs.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <button key={key} onClick={() => onChange(key)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '10px 4px 8px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: isActive ? C.navActive : 'transparent',
            transition: 'background 0.2s',
          }}>
            <Icon size={19} color={isActive ? C.primaryDeep : C.mutedLight} filled={isActive} />
            <span style={{ ...T.labelSm, color: isActive ? C.primaryDeep : C.mutedLight }}>
              {label.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const Pill = ({ children, active, onClick, small }) => (
  <button onClick={onClick} style={{
    padding: small ? '3px 8px' : '8px 16px',
    borderRadius: 999, border: 'none', cursor: 'pointer',
    background: active ? C.primary : C.cardBg,
    color: active ? C.white : C.mutedDark,
    ...( small ? T.caption : T.bodySm ),
    fontWeight: 600,
    whiteSpace: 'nowrap',
    boxShadow: active ? '0 2px 10px rgba(250,135,135,0.28)' : 'none',
    transition: 'all 0.18s',
  }}>{children}</button>
);

export const FAB = ({ onClick, children, size = 56, style: extraStyle = {} }) => (
  <button onClick={onClick} style={{
    position: 'absolute', right: 20, bottom: 96,
    width: size, height: size, borderRadius: '50%',
    background: C.primary, border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 8px 28px rgba(250,135,135,0.42)',
    zIndex: 90, transition: 'transform 0.2s',
    ...extraStyle,
  }}>
    {children}
  </button>
);

export const Tag = ({ children }) => (
  <span style={{
    background: C.cardBg, borderRadius: 999, padding: '2px 7px',
    ...T.caption, fontWeight: 500, color: C.mutedDark,
    display: 'inline-block',
  }}>{children}</span>
);

export const SectionHeader = ({ eyebrow, title }) => (
  <div style={{ marginBottom: 20 }}>
    {eyebrow && <div style={{ ...T.label, color: C.primary, marginBottom: 6 }}>{eyebrow}</div>}
    <div style={{ ...T.h1, color: C.dark }}>{title}</div>
  </div>
);

export const CATS      = ['Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessory'];
export const OCCASIONS = [
  { label: 'Casual',     emoji: '☀️' },
  { label: 'Formal',     emoji: '👔' },
  { label: 'Business',   emoji: '💼' },
  { label: 'Sports',     emoji: '🏃' },
  { label: 'Party',      emoji: '🎉' },
  { label: 'Beach',      emoji: '🏖️' },
  { label: 'Winter',     emoji: '❄️' },
  { label: 'Date Night', emoji: '🌙' },
  { label: 'Travel',     emoji: '✈️' },
  { label: 'Lounge',     emoji: '🛋️' },
];
export const COLORS = [
  'White', 'Black', 'Gray', 'Ivory', 'Beige',
  'Blue', 'Navy', 'Sky Blue',
  'Red', 'Burgundy', 'Pink',
  'Green', 'Yellow', 'Purple', 'Orange', 'Brown',
];

const CameraIcon = ({ size = 28, color = C.muted }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const ItemPreview = ({ cat, color, name, imgSrc }) => (
  <div style={{
    width: 100, borderRadius: 14, background: C.white,
    boxShadow: '0 4px 16px rgba(20,27,43,0.1)', overflow: 'hidden',
    transition: 'all 0.22s ease', flexShrink: 0,
  }}>
    <div style={{ height: 110, position: 'relative', overflow: 'hidden' }}>
      {imgSrc ? (
        <img src={imgSrc} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <ClothingPlaceholder category={cat} color={color} width={100} height={110} style={{ width: '100%', height: '100%', transition: 'all 0.22s ease' }} />
      )}
    </div>
    <div style={{ padding: '7px 8px 9px' }}>
      <div style={{ ...T.h4, fontSize: 10, color: C.dark, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {name || 'Item name'}
      </div>
      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Tag>{cat}</Tag>
        <Tag>{color}</Tag>
      </div>
    </div>
  </div>
);

export const AddItemSheet = ({ onClose, onAdd }) => {
  const [name,      setName]      = useState('');
  const [cat,       setCat]       = useState('Tops');
  const [color,     setColor]     = useState('White');
  const [imgSrc,    setImgSrc]    = useState(null);
  const [occasions, setOccasions] = useState([]);
  const [dragOver,  setDragOver]  = useState(false);
  const fileRef = useRef();

  const handleFile = file => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const MAX = 400;
      const scale = Math.min(MAX / img.width, MAX / img.height, 1);
      const canvas = document.createElement('canvas');
      canvas.width  = Math.round(img.width  * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      setImgSrc(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.src = url;
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'rgba(20,27,43,0.48)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: C.white, borderRadius: '22px 22px 0 0',
        boxShadow: '0 -12px 48px rgba(0,0,0,0.18)',
        animation: 'slideUp 0.28s ease',
        maxHeight: '92%', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '22px 24px 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ ...T.h2, color: C.dark }}>Add New Item</span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <CloseIcon />
            </button>
          </div>
        </div>

        <div style={{ overflowY: 'auto', padding: '0 24px 40px', flex: 1 }}>
          <div style={{ display: 'flex', gap: 14, marginBottom: 22, alignItems: 'flex-start' }}>
            <ItemPreview cat={cat} color={color} name={name} imgSrc={imgSrc} />
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              style={{
                flex: 1, minHeight: 120, borderRadius: 14, cursor: 'pointer',
                border: `2px dashed ${dragOver ? C.primary : 'rgba(220,192,191,0.55)'}`,
                background: dragOver ? 'rgba(250,135,135,0.05)' : 'rgba(241,243,255,0.5)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.18s',
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <CameraIcon size={22} color={C.primary} />
              </div>
              <span style={{ ...T.caption, fontWeight: 700, color: C.muted, textAlign: 'center', lineHeight: 1.4 }}>
                {imgSrc ? 'Change photo' : 'Upload photo'}
              </span>
              {imgSrc && (
                <button onClick={e => { e.stopPropagation(); setImgSrc(null); }} style={{
                  background: 'none', border: `1px solid ${C.border}`, borderRadius: 999,
                  padding: '3px 10px', cursor: 'pointer', ...T.caption, color: C.muted,
                }}>Remove</button>
              )}
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            </div>
          </div>

          <label style={{ ...T.caption, fontWeight: 700, color: C.secondary, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Item Name</label>
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. White Linen Shirt"
            style={{
              width: '100%', padding: '13px 16px', borderRadius: 14,
              border: `1.5px solid ${name ? C.primary : C.border}`,
              ...T.body, color: C.dark, background: C.cardBg,
              outline: 'none', marginBottom: 18, transition: 'border 0.2s',
            }}
          />

          <label style={{ ...T.caption, fontWeight: 700, color: C.secondary, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Category</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
            {CATS.map(c => <Pill key={c} active={cat === c} onClick={() => setCat(c)} small>{c}</Pill>)}
          </div>

          <label style={{ ...T.caption, fontWeight: 700, color: C.secondary, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Color</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 26 }}>
            {COLORS.map(col => {
              const hex = COLOR_HEX[col] || '#ccc';
              const isActive = color === col;
              return (
                <button key={col} onClick={() => setColor(col)} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '5px 10px 5px 6px', borderRadius: 999, cursor: 'pointer',
                  background: isActive ? 'rgba(250,135,135,0.08)' : C.white,
                  border: isActive ? `2px solid ${C.primary}` : `1.5px solid ${C.border}`,
                  transition: 'all 0.15s',
                }}>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: hex, display: 'inline-block', flexShrink: 0, boxShadow: '0 0 0 1px rgba(0,0,0,0.1)' }}/>
                  <span style={{ ...T.caption, fontWeight: 600, color: isActive ? C.primary : C.secondary }}>{col}</span>
                </button>
              );
            })}
          </div>

          <label style={{ ...T.caption, fontWeight: 700, color: C.secondary, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Occasion</label>
          <p style={{ ...T.caption, color: C.muted, marginBottom: 10 }}>Select all that apply</p>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 26 }}>
            {OCCASIONS.map(({ label, emoji }) => {
              const active = occasions.includes(label);
              return (
                <button key={label} onClick={() => setOccasions(prev => prev.includes(label) ? prev.filter(o => o !== label) : [...prev, label])} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '7px 12px', borderRadius: 999, cursor: 'pointer',
                  background: active ? 'rgba(250,135,135,0.1)' : C.white,
                  border: active ? `2px solid ${C.primary}` : `1.5px solid ${C.border}`,
                  transition: 'all 0.16s',
                  boxShadow: active ? '0 2px 8px rgba(250,135,135,0.2)' : 'none',
                }}>
                  <span style={{ fontSize: 13, lineHeight: 1 }}>{emoji}</span>
                  <span style={{ ...T.caption, fontWeight: 700, color: active ? C.primary : C.secondary }}>{label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => { if (name.trim()) { onAdd({ name: name.trim(), cat, color, imgSrc, occasions }); onClose(); } }}
            style={{
              width: '100%', padding: '16px', borderRadius: 999, border: 'none',
              background: name.trim() ? C.primary : '#DDD',
              color: C.white, ...T.h4, fontSize: 16,
              cursor: name.trim() ? 'pointer' : 'not-allowed',
              boxShadow: name.trim() ? '0 6px 18px rgba(250,135,135,0.35)' : 'none',
              transition: 'all 0.2s',
            }}
          >Add to Wardrobe</button>
        </div>
      </div>
    </div>
  );
};
