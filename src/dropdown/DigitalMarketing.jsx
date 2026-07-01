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
  { step: '01', title: 'Audit & Research', desc: 'We audit your current digital presence, analyse competitors, and identify the highest-impact channels for your business goals.', icon: '🔍', accent: '#38bdf8' },
  { step: '02', title: 'Strategy & Planning', desc: 'A custom 90-day growth roadmap covering SEO, paid ads, content, and social — aligned to your revenue targets and budget.', icon: '🗺️', accent: '#818cf8' },
  { step: '03', title: 'Creative & Content', desc: 'Ad creatives, landing pages, blog posts, and social content crafted by specialists who understand your audience.', icon: '✍️', accent: '#10b981' },
  { step: '04', title: 'Campaign Launch', desc: 'Campaigns go live across chosen channels with precise targeting, tracking pixels, and conversion events configured from day one.', icon: '🚀', accent: '#f59e0b' },
  { step: '05', title: 'Optimise & Scale', desc: 'Weekly performance reviews, A/B tests, and bid adjustments to lower your cost-per-acquisition and scale what works.', icon: '📈', accent: '#f43f5e' },
  { step: '06', title: 'Report & Iterate', desc: 'Monthly reports with plain-English insights — not vanity metrics. We show exactly what drove revenue and what we do next.', icon: '📊', accent: '#22d3ee' },
]

const FEATURES = [
  { icon: '🎯', title: 'Full-Funnel Strategy', desc: 'From first impression to repeat purchase — we map and optimise every stage of your customer journey.', accent: '#38bdf8' },
  { icon: '📊', title: 'Data-Driven Decisions', desc: 'Every budget rupee is tracked to revenue. No guesswork, no vanity metrics — just ROI.', accent: '#10b981' },
  { icon: '✍️', title: 'In-House Creative', desc: 'Ad copy, graphics, video scripts, and landing pages created by our team — no outsourcing.', accent: '#f59e0b' },
  { icon: '🔍', title: 'SEO That Compounds', desc: 'Technical SEO, content clusters, and authority link building that drives organic traffic for years.', accent: '#818cf8' },
  { icon: '⚡', title: 'Paid Ads at Scale', desc: 'Google, Meta, LinkedIn, and YouTube campaigns managed by certified specialists with proven ROAS track records.', accent: '#22d3ee' },
  { icon: '🤝', title: 'Dedicated Growth Manager', desc: 'One point of contact who knows your business inside out and owns your results every week.', accent: '#f43f5e' },
]

const TECH_STACK = [
  { label: 'Google Ads', color: '#38bdf8' },
  { label: 'Meta Ads', color: '#38bdf8' },
  { label: 'Google Analytics 4', color: '#f97316' },
  { label: 'SEMrush / Ahrefs', color: '#22c55e' },
  { label: 'HubSpot / Zoho CRM', color: '#f97316' },
  { label: 'Klaviyo / Mailchimp', color: '#ef4444' },
  { label: 'LinkedIn Ads', color: '#38bdf8' },
  { label: 'YouTube Ads', color: '#ef4444' },
  { label: 'Search Console', color: '#22c55e' },
  { label: 'Hotjar / Clarity', color: '#6c63ff' },
]

const PORTFOLIO = [
  { label: 'Search Engine Optimisation', icon: '🔍', desc: 'Technical SEO, keyword strategy, and content marketing that earns sustainable organic traffic.' },
  { label: 'Pay-Per-Click Ads', icon: '🎯', desc: 'Google Search, Display, Shopping, and Performance Max campaigns built for maximum ROAS.' },
  { label: 'Social Media Marketing', icon: '📱', desc: 'Organic and paid social strategies across Meta, Instagram, LinkedIn, and YouTube.' },
  { label: 'Email & SMS Marketing', icon: '📧', desc: 'Automated drip flows, newsletters, and SMS campaigns that nurture leads into customers.' },
  { label: 'Content Marketing', icon: '✍️', desc: 'Blog posts, case studies, whitepapers, and videos that establish authority and drive inbound leads.' },
  { label: 'Conversion Rate Optimisation', icon: '📈', desc: 'Landing page A/B tests, UX audits, and heatmap analysis to turn more visitors into buyers.' },
]

const MARKETING_MODELS = [
  {
    icon: '🚀', title: 'Growth Retainer', badge: 'Most Popular', accent: '#38bdf8',
    desc: 'An ongoing monthly partnership where our team acts as your in-house marketing department.',
    highlights: ['Full-channel strategy and execution', 'Dedicated growth manager', 'Monthly performance reports', 'Scales with your ad spend'],
    cta: 'Start Growing', featured: true,
  },
  {
    icon: '🎯', title: 'Project-Based', badge: null, accent: '#818cf8',
    desc: 'A fixed-scope engagement for a specific campaign, launch, or one-time marketing push.',
    highlights: ['Defined deliverables and timeline', 'Fixed budget — no surprises', 'Ideal for product launches', 'Campaign audits and strategy decks'],
    cta: 'Get a Project Quote', featured: false,
  },
  {
    icon: '🔍', title: 'SEO-Only Plan', badge: null, accent: '#10b981',
    desc: 'Focused entirely on ranking your website higher on Google and driving organic traffic at scale.',
    highlights: ['Technical SEO & site audit', 'Monthly content and link building', 'Keyword rank tracking dashboard', 'Best for long-term organic growth'],
    cta: 'Boost My Rankings', featured: false,
  },
]

