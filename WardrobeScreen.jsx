// ── Wardrobe Screen ──────────────────────────────────────────────
const FILTER_CATS = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessory'];

const WardrobeCard = ({ item, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 14, background: C.white, overflow: 'hidden',
        boxShadow: hovered ? '0 6px 20px rgba(20,27,43,0.1)' : '0 2px 8px rgba(20,27,43,0.06)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all 0.18s ease', cursor: 'pointer', position: 'relative',
      }}
    >
      {/* Image area */}
      <div style={{ height: 118, position: 'relative', overflow: 'hidden' }}>
        {item.imgSrc ? (
          <img src={item.imgSrc} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <ClothingPlaceholder
            category={item.category} color={item.color}
            width={120} height={118}
            style={{ width: '100%', height: '100%' }}
          />
        )}
        {/* Delete button on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(20,27,43,0.04)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.18s',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
          padding: 6,
        }}>
          <button onClick={e => { e.stopPropagation(); onDelete(item.id); }} style={{
            width: 28, height: 28, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.14)',
          }}>
            <TrashIcon size={12} />
          </button>
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: '8px 9px 10px' }}>
        <div style={{
          ...T.h4, fontSize: 11, color: C.dark, marginBottom: 5,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{item.name}</div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Tag>{item.category}</Tag>
          <Tag>{item.color}</Tag>
        </div>
      </div>
    </div>
  );
};

const WardrobeScreen = ({ items, onDelete, onAdd }) => {
  const [filter, setFilter]     = useState('All');
  const [showAdd, setShowAdd]   = useState(false);

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter);

  return (
    <div style={{ position: 'absolute', inset: 0, background: C.bg }}>
      <TopAppBar />

      {/* Scrollable body */}
      <div style={{ position: 'absolute', top: 64, bottom: 80, left: 0, right: 0, overflowY: 'auto', padding: '24px 16px 20px' }}>
        <SectionHeader eyebrow="MY COLLECTION" title="Wardrobe" />

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 2 }}>
          {FILTER_CATS.map(cat => (
            <Pill key={cat} active={filter === cat} onClick={() => setFilter(cat)}>{cat}</Pill>
          ))}
        </div>

        {/* 3-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {filtered.map(item => (
            <WardrobeCard key={item.id} item={item} onDelete={onDelete} />
          ))}
          {/* Add placeholder card */}
          <button onClick={() => setShowAdd(true)} style={{
            borderRadius: 14, border: `2px dashed rgba(220,192,191,0.45)`,
            background: 'rgba(241,243,255,0.4)',
            minHeight: 164, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer', transition: 'background 0.15s',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', background: C.white,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}>
              <PlusIcon size={12} color={C.primary} />
            </div>
            <span style={{ ...T.caption, fontWeight: 700, color: C.mutedDark }}>Add New</span>
          </button>
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', ...T.body, color: C.muted, padding: '32px 0' }}>
            No items in this category yet.
          </p>
        )}
      </div>

      <FAB onClick={() => setShowAdd(true)}>
        <PlusIcon size={16} color={C.white} />
      </FAB>

      {showAdd && (
        <AddItemSheet
          onClose={() => setShowAdd(false)}
          onAdd={({ name, cat, color, imgSrc, occasions }) => onAdd({ name, category: cat, color, imgSrc, occasions })}
        />
      )}
    </div>
  );
};

Object.assign(window, { WardrobeScreen });
