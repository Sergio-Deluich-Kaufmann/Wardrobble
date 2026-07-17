import { C, T } from '../tokens';
import { PlusIcon } from '../icons';

const FEATURES = [
  {
    num: '01', title: 'Shuffle',
    desc: 'Let serendipity dress you. Tap shuffle to generate a fresh outfit from your wardrobe — lock favourite pieces while the rest gets remixed.',
  },
  {
    num: '02', title: 'Wardrobe',
    desc: 'Your entire closet, digitized. Add items, tag categories and colours, then browse your full collection anytime.',
  },
  {
    num: '03', title: 'Saved',
    desc: 'Found a perfect combo? Save it to your archive and revisit your best looks whenever you need inspiration.',
  },
];

const OnboardingScreen = ({ onComplete }) => (
  <div style={{ position: 'absolute', inset: 0, background: C.bg }}>
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 64, zIndex: 10,
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderBottom: '1px solid rgba(220,192,191,0.1)',
    }}>
      <span style={{ ...T.logo, color: C.darkAlt }}>Wardrobble</span>
    </div>

    <div style={{ position: 'absolute', top: 64, bottom: 0, left: 0, right: 0, overflowY: 'auto', padding: '28px 24px 52px' }}>

      <div style={{ marginBottom: 36 }}>
        <div style={{ ...T.h1, color: C.dark, fontSize: 36, marginBottom: 8 }}>Welcome!</div>
        <div style={{ ...T.body, color: C.secondary }}>Your personal style, digitally curated.</div>
      </div>

      {FEATURES.map((f, i) => (
        <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 28, alignItems: 'flex-start' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14, background: C.cardBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: '0 2px 8px rgba(20,27,43,0.06)',
          }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 13, color: C.primary }}>
              {f.num}
            </span>
          </div>
          <div style={{ paddingTop: 2 }}>
            <div style={{ ...T.h3, color: C.dark, marginBottom: 5 }}>{f.title}</div>
            <div style={{ ...T.body, fontSize: 13, color: C.secondary }}>{f.desc}</div>
          </div>
        </div>
      ))}

      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.border}66, transparent)`, margin: '8px 0 28px' }} />

      <button onClick={onComplete} style={{
        width: '100%', padding: '18px 0', borderRadius: 999, border: 'none',
        background: C.primary, color: C.white, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18,
        boxShadow: 'none',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}>
        <PlusIcon size={18} color={C.white} />
        Add Your First Item
      </button>

      <p style={{ textAlign: 'center', ...T.caption, color: C.muted, marginTop: 16 }}>
        Your data stays on your device
      </p>
    </div>
  </div>
);

export default OnboardingScreen;
