import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ═══════════════════════════════════════════════
   SHARED HOOKS & PRIMITIVES (matches Hero.jsx)
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

function R({ as: T = 'div', cls = '', delay = 0, style = {}, children, ...rest }) {
  const ref = useReveal()
  return (
    <T ref={ref} className={`rv-wrap ${cls}`} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </T>
  )
}

function Bg({ count = 14 }) {
  const pts = Array.from({ length: count }, (_, i) => ({
    id: i, size: 1.5 + (i % 3) * 1.2,
    left: (i * 61.8) % 100, delay: (i * 0.9) % 12,
    dur: 16 + (i % 6) * 3, drift: 18 + (i % 5) * 10,
  }))
  return (
    <div style={{ position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden' }}>
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
   DATA
═══════════════════════════════════════════════ */
const PROCESS = [
  { step: '01', title: 'Requirement Analysis', desc: 'We dive deep into your business workflows, pain points, and goals to define a precise technical scope before any code is written.', icon: '📋', accent: '#38bdf8' },
  { step: '02', title: 'System Architecture', desc: 'Our architects design scalable, secure systems — selecting the right stack, database schema, APIs, and infrastructure for your needs.', icon: '🏗️', accent: '#818cf8' },
  { step: '03', title: 'Agile Development', desc: 'Development in 2-week sprints with regular demos. You see progress every step of the way and can course-correct early.', icon: '💻', accent: '#10b981' },
  { step: '04', title: 'QA & Testing', desc: "Unit tests, integration tests, load testing, and manual QA — we ship code that's been battle-tested before it ever touches production.", icon: '✅', accent: '#f59e0b' },
  { step: '05', title: 'Deployment & CI/CD', desc: 'Automated pipelines, containerised deployments, and zero-downtime releases so your users never feel a disruption.', icon: '🚀', accent: '#f43f5e' },
  { step: '06', title: 'Maintenance & Scale', desc: 'Ongoing monitoring, performance optimisation, feature iterations, and 24/7 support to keep your software growing with your business.', icon: '🔧', accent: '#22d3ee' },
]

const FEATURES = [
  { icon: '⚡', title: 'High Performance', desc: 'Optimised queries, caching layers, and async architecture built for millions of users.', accent: '#38bdf8' },
  { icon: '🔒', title: 'Enterprise Security', desc: 'OWASP best practices, encrypted data at rest and in transit, role-based access control.', accent: '#f43f5e' },
  { icon: '📈', title: 'Infinitely Scalable', desc: 'Microservices and cloud-native design that scales horizontally as your user base grows.', accent: '#10b981' },
  { icon: '🔗', title: 'API-First Design', desc: 'RESTful and GraphQL APIs built for seamless third-party integrations and mobile apps.', accent: '#818cf8' },
  { icon: '🛠️', title: 'Clean Codebase', desc: 'Documented, tested, and maintainable code — so your team can own it long-term.', accent: '#f59e0b' },
  { icon: '📊', title: 'Built-In Observability', desc: 'Logging, tracing, and monitoring dashboards configured from day one.', accent: '#22d3ee' },
]

const TECH_STACK = [
  { label: 'React / Next.js', color: '#38bdf8' },
  { label: 'Node.js / Express', color: '#22c55e' },
  { label: 'Python / Django', color: '#14b8a6' },
  { label: 'React Native', color: '#38bdf8' },
  { label: 'PostgreSQL / MySQL', color: '#6c63ff' },
  { label: 'MongoDB / Redis', color: '#22c55e' },
  { label: 'Docker / Kubernetes', color: '#f97316' },
  { label: 'AWS / GCP / Azure', color: '#eab308' },
  { label: 'GraphQL', color: '#ef4444' },
  { label: 'TypeScript', color: '#38bdf8' },
]

const PORTFOLIO = [
  { label: 'SaaS Platforms', icon: '☁️', desc: 'Multi-tenant web apps with subscription billing, dashboards, and role management.' },
  { label: 'Mobile Applications', icon: '📱', desc: 'iOS and Android apps built with React Native for a single shared codebase.' },
  { label: 'ERP & CRM Systems', icon: '🏢', desc: 'Custom business management tools tailored to your exact workflows.' },
  { label: 'API & Microservices', icon: '🔗', desc: 'Scalable backend services and third-party integration layers.' },
  { label: 'Data Dashboards', icon: '📊', desc: 'Real-time analytics portals and reporting tools with live data pipelines.' },
  { label: 'AI-Powered Tools', icon: '🤖', desc: 'LLM integrations, automation bots, and intelligent data-processing pipelines.' },
]

const ENGAGEMENT_MODELS = [
  {
    icon: '🎯', title: 'Fixed-Price Project', badge: null, accent: '#38bdf8',
    desc: 'Best for well-defined projects with a clear scope, deliverables, and deadline.',
    highlights: ['Defined scope and timeline upfront', 'Fixed budget — no surprise invoices', 'Milestone-based payments', 'Ideal for MVPs and specific modules'],
    cta: 'Get a Fixed Quote', featured: false,
  },
  {
    icon: '👥', title: 'Dedicated Team', badge: 'Most Popular', accent: '#38bdf8',
    desc: 'A full-time remote engineering team that integrates with your workflows and scales on demand.',
    highlights: ['Dedicated developers assigned to you', 'Daily standups and sprint reviews', 'Scale the team up or down monthly', 'Full-stack, mobile, QA, and DevOps'],
    cta: 'Build My Team', featured: true,
  },
  {
    icon: '⏱️', title: 'Time & Material', badge: null, accent: '#818cf8',
    desc: 'Flexible engagement for evolving projects where requirements grow over time.',
    highlights: ['Pay only for hours worked', 'Weekly timesheets and reports', 'Change scope at any sprint', 'Perfect for long-term product evolution'],
    cta: 'Start Flexibly', featured: false,
  },
]

const DEVOPS = [
  { icon: '🐳', title: 'Docker', desc: 'Containerised environments that run identically in dev, staging, and prod.' },
  { icon: '☸️', title: 'Kubernetes', desc: 'Orchestrate and auto-heal containers at any scale.' },
  { icon: '🔁', title: 'CI/CD', desc: 'Automated pipelines that test, build, and ship every commit safely.' },
  { icon: '📡', title: 'Monitoring', desc: 'Real-time dashboards, alerts, and incident response built in.' },
]

const DEVOPS_LIST = [
  'Automated CI/CD with GitHub Actions / GitLab CI',
  'Docker & Kubernetes for containerised workloads',
  'Cloud-agnostic: AWS, GCP, Azure, DigitalOcean',
  'Zero-downtime blue/green deployments',
  'Centralised logging & APM with Datadog / Grafana',
  'Auto-scaling groups and load balancers',
]

const FAQS = [
  { q: 'How long does custom software development take?', a: 'A simple MVP typically takes 6–10 weeks. Complex platforms with multiple integrations can take 4–6 months. We provide a detailed timeline after the requirement analysis phase.' },
  { q: 'Do you sign NDAs and protect our intellectual property?', a: 'Absolutely. We sign NDAs before any discussions and transfer full IP ownership to you upon project completion. Your code, designs, and data are entirely yours.' },
  { q: 'Can you work with our existing development team?', a: 'Yes. We can augment your in-house team with specific skills — backend engineers, mobile devs, DevOps specialists — and integrate seamlessly into your existing workflows and tools.' },
  { q: 'Which engagement model is right for us?', a: 'Fixed-price works best when your scope is crystal clear. Dedicated team suits ongoing product development. Time & Material is ideal when requirements will evolve. We can help you choose during our free consultation.' },
  { q: 'Do you provide post-launch support and maintenance?', a: 'Yes. Our retainer plans cover bug fixes, security patches, performance monitoring, and feature additions — so your software stays robust as your business grows.' },
  { q: 'What industries do you specialise in?', a: 'We have delivered projects across fintech, healthtech, edtech, logistics, e-commerce, and SaaS. Our process adapts to industry-specific compliance requirements like HIPAA, PCI-DSS, and GDPR.' },
]

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function SoftwareDevelopment() {
  const [openFaq, setOpenFaq] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = () => { if (form.name && form.email && form.message) setSubmitted(true) }

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

        .g2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; align-items: start; }
        .g3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }

        .label { display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 14px; border-radius: 999px; margin-bottom: 14px; }
        .label-blue { background: rgba(56,189,248,0.1); color: #38bdf8; border: 1px solid rgba(56,189,248,0.2); }
        .label-purple { background: rgba(129,140,248,0.1); color: #818cf8; border: 1px solid rgba(129,140,248,0.2); }
        .label-green { background: rgba(16,185,129,0.1); color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
        .label-amber { background: rgba(245,158,11,0.1); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }

        .div-line { width: 48px; height: 3px; border-radius: 2px; margin: 14px auto 0; }

        .btn { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; padding: 13px 30px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; cursor: pointer; border: none; transition: opacity 0.2s, transform 0.2s; }
        .btn::after { content:''; position:absolute; top:0; left:-75%; width:50%; height:100%; background:linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent); transform:skewX(-20deg); transition:left 0.55s ease; }
        .btn:hover::after { left:125%; }
        .btn:hover { transform: translateY(-1px); }
        .btn-sky { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #fff; box-shadow: 0 4px 20px rgba(56,189,248,0.3); }
        .btn-sky:hover { box-shadow: 0 6px 28px rgba(56,189,248,0.45); }
        .btn-ghost { background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.16); color: #fff; }
        .btn-ghost:hover { background: rgba(255,255,255,0.12); }
        .btn-full { width: 100%; }

        @keyframes meshDrift { 0%,100% { background-position: 0% 0%, 100% 100%, 50% 50%; } 50% { background-position: 100% 50%, 0% 50%, 60% 40%; } }
        .bg-mesh { background-image: radial-gradient(circle at 20% 30%, rgba(56,189,248,0.13), transparent 44%), radial-gradient(circle at 80% 70%, rgba(108,99,255,0.12), transparent 44%), radial-gradient(circle at 50% 50%, rgba(236,72,153,0.06), transparent 54%); background-size: 180% 180%, 180% 180%, 160% 160%; animation: meshDrift 22s ease-in-out infinite; }
        @keyframes gridScroll { from { background-position: 0 0; } to { background-position: 60px 60px; } }
        .bg-grid { background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px); background-size: 60px 60px; animation: gridScroll 26s linear infinite; }
        @keyframes ptRise { 0% { transform:translate(0,0) scale(0.4); opacity:0; } 10% { opacity:0.7; } 90% { opacity:0.4; } 100%{ transform:translate(var(--d),-100vh) scale(0.7); opacity:0; } }
        .bg-dot { position:absolute; bottom:-6px; border-radius:50%; background:radial-gradient(circle,rgba(56,189,248,0.8),transparent); animation-name:ptRise; animation-timing-function:ease-in-out; animation-iteration-count:infinite; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        .h-badge { animation: fadeUp 0.7s ease-out 0.05s both; }
        .h-title { animation: fadeUp 0.75s ease-out 0.18s both; }
        .h-sub   { animation: fadeUp 0.75s ease-out 0.32s both; }
        .h-btns  { animation: fadeUp 0.75s ease-out 0.46s both; }
        .h-mock  { animation: fadeUp 0.85s ease-out 0.5s both; }

        @keyframes gshift { 0%,100%{background-position:0% 50%}50%{background-position:100% 50%} }
        .grad { background-size:200% auto; animation: gshift 5s ease-in-out infinite; }

        @keyframes bA { 0%,100%{transform:translate(-50%,0) scale(1)} 50%{transform:translate(-50%,-18px) scale(1.07)} }
        @keyframes bB { 0%,100%{transform:scale(1)} 50%{transform:translate(14px,14px) scale(1.09)} }
        .blob-a { animation: bA 10s ease-in-out infinite; }
        .blob-b { animation: bB 13s ease-in-out infinite; }

        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(56,189,248,0.4)}70%{box-shadow:0 0 0 14px rgba(56,189,248,0)} }
        .pulse { animation: pulse 2.6s ease-out infinite; }

        .card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease, background 0.28s; }
        .card:hover { transform: translateY(-5px); }
        .card .ico-w { transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1); }
        .card:hover .ico-w { transform: scale(1.15) rotate(-4deg); }

        .chip { transition: transform 0.2s, border-color 0.2s; }
        .chip:hover { transform: translateY(-3px); }

        .inp { width: 100%; border: 1.5px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 15px; font-size: 14px; color: #e2e8f0; background: rgba(255,255,255,0.05); outline: none; font-family: inherit; transition: border-color 0.2s, box-shadow 0.2s; }
        .inp::placeholder { color: #475569; }
        .inp:focus { border-color: #38bdf8; box-shadow: 0 0 0 3px rgba(56,189,248,0.12); }

        .faq-btn { transition: background 0.2s; }
        .faq-btn:hover { background: rgba(255,255,255,0.05); }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .code-cursor { animation: blink 1.1s step-end infinite; }

        .em-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background 0.3s; }
        .em-card:hover { transform: translateY(-6px); }

        @media(prefers-reduced-motion:reduce){
          *, *::before, *::after { animation:none!important; transition:none!important; }
          .rv-wrap { opacity:1!important; transform:none!important; }
        }
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section style={{ minHeight:'100vh', background:'#05080f', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', paddingTop:64 }}>
        <Bg count={20} />
        <div style={{ position:'absolute',inset:0,pointerEvents:'none' }}>
          <div className="blob-a" style={{ position:'absolute',top:'18%',left:'50%',width:'min(620px,90vw)',height:'min(620px,60vh)',background:'rgba(56,189,248,0.07)',borderRadius:'50%',filter:'blur(90px)' }} />
          <div className="blob-b" style={{ position:'absolute',bottom:0,right:0,width:380,height:380,background:'rgba(108,99,255,0.06)',borderRadius:'50%',filter:'blur(70px)' }} />
        </div>

        <div className="wrap" style={{ position:'relative',zIndex:10,width:'100%',padding:'80px 24px' }}>
          <div className="g2" style={{ alignItems:'center' }}>
            <div style={{ textAlign:'left' }}>
              <span className="h-badge label label-blue">Custom Software Development</span>
              <h1 className="h-title" style={{ fontSize:'clamp(2rem,5.5vw,3.6rem)', fontWeight:900, color:'#fff', lineHeight:1.1, letterSpacing:'-0.025em', marginBottom:18 }}>
                Software Built{' '}
                <span className="grad" style={{ background:'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #38bdf8 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  for Your Business
                </span>
              </h1>
              <p className="h-sub" style={{ fontSize:'clamp(0.95rem,2vw,1.1rem)', color:'#94a3b8', maxWidth:480, marginBottom:32, lineHeight:1.75 }}>
                From SaaS platforms to enterprise ERPs — we design, develop, and deploy robust software solutions that solve real business problems and scale with your growth.
              </p>
              <div className="h-btns" style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
                <a href="./contact" className="btn btn-sky pulse">Get a Free Consultation</a>
                <a href="#process" className="btn btn-ghost">See How It Works</a>
              </div>
              <div className="h-btns" style={{ display:'flex',gap:32,flexWrap:'wrap',marginTop:48,paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                {[['80+','Apps Shipped'], ['8+','Years Experience'], ['99%','On-Time Delivery']].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontSize:'1.5rem',fontWeight:800,color:'#38bdf8',lineHeight:1 }}>{n}</div>
                    <div style={{ fontSize:11.5,color:'#64748b',marginTop:4,fontWeight:500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code editor mockup */}
            <div className="h-mock" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:18, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.4)' }}>
              <div style={{ background:'rgba(255,255,255,0.06)', padding:'12px 16px', display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ width:11,height:11,borderRadius:'50%',background:'#f87171aa' }} />
                <span style={{ width:11,height:11,borderRadius:'50%',background:'#fbbf24aa' }} />
                <span style={{ width:11,height:11,borderRadius:'50%',background:'#4ade80aa' }} />
                <div style={{ flex:1,marginLeft:10,background:'rgba(255,255,255,0.06)',borderRadius:6,padding:'5px 12px',fontSize:11.5,color:'#64748b',fontFamily:'monospace' }}>src / api / server.ts</div>
              </div>
              <div style={{ padding:24, fontFamily:'monospace', fontSize:12.5, lineHeight:1.9 }}>
                <div style={{ display:'flex', gap:14 }}><span style={{ color:'rgba(255,255,255,0.2)', width:14 }}>1</span><span><span style={{ color:'#a78bfa' }}>import</span> <span style={{ color:'#bfdbfe' }}>{'{ createServer }'}</span> <span style={{ color:'#a78bfa' }}>from</span> <span style={{ color:'#4ade80' }}>'http'</span></span></div>
                <div style={{ display:'flex', gap:14 }}><span style={{ color:'rgba(255,255,255,0.2)', width:14 }}>2</span><span><span style={{ color:'#a78bfa' }}>import</span> <span style={{ color:'#bfdbfe' }}>app</span> <span style={{ color:'#a78bfa' }}>from</span> <span style={{ color:'#4ade80' }}>'./app'</span></span></div>
                <div style={{ display:'flex', gap:14 }}><span style={{ color:'rgba(255,255,255,0.2)', width:14 }}>3</span><span>&#160;</span></div>
                <div style={{ display:'flex', gap:14 }}><span style={{ color:'rgba(255,255,255,0.2)', width:14 }}>4</span><span><span style={{ color:'#a78bfa' }}>const</span> <span style={{ color:'#38bdf8' }}>PORT</span> <span style={{ color:'rgba(255,255,255,0.5)' }}>=</span> <span style={{ color:'#fde68a' }}>process</span><span style={{ color:'rgba(255,255,255,0.5)' }}>.</span><span style={{ color:'#bfdbfe' }}>env</span><span style={{ color:'rgba(255,255,255,0.5)' }}>.</span><span style={{ color:'#bfdbfe' }}>PORT</span> <span style={{ color:'rgba(255,255,255,0.5)' }}>||</span> <span style={{ color:'#fdba74' }}>3000</span></span></div>
                <div style={{ display:'flex', gap:14 }}><span style={{ color:'rgba(255,255,255,0.2)', width:14 }}>5</span><span>&#160;</span></div>
                <div style={{ display:'flex', gap:14 }}><span style={{ color:'rgba(255,255,255,0.2)', width:14 }}>6</span><span><span style={{ color:'#fde68a' }}>createServer</span><span style={{ color:'rgba(255,255,255,0.5)' }}>(</span><span style={{ color:'#bfdbfe' }}>app</span><span style={{ color:'rgba(255,255,255,0.5)' }}>).</span><span style={{ color:'#fde68a' }}>listen</span><span style={{ color:'rgba(255,255,255,0.5)' }}>(</span><span style={{ color:'#38bdf8' }}>PORT</span><span style={{ color:'rgba(255,255,255,0.5)' }}>, () =&gt; {'{'}</span></span></div>
                <div style={{ display:'flex', gap:14 }}><span style={{ color:'rgba(255,255,255,0.2)', width:14 }}>7</span><span style={{ paddingLeft:18 }}><span style={{ color:'#fde68a' }}>console</span><span style={{ color:'rgba(255,255,255,0.5)' }}>.</span><span style={{ color:'#bfdbfe' }}>log</span><span style={{ color:'rgba(255,255,255,0.5)' }}>(</span><span style={{ color:'#4ade80' }}>`Server on port ${'{PORT}'}`</span><span style={{ color:'rgba(255,255,255,0.5)' }}>)</span></span></div>
                <div style={{ display:'flex', gap:14 }}><span style={{ color:'rgba(255,255,255,0.2)', width:14 }}>8</span><span style={{ color:'rgba(255,255,255,0.5)' }}>{'})'}<span className="code-cursor">▍</span></span></div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:16 }}>
                  <span style={{ padding:'3px 9px', borderRadius:6, background:'rgba(34,197,94,0.16)', color:'#4ade80', fontSize:11 }}>✓ Build passing</span>
                  <span style={{ padding:'3px 9px', borderRadius:6, background:'rgba(56,189,248,0.16)', color:'#7dd3fc', fontSize:11 }}>⬡ 98% coverage</span>
                  <span style={{ padding:'3px 9px', borderRadius:6, background:'rgba(129,140,248,0.16)', color:'#c4b5fd', fontSize:11 }}>↑ Deploying…</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHAT WE BUILD ══════════ */}
      <section className="sec" style={{ background:'#080d1a', position:'relative', overflow:'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:48 }}>
            <span className="label label-blue">Our Expertise</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>What We Build</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:460, margin:'0 auto' }}>From MVPs to enterprise-grade platforms — every project is engineered to perform.</p>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#38bdf8,#818cf8)' }} />
          </R>
          <div className="g3">
            {PORTFOLIO.map((item,i) => (
              <R key={item.label} delay={(i%3)*70}>
                <div className="card" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding:'26px 22px', height:'100%' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(56,189,248,0.3)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}
                >
                  <div className="ico-w" style={{ fontSize:30, marginBottom:16 }}>{item.icon}</div>
                  <h3 style={{ fontSize:'0.95rem', fontWeight:700, color:'#fff', marginBottom:8 }}>{item.label}</h3>
                  <p style={{ color:'#64748b', fontSize:13.5, lineHeight:1.7 }}>{item.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section className="sec" style={{ background:'#05080f', position:'relative', overflow:'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:48 }}>
            <span className="label label-purple">Built Right</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff' }}>Every Project Includes</h2>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#818cf8,#38bdf8)' }} />
          </R>
          <div className="g3">
            {FEATURES.map((f,i) => (
              <R key={f.title} delay={(i%3)*70}>
                <div className="card" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding:'26px 22px', height:'100%' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor=f.accent+'44'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}
                >
                  <div style={{ width:52, height:52, borderRadius:14, background:`${f.accent}18`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18 }}>
                    <span className="ico-w" style={{ fontSize:22 }}>{f.icon}</span>
                  </div>
                  <h3 style={{ fontSize:'0.95rem', fontWeight:700, color:'#fff', marginBottom:8 }}>{f.title}</h3>
                  <p style={{ color:'#64748b', fontSize:13.5, lineHeight:1.7 }}>{f.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROCESS ══════════ */}
      <section id="process" className="sec" style={{ background:'#080d1a', position:'relative', overflow:'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:48 }}>
            <span className="label label-blue">How It Works</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>Our 6-Step Process</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:480, margin:'0 auto' }}>An agile, transparent workflow from brief to production — so you always know what's happening next.</p>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#38bdf8,#10b981)' }} />
          </R>
          <div className="g3">
            {PROCESS.map((s,i) => (
              <R key={s.step} delay={(i%3)*70}>
                <div className="card" style={{ position:'relative', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding:'26px 22px', height:'100%' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor=s.accent+'44'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}
                >
                  <span style={{ position:'absolute', top:20, right:22, fontSize:'1.6rem', fontWeight:800, color:'rgba(255,255,255,0.06)' }}>{s.step}</span>
                  <div className="ico-w" style={{ fontSize:26, marginBottom:14 }}>{s.icon}</div>
                  <h3 style={{ fontSize:'0.95rem', fontWeight:700, color:'#fff', marginBottom:8 }}>{s.title}</h3>
                  <p style={{ color:'#64748b', fontSize:13.5, lineHeight:1.7 }}>{s.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ENGAGEMENT MODELS ══════════ */}
      <section className="sec" style={{ background:'#05080f', position:'relative', overflow:'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:48 }}>
            <span className="label label-purple">Flexible Engagements</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>Choose Your Model</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:520, margin:'0 auto' }}>Every team and project is different. We offer three engagement models so you get the right fit for your budget and goals.</p>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#818cf8,#38bdf8)' }} />
          </R>
          <div className="g3" style={{ alignItems:'stretch' }}>
            {ENGAGEMENT_MODELS.map((m,i) => (
              <R key={m.title} delay={i*80}>
                <div className="em-card" style={{
                  position:'relative', height:'100%', display:'flex', flexDirection:'column',
                  padding:'30px 26px',
                  background: m.featured ? 'rgba(56,189,248,0.07)' : 'rgba(255,255,255,0.03)',
                  border: m.featured ? '1.5px solid rgba(56,189,248,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius:20,
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor = m.featured ? '#38bdf8' : `${m.accent}55`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor = m.featured ? 'rgba(56,189,248,0.5)' : 'rgba(255,255,255,0.08)'; }}
                >
                  {m.badge && (
                    <span style={{ position:'absolute', top:-13, left:'50%', transform:'translateX(-50%)', background:'linear-gradient(135deg,#0ea5e9,#38bdf8)', color:'#fff', fontSize:11, fontWeight:700, letterSpacing:'0.03em', padding:'5px 16px', borderRadius:999, whiteSpace:'nowrap', boxShadow:'0 4px 16px rgba(56,189,248,0.35)' }}>{m.badge}</span>
                  )}
                  <div style={{ fontSize:28, marginBottom:14 }}>{m.icon}</div>
                  <h3 style={{ fontSize:'1.05rem', fontWeight:800, color:'#fff', marginBottom:8 }}>{m.title}</h3>
                  <p style={{ color:'#94a3b8', fontSize:13.5, lineHeight:1.65, marginBottom:20 }}>{m.desc}</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24, flex:1 }}>
                    {m.highlights.map(h => (
                      <div key={h} style={{ display:'flex', alignItems:'flex-start', gap:9 }}>
                        <span style={{ color:m.accent, fontWeight:700, fontSize:13, marginTop:1, flexShrink:0 }}>✓</span>
                        <span style={{ color:'#cbd5e1', fontSize:13 }}>{h}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" className={`btn btn-full ${m.featured ? 'btn-sky' : 'btn-ghost'}`}>{m.cta}</a>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TECH STACK ══════════ */}
      <section className="sec" style={{ background:'#080d1a', position:'relative', overflow:'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:40 }}>
            <span className="label label-purple">Technologies</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>Our Tech Stack</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:480, margin:'0 auto' }}>We select the right tools for each challenge — battle-tested languages, frameworks, and infrastructure that scale.</p>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#6c63ff,#38bdf8)' }} />
          </R>
          <R style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:12 }}>
            {TECH_STACK.map(t => (
              <span key={t.label} className="chip" style={{
                background: `${t.color}18`, border:`1px solid ${t.color}44`,
                borderRadius:12, padding:'10px 20px', color:'#e2e8f0', fontSize:13, fontWeight:600,
              }}>{t.label}</span>
            ))}
          </R>
        </div>
      </section>

      {/* ══════════ DEVOPS & INFRASTRUCTURE ══════════ */}
      <section className="sec" style={{ background:'#05080f', position:'relative', overflow:'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R cls="g2">
            <div>
              <span className="label label-blue">DevOps &amp; Infrastructure</span>
              <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.4rem)', fontWeight:800, color:'#fff', marginBottom:18, lineHeight:1.18 }}>We Own the Entire Pipeline</h2>
              <p style={{ color:'#94a3b8', lineHeight:1.8, fontSize:14.5, marginBottom:24 }}>
                From code commit to live production — we handle CI/CD, containerisation, cloud provisioning, and monitoring. Your team ships features; we make sure they land safely.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {DEVOPS_LIST.map(item => (
                  <div key={item} style={{ display:'flex', alignItems:'flex-start', gap:11 }}>
                    <span style={{ color:'#38bdf8', fontWeight:700, fontSize:14, marginTop:1 }}>✓</span>
                    <span style={{ color:'#cbd5e1', fontSize:14 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
              {DEVOPS.map(c => (
                <div key={c.title} className="card" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'20px 18px' }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(56,189,248,0.3)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}
                >
                  <div style={{ fontSize:22, marginBottom:8 }}>{c.icon}</div>
                  <div style={{ color:'#fff', fontWeight:700, fontSize:13.5, marginBottom:4 }}>{c.title}</div>
                  <div style={{ color:'#64748b', fontSize:12.5, lineHeight:1.6 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="sec" style={{ background:'#080d1a', position:'relative', overflow:'hidden' }}>
        <Bg count={6} />
        <div className="wrap" style={{ position:'relative',zIndex:10, maxWidth:760, margin:'0 auto' }}>
          <R style={{ textAlign:'center', marginBottom:40 }}>
            <span className="label label-amber">FAQs</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.4rem)', fontWeight:800, color:'#fff' }}>Common Questions</h2>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#f59e0b,#f43f5e)' }} />
          </R>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {FAQS.map((faq,i) => (
              <R key={faq.q} delay={i*40}>
                <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, overflow:'hidden' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="faq-btn" style={{
                    width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'18px 22px', textAlign:'left', color:'#fff', fontWeight:600, fontSize:14.5,
                    background:'transparent', border:'none', cursor:'pointer', fontFamily:'inherit',
                  }}>
                    <span style={{ paddingRight:16 }}>{faq.q}</span>
                    <span style={{ flexShrink:0, color:'#38bdf8', fontSize:20, lineHeight:1, transform: openFaq===i ? 'rotate(45deg)' : 'none', transition:'transform 0.25s' }}>+</span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding:'0 22px 18px', color:'#94a3b8', fontSize:13.5, lineHeight:1.75, borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:14 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}