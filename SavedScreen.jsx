// ── Saved Outfits Screen ─────────────────────────────────────────
const SavedOutfitCard = ({ outfit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered,  setHovered]  = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white, borderRadius: 18, overflow: 'hidden',
        boxShadow: hovered
          ? '0 8px 28px rgba(20,27,43,0.1)'
          : '0 2px 12px rgba(20,27,43,0.06)',
        marginBottom: 16, transition: 'box-shadow 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* 4-item image strip */}
      <div style={{ display: 'flex', height: 96, overflow: 'hidden' }}>
        {outfit.items.slice(0, 4).map((item, i) => (
          <div key={i} style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <ClothingPlaceholder
              category={item.category} color={item.color}
              width={100} height={96}
              style={{ width: '100%', height: '100%' }}
            />
            {/* Subtle divider */}
            {i < outfit.items.length - 1 && (
              <div style={{ position: 'absolute', right: 0, top: '15%', bottom: '15%', width: 1, background: 'rgba(255,255,255,0.5)' }} />
            )}
          </div>
        ))}
      </div>

      {/* Info row */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...T.h3, color: C.dark, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {outfit.name}
          </div>
          <div style={{ ...T.caption, color: C.muted }}>{outfit.date}</div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              padding: '6px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
              background: expanded ? C.cardBg2 : C.cardBg,
              ...T.caption, fontWeight: 700, color: C.secondary,
              transition: 'background 0.15s',
            }}
          >{expanded ? 'Less ↑' : 'Details'}</button>
          <button
            onClick={() => onDelete(outfit.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8 }}
          >
            <TrashIcon size={14} />
          </button>
        </div>
      </div>

      {/* Expandable item list */}
      {expanded && (
        <div style={{
          borderTop: `1px solid rgba(220,192,191,0.2)`,
          padding: '12px 16px 16px',
        }}>
          {outfit.items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 0',
              borderBottom: i < outfit.items.length - 1 ? '1px solid rgba(220,192,191,0.12)' : 'none',
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                <ClothingPlaceholder category={item.category} color={item.color} width={28} height={28} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...T.caption, fontWeight: 700, color: C.primary, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 1 }}>
                  {item.category}
                </div>
                <div style={{ ...T.bodySm, color: C.dark, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.name}
                </div>
              </div>
              <span style={{ ...T.caption, color: C.muted, flexShrink: 0 }}>{item.color}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Create Outfit Sheet ──────────────────────────────────────────
const CREATE_SLOTS = [
  { key: 'Tops',      label: 'Top'        },
  { key: 'Bottoms',   label: 'Bottoms'    },
  { key: 'Shoes',     label: 'Footwear'   },
  { key: 'Accessory', label: 'Accessory'  },
];

const CreateOutfitSheet = ({ wardrobe, onClose, onSave, defaultName }) => {
  const [name,      setName]      = useState(defaultName || '');
  const [selection, setSelection] = useState({});

  const pick = (slotKey, item) => setSelection(prev => ({
    ...prev,
    [slotKey]: prev[slotKey]?.id === item.id ? null : item,
  }));

  const chosen = CREATE_SLOTS.map(s => selection[s.key]).filter(Boolean);
  const canSave = name.trim() && chosen.length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const items = chosen.map(i => ({
      category: i.category, color: i.color, name: i.name,
    }));
    const d = new Date();
    const date = `Saved ${d.toLocaleString('en-US', { month: 'long' })} ${d.getDate()}, ${d.getFullYear()}`;
    onSave({ name: name.trim(), date, items });
    onClose();
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
        {/* Header */}
        <div style={{ padding: '22px 24px 0', flexShrink: 0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 18 }}>
            <span style={{ ...T.h2, color: C.dark }}>Create Outfit</span>
            <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding: 4 }}>
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '0 24px 28px', flex: 1 }}>

          {/* Outfit name */}
          <label style={{ ...T.caption, fontWeight: 700, color: C.secondary, display:'block', marginBottom: 6, textTransform:'uppercase', letterSpacing:'0.8px' }}>Outfit Name</label>
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Sunday Brunch"
            style={{
              width: '100%', padding: '13px 16px', borderRadius: 14,
              border: `1.5px solid ${name ? C.dark : C.border}`,
              ...T.body, color: C.dark, background: C.cardBg,
              outline: 'none', marginBottom: 22, transition: 'border 0.2s',
            }}
          />

          {/* Slots */}
          {CREATE_SLOTS.map(slot => {
            const candidates = wardrobe.filter(i =>
              slot.key === 'Tops'    ? ['Tops','Outerwear'].includes(i.category) :
              slot.key === 'Bottoms' ? i.category === 'Bottoms' :
              i.category === slot.key
            );
            const picked = selection[slot.key];
            return (
              <div key={slot.key} style={{ marginBottom: 18 }}>
                <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 8 }}>
                  <label style={{ ...T.caption, fontWeight: 700, color: C.secondary, textTransform:'uppercase', letterSpacing:'0.8px' }}>{slot.label}</label>
                  {picked && (
                    <span style={{ ...T.caption, color: C.dark, fontWeight: 600 }}>{picked.name}</span>
                  )}
                </div>
                {candidates.length === 0 ? (
                  <div style={{
                    padding: '14px', borderRadius: 12, background: C.cardBg,
                    ...T.caption, color: C.muted, textAlign:'center',
                  }}>No {slot.label.toLowerCase()} in your wardrobe yet.</div>
                ) : (
                  <div style={{ display:'flex', gap: 8, overflowX:'auto', paddingBottom: 4 }}>
                    {candidates.map(item => {
                      const isOn = picked?.id === item.id;
                      return (
                        <button key={item.id} onClick={() => pick(slot.key, item)} style={{
                          flexShrink: 0, width: 72, padding: 0, borderRadius: 12,
                          background: C.white, cursor: 'pointer', overflow: 'hidden',
                          border: isOn ? `2px solid ${C.dark}` : `1.5px solid ${C.border}`,
                          boxShadow: isOn ? '0 4px 14px rgba(20,27,43,0.18)' : 'none',
                          transition: 'all 0.15s',
                        }}>
                          <div style={{ width: '100%', height: 64, overflow: 'hidden' }}>
                            {item.imgSrc ? (
                              <img src={item.imgSrc} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                            ) : (
                              <ClothingPlaceholder category={item.category} color={item.color} width={72} height={64} style={{ width:'100%', height:'100%' }} />
                            )}
                          </div>
                          <div style={{ padding: '5px 4px 6px', ...T.caption, fontWeight: 600, color: C.dark, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', textAlign:'center' }}>
                            {item.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* CTA */}
          <button
            onClick={handleSave}
            disabled={!canSave}
            style={{
              width: '100%', padding: '16px', borderRadius: 999, border: 'none',
              background: canSave ? C.dark : '#DDD',
              color: C.white, ...T.h4, fontSize: 16,
              cursor: canSave ? 'pointer' : 'not-allowed',
              marginTop: 6, transition: 'all 0.2s',
            }}
          >Save Outfit{chosen.length ? ` · ${chosen.length} item${chosen.length>1?'s':''}` : ''}</button>
        </div>
      </div>
    </div>
  );
};

const SavedScreen = ({ outfits, onDelete, wardrobe = [], onSaveOutfit }) => {
  const [search, setSearch] = useState('');
  const [sort,   setSort]   = useState('recent');
  const [creating, setCreating] = useState(false);

  const visible = outfits
    .filter(o => o.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'recent' ? b.id - a.id : a.name.localeCompare(b.name));

  return (
    <div style={{ position: 'absolute', inset: 0, background: C.bg }}>
      <TopAppBar />

      <div style={{ position: 'absolute', top: 64, bottom: 80, left: 0, right: 0, overflowY: 'auto', padding: '24px 16px 24px' }}>
        <SectionHeader title="Saved Outfits" />
        <p style={{ ...T.body, color: C.secondary, marginTop: -12, marginBottom: 18 }}>Your curated style archive</p>

        {/* Search + sort */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 22, alignItems: 'center' }}>
          {/* Search field */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
            background: C.cardBg, borderRadius: 999, padding: '10px 14px',
            border: '1px solid rgba(220,192,191,0.15)',
          }}>
            <SearchIcon size={14} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search archive…"
              style={{
                border: 'none', background: 'transparent', outline: 'none',
                ...T.body, color: C.dark, width: '100%',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <CloseIcon size={14} color={C.muted} />
              </button>
            )}
          </div>
          {/* Sort buttons */}
          <button onClick={() => setSort('recent')} style={{
            padding: '9px 13px', borderRadius: 999, border: 'none', cursor: 'pointer',
            background: sort === 'recent' ? C.primary : C.white,
            border: sort !== 'recent' ? `1px solid rgba(220,192,191,0.25)` : 'none',
            color: sort === 'recent' ? C.white : C.secondary,
            ...T.labelSm, whiteSpace: 'nowrap',
            boxShadow: sort === 'recent' ? '0 2px 10px rgba(250,135,135,0.28)' : 'none',
            transition: 'all 0.18s',
          }}>RECENT</button>
          <button onClick={() => setSort('alpha')} style={{
            padding: '9px 13px', borderRadius: 999, border: 'none', cursor: 'pointer',
            background: sort === 'alpha' ? C.primary : C.white,
            border: sort !== 'alpha' ? `1px solid rgba(220,192,191,0.25)` : 'none',
            color: sort === 'alpha' ? C.white : C.secondary,
            ...T.labelSm, whiteSpace: 'nowrap',
            boxShadow: sort === 'alpha' ? '0 2px 10px rgba(250,135,135,0.28)' : 'none',
            transition: 'all 0.18s',
          }}>A–Z</button>
        </div>

        {/* Create outfit — full-width minimal CTA */}
        <button
          onClick={() => setCreating(true)}
          onMouseEnter={e => { e.currentTarget.style.background = C.cardBg; e.currentTarget.style.borderColor = C.dark; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.white;   e.currentTarget.style.borderColor = 'rgba(20,27,43,0.18)'; }}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 16px', borderRadius: 14, marginBottom: 18,
            background: C.white,
            border: '1px solid rgba(20,27,43,0.18)',
            color: C.dark, cursor: 'pointer',
            ...T.h4, fontSize: 13, letterSpacing: '0.2px',
            transition: 'background 0.15s, border-color 0.15s',
          }}
        >
          <PlusIcon size={12} color={C.dark} />
          <span>Create Outfit</span>
        </button>

        {/* Cards */}
        {visible.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🗂</div>
            <p style={{ ...T.body, color: C.muted }}>
              {outfits.length === 0
                ? 'No saved outfits yet.\nShuffle and save your first look!'
                : 'No outfits match your search.'}
            </p>
          </div>
        ) : visible.map(outfit => (
          <SavedOutfitCard key={outfit.id} outfit={outfit} onDelete={onDelete} />
        ))}
      </div>

      {creating && (
        <CreateOutfitSheet
          wardrobe={wardrobe}
          defaultName={`Look #${outfits.length + 1}`}
          onClose={() => setCreating(false)}
          onSave={onSaveOutfit}
        />
      )}
    </div>
  );
};

Object.assign(window, { SavedScreen });
