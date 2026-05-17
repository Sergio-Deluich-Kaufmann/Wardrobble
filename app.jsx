// ── App root ─────────────────────────────────────────────────────
let _nextId = 1;
const uid = () => _nextId++;

const INITIAL_WARDROBE = [];

const INITIAL_SAVED = [];

const ls = {
  get: (k, fallback) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set: (k, v)        => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

const App = () => {
  const [onboarded, setOnboarded] = useState(() => ls.get('wrd_onboarded', false));
  const [tab,       setTab]       = useState(() => ls.get('wrd_tab', 'shuffle'));
  const [wardrobe,  setWardrobe]  = useState(() => ls.get('wrd_wardrobe', INITIAL_WARDROBE));
  const [saved,     setSaved]     = useState(() => ls.get('wrd_saved',    INITIAL_SAVED));

  useEffect(() => { ls.set('wrd_onboarded', onboarded); }, [onboarded]);
  useEffect(() => { ls.set('wrd_tab',       tab);        }, [tab]);

  const addItem = item => setWardrobe(prev => {
    const next = [...prev, { ...item, id: Date.now() }];
    ls.set('wrd_wardrobe', next);
    return next;
  });
  const deleteItem = id => setWardrobe(prev => {
    const next = prev.filter(i => i.id !== id);
    ls.set('wrd_wardrobe', next);
    return next;
  });
  const saveOutfit = outfit => setSaved(prev => {
    const next = [...prev, { ...outfit, id: Date.now() }];
    ls.set('wrd_saved', next);
    return next;
  });
  const deleteOutfit = id => setSaved(prev => {
    const next = prev.filter(o => o.id !== id);
    ls.set('wrd_saved', next);
    return next;
  });

  const handleOnboardingComplete = () => {
    setOnboarded(true);
    setTab('wardrobe');
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: 'inherit' }}>
      {!onboarded ? (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      ) : (
        <>
          {tab === 'shuffle'  && <ShuffleScreen  items={wardrobe} onSaveOutfit={saveOutfit}  savedCount={saved.length} />}
          {tab === 'wardrobe' && <WardrobeScreen items={wardrobe} onDelete={deleteItem}       onAdd={addItem} />}
          {tab === 'saved'    && <SavedScreen    outfits={saved}  onDelete={deleteOutfit} wardrobe={wardrobe} onSaveOutfit={saveOutfit} />}
          <BottomNav active={tab} onChange={setTab} />
        </>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
