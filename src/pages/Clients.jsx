import { useRef, useEffect, useState } from 'react'

/* ══ HOOKS ══ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('rv'); obs.unobserve(el) }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ══ REVEAL WRAPPER ══ */
function R({ as: T = 'div', cls = '', delay = 0, style = {}, children, ...rest }) {
  const ref = useReveal()
  return (
    <T ref={ref} className={`rv-wrap ${cls}`} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </T>
  )
}

/* ══ ANIMATED BG ══ */
function Bg({ count = 12 }) {
  const pts = Array.from({ length: count }, (_, i) => ({
    id: i, size: 1.5 + (i % 3) * 1.1,
    left: (i * 61.8) % 100, delay: (i * 0.9) % 12,
    dur: 16 + (i % 6) * 3, drift: 18 + (i % 5) * 10,
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div className="bg-mesh" style={{ position: 'absolute', inset: 0 }} />
      <div className="bg-grid" style={{ position: 'absolute', inset: 0 }} />
      {pts.map(p => (
        <span key={p.id} className="bg-dot" style={{
          left: `${p.left}%`, width: p.size, height: p.size,
          animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
          '--d': `${p.drift}px`,
        }} />
      ))}
    </div>
  )
}

/* ══ SVG ICONS (inline, no image files needed) ══ */
const iconProps = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

const Icons = {
  healthcare: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      <line x1="12" y1="8" x2="12" y2="14" />
      <line x1="9" y1="11" x2="15" y2="11" />
    </svg>
  ),
  education: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
    </svg>
  ),
  cart: (p) => (
    <svg {...iconProps} {...p}>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  factory: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M2 22V11l6 4V11l6 4V11l6 4v7H2z" />
      <line x1="2" y1="22" x2="22" y2="22" />
    </svg>
  ),
  finance: (p) => (
    <svg {...iconProps} {...p}>
      <rect x="2" y="6" width="20" height="14" rx="2" />
      <line x1="2" y1="11" x2="22" y2="11" />
      <line x1="6" y1="15" x2="9" y2="15" />
    </svg>
  ),
  home: (p) => (
    <svg {...iconProps} {...p}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  truck: (p) => (
    <svg {...iconProps} {...p}>
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  hospitality: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-5 7 5v13" />
      <path d="M9 21v-6h6v6" />
    </svg>
  ),
  code: (p) => (
    <svg {...iconProps} {...p}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  rocket: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15c4-1 8-4.5 9.5-9.5C21.5 5 21.5 2.5 21.5 2.5S19 2.5 18.5 2.5C13.5 4 10 8 9 12l3 3z" />
      <path d="M9 12c-1.5-.5-3.5 0-4.5 1.5C3.5 15 3 18 3 18s3-.5 4.5-1.5C9 15.5 9.5 13.5 9 12z" />
    </svg>
  ),
  check: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  clock: (p) => (
    <svg {...iconProps} {...p}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  chat: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  dollar: (p) => (
    <svg {...iconProps} {...p}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  wrench: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-3-3 2.5-2.5z" />
    </svg>
  ),
  heart: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
}

function Icon({ name, size = 24, color = '#fff' }) {
  const Cmp = Icons[name]
  return Cmp ? Cmp({ width: size, height: size, style: { color } }) : null
}

/* ══ DATA ══ */
const INDUSTRIES = [
  { icon: 'healthcare',  label: 'Healthcare',             bg: 'rgba(239,68,68,0.12)',   accent: '#ef4444' },
  { icon: 'education',   label: 'Education',              bg: 'rgba(234,179,8,0.12)',   accent: '#eab308' },
  { icon: 'cart',        label: 'Retail & E-Commerce',    bg: 'rgba(56,189,248,0.12)',  accent: '#38bdf8' },
  { icon: 'factory',     label: 'Manufacturing',          bg: 'rgba(108,99,255,0.12)',  accent: '#6c63ff' },
  { icon: 'finance',     label: 'Finance',                bg: 'rgba(34,197,94,0.12)',   accent: '#22c55e' },
  { icon: 'home',        label: 'Real Estate',            bg: 'rgba(249,115,22,0.12)',  accent: '#f97316' },
  { icon: 'truck',       label: 'Logistics',              bg: 'rgba(20,184,166,0.12)',  accent: '#14b8a6' },
  { icon: 'hospitality', label: 'Hospitality',            bg: 'rgba(236,72,153,0.12)',  accent: '#ec4899' },
  { icon: 'code',        label: 'Information Technology', bg: 'rgba(56,189,248,0.12)',  accent: '#38bdf8' },
  { icon: 'rocket',      label: 'Startups',                bg: 'rgba(108,99,255,0.12)', accent: '#818cf8' },
]

const TRUST = [
  { icon: 'check', title: 'High-Quality Development',  desc: 'Rigorous code reviews and QA at every stage of the build.',     color: '#10b981' },
  { icon: 'clock', title: 'On-Time Delivery',           desc: 'We respect your deadlines — structured sprints, no surprises.',  color: '#38bdf8' },
  { icon: 'chat',  title: 'Transparent Communication',  desc: 'Regular updates and clear reporting throughout the engagement.', color: '#818cf8' },
  { icon: 'dollar',title: 'Cost-Effective',             desc: 'Enterprise-grade results without the bloated agency overhead.',  color: '#f59e0b' },
  { icon: 'wrench',title: 'Long-Term Support',          desc: 'We stay with you well beyond launch — ongoing partnerships.',    color: '#6c63ff' },
  { icon: 'heart', title: 'Client-Centric',             desc: 'Your goals define how we scope, prioritize, and execute.',      color: '#f43f5e' },
]

const TESTIMONIALS = [
  { name: 'Rajesh Sharma',  role: 'CTO, FinEdge Solutions',  avatar: 'RS', stars: 5, text: 'MBP Digital transformed our legacy infrastructure into a modern cloud-native platform. Professional, on-time, and went above and beyond at every stage.' },
  { name: 'Priya Mehta',    role: 'VP Engineering, HealthFirst', avatar: 'PM', stars: 5, text: 'Their AI integration cut our data processing time by 60%. The cybersecurity team was especially sharp — zero incidents since deployment.' },
  { name: 'Ankit Verma',    role: 'Director, LogiTech India', avatar: 'AV', stars: 5, text: 'SAP implementation completed on schedule with zero downtime. The post-launch support has been outstanding. Truly a partner, not just a vendor.' },
]

/* ══ MAIN ══ */
export default function Clients() {
  const [activeT, setActiveT] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveT(i => (i + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rv-wrap { opacity: 0; transform: translateY(22px); transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1); }
        .rv-wrap.rv { opacity: 1; transform: translateY(0); }

        .wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        @media(min-width:1024px){ .wrap { padding: 0 48px; } }
        .sec { padding: 88px 0; }
        @media(max-width:768px){ .sec { padding: 56px 0; } }

        .label { display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 14px; border-radius: 999px; margin-bottom: 14px; }
        .label-blue   { background: rgba(56,189,248,0.1);  color: #38bdf8; border: 1px solid rgba(56,189,248,0.2);  }
        .label-purple { background: rgba(129,140,248,0.1); color: #818cf8; border: 1px solid rgba(129,140,248,0.2); }
        .label-green  { background: rgba(16,185,129,0.1);  color: #10b981; border: 1px solid rgba(16,185,129,0.2);  }
        .label-amber  { background: rgba(245,158,11,0.1);  color: #f59e0b; border: 1px solid rgba(245,158,11,0.2);  }

        .div-line { width: 48px; height: 3px; border-radius: 2px; margin: 14px auto 0; }

        .btn { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; padding: 13px 30px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; cursor: pointer; border: none; transition: opacity 0.2s, transform 0.2s; }
        .btn::after { content:''; position:absolute; top:0; left:-75%; width:50%; height:100%; background:linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent); transform:skewX(-20deg); transition:left 0.55s ease; }
        .btn:hover::after { left:125%; }
        .btn:hover { transform: translateY(-1px); }
        .btn-sky { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #fff; box-shadow: 0 4px 20px rgba(56,189,248,0.3); }
        .btn-sky:hover { box-shadow: 0 6px 28px rgba(56,189,248,0.45); }
        .btn-ghost { background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.16); color: #fff; }
        .btn-ghost:hover { background: rgba(255,255,255,0.12); }

        @keyframes meshDrift { 0%,100%{background-position:0% 0%,100% 100%,50% 50%}50%{background-position:100% 50%,0% 50%,60% 40%} }
        .bg-mesh { background-image: radial-gradient(circle at 20% 30%, rgba(56,189,248,0.12), transparent 44%), radial-gradient(circle at 80% 70%, rgba(108,99,255,0.11), transparent 44%), radial-gradient(circle at 50% 50%, rgba(236,72,153,0.05), transparent 54%); background-size:180% 180%,180% 180%,160% 160%; animation:meshDrift 22s ease-in-out infinite; }
        @keyframes gridScroll { from{background-position:0 0}to{background-position:60px 60px} }
        .bg-grid { background-image:linear-gradient(rgba(255,255,255,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.032) 1px,transparent 1px); background-size:60px 60px; animation:gridScroll 26s linear infinite; }
        @keyframes ptRise { 0%{transform:translate(0,0) scale(0.4);opacity:0}10%{opacity:0.7}90%{opacity:0.4}100%{transform:translate(var(--d),-100vh) scale(0.7);opacity:0} }
        .bg-dot { position:absolute; bottom:-6px; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.8),transparent); animation-name:ptRise; animation-timing-function:ease-in-out; animation-iteration-count:infinite; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        .h-in1 { animation: fadeUp 0.7s  ease-out 0.05s both; }
        .h-in2 { animation: fadeUp 0.75s ease-out 0.18s both; }
        .h-in3 { animation: fadeUp 0.75s ease-out 0.32s both; }
        .h-in4 { animation: fadeUp 0.75s ease-out 0.46s both; }

        @keyframes gshift { 0%,100%{background-position:0% 50%}50%{background-position:100% 50%} }
        .grad { background-size:200% auto; animation:gshift 5s ease-in-out infinite; }

        @keyframes bA { 0%,100%{transform:translate(-50%,0) scale(1)}50%{transform:translate(-50%,-18px) scale(1.07)} }
        @keyframes bB { 0%,100%{transform:scale(1)}50%{transform:translate(14px,14px) scale(1.09)} }
        .blob-a { animation: bA 10s ease-in-out infinite; }
        .blob-b { animation: bB 13s ease-in-out infinite; }

        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(56,189,248,0.4)}70%{box-shadow:0 0 0 14px rgba(56,189,248,0)} }
        .pulse { animation: pulse 2.6s ease-out infinite; }

        .card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s; }
        .card:hover { transform: translateY(-5px); }

        .ind { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.25s; }
        .ind:hover { transform: translateY(-4px); }
        .ind .ind-i { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .ind:hover .ind-i { transform: rotate(7deg) scale(1.12); }

        .tcard { transition: opacity 0.5s ease, transform 0.5s ease; }
        .tcard.inactive { opacity: 0; transform: translateX(30px); pointer-events: none; position: absolute; }
        .tcard.active   { opacity: 1; transform: translateX(0);    position: relative; }

        @media(prefers-reduced-motion:reduce){ *, *::before, *::after { animation:none!important; transition:none!important; } .rv-wrap { opacity:1!important; transform:none!important; } }
      `}</style>

      {/* ══ HERO ══ */}
      <section style={{ minHeight: '60vh', background: '#05080f', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
        <Bg count={20} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div className="blob-a" style={{ position: 'absolute', top: '20%', left: '50%', width: 'min(600px,90vw)', height: 'min(500px,55vh)', background: 'rgba(108,99,255,0.07)', borderRadius: '50%', filter: 'blur(90px)' }} />
          <div className="blob-b" style={{ position: 'absolute', bottom: 0, right: 0, width: 340, height: 340, background: 'rgba(56,189,248,0.06)', borderRadius: '50%', filter: 'blur(70px)' }} />
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', padding: '80px 24px' }}>
          <span className="h-in1 label label-purple">Who We Work With</span>
          <h1 className="h-in2" style={{ fontSize: 'clamp(2rem,6vw,4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 6 }}>
            Our
          </h1>
          <h1 className="h-in2 grad" style={{
            fontSize: 'clamp(2rem,6vw,4rem)', fontWeight: 900, lineHeight: 1.08,
            letterSpacing: '-0.025em', marginBottom: 24,
            background: 'linear-gradient(135deg, #6c63ff 0%, #38bdf8 50%, #818cf8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Clients</h1>
          <p className="h-in3" style={{ fontSize: 'clamp(0.95rem,2.2vw,1.1rem)', color: '#94a3b8', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75 }}>
            We are proud to work with businesses across various industries, helping them achieve digital success through innovative technology solutions.
          </p>
          <div className="h-in4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="./contact" className="btn btn-sky pulse">Work With Us</a>
            <a href="#industries" className="btn btn-ghost">See Industries ↓</a>
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES ══ */}
      <section id="industries" className="sec" style={{ background: '#080d1a', position: 'relative', overflow: 'hidden' }}>
        <Bg count={12} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label label-purple">Sectors</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Industries We Serve</h2>
            <p style={{ color: '#64748b', fontSize: 14.5, maxWidth: 480, margin: '0 auto' }}>We partner with businesses across a wide range of sectors to deliver digital transformation.</p>
            <div className="div-line" style={{ background: 'linear-gradient(90deg,#6c63ff,#38bdf8)' }} />
          </R>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))', gap: 14 }}>
            {INDUSTRIES.map((ind, i) => (
              <R key={ind.label} delay={(i % 5) * 55}>
                <div className="ind" style={{
                  background: '#0d1324', border: '1px solid rgba(108,99,255,0.15)',
                  borderRadius: 16, padding: '20px 14px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${ind.accent}55`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(108,99,255,0.15)'}
                >
                  <div className="ind-i" style={{
                    width: 50, height: 50, borderRadius: 12,
                    background: ind.bg, color: ind.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name={ind.icon} size={24} color={ind.accent} />
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: 12.5, fontWeight: 600, textAlign: 'center', lineHeight: 1.4 }}>{ind.label}</span>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CLIENTS TRUST US ══ */}
      <section className="sec" style={{ background: '#05080f', position: 'relative', overflow: 'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label label-blue">Our Promise</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Why Clients Trust Us</h2>
            <p style={{ color: '#64748b', fontSize: 14.5, maxWidth: 440, margin: '0 auto' }}>Trusted by businesses for reliable, enterprise-grade digital solutions.</p>
            <div className="div-line" style={{ background: 'linear-gradient(90deg,#38bdf8,#818cf8)' }} />
          </R>

          {/* Outer card wrapper */}
          <R>
            <div style={{
              background: '#0d1324', border: '1px solid rgba(108,99,255,0.18)',
              borderRadius: 24, padding: 'clamp(24px,4vw,44px)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 14 }}>
                {TRUST.map((t, i) => (
                  <div key={t.title} style={{
                    background: '#05080f', border: '1px solid rgba(108,99,255,0.12)',
                    borderRadius: 14, padding: '18px 18px',
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    transition: 'border-color 0.25s, transform 0.28s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${t.color}44`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: `${t.color}18`, border: `1px solid ${t.color}33`, color: t.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name={t.icon} size={18} color={t.color} />
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 5 }}>{t.title}</div>
                      <div style={{ color: '#64748b', fontSize: 12.5, lineHeight: 1.65 }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="sec" style={{ background: '#080d1a', position: 'relative', overflow: 'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label label-green">Client Stories</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>What Our Clients Say</h2>
            <div className="div-line" style={{ background: 'linear-gradient(90deg,#10b981,#38bdf8)' }} />
          </R>

          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ position: 'relative', minHeight: 240 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={t.name} className={`tcard ${i === activeT ? 'active' : 'inactive'}`}
                  style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16,185,129,0.18)',
                    borderRadius: 20, padding: 'clamp(24px,4vw,40px)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
                    {Array(t.stars).fill(0).map((_, si) => (
                      <span key={si} style={{ color: '#f59e0b', fontSize: 16 }}>★</span>
                    ))}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: 15.5, lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: 'linear-gradient(135deg,#6c63ff,#38bdf8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, color: '#fff', fontSize: 14, flexShrink: 0,
                    }}>{t.avatar}</div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                      <div style={{ color: '#64748b', fontSize: 12.5 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveT(i)} style={{
                  width: i === activeT ? 24 : 8, height: 8,
                  borderRadius: 4, border: 'none', cursor: 'pointer',
                  background: i === activeT ? '#10b981' : 'rgba(255,255,255,0.2)',
                  transition: 'width 0.35s ease, background 0.3s',
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="sec" style={{ background: '#05080f', position: 'relative', overflow: 'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{
            maxWidth: 660, margin: '0 auto', textAlign: 'center',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: 28, padding: 'clamp(36px,6vw,64px)',
          }}>
            <span className="label label-purple">Partner With Us</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
              Ready to Become<br />Our Next Success Story?
            </h2>
            <p style={{ color: '#64748b', fontSize: 14.5, lineHeight: 1.75, marginBottom: 36 }}>
              Let's discuss how we can help your business grow. Get in touch with our team today.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-sky pulse" style={{ textDecoration: 'none' }}>Start a Project</a>
              <a href="mailto:hr@mpbdigi.in" className="btn btn-ghost" style={{ textDecoration: 'none' }}>hr@mpbdigi.in</a>
            </div>
          </R>
        </div>
      </section>
    </>
  )
}