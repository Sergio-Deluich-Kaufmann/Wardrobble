// ── Shuffle Screen ───────────────────────────────────────────────
const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];

// ── Color theory scoring ─────────────────────────────────────────
const NEUTRALS        = new Set(['White', 'Black', 'Gray', 'Beige', 'Ivory', 'Silver']);
const WARM            = new Set(['Red', 'Burgundy', 'Pink', 'Orange', 'Yellow', 'Gold']);
const COOL            = new Set(['Blue', 'Navy', 'Sky Blue', 'Green', 'Purple']);
const COMPLEMENTARY   = {
  Blue:      ['Orange', 'Brown', 'Beige'],
  Navy:      ['Beige', 'White', 'Brown', 'Orange'],
  'Sky Blue':['Orange', 'Brown'],
  Green:     ['Red', 'Burgundy', 'Pink'],
  Purple:    ['Yellow', 'Beige', 'White'],
  Yellow:    ['Purple', 'Navy'],
  Red:       ['Green', 'Navy'],
  Orange:    ['Blue', 'Navy'],
  Pink:      ['Navy', 'Gray', 'Green'],
  Burgundy:  ['Green', 'Beige', 'Ivory'],
  Brown:     ['Blue', 'Sky Blue', 'Navy'],
};
const ANALOGOUS = {
  Blue:      ['Navy', 'Sky Blue', 'Purple'],
  Navy:      ['Blue', 'Purple'],
  'Sky Blue':['Blue', 'Green'],
  Red:       ['Burgundy', 'Orange', 'Pink'],
  Burgundy:  ['Red', 'Brown', 'Purple'],
  Green:     ['Sky Blue', 'Yellow'],
  Purple:    ['Blue', 'Burgundy', 'Pink'],
  Pink:      ['Purple', 'Red', 'Burgundy'],
  Brown:     ['Burgundy', 'Beige', 'Orange'],
  Beige:     ['Brown', 'Ivory', 'White'],
  Ivory:     ['Beige', 'White'],
  Yellow:    ['Orange', 'Green'],
  Orange:    ['Yellow', 'Red', 'Brown'],
};

const colorScore = (c1, c2) => {
  if (!c1 || !c2) return 2;
  if (c1 === c2) return 3;
  if (NEUTRALS.has(c1) || NEUTRALS.has(c2)) return 3;
  if (COMPLEMENTARY[c1]?.includes(c2) || COMPLEMENTARY[c2]?.includes(c1)) return 4;
  if (ANALOGOUS[c1]?.includes(c2) || ANALOGOUS[c2]?.includes(c1)) return 3;
  if ((WARM.has(c1) && WARM.has(c2)) || (COOL.has(c1) && COOL.has(c2))) return 2;
  return 1;
};

const weightedPick = (arr, scoreFn) => {
  if (!arr.length) return null;
  const weights = arr.map(item => Math.pow(2, scoreFn(item)));
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < arr.length; i++) {
    r -= weights[i];
    if (r <= 0) return arr[i];
  }
  return arr[arr.length - 1];
};

const generateOutfit = (items, locked, prev) => {
  const tops        = items.filter(i => ['Tops','Outerwear'].includes(i.category));
  const bottoms     = items.filter(i => i.category === 'Bottoms');
  const shoes       = items.filter(i => ['Shoes','Footwear'].includes(i.category));
  const accessories = items.filter(i => ['Accessory','Accessories'].includes(i.category));

  const top = locked?.top ? prev?.top
    : (tops.length ? pickRandom(tops) : null);

  const bottom = locked?.bottom ? prev?.bottom
    : weightedPick(bottoms, b => colorScore(top?.color, b.color));

  const shoe = locked?.shoes ? prev?.shoes
    : weightedPick(shoes, s => colorScore(top?.color, s.color) + colorScore(bottom?.color, s.color));

  const accessory = locked?.accessory ? prev?.accessory
    : (accessories.length ? pickRandom(accessories) : null);

  return { top, bottom, shoes: shoe, accessory };
};

const SLOT_LABELS = { top: 'Top', bottom: 'Bottoms', shoes: 'Footwear', accessory: 'Accessories' };

