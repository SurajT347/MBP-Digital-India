import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

function useCountUp(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let t0 = null
    const step = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(e * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return val
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

/* ══ SVG ICONS (no image files needed — pure inline SVG) ══ */
const iconProps = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

const Icons = {
  monitor: (p) => (
    <svg {...iconProps} {...p}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  cart: (p) => (
    <svg {...iconProps} {...p}>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  globe: (p) => (
    <svg {...iconProps} {...p}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  cloud: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6-1.5A4.5 4.5 0 0 0 6.5 19h11z" />
    </svg>
  ),
  code: (p) => (
    <svg {...iconProps} {...p}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  smartphone: (p) => (
    <svg {...iconProps} {...p}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  search: (p) => (
    <svg {...iconProps} {...p}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  shield: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M12 2 4 5v6c0 5.25 3.4 9.74 8 11 4.6-1.26 8-5.75 8-11V5l-8-3z" />
    </svg>
  ),
  mail: (p) => (
    <svg {...iconProps} {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  ),
  target: (p) => (
    <svg {...iconProps} {...p}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  wrench: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-3-3 2.5-2.5z" />
    </svg>
  ),
  chart: (p) => (
    <svg {...iconProps} {...p}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  developer: (p) => (
    <svg {...iconProps} {...p}>
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="m8 10 2 2-2 2" />
      <line x1="13" y1="14" x2="16" y2="14" />
    </svg>
  ),
  tools: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-3-3 2.5-2.5z" />
    </svg>
  ),
  trending: (p) => (
    <svg {...iconProps} {...p}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  headset: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  palette: (p) => (
    <svg {...iconProps} {...p}>
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2a10 10 0 1 0 10 10c0-1-1-2-2-2h-2.5a2.5 2.5 0 0 1 0-5H19a2 2 0 0 0 1.74-3A10 10 0 0 0 12 2z" />
    </svg>
  ),
  handshake: (p) => (
    <svg {...iconProps} {...p}>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  ),
  zap: (p) => (
    <svg {...iconProps} {...p}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
}

/* ══ ICON WRAPPER ══ */
function IconBox({ name, size = 28, color = '#38bdf8', style = {} }) {
  const IconCmp = Icons[name]
  return (
    <span style={{ display: 'inline-flex', color, ...style }}>
      {IconCmp && IconCmp({ width: size, height: size })}
    </span>
  )
}

/* ══ STAT CARD ══ */
function StatCard({ value, suffix, label, color = '#38bdf8' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const count = useCountUp(value, 1800, active)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.unobserve(el) }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="stat-card" style={{ textAlign: 'center', padding: '32px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(56,189,248,0.12)', borderRadius: 20, transition: 'border-color 0.3s, transform 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ fontSize: 'clamp(2.2rem,4.5vw,3.2rem)', fontWeight: 800, background: `linear-gradient(135deg, ${color}, #818cf8)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: 8 }}>
        {count}{suffix}
      </div>
      <div style={{ color: '#94a3b8', fontSize: 13.5, fontWeight: 500 }}>{label}</div>
    </div>
  )
}

/* ══ DATA (icon = key into Icons object) ══ */
const SERVICES = [
  { icon: 'monitor', title: 'Website Design & Development', desc: 'Beautiful, responsive websites built to convert visitors into customers.', color: '#38bdf8' },
  { icon: 'cart', title: 'E-Commerce', desc: 'Full-featured online stores with secure payments and smooth checkout flows.', color: '#818cf8' },
  { icon: 'globe', title: 'Domain Registration', desc: 'Register your perfect domain quickly and affordably with full DNS control.', color: '#10b981' },
  { icon: 'cloud', title: 'Web Hosting', desc: 'Reliable, fast, and secure hosting with 99.9% uptime guarantee.', color: '#f59e0b' },
  { icon: 'code', title: 'Software Development', desc: 'Custom software solutions tailored to your unique business processes.', color: '#f43f5e' },
  { icon: 'smartphone', title: 'Mobile App Development', desc: 'Native and cross-platform apps for iOS and Android that users love.', color: '#38bdf8' },
  { icon: 'search', title: 'SEO & Digital Marketing', desc: 'Rank higher on Google and grow your online presence with proven strategies.', color: '#818cf8' },
  { icon: 'shield', title: 'SSL & Security', desc: 'Trusted SSL certificates and security hardening to protect your users.', color: '#10b981' },
  { icon: 'mail', title: 'Business Email', desc: 'Professional email hosting with your own domain for a credible presence.', color: '#f59e0b' },
  { icon: 'target', title: 'Logo & Branding', desc: 'Memorable logos and brand kits that make your business stand out instantly.', color: '#f43f5e' },
  { icon: 'wrench', title: 'Website Maintenance', desc: 'Ongoing updates, backups, and support to keep your site fast and secure.', color: '#38bdf8' },
  { icon: 'chart', title: 'CMS Development', desc: 'WordPress, Shopify, and custom CMS so you control your content with ease.', color: '#818cf8' },
]

const MILESTONES = [
  { year: '2017', label: 'Founded in Pune, Maharashtra', color: '#38bdf8' },
  { year: '2018', label: 'Launched web hosting & domain services', color: '#818cf8' },
  { year: '2020', label: 'Expanded into e-commerce solutions', color: '#10b981' },
  { year: '2022', label: 'Delivered 300+ digital projects', color: '#f59e0b' },
  { year: '2024', label: '500+ clients across 10+ industries', color: '#f43f5e' },
]

const TEAM = [
  { icon: 'developer', role: 'Web Designers', desc: 'Crafting pixel-perfect, brand-aligned UI/UX experiences.', color: '#38bdf8' },
  { icon: 'tools', role: 'Developers', desc: 'Building robust, scalable, and secure web applications.', color: '#818cf8' },
  { icon: 'trending', role: 'SEO Specialists', desc: 'Driving organic traffic and boosting online visibility.', color: '#10b981' },
  { icon: 'headset', role: 'Support Team', desc: 'Providing reliable post-launch maintenance and assistance.', color: '#f59e0b' },
]

const REASONS = [
  { icon: 'palette', title: 'Creative Design', desc: 'Stunning, modern websites tailored to your brand identity and business goals.', color: '#38bdf8' },
  { icon: 'handshake', title: 'Client First', desc: 'Your vision and success drive every decision we make throughout the project.', color: '#818cf8' },
  { icon: 'zap', title: 'Fast Delivery', desc: 'Quality websites and digital solutions delivered on time, every time.', color: '#10b981' },
]

const STATS = [
  { value: 2017, suffix: '', label: 'Year Founded', color: '#38bdf8' },
  { value: 120, suffix: '+', label: 'Projects Delivered', color: '#818cf8' },
  { value: 10, suffix: '+', label: 'Industries Served', color: '#10b981' },
  { value: 7, suffix: '+', label: 'Years of Experience', color: '#f59e0b' },
]

/* ══ MAIN ══ */
export default function About() {
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
        .label-blue  { background: rgba(56,189,248,0.1); color: #38bdf8; border: 1px solid rgba(56,189,248,0.2); }
        .label-purple{ background: rgba(129,140,248,0.1); color: #818cf8; border: 1px solid rgba(129,140,248,0.2); }
        .label-green { background: rgba(16,185,129,0.1);  color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
        .label-amber { background: rgba(245,158,11,0.1);  color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }
        .label-red   { background: rgba(244,63,94,0.1);   color: #f43f5e; border: 1px solid rgba(244,63,94,0.2); }

        .div-line { width: 48px; height: 3px; border-radius: 2px; margin: 14px auto 0; }

        .btn { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; padding: 13px 30px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; cursor: pointer; border: none; transition: opacity 0.2s, transform 0.2s; }
        .btn::after { content:''; position:absolute; top:0; left:-75%; width:50%; height:100%; background:linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent); transform:skewX(-20deg); transition:left 0.55s ease; }
        .btn:hover::after { left:125%; }
        .btn:hover { transform: translateY(-1px); }
        .btn-sky { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #fff; box-shadow: 0 4px 20px rgba(56,189,248,0.3); }
        .btn-sky:hover { box-shadow: 0 6px 28px rgba(56,189,248,0.45); }
        .btn-ghost { background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.16); color: #fff; }
        .btn-ghost:hover { background: rgba(255,255,255,0.12); }
        .btn-purple { background: linear-gradient(135deg, #6c63ff, #818cf8); color: #fff; box-shadow: 0 4px 20px rgba(108,99,255,0.3); }

        @keyframes meshDrift { 0%,100%{background-position:0% 0%,100% 100%,50% 50%}50%{background-position:100% 50%,0% 50%,60% 40%} }
        .bg-mesh { background-image: radial-gradient(circle at 20% 30%, rgba(56,189,248,0.12), transparent 44%), radial-gradient(circle at 80% 70%, rgba(108,99,255,0.11), transparent 44%), radial-gradient(circle at 50% 50%, rgba(236,72,153,0.05), transparent 54%); background-size:180% 180%,180% 180%,160% 160%; animation:meshDrift 22s ease-in-out infinite; }
        @keyframes gridScroll { from{background-position:0 0}to{background-position:60px 60px} }
        .bg-grid { background-image:linear-gradient(rgba(255,255,255,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.032) 1px,transparent 1px); background-size:60px 60px; animation:gridScroll 26s linear infinite; }
        @keyframes ptRise { 0%{transform:translate(0,0) scale(0.4);opacity:0}10%{opacity:0.7}90%{opacity:0.4}100%{transform:translate(var(--d),-100vh) scale(0.7);opacity:0} }
        .bg-dot { position:absolute; bottom:-6px; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.8),transparent); animation-name:ptRise; animation-timing-function:ease-in-out; animation-iteration-count:infinite; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        .h-in1 { animation: fadeUp 0.7s ease-out 0.05s both; }
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

        .card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.3s; }
        .card:hover { transform: translateY(-5px); }

        .timeline-dot { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
        .timeline-row:hover .timeline-dot { transform: scale(1.25); }

        @media(prefers-reduced-motion:reduce) { *, *::before, *::after { animation:none!important; transition:none!important; } .rv-wrap { opacity:1!important; transform:none!important; } }
      `}</style>

      {/* ══ HERO ══ */}
      <section style={{ minHeight: '70vh', background: '#05080f', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
        <Bg count={20} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div className="blob-a" style={{ position: 'absolute', top: '20%', left: '50%', width: 'min(600px,90vw)', height: 'min(600px,60vh)', background: 'rgba(56,189,248,0.07)', borderRadius: '50%', filter: 'blur(90px)' }} />
          <div className="blob-b" style={{ position: 'absolute', bottom: 0, right: 0, width: 360, height: 360, background: 'rgba(108,99,255,0.06)', borderRadius: '50%', filter: 'blur(70px)' }} />
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', padding: '80px 24px' }}>
          <span className="h-in1 label label-blue">Incorporated 2017 · Pune, India</span>
          <h1 className="h-in2" style={{ fontSize: 'clamp(2rem,6vw,4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 6 }}>
            About
          </h1>
          <h1 className="h-in2 grad" style={{
            fontSize: 'clamp(2rem,6vw,4rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 24,
            background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>MBP Digital India</h1>
          <p className="h-in3" style={{ fontSize: 'clamp(0.95rem,2.2vw,1.1rem)', color: '#94a3b8', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.75 }}>
            Your one-stop partner for web design, e-commerce, domain registration, hosting, software development, and everything your business needs to thrive online.
          </p>
          <div className="h-in4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-sky pulse">Get a Free Quote</a>
            <Link to="/" className="btn btn-ghost">← Back to Home</Link>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="sec" style={{ background: '#080d1a', position: 'relative', overflow: 'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
            {STATS.map(s => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* ══ WHO WE ARE ══ */}
      <section className="sec" style={{ background: '#05080f', position: 'relative', overflow: 'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 48, alignItems: 'start' }}>
            <R>
              <span className="label label-blue">Who We Are</span>
              <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 20, lineHeight: 1.15 }}>
                MBP Digital India<br />Pvt Ltd.
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 14.5, marginBottom: 14 }}>
                Founded in 2017 and headquartered in Pune, MBP Digital India is your complete digital partner. We help businesses of every size establish a powerful online presence — from registering the perfect domain to building stunning websites and high-performing e-commerce stores.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 14.5, marginBottom: 28 }}>
                Our team of designers, developers, SEO specialists, and digital strategists work closely with clients across India and globally. We don't just build websites — we build digital businesses that grow, perform, and leave a lasting impression.
              </p>
              <a href="mailto:hr@mpbdigi.in" className="btn btn-sky" style={{ textDecoration: 'none' }}>hr@mpbdigi.in →</a>
            </R>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { val: '2017', lbl: 'Year of Incorporation', color: '#38bdf8', bg: 'rgba(56,189,248,0.06)' },
                { val: '120+', lbl: 'Projects Delivered', color: '#818cf8', bg: 'rgba(129,140,248,0.06)' },
                { val: '10+', lbl: 'Industries Served', color: '#10b981', bg: 'rgba(16,185,129,0.06)' },
                { val: 'Pune, India', lbl: 'Headquarters', color: '#f59e0b', bg: 'rgba(245,158,11,0.06)' },
              ].map((s, i) => (
                <R key={s.lbl} delay={i * 70} cls="card" style={{
                  background: s.bg, border: `1px solid ${s.color}22`,
                  borderRadius: 16, padding: '20px 24px',
                  display: 'flex', alignItems: 'center', gap: 20,
                }}>
                  <div style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, color: s.color, flexShrink: 0, letterSpacing: '-0.02em' }}>{s.val}</div>
                  <div style={{ color: '#64748b', fontSize: 13.5, fontWeight: 500 }}>{s.lbl}</div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="sec" style={{ background: '#080d1a', position: 'relative', overflow: 'hidden' }}>
        <Bg count={12} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label label-purple">What We Offer</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Our Digital Services</h2>
            <p style={{ color: '#64748b', fontSize: 14.5, maxWidth: 480, margin: '0 auto' }}>Everything your business needs to build, grow, and manage a powerful online presence — all in one place.</p>
            <div className="div-line" style={{ background: 'linear-gradient(90deg,#818cf8,#38bdf8)' }} />
          </R>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
            {SERVICES.map((s, i) => (
              <R key={s.title} delay={(i % 4) * 60}>
                <div className="card" style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 18, padding: '22px 20px', height: '100%',
                  transition: 'background 0.28s, border-color 0.28s, transform 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(129,140,248,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, border: `1px solid ${s.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <IconBox name={s.icon} size={22} color={s.color} />
                  </div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══ JOURNEY / TIMELINE ══ */}
      <section className="sec" style={{ background: '#05080f', position: 'relative', overflow: 'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="label label-green">Our Story</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Our Journey</h2>
            <div className="div-line" style={{ background: 'linear-gradient(90deg,#10b981,#38bdf8)' }} />
          </R>
          <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 23, top: 24, bottom: 24, width: 2, background: 'linear-gradient(to bottom, #38bdf8, #818cf8, #10b981, #f59e0b, #f43f5e)', borderRadius: 2, opacity: 0.3 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {MILESTONES.map((m, i) => (
                <R key={m.year} delay={i * 100} cls="timeline-row" style={{ display: 'flex', gap: 24, alignItems: 'flex-start', paddingBottom: i < MILESTONES.length - 1 ? 32 : 0 }}>
                  <div className="timeline-dot" style={{
                    flexShrink: 0, width: 48, height: 48, borderRadius: '50%',
                    background: `${m.color}18`, border: `2px solid ${m.color}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800, color: m.color, letterSpacing: '-0.03em',
                    position: 'relative', zIndex: 2,
                  }}>{m.year.slice(2)}</div>
                  <div style={{ paddingTop: 12 }}>
                    <div style={{ color: m.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{m.year}</div>
                    <div style={{ color: '#cbd5e1', fontSize: 14.5, lineHeight: 1.6 }}>{m.label}</div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="sec" style={{ background: '#080d1a', position: 'relative', overflow: 'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label label-amber">The People</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Our Team</h2>
            <p style={{ color: '#64748b', fontSize: 14.5, maxWidth: 420, margin: '0 auto' }}>A passionate group of digital experts dedicated to delivering results for your business.</p>
            <div className="div-line" style={{ background: 'linear-gradient(90deg,#f59e0b,#f43f5e)' }} />
          </R>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 16 }}>
            {TEAM.map((t, i) => (
              <R key={t.role} delay={i * 80}>
                <div className="card" style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: '32px 20px', textAlign: 'center',
                  transition: 'border-color 0.28s, transform 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${t.color}44`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: `${t.color}18`, border: `1px solid ${t.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <IconBox name={t.icon} size={26} color={t.color} />
                  </div>
                  <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{t.role}</h4>
                  <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.65 }}>{t.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section className="sec" style={{ background: '#05080f', position: 'relative', overflow: 'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label label-blue">Our Edge</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Why Choose Us?</h2>
            <div className="div-line" style={{ background: 'linear-gradient(90deg,#38bdf8,#818cf8)' }} />
          </R>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {REASONS.map((r, i) => (
              <R key={r.title} delay={i * 90}>
                <div className="card" style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: '36px 28px', textAlign: 'center',
                  transition: 'border-color 0.28s, transform 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: `${r.color}18`, border: `1px solid ${r.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <IconBox name={r.icon} size={26} color={r.color} />
                  </div>
                  <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: 10 }}>{r.title}</h4>
                  <p style={{ color: '#64748b', fontSize: 13.5, lineHeight: 1.7 }}>{r.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="sec" style={{ background: '#080d1a', position: 'relative', overflow: 'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{
            maxWidth: 660, margin: '0 auto', textAlign: 'center',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(56,189,248,0.18)',
            borderRadius: 28, padding: 'clamp(36px,6vw,64px)',
          }}>
            <span className="label label-blue">Get Started</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
              Ready to Build Your<br />Digital Presence?
            </h2>
            <p style={{ color: '#64748b', fontSize: 14.5, lineHeight: 1.75, marginBottom: 36 }}>
              Get a free consultation with our team today. No commitments — just real advice for your business.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-sky pulse" style={{ textDecoration: 'none' }}>Get a Free Quote</a>
              <a href="mailto:hr@mpbdigi.in" className="btn btn-ghost" style={{ textDecoration: 'none' }}>hr@mpbdigi.in</a>
            </div>
          </R>
        </div>
      </section>
    </>
  )
}