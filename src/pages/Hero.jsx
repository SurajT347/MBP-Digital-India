import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ═══════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('rv'); obs.unobserve(el) }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function useCountUp(target, duration = 2000, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setVal(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return val
}

/* ═══════════════════════════════════════════════
   REVEAL WRAPPER
═══════════════════════════════════════════════ */
function R({ as: T = 'div', cls = '', delay = 0, style = {}, children, ...rest }) {
  const ref = useReveal()
  return (
    <T ref={ref} className={`rv-wrap ${cls}`} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </T>
  )
}

/* ═══════════════════════════════════════════════
   ANIMATED BG
═══════════════════════════════════════════════ */
function Bg({ count = 14 }) {
  const pts = Array.from({ length: count }, (_, i) => ({
    id: i, size: 1.5 + (i % 3) * 1.2,
    left: (i * 61.8) % 100, delay: (i * 0.9) % 12,
    dur: 16 + (i % 6) * 3, drift: 18 + (i % 5) * 10,
  }))
  return (
    <div aria-hidden="true" style={{ position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden' }}>
      <div className="bg-mesh" style={{ position:'absolute',inset:0 }} />
      <div className="bg-grid" style={{ position:'absolute',inset:0 }} />
      {pts.map(p => (
        <span key={p.id} className="bg-dot" style={{
          left:`${p.left}%`, width:p.size, height:p.size,
          animationDelay:`${p.delay}s`, animationDuration:`${p.dur}s`,
          '--d':`${p.drift}px`,
        }} />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SVG ICONS — Services
═══════════════════════════════════════════════ */
const Ico = ({ children, vb = '-22 -22 44 44', size = 28 }) => (
  <svg viewBox={vb} width={size} height={size} fill="none">{children}</svg>
)
const AIIco = () => <Ico><circle cx="0" cy="0" r="16" stroke="#818cf8" strokeWidth="2"/><circle cx="0" cy="0" r="5" fill="#818cf8"/><circle cx="0" cy="-12" r="2.5" fill="#818cf8"/><circle cx="10.4" cy="6" r="2.5" fill="#818cf8"/><circle cx="-10.4" cy="6" r="2.5" fill="#818cf8"/><line x1="0" y1="-5" x2="0" y2="-9.5" stroke="#818cf8" strokeWidth="1.5"/><line x1="4.3" y1="2.5" x2="8" y2="4.6" stroke="#818cf8" strokeWidth="1.5"/><line x1="-4.3" y1="2.5" x2="-8" y2="4.6" stroke="#818cf8" strokeWidth="1.5"/></Ico>
const CloudIco = () => <Ico><path d="M-14,6 Q-18,6 -18,0 Q-18,-8 -10,-10 Q-10,-20 0,-20 Q10,-20 12,-12 Q18,-12 18,-4 Q18,6 12,6 Z" stroke="#38bdf8" strokeWidth="2" strokeLinejoin="round"/><line x1="-6" y1="6" x2="-6" y2="14" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round"/><line x1="0" y1="6" x2="0" y2="18" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round"/><line x1="6" y1="6" x2="6" y2="14" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round"/></Ico>
const IoTIco = () => <Ico vb="-24 -24 48 48"><rect x="-8" y="-8" width="16" height="16" rx="3" stroke="#22d3ee" strokeWidth="2"/><circle cx="0" cy="0" r="3" fill="#22d3ee"/><path d="M-18,-14 Q0,-22 18,-14" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/><path d="M-12,-9 Q0,-15 12,-9" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round"/><circle cx="-20" cy="2" r="2.5" fill="#22d3ee" opacity="0.8"/><circle cx="20" cy="2" r="2.5" fill="#22d3ee" opacity="0.8"/><line x1="-8" y1="0" x2="-17.5" y2="2" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="2,2"/><line x1="8" y1="0" x2="17.5" y2="2" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="2,2"/></Ico>
const DevOpsIco = () => <Ico vb="-20 -22 40 44"><path d="M-16,0 C-16,-14 0,-20 0,-20 C0,-20 16,-14 16,0 C16,10 8,16 0,18 C-8,16 -16,10 -16,0Z" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round"/><path d="M-6,-4 L0,-10 L6,-4 L6,6 L-6,6 Z" fill="#a78bfa"/></Ico>
const CyberIco = () => <Ico vb="-18 -22 36 44"><path d="M0,-18 L14,-12 L14,2 C14,10 8,16 0,20 C-8,16 -14,10 -14,2 L-14,-12 Z" stroke="#f43f5e" strokeWidth="2" strokeLinejoin="round"/><line x1="0" y1="-6" x2="0" y2="2" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round"/><circle cx="0" cy="7" r="2.5" fill="#f43f5e"/></Ico>
const DataIco = () => <Ico vb="-20 -20 40 40"><rect x="-16" y="-16" width="32" height="32" rx="3" stroke="#10b981" strokeWidth="2"/><rect x="-10" y="4" width="5" height="8" fill="#10b981" rx="1"/><rect x="-2" y="-4" width="5" height="16" fill="#10b981" rx="1" opacity="0.8"/><rect x="6" y="-10" width="5" height="22" fill="#10b981" rx="1" opacity="0.6"/><polyline points="-8,-8 0,-2 8,-12" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></Ico>
const SAPIco = () => <Ico vb="-20 -18 40 36"><rect x="-16" y="-14" width="32" height="28" rx="3" stroke="#f59e0b" strokeWidth="2"/><line x1="-16" y1="-4" x2="16" y2="-4" stroke="#f59e0b" strokeWidth="1.2" opacity="0.4"/><rect x="-10" y="-10" width="8" height="4" rx="1" fill="#f59e0b" opacity="0.9"/><rect x="-10" y="0" width="20" height="2.5" rx="1" fill="#f59e0b" opacity="0.5"/><rect x="-10" y="5" width="14" height="2.5" rx="1" fill="#f59e0b" opacity="0.5"/><rect x="-10" y="10" width="17" height="2.5" rx="1" fill="#f59e0b" opacity="0.5"/></Ico>

/* ═══════════════════════════════════════════════
   SVG ICONS — Industries
═══════════════════════════════════════════════ */
const HealthIco = () => <Ico vb="-22 -20 44 42" size={24}><rect x="-10" y="-16" width="20" height="32" rx="3" stroke="#ef4444" strokeWidth="2.2"/><rect x="-18" y="-6" width="36" height="12" rx="3" stroke="#ef4444" strokeWidth="2.2"/><rect x="-4" y="-10" width="8" height="8" fill="#ef4444" rx="1"/><rect x="-9" y="-3" width="18" height="6" fill="#ef4444" rx="1"/></Ico>
const EduIco = () => <Ico vb="-26 -22 52 44" size={24}><polygon points="-22,-4 0,-18 22,-4 0,8" stroke="#d97706" strokeWidth="2.2" strokeLinejoin="round"/><rect x="-14" y="8" width="28" height="18" rx="2" stroke="#d97706" strokeWidth="2.2"/></Ico>
const RetailIco = () => <Ico vb="-22 -18 44 40" size={24}><path d="M-18,-14 L-12,-14 L-8,10 L14,10 L18,-6 L-6,-6" stroke="#0ea5e9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="-4" cy="15" r="3" fill="#0ea5e9"/><circle cx="11" cy="15" r="3" fill="#0ea5e9"/></Ico>
const MfgIco = () => <Ico vb="-22 -20 44 42" size={24}><rect x="-18" y="-2" width="36" height="18" rx="2" stroke="#6c63ff" strokeWidth="2.2"/><rect x="-10" y="-16" width="8" height="14" rx="1" stroke="#6c63ff" strokeWidth="2.2"/><rect x="2" y="-16" width="8" height="14" rx="1" stroke="#6c63ff" strokeWidth="2.2"/><circle cx="-8" cy="9" r="3" fill="#6c63ff"/><circle cx="8" cy="9" r="3" fill="#6c63ff"/></Ico>
const FinIco = () => <Ico vb="-22 -22 44 44" size={24}><circle cx="0" cy="0" r="18" stroke="#22c55e" strokeWidth="2.2"/><text x="0" y="1" fontFamily="sans-serif" fontSize="18" fontWeight="700" fill="#22c55e" textAnchor="middle" dominantBaseline="middle">$</text></Ico>
const REIco = () => <Ico vb="-24 -22 48 44" size={24}><polygon points="0,-18 20,2 16,2 16,18 -16,18 -16,2 -20,2" stroke="#f97316" strokeWidth="2.2" strokeLinejoin="round"/><rect x="-6" y="6" width="12" height="12" rx="1" stroke="#f97316" strokeWidth="2.2"/></Ico>
const LogIco = () => <Ico vb="-24 -14 52 36" size={24}><rect x="-20" y="-8" width="28" height="18" rx="2" stroke="#14b8a6" strokeWidth="2.2"/><path d="M8,-8 L8,10 L20,10 L20,0 L14,-8 Z" stroke="#14b8a6" strokeWidth="2.2" strokeLinejoin="round"/><circle cx="-10" cy="14" r="4" stroke="#14b8a6" strokeWidth="2"/><circle cx="14" cy="14" r="4" stroke="#14b8a6" strokeWidth="2"/></Ico>
const HospIco = () => <Ico vb="-26 -18 52 36" size={24}><path d="M-18,10 L-18,-4 C-18,-14 18,-14 18,-4 L18,10" stroke="#ec4899" strokeWidth="2.2" strokeLinejoin="round"/><line x1="-22" y1="10" x2="22" y2="10" stroke="#ec4899" strokeWidth="2.2" strokeLinecap="round"/><rect x="-6" y="-10" width="12" height="14" rx="6" stroke="#ec4899" strokeWidth="2.2"/></Ico>
const ITIco = () => <Ico vb="-24 -18 48 40" size={24}><rect x="-20" y="-14" width="40" height="26" rx="3" stroke="#0ea5e9" strokeWidth="2.2"/><rect x="-8" y="12" width="16" height="4" rx="1" stroke="#0ea5e9" strokeWidth="2.2"/><text x="0" y="0" fontFamily="monospace" fontSize="11" fill="#0ea5e9" textAnchor="middle" dominantBaseline="middle">{"</>"}</text></Ico>
const StartIco = () => <Ico vb="-22 -22 44 44" size={24}><path d="M0,-16 C8,-16 14,-8 12,2 C10,10 6,14 0,14 C-6,14 -10,10 -12,2 C-14,-8 -8,-16 0,-16 Z" stroke="#6c63ff" strokeWidth="2.2"/><path d="M-5,-3 L0,-9 L5,-3 L5,5 L-5,5 Z" fill="#6c63ff"/><circle cx="-13" cy="9" r="3" stroke="#6c63ff" strokeWidth="2"/></Ico>

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const SERVICES = [
  { ico: <AIIco />, title: 'Artificial Intelligence', desc: 'Harnessing AI to enhance decision-making and automate complex processes.', accent: '#818cf8' },
  { ico: <CloudIco />, title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure to optimize performance and reduce costs.', accent: '#38bdf8' },
  { ico: <IoTIco />, title: 'Internet of Things', desc: 'Connecting devices to streamline operations and improve efficiency.', accent: '#22d3ee' },
  { ico: <DevOpsIco />, title: 'DevOps', desc: 'Integrating development and operations for faster, reliable delivery.', accent: '#a78bfa' },
  { ico: <CyberIco />, title: 'Cybersecurity', desc: 'Protecting your assets with robust, multi-layered security measures.', accent: '#f43f5e' },
  { ico: <DataIco />, title: 'Data Analytics', desc: 'Turning raw data into actionable insights for informed decisions.', accent: '#10b981' },
  { ico: <SAPIco />, title: 'SAP', desc: 'Comprehensive SAP solutions for enhanced business performance.', accent: '#f59e0b' },
]

const INDUSTRIES = [
  { ico: <HealthIco />, label: 'Healthcare', bg: 'rgba(239,68,68,0.12)' },
  { ico: <EduIco />, label: 'Education', bg: 'rgba(217,119,6,0.12)' },
  { ico: <RetailIco />, label: 'Retail & E-Commerce', bg: 'rgba(14,165,233,0.12)' },
  { ico: <MfgIco />, label: 'Manufacturing', bg: 'rgba(108,99,255,0.12)' },
  { ico: <FinIco />, label: 'Finance', bg: 'rgba(34,197,94,0.12)' },
  { ico: <REIco />, label: 'Real Estate', bg: 'rgba(249,115,22,0.12)' },
  { ico: <LogIco />, label: 'Logistics', bg: 'rgba(20,184,166,0.12)' },
  { ico: <HospIco />, label: 'Hospitality', bg: 'rgba(236,72,153,0.12)' },
  { ico: <ITIco />, label: 'Information Technology', bg: 'rgba(14,165,233,0.12)' },
  { ico: <StartIco />, label: 'Startups', bg: 'rgba(108,99,255,0.12)' },
]

const STATS = [
  { value: 7, suffix: '+', label: 'Years of Experience' },
  { value: 120, suffix: '+', label: 'Projects Delivered' },
  { value: 40, suffix: '+', label: 'Enterprise Clients' },
  { value: 7, suffix: '', label: 'Service Verticals' },
]

const TESTIMONIALS = [
  { name: 'Rajesh Sharma', role: 'CTO, FinEdge Solutions', avatar: 'RS', text: 'MBP Digital transformed our legacy infrastructure into a modern cloud-native platform. The team was professional, on-time, and went above and beyond at every stage.', stars: 5 },
  { name: 'Priya Mehta', role: 'VP Engineering, HealthFirst', avatar: 'PM', text: 'Their AI integration cut our data processing time by 60%. The cybersecurity team was especially sharp — zero incidents since deployment.', stars: 5 },
  { name: 'Ankit Verma', role: 'Director, LogiTech India', avatar: 'AV', text: 'SAP implementation completed on schedule with zero downtime. The post-launch support has been outstanding. Truly a partner, not just a vendor.', stars: 5 },
]

const TEAM = [
  { name: 'Mahesh Patil', role: 'Founder & CEO', initials: 'MP', color: '#38bdf8' },
  { name: 'Bhavna Kulkarni', role: 'Chief Technology Officer', initials: 'BK', color: '#818cf8' },
  { name: 'Prashant Deshpande', role: 'Head of Cloud & DevOps', initials: 'PD', color: '#10b981' },
  { name: 'Sneha Joshi', role: 'Lead AI Engineer', initials: 'SJ', color: '#f59e0b' },
]

const TRUST = [
  { icon: '✅', title: 'High-Quality Development', desc: 'Rigorous code reviews and QA at every stage of the build.' },
  { icon: '⏱️', title: 'On-Time Delivery', desc: 'We respect your deadlines — structured sprints, no surprises.' },
  { icon: '💬', title: 'Transparent Communication', desc: 'Regular updates and clear reporting throughout the engagement.' },
  { icon: '💰', title: 'Cost-Effective', desc: 'Enterprise-grade results without the bloated agency overhead.' },
  { icon: '🔧', title: 'Long-Term Support', desc: 'We stay with you well beyond launch — ongoing partnerships.' },
  { icon: '❤️', title: 'Client-Centric', desc: 'Your goals define how we scope, prioritize, and execute.' },
]

/* ═══════════════════════════════════════════════
   STATS COUNTER SECTION
═══════════════════════════════════════════════ */
function StatCard({ value, suffix, label, delay }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const count = useCountUp(value, 1800, active)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.unobserve(el) }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="stat-card" style={{
      textAlign: 'center',
      padding: '32px 20px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(56,189,248,0.12)',
      borderRadius: 20,
      transition: 'border-color 0.3s, transform 0.3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{
        fontSize: 'clamp(2.1rem,7vw,3.5rem)', fontWeight: 800,
        background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text', lineHeight: 1, marginBottom: 8,
      }}>
        {count}{suffix}
      </div>
      <div style={{ color: '#94a3b8', fontSize: 13.5, fontWeight: 500 }}>{label}</div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function Hero() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = () => { if (form.name && form.email && form.message) setSubmitted(true) }

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <style>{`
        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { max-width: 100%; overflow-x: hidden; }

        /* ── Reveal ── */
        .rv-wrap {
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .rv-wrap.rv { opacity: 1; transform: translateY(0); }

        /* ── Layout ── */
        .wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; width: 100%; }
        @media(min-width:1024px){ .wrap { padding: 0 48px; } }
        @media(max-width:380px){ .wrap { padding: 0 16px; } }

        .sec { padding: 88px 0; }
        @media(max-width:768px){ .sec { padding: 56px 0; } }
        @media(max-width:480px){ .sec { padding: 44px 0; } }

        /* ── Grid helpers ── */
        .g2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; align-items: start; }
        .g3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
        .g4 { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px; }
        @media(max-width:768px){ .g2 { gap: 28px; } }
        @media(max-width:480px){
          .g3 { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
          .g4 { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
        @media(max-width:340px){ .g3 { grid-template-columns: 1fr; } }

        /* ── Section label ── */
        .label {
          display: inline-block; font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 999px;
          margin-bottom: 14px;
        }
        .label-blue { background: rgba(56,189,248,0.1); color: #38bdf8; border: 1px solid rgba(56,189,248,0.2); }
        .label-purple { background: rgba(129,140,248,0.1); color: #818cf8; border: 1px solid rgba(129,140,248,0.2); }
        .label-green { background: rgba(16,185,129,0.1); color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
        .label-amber { background: rgba(245,158,11,0.1); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }

        /* ── Divider ── */
        .div-line { width: 48px; height: 3px; border-radius: 2px; margin: 14px auto 0; }

        /* ── Buttons ── */
        .btn { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; padding: 13px 30px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; cursor: pointer; border: none; transition: opacity 0.2s, transform 0.2s; }
        .btn::after { content:''; position:absolute; top:0; left:-75%; width:50%; height:100%; background:linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent); transform:skewX(-20deg); transition:left 0.55s ease; }
        .btn:hover::after { left:125%; }
        .btn:hover { transform: translateY(-1px); }
        .btn-sky { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #fff; box-shadow: 0 4px 20px rgba(56,189,248,0.3); }
        .btn-sky:hover { box-shadow: 0 6px 28px rgba(56,189,248,0.45); }
        .btn-ghost { background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.16); color: #fff; }
        .btn-ghost:hover { background: rgba(255,255,255,0.12); }
        .btn-purple { background: linear-gradient(135deg, #6c63ff, #818cf8); color: #fff; box-shadow: 0 4px 20px rgba(108,99,255,0.3); }
        @media(max-width:480px){
          .hero-cta { flex-direction: column; align-items: stretch; width: 100%; }
          .hero-cta .btn { width: 100%; }
        }

        /* ── Animated BG ── */
        @keyframes meshDrift {
          0%,100% { background-position: 0% 0%, 100% 100%, 50% 50%; }
          50%      { background-position: 100% 50%, 0% 50%, 60% 40%; }
        }
        .bg-mesh {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(56,189,248,0.13), transparent 44%),
            radial-gradient(circle at 80% 70%, rgba(108,99,255,0.12), transparent 44%),
            radial-gradient(circle at 50% 50%, rgba(236,72,153,0.06), transparent 54%);
          background-size: 180% 180%, 180% 180%, 160% 160%;
          animation: meshDrift 22s ease-in-out infinite;
        }
        @keyframes gridScroll { from { background-position: 0 0; } to { background-position: 60px 60px; } }
        .bg-grid {
          background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridScroll 26s linear infinite;
        }
        @keyframes ptRise {
          0%  { transform:translate(0,0) scale(0.4); opacity:0; }
          10% { opacity:0.7; }
          90% { opacity:0.4; }
          100%{ transform:translate(var(--d),-100vh) scale(0.7); opacity:0; }
        }
        .bg-dot { position:absolute; bottom:-6px; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.8),transparent); animation-name:ptRise; animation-timing-function:ease-in-out; animation-iteration-count:infinite; }

        /* ── Hero entrance ── */
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        .h-badge { animation: fadeUp 0.7s ease-out 0.05s both; }
        .h-title { animation: fadeUp 0.75s ease-out 0.18s both; }
        .h-sub   { animation: fadeUp 0.75s ease-out 0.32s both; }
        .h-btns  { animation: fadeUp 0.75s ease-out 0.46s both; }

        /* ── Gradient text ── */
        @keyframes gshift { 0%,100%{background-position:0% 50%}50%{background-position:100% 50%} }
        .grad { background-size:200% auto; animation: gshift 5s ease-in-out infinite; }

        /* ── Blobs ── */
        @keyframes bA { 0%,100%{transform:translate(-50%,0) scale(1)} 50%{transform:translate(-50%,-18px) scale(1.07)} }
        @keyframes bB { 0%,100%{transform:scale(1)} 50%{transform:translate(14px,14px) scale(1.09)} }
        .blob-a { animation: bA 10s ease-in-out infinite; }
        .blob-b { animation: bB 13s ease-in-out infinite; }

        /* ── Pulse CTA ── */
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(56,189,248,0.4)}70%{box-shadow:0 0 0 14px rgba(56,189,248,0)} }
        .pulse { animation: pulse 2.6s ease-out infinite; }

        /* ── Card hover ── */
        .card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease; }
        .card:hover { transform: translateY(-5px); }
        .card .ico-w { transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1); }
        .card:hover .ico-w { transform: scale(1.15) rotate(-4deg); }
        @media(max-width:480px){ .card { padding: 22px 18px !important; } }

        /* ── Industry tile ── */
        .ind { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease; }
        .ind:hover { transform: translateY(-4px); }
        .ind .ind-i { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .ind:hover .ind-i { transform: rotate(7deg) scale(1.1); }

        /* ── Testimonial ── */
        .tcard { transition: opacity 0.5s ease, transform 0.5s ease; }
        .tcard.inactive { opacity: 0; transform: translateX(30px); pointer-events: none; position: absolute; }
        .tcard.active { opacity: 1; transform: translateX(0); position: relative; }
        @media(max-width:480px){ .tcard.inactive { transform: translateX(16px); } }

        /* ── Input ── */
        .inp {
          width: 100%; border: 1.5px solid rgba(255,255,255,0.1); border-radius: 10px;
          padding: 12px 15px; font-size: 14px; color: #e2e8f0;
          background: rgba(255,255,255,0.05); outline: none; font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .inp::placeholder { color: #475569; }
        .inp:focus { border-color: #38bdf8; box-shadow: 0 0 0 3px rgba(56,189,248,0.12); }

        /* ── Team card avatar ring ── */
        @keyframes ringPulse { 0%,100%{box-shadow:0 0 0 0 rgba(56,189,248,0.3)}70%{box-shadow:0 0 0 8px rgba(56,189,248,0)} }
        .team-card:hover .avatar-ring { animation: ringPulse 1.8s ease-out infinite; }

        /* ── Hero stat strip ── */
        .hero-stats { display:flex; gap:32px; justify-content:center; flex-wrap:wrap; margin-top:60px; padding-top:40px; border-top:1px solid rgba(255,255,255,0.07); width: 100%; }
        @media(max-width:480px){ .hero-stats { gap: 22px; margin-top: 40px; padding-top: 28px; } }
        @media(max-width:340px){ .hero-stats { gap: 14px; } }

        /* ── Trust grid ── */
        .trust-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:12px; }
        @media(max-width:480px){ .trust-grid { grid-template-columns: 1fr; } }

        /* ── Team grid ── */
        .team-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:16px; }
        @media(max-width:480px){ .team-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }
        @media(max-width:340px){ .team-grid { grid-template-columns: 1fr; } }

        /* ── About stat cards ── */
        @media(max-width:480px){
          .about-stat-card { padding: 18px 20px !important; gap: 14px !important; }
        }

        /* ── Reduced motion ── */
        @media(prefers-reduced-motion:reduce){
          *, *::before, *::after { animation:none!important; transition:none!important; }
          .rv-wrap { opacity:1!important; transform:none!important; }
        }
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section id="home" style={{
        minHeight: '100svh', background: '#05080f',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', paddingTop: 64,
      }}>
        <Bg count={22} />
        <div aria-hidden="true" style={{ position:'absolute',inset:0,pointerEvents:'none' }}>
          <div className="blob-a" style={{ position:'absolute',top:'20%',left:'50%',width:'min(640px,90vw)',height:'min(640px,60vh)',background:'rgba(56,189,248,0.07)',borderRadius:'50%',filter:'blur(90px)' }} />
          <div className="blob-b" style={{ position:'absolute',bottom:0,right:0,width:'min(380px,60vw)',height:'min(380px,60vw)',background:'rgba(108,99,255,0.06)',borderRadius:'50%',filter:'blur(70px)' }} />
        </div>

        <div className="wrap" style={{ position:'relative',zIndex:10,textAlign:'center',width:'100%',padding:'64px 24px' }}>
          <span className="h-badge label label-blue">Incorporated 2017 · Pune, India</span>

          <h1 className="h-title" style={{ fontSize:'clamp(2rem,6.5vw,4.5rem)', fontWeight:900, color:'#fff', lineHeight:1.08, letterSpacing:'-0.025em', marginBottom:24 }}>
            <span style={{ display:'block', marginBottom:6 }}>Welcome to</span>
            <span className="grad" style={{
              display:'block',
              background:'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #38bdf8 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>
              MBP Digital India
            </span>
          </h1>

          <p className="h-sub" style={{ fontSize:'clamp(0.95rem,2.2vw,1.15rem)', color:'#94a3b8', maxWidth:560, margin:'0 auto 40px', lineHeight:1.75 }}>
            Delivering cutting-edge software solutions worldwide — from AI and Cloud to Cybersecurity and SAP.
          </p>

          <div className="h-btns hero-cta" style={{ display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap' }}>
            <a href="#services" className="btn btn-sky pulse">Explore Services</a>
            <a href="./contact" className="btn btn-ghost">Contact Us</a>
          </div>

          {/* Mini stat strip */}
          <div className="h-btns hero-stats">
            {[['7+','Years'], ['120+','Projects'], ['40+','Clients']].map(([n,l]) => (
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'clamp(1.2rem,4vw,1.5rem)',fontWeight:800,color:'#38bdf8',lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:11.5,color:'#64748b',marginTop:4,fontWeight:500,whiteSpace:'nowrap' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" className="sec" style={{ background:'#080d1a' }}>
        <div className="wrap">
          <R cls="g2">
            <div>
              <span className="label label-blue">Who We Are</span>
              <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:20, lineHeight:1.15 }}>
                Building Digital Futures<br />Since 2017
              </h2>
              <p style={{ color:'#94a3b8', lineHeight:1.8, fontSize:14.5, marginBottom:14 }}>
                MPB Digital India Pvt Ltd. is a Pune-based information technology company incorporated in 2017. We are a leading company in software development covering a vast market — from software development and sale to hardware, networking, and digital transformation.
              </p>
              <p style={{ color:'#94a3b8', lineHeight:1.8, fontSize:14.5, marginBottom:28 }}>
                We offer services spanning turnkey software projects, cloud and networking, system re-engineering, GIS, customized software development, product development, facility management, and enterprise system integration.
              </p>
              <Link to="/about" className="btn btn-sky" style={{ textDecoration:'none' }}>Learn More →</Link>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[
                { val:'2017', lbl:'Year of Incorporation', color:'#38bdf8', bg:'rgba(56,189,248,0.06)' },
                { val:'₹1.89 Cr', lbl:'Market Capitalisation', color:'#818cf8', bg:'rgba(129,140,248,0.06)' },
                { val:'Pune, India', lbl:'Headquarters', color:'#10b981', bg:'rgba(16,185,129,0.06)' },
              ].map(s => (
                <R key={s.lbl} delay={80} cls="card about-stat-card" style={{
                  background: s.bg, border:`1px solid ${s.color}22`,
                  borderRadius:16, padding:'22px 26px',
                  display:'flex', alignItems:'center', gap:20, flexWrap:'wrap',
                }}>
                  <div style={{ fontSize:'clamp(1.4rem,4vw,2.2rem)', fontWeight:800, color:s.color, flexShrink:0, letterSpacing:'-0.02em' }}>{s.val}</div>
                  <div style={{ color:'#64748b', fontSize:13.5, fontWeight:500 }}>{s.lbl}</div>
                </R>
              ))}
            </div>
          </R>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="sec" style={{ background:'#05080f', position:'relative', overflow:'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:48 }}>
            <span className="label label-purple">By the Numbers</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff' }}>Impact at a Glance</h2>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#818cf8,#38bdf8)' }} />
          </R>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:16 }}>
            {STATS.map((s,i) => <StatCard key={s.label} {...s} delay={i*100} />)}
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section id="services" className="sec" style={{ background:'#080d1a', position:'relative', overflow:'hidden' }}>
        <Bg count={12} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:48 }}>
            <span className="label label-blue">What We Do</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>Our Services</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:480, margin:'0 auto' }}>From AI-driven automation to enterprise SAP deployments — end-to-end digital expertise.</p>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#38bdf8,#818cf8)' }} />
          </R>
          <div className="g3">
            {SERVICES.map((s,i) => (
              <R key={s.title} delay={(i%4)*70}>
                <div className="card" style={{
                  background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
                  borderRadius:18, padding:'26px 22px', height:'100%',
                  transition:'background 0.28s,border-color 0.28s,transform 0.3s',
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor=s.accent+'44'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}
                >
                  <div style={{ width:52, height:52, borderRadius:14, background:`${s.accent}18`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18 }}>
                    <div className="ico-w">{s.ico}</div>
                  </div>
                  <h3 style={{ fontSize:'0.95rem', fontWeight:700, color:'#fff', marginBottom:8 }}>{s.title}</h3>
                  <p style={{ color:'#64748b', fontSize:13.5, lineHeight:1.7 }}>{s.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ INDUSTRIES ══════════ */}
      <section id="clients" className="sec" style={{ background:'#05080f', position:'relative', overflow:'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:48 }}>
            <span className="label label-purple">Who We Work With</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>Industries We Serve</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:480, margin:'0 auto' }}>We partner with businesses across a wide range of sectors to deliver digital transformation.</p>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#818cf8,#6c63ff)' }} />
          </R>
          <div className="g4">
            {INDUSTRIES.map((ind,i) => (
              <R key={ind.label} delay={(i%5)*55}>
                <div className="ind" style={{
                  background:'#0d1324', border:'1px solid rgba(108,99,255,0.14)',
                  borderRadius:14, padding:'18px 14px',
                  display:'flex', flexDirection:'column', alignItems:'center', gap:10,
                }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(108,99,255,0.5)'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(108,99,255,0.14)'}
                >
                  <div className="ind-i" style={{ width:46, height:46, borderRadius:10, background:ind.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {ind.ico}
                  </div>
                  <span style={{ color:'#94a3b8', fontSize:12, fontWeight:600, textAlign:'center', lineHeight:1.4 }}>{ind.label}</span>
                </div>
              </R>
            ))}
          </div>

          {/* Trust grid */}
          <R style={{ marginTop:48 }}>
            <div style={{ background:'#0d1324', border:'1px solid rgba(108,99,255,0.16)', borderRadius:22, padding:'clamp(20px,4vw,40px)' }}>
              <h3 style={{ fontSize:'1.15rem', fontWeight:700, color:'#fff', textAlign:'center', marginBottom:6 }}>Why Clients Trust Us</h3>
              <p style={{ color:'#64748b', fontSize:13.5, textAlign:'center', maxWidth:420, margin:'0 auto 28px' }}>Trusted by businesses for reliable, enterprise-grade digital solutions.</p>
              <div className="trust-grid">
                {TRUST.map(t => (
                  <div key={t.title} style={{
                    background:'#05080f', border:'1px solid rgba(108,99,255,0.12)', borderRadius:13,
                    padding:'16px 18px', display:'flex', gap:13, alignItems:'flex-start',
                    transition:'border-color 0.25s, transform 0.28s',
                  }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(108,99,255,0.42)'; e.currentTarget.style.transform='translateY(-3px)'; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(108,99,255,0.12)'; e.currentTarget.style.transform='translateY(0)'; }}
                  >
                    <span style={{ fontSize:18, flexShrink:0, marginTop:1 }}>{t.icon}</span>
                    <div>
                      <div style={{ color:'#fff', fontWeight:700, fontSize:13, marginBottom:4 }}>{t.title}</div>
                      <div style={{ color:'#64748b', fontSize:12.5, lineHeight:1.65 }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="sec" style={{ background:'#080d1a', position:'relative', overflow:'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:48 }}>
            <span className="label label-green">Client Stories</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>What Our Clients Say</h2>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#10b981,#38bdf8)' }} />
          </R>

          <div style={{ maxWidth:720, margin:'0 auto' }}>
            <div style={{ position:'relative', minHeight:260 }}>
              {TESTIMONIALS.map((t,i) => (
                <div key={t.name} className={`tcard ${i === activeTestimonial ? 'active' : 'inactive'}`}
                  style={{
                    background:'rgba(255,255,255,0.03)', border:'1px solid rgba(16,185,129,0.18)',
                    borderRadius:20, padding:'clamp(20px,4vw,40px)', width: '100%',
                  }}
                >
                  {/* Stars */}
                  <div style={{ display:'flex', gap:3, marginBottom:18 }}>
                    {Array(t.stars).fill(0).map((_,si) => (
                      <span key={si} style={{ color:'#f59e0b', fontSize:16 }}>★</span>
                    ))}
                  </div>
                  <p style={{ color:'#cbd5e1', fontSize:15.5, lineHeight:1.75, marginBottom:24, fontStyle:'italic' }}>
                    "{t.text}"
                  </p>
                  <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                    <div style={{
                      width:44, height:44, borderRadius:'50%',
                      background:'linear-gradient(135deg,#38bdf8,#818cf8)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontWeight:700, color:'#fff', fontSize:14, flexShrink:0,
                    }}>{t.avatar}</div>
                    <div>
                      <div style={{ color:'#fff', fontWeight:700, fontSize:14 }}>{t.name}</div>
                      <div style={{ color:'#64748b', fontSize:12.5 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:24 }}>
              {TESTIMONIALS.map((_,i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} aria-label={`Show testimonial ${i + 1} of ${TESTIMONIALS.length}`} aria-current={i === activeTestimonial} style={{
                  width: i === activeTestimonial ? 24 : 8, height:8,
                  borderRadius:4, border:'none', cursor:'pointer',
                  background: i === activeTestimonial ? '#10b981' : 'rgba(255,255,255,0.2)',
                  transition:'width 0.35s ease, background 0.3s',
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TEAM ══════════ */}
      <section className="sec" style={{ background:'#05080f', position:'relative', overflow:'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:48 }}>
            <span className="label label-amber">The People</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>Meet Our Team</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:420, margin:'0 auto' }}>Talented engineers and strategists passionate about building the future.</p>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#f59e0b,#f43f5e)' }} />
          </R>
          <div className="team-grid">
            {TEAM.map((m,i) => (
              <R key={m.name} delay={i*80}>
                <div className="card team-card" style={{
                  background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
                  borderRadius:20, padding:'32px 20px', textAlign:'center',
                  transition:'border-color 0.28s,transform 0.3s',
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=m.color+'44'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}
                >
                  <div className="avatar-ring" style={{
                    width:72, height:72, borderRadius:'50%',
                    background:`linear-gradient(135deg,${m.color},${m.color}88)`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    margin:'0 auto 16px',
                    fontSize:22, fontWeight:800, color:'#fff',
                    border:`3px solid ${m.color}33`,
                  }}>{m.initials}</div>
                  <div style={{ color:'#fff', fontWeight:700, fontSize:14.5, marginBottom:5 }}>{m.name}</div>
                  <div style={{ color:'#64748b', fontSize:12.5 }}>{m.role}</div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CAREERS ══════════ */}
      <section id="career" className="sec" style={{ background:'#080d1a', position:'relative', overflow:'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{
            maxWidth:640, margin:'0 auto', textAlign:'center',
            background:'rgba(255,255,255,0.03)', border:'1px solid rgba(129,140,248,0.2)',
            borderRadius:24, padding:'clamp(28px,5vw,60px)',
          }}>
            <span className="label label-purple">Join Us</span>
            <h2 style={{ fontSize:'clamp(1.5rem,4vw,2.4rem)', fontWeight:800, color:'#fff', marginBottom:14 }}>Build Your Career Here</h2>
            <p style={{ color:'#64748b', fontSize:14.5, lineHeight:1.75, marginBottom:32 }}>
              We're always looking for talented engineers, designers, and strategists. Send us your resume and let's build something great together.
            </p>
            <a href="mailto:hr@mpbdigi.in" className="btn btn-purple" style={{ textDecoration:'none', wordBreak:'break-word' }}>
              Apply Now — hr@mpbdigi.in
            </a>
          </R>
        </div>
      </section>

    
    </>
  )
}