const OutfitSlot = ({ slotKey, item, locked, onToggleLock, animating }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <div style={{
      background: C.white, borderRadius: 16,
      boxShadow: locked
        ? `0 4px 20px rgba(250,135,135,0.15), inset 0 0 0 1.5px ${C.primary}30`
        : '0 4px 16px rgba(20,27,43,0.06)',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      opacity: animating ? 0.4 : 1,
      transform: animating ? 'scale(0.97)' : 'scale(1)',
      transition: 'all 0.22s ease',
    }}>
      {/* Visual area */}
      <div style={{ flex: '0 0 130px', position: 'relative', overflow: 'hidden' }}>
        {item ? (
          item.imgSrc
            ? <img src={item.imgSrc} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <ClothingPlaceholder category={item.category} color={item.color} width={200} height={130} style={{ width: '100%', height: '100%' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: C.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ ...T.caption, color: C.muted }}>None</span>
          </div>
        )}
        {/* Lock toggle */}
        <button
          onClick={() => onToggleLock(slotKey)}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          style={{
            position: 'absolute', top: 8, right: 8,
            width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: locked ? 'rgba(250,135,135,0.18)' : 'rgba(255,255,255,0.9)',
            border: locked ? `1.5px solid ${C.primary}` : '1px solid rgba(220,192,191,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'all 0.18s',
            transform: pressed ? 'scale(0.88)' : 'scale(1)',
            boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
          }}
        >
          {locked ? <LockIcon size={13} color={C.primary} /> : <UnlockIcon size={13} color={C.mutedLight} />}
        </button>
      </div>
      {/* Info */}
      <div style={{ padding: '10px 12px 13px' }}>
        <div style={{ ...T.label, fontSize: 9, color: C.secondary, marginBottom: 3, letterSpacing: '0.9px' }}>
          {SLOT_LABELS[slotKey].toUpperCase()}
        </div>
        <div style={{ ...T.h4, color: C.dark, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item ? item.name : '—'}
        </div>
        {item && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: COLOR_HEX[item.color] || '#ccc',
              boxShadow: '0 0 0 1.5px rgba(220,192,191,0.4)',
            }}/>
            <span style={{ ...T.caption, color: C.secondary }}>{item.color}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ShuffleScreen = ({ items, onSaveOutfit, savedCount }) => {
  const [outfit,    setOutfit]    = useState(() => generateOutfit(items));
  const [locked,    setLocked]    = useState({ top: false, bottom: false, shoes: false, accessory: false });
  const [animating, setAnimating] = useState(false);
  const [saved,     setSaved]     = useState(false);

  const handleShuffle = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setOutfit(prev => generateOutfit(items, locked, prev));
      setAnimating(false);
    }, 260);
  };

  const handleSave = () => {
    const outfitItems = [outfit.top, outfit.bottom, outfit.shoes, outfit.accessory].filter(Boolean);
    if (!outfitItems.length) return;
    onSaveOutfit({
      name: `Look #${savedCount + 1}`,
      date: `Saved April 21, 2026`,
      items: outfitItems,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const toggleLock = slot => setLocked(prev => ({ ...prev, [slot]: !prev[slot] }));

  return (
    <div style={{ position: 'absolute', inset: 0, background: C.bg }}>
      <TopAppBar />

      <div style={{ position: 'absolute', top: 64, bottom: 80, left: 0, right: 0, overflowY: 'auto', padding: '24px 16px 104px' }}>
        <SectionHeader eyebrow="DAILY SELECTION" title="Today's Look" />

        {/* 2×2 outfit grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
          {Object.keys(SLOT_LABELS).map(slot => (
            <OutfitSlot
              key={slot} slotKey={slot}
              item={outfit[slot]} locked={locked[slot]}
              onToggleLock={toggleLock} animating={animating}
            />
          ))}
        </div>

        {/* Lock hint */}
        <p style={{ ...T.caption, color: C.muted, textAlign: 'center', marginBottom: 20 }}>
          Tap 🔒 to lock items while shuffling the rest
        </p>

        {/* Save button */}
        <button onClick={handleSave} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '11px 22px', borderRadius: 999, border: 'none', cursor: 'pointer',
          background: saved ? '#52C97A' : C.primary,
          color: C.white, ...T.bodySm, fontWeight: 700,
          boxShadow: 'none',
          transition: 'all 0.28s ease',
        }}>
          <HeartIcon size={15} color={C.white} filled={saved} />
          {saved ? 'Saved to archive!' : 'Save Outfit'}
        </button>
      </div>

      {/* Shuffle FAB */}
      <button
        onClick={handleShuffle}
        style={{
          position: 'absolute', right: 20, bottom: 96,
          width: 56, height: 56, borderRadius: '50%',
          background: C.primary, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'none',
          zIndex: 90,
          transform: animating ? 'rotate(180deg) scale(0.92)' : 'rotate(0deg) scale(1)',
          transition: 'transform 0.28s ease',
        }}
      >
        <ShuffleIcon size={22} color={C.white} />
      </button>
    </div>
  );
};

Object.assign(window, { ShuffleScreen });
