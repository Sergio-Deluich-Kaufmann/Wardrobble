import { useState, useEffect } from 'react';
import OnboardingScreen from './screens/OnboardingScreen';
import ShuffleScreen    from './screens/ShuffleScreen';
import WardrobeScreen   from './screens/WardrobeScreen';
import SavedScreen      from './screens/SavedScreen';
import { BottomNav }    from './components';

const ls = {
  get: (k, fallback) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set: (k, v)        => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

const App = () => {
  const [onboarded, setOnboarded] = useState(() => ls.get('wrd_onboarded', false));
  const [tab,       setTab]       = useState(() => ls.get('wrd_tab', 'shuffle'));
  const [wardrobe,  setWardrobe]  = useState(() => ls.get('wrd_wardrobe', []));
  const [saved,     setSaved]     = useState(() => ls.get('wrd_saved',    []));

  useEffect(() => { ls.set('wrd_onboarded', onboarded); }, [onboarded]);
  useEffect(() => { ls.set('wrd_tab',       tab);        }, [tab]);
  useEffect(() => { ls.set('wrd_wardrobe',  wardrobe);   }, [wardrobe]);
  useEffect(() => { ls.set('wrd_saved',     saved);      }, [saved]);

  const addItem     = item    => setWardrobe(w => [...w, { ...item, id: Date.now() }]);
  const deleteItem  = id      => setWardrobe(w => w.filter(i => i.id !== id));
  const saveOutfit  = outfit  => setSaved(s   => [...s, { ...outfit, id: Date.now() }]);
  const deleteOutfit = id     => setSaved(s   => s.filter(o => o.id !== id));

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
          {tab === 'saved'    && <SavedScreen    outfits={saved}  onDelete={deleteOutfit}     wardrobe={wardrobe} onSaveOutfit={saveOutfit} />}
          <BottomNav active={tab} onChange={setTab} />
        </>
      )}
    </div>
  );
};

export default App;