const REPORTING = [
  { icon: '📊', title: 'Live Dashboard', desc: 'Real-time metrics for every channel in one place — no spreadsheet hunting.' },
  { icon: '📈', title: 'ROAS Tracking', desc: 'Every ad spend traced back to actual revenue, not just clicks or impressions.' },
  { icon: '🔍', title: 'Rank Reports', desc: 'Weekly SEO rank updates for all your target keywords and competitors.' },
  { icon: '📧', title: 'Monthly Reports', desc: 'Plain-English summaries with clear next steps — sent before you ask.' },
]

const REPORTING_LIST = [
  'Live dashboard with real-time campaign data',
  'Monthly video report with plain-English insights',
  'Full ad spend transparency — your accounts, always',
  'Keyword rank tracking updated weekly',
  'Lead quality scoring and CRM integration',
  'Competitor benchmarking every quarter',
]

const FAQS = [
  { q: 'How long before I see results from digital marketing?', a: 'Paid ads (Google, Meta) can generate leads within days of launch. SEO typically shows measurable movement in 3–6 months and compounds over time. We set realistic timelines during the discovery call.' },
  { q: 'What is your minimum ad spend requirement?', a: 'We recommend a minimum monthly ad budget of ₹30,000 for Google Ads and ₹20,000 for Meta Ads to generate statistically meaningful data. Our management fee is separate from your ad spend.' },
  { q: 'Do you work with businesses outside India?', a: 'Yes. We manage campaigns for clients across India, UAE, UK, Australia, and the US. Our team operates across time zones and can run campaigns in multiple currencies and languages.' },
  { q: 'How do you report results and measure success?', a: "You get a live dashboard with real-time campaign data plus a monthly video walkthrough report. We track leads, cost-per-lead, ROAS, organic traffic, and rankings — not impressions or clicks alone." },
  { q: 'Can you manage our social media accounts as well?', a: 'Yes. Our social media management service covers content calendars, post design, copywriting, scheduling, and community management across Instagram, Facebook, LinkedIn, and YouTube.' },
  { q: 'Do you offer one-time audits or strategy sessions?', a: 'Absolutely. We offer standalone SEO audits, Google Ads account reviews, and 2-hour strategy workshops — ideal for in-house teams who need expert direction without a full retainer.' },
]

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function DigitalMarketing() {
  const [openFaq, setOpenFaq] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '', message: '' })
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

        .em-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background 0.3s; }
        .em-card:hover { transform: translateY(-6px); }

        @keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .bar { transform-origin: bottom; animation: barGrow 0.9s cubic-bezier(0.16,1,0.3,1) both; }

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
              <span className="h-badge label label-blue">Digital Marketing</span>
              <h1 className="h-title" style={{ fontSize:'clamp(2rem,5.5vw,3.6rem)', fontWeight:900, color:'#fff', lineHeight:1.1, letterSpacing:'-0.025em', marginBottom:18 }}>
                Marketing That{' '}
                <span className="grad" style={{ background:'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #38bdf8 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  Drives Real Revenue
                </span>
              </h1>
              <p className="h-sub" style={{ fontSize:'clamp(0.95rem,2vw,1.1rem)', color:'#94a3b8', maxWidth:480, marginBottom:32, lineHeight:1.75 }}>
                From SEO and Google Ads to social media and email — we run full-funnel digital marketing campaigns that attract the right audience and convert them into paying customers.
              </p>
              <div className="h-btns" style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
                <a href="./contact" className="btn btn-sky pulse">Get a Free Audit</a>
                <a href="#process" className="btn btn-ghost">See How It Works</a>
              </div>
              <div className="h-btns" style={{ display:'flex',gap:32,flexWrap:'wrap',marginTop:48,paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                {[['200+','Campaigns Run'], ['8+','Years Experience'], ['4.2×','Average ROAS']].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontSize:'1.5rem',fontWeight:800,color:'#38bdf8',lineHeight:1 }}>{n}</div>
                    <div style={{ fontSize:11.5,color:'#64748b',marginTop:4,fontWeight:500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign dashboard mockup */}
            <div className="h-mock" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:18, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.4)' }}>
              <div style={{ background:'rgba(255,255,255,0.06)', padding:'12px 16px', display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ width:11,height:11,borderRadius:'50%',background:'#f87171aa' }} />
                <span style={{ width:11,height:11,borderRadius:'50%',background:'#fbbf24aa' }} />
                <span style={{ width:11,height:11,borderRadius:'50%',background:'#4ade80aa' }} />
                <div style={{ flex:1,marginLeft:10,background:'rgba(255,255,255,0.06)',borderRadius:6,padding:'5px 12px',fontSize:11.5,color:'#64748b' }}>Campaign Dashboard — Oct 2024</div>
              </div>
              <div style={{ padding:22, display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                  {[
                    { label:'ROAS', value:'4.2×', color:'#4ade80', delta:'↑ +18%' },
                    { label:'Leads', value:'1,284', color:'#38bdf8', delta:'↑ +18%' },
                    { label:'CPL', value:'₹312', color:'#c4b5fd', delta:'↓ −12%' },
                  ].map(k => (
                    <div key={k.label} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'10px 12px' }}>
                      <div style={{ fontSize:11, color:'#94a3b8', marginBottom:4 }}>{k.label}</div>
                      <div style={{ fontSize:15, fontWeight:800, color:k.color }}>{k.value}</div>
                      <div style={{ fontSize:10.5, color:'#4ade80', marginTop:2 }}>{k.delta}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'12px 14px' }}>
                  <div style={{ fontSize:11, color:'#94a3b8', marginBottom:10 }}>Weekly Conversions</div>
                  <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:56 }}>
                    {[40,65,45,80,60,90,75].map((h,i) => (
                      <div key={i} className="bar" style={{ flex:1, height:`${h}%`, borderRadius:3, background: i===5 ? 'rgba(56,189,248,0.85)' : 'rgba(56,189,248,0.25)', animationDelay:`${i*0.07}s` }} />
                    ))}
                  </div>
                  <div style={{ display:'flex', marginTop:6 }}>
                    {['M','T','W','T','F','S','S'].map((d,i) => <span key={i} style={{ flex:1, textAlign:'center', fontSize:10, color:'rgba(255,255,255,0.25)' }}>{d}</span>)}
                  </div>
                </div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <span style={{ padding:'5px 11px', borderRadius:8, background:'rgba(56,189,248,0.16)', color:'#7dd3fc', fontSize:11.5, fontWeight:600 }}>Google Ads</span>
                  <span style={{ padding:'5px 11px', borderRadius:8, background:'rgba(129,140,248,0.16)', color:'#c4b5fd', fontSize:11.5, fontWeight:600 }}>Meta Ads</span>
                  <span style={{ padding:'5px 11px', borderRadius:8, background:'rgba(34,197,94,0.16)', color:'#4ade80', fontSize:11.5, fontWeight:600 }}>SEO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section className="sec" style={{ background:'#080d1a', position:'relative', overflow:'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:48 }}>
            <span className="label label-blue">Our Services</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>What We Do</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:460, margin:'0 auto' }}>Every channel, every tactic — managed by specialists who live and breathe digital marketing.</p>
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
            <span className="label label-purple">Why MBP Digital</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff' }}>Every Engagement Includes</h2>
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
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:480, margin:'0 auto' }}>A structured, transparent workflow from audit to scale — so you always know where your budget is going.</p>
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

      {/* ══════════ MARKETING MODELS ══════════ */}
      <section className="sec" style={{ background:'#05080f', position:'relative', overflow:'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:48 }}>
            <span className="label label-purple">Engagement Options</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>Choose Your Plan</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:520, margin:'0 auto' }}>Whether you need full-service marketing or targeted help on one channel — we have a model that fits.</p>
            <div className="div-line" style={{ background:'linear-gradient(90deg,#818cf8,#38bdf8)' }} />
          </R>
          <div className="g3" style={{ alignItems:'stretch' }}>
            {MARKETING_MODELS.map((m,i) => (
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

      {/* ══════════ TOOLS & PLATFORMS ══════════ */}
      <section className="sec" style={{ background:'#080d1a', position:'relative', overflow:'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:40 }}>
            <span className="label label-purple">Tools &amp; Platforms</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>What We Work With</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:480, margin:'0 auto' }}>Industry-leading platforms and tools to plan, execute, track, and scale your marketing across every channel.</p>
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

      {/* ══════════ REPORTING & TRANSPARENCY ══════════ */}
      <section className="sec" style={{ background:'#05080f', position:'relative', overflow:'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R cls="g2">
            <div>
              <span className="label label-blue">Reporting &amp; Transparency</span>
              <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.4rem)', fontWeight:800, color:'#fff', marginBottom:18, lineHeight:1.18 }}>You See Every Rupee Working</h2>
              <p style={{ color:'#94a3b8', lineHeight:1.8, fontSize:14.5, marginBottom:24 }}>
                No black boxes, no fluff. You get a live reporting dashboard and monthly video walkthroughs that show exactly what we did, what it cost, and what it earned — so you're always in control.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {REPORTING_LIST.map(item => (
                  <div key={item} style={{ display:'flex', alignItems:'flex-start', gap:11 }}>
                    <span style={{ color:'#38bdf8', fontWeight:700, fontSize:14, marginTop:1 }}>✓</span>
                    <span style={{ color:'#cbd5e1', fontSize:14 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
              {REPORTING.map(c => (
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