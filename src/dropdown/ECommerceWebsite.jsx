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
  { step: '01', title: 'Store Strategy', desc: 'We study your products, customers, and competitors to plan a catalogue structure and conversion funnel that fits your market.', icon: '🧭', accent: '#38bdf8' },
  { step: '02', title: 'UX & Storefront Design', desc: 'Pixel-perfect storefronts designed around product discovery, trust signals, and a frictionless path to checkout.', icon: '🎨', accent: '#818cf8' },
  { step: '03', title: 'Store Build', desc: 'Catalogue, cart, checkout, and account flows built on a scalable platform — Shopify, WooCommerce, or fully custom.', icon: '🛍️', accent: '#10b981' },
  { step: '04', title: 'Payments & Logistics', desc: 'Secure payment gateways, tax rules, and shipping integrations configured and tested end to end.', icon: '💳', accent: '#f59e0b' },
  { step: '05', title: 'QA & Launch', desc: 'Cross-device checkout testing, load testing for sale traffic spikes, and a smooth go-live.', icon: '🚀', accent: '#f43f5e' },
  { step: '06', title: 'Growth & Optimisation', desc: 'Post-launch CRO, abandoned-cart recovery, and ongoing feature releases to keep revenue climbing.', icon: '📈', accent: '#22d3ee' },
]

const FEATURES = [
  { icon: '🛒', title: 'Smart Cart & Checkout', desc: 'One-page checkout, saved carts, and guest checkout to reduce drop-off at the final step.', accent: '#38bdf8' },
  { icon: '💳', title: 'Secure Payments', desc: 'Razorpay, Stripe, PayPal, and UPI integrations with PCI-DSS compliant handling.', accent: '#10b981' },
  { icon: '📦', title: 'Inventory & Orders', desc: 'Real-time stock sync, low-stock alerts, and an order dashboard your team can actually use.', accent: '#f59e0b' },
  { icon: '🔍', title: 'Search & Filters', desc: 'Fast product search with filters, sorting, and recommendations that help shoppers find what they want.', accent: '#818cf8' },
  { icon: '📱', title: 'Mobile-First Storefront', desc: 'Most shoppers buy on mobile — every store ships fully responsive and thumb-friendly.', accent: '#22d3ee' },
  { icon: '🎁', title: 'Promotions & Loyalty', desc: 'Coupon codes, bundles, and loyalty points to drive repeat purchases.', accent: '#f43f5e' },
]

const TECH_STACK = [
  { label: 'Shopify', color: '#22c55e' },
  { label: 'WooCommerce', color: '#a855f7' },
  { label: 'Next.js Commerce', color: '#38bdf8' },
  { label: 'Razorpay / Stripe', color: '#6c63ff' },
  { label: 'Node.js', color: '#22c55e' },
  { label: 'PostgreSQL', color: '#818cf8' },
  { label: 'Redis', color: '#ef4444' },
  { label: 'AWS / Cloudflare', color: '#eab308' },
]

const PORTFOLIO = [
  { label: 'Fashion & Apparel', icon: '👗', desc: 'Lookbook-driven storefronts with size guides and rich product imagery.' },
  { label: 'Electronics & Gadgets', icon: '🎧', desc: 'Spec-heavy catalogues with comparison tools and warranty tracking.' },
  { label: 'Grocery & FMCG', icon: '🛒', desc: 'High-frequency reorder flows with subscriptions and quick checkout.' },
  { label: 'Beauty & Wellness', icon: '💄', desc: 'Quiz-based recommendations and subscription box experiences.' },
  { label: 'B2B Wholesale', icon: '📦', desc: 'Tiered pricing, bulk ordering, and account-based catalogues.' },
  { label: 'Marketplaces', icon: '🏬', desc: 'Multi-vendor platforms with seller dashboards and commission tracking.' },
]

const PAYMENTS = [
  { icon: '💳', title: 'Cards', desc: 'Visa, Mastercard, RuPay, Amex — tokenised and PCI-DSS compliant.' },
  { icon: '📲', title: 'UPI & Wallets', desc: 'UPI, Paytm, PhonePe, and Google Pay for instant local checkout.' },
  { icon: '🌍', title: 'Global Gateways', desc: 'Stripe and PayPal for cross-border orders and multi-currency pricing.' },
  { icon: '🔁', title: 'COD & EMI', desc: 'Cash on delivery and EMI options where they fit your customer base.' },
]

const PAYMENTS_LIST = [
  'PCI-DSS compliant payment handling',
  'Multi-currency and multi-language storefronts',
  'Real-time shipping rate and courier integration',
  'Automated tax calculation by region',
  'Abandoned-cart email & SMS recovery',
  'Fraud detection and order verification',
]

const FAQS = [
  { q: 'Which e-commerce platform is right for my business?', a: 'Shopify suits fast-launching standard stores, WooCommerce fits WordPress-based businesses, and a fully custom build suits stores with unique workflows or scale needs. We help you choose during the strategy call.' },
  { q: 'Can you migrate my existing store without losing data?', a: 'Yes. We migrate products, customers, order history, and SEO rankings with redirect mapping so you don\'t lose search traffic during the switch.' },
  { q: 'Do you integrate with payment gateways and shipping partners?', a: 'Yes — Razorpay, Stripe, PayPal, UPI, and major courier APIs like Delhivery, Shiprocket, and FedEx are all standard integrations.' },
  { q: 'Will my store handle high traffic during sales?', a: 'We load-test every store before launch and configure caching, CDN, and auto-scaling so checkout stays fast during flash sales and festive traffic spikes.' },
  { q: 'Do you offer post-launch support?', a: 'Our retainer plans cover bug fixes, security patches, new feature builds, and performance monitoring so your store keeps converting.' },
]

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function EcommerceWebsite() {
  const [openFaq, setOpenFaq] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', store: '', message: '' })
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
        .mock-bar { animation: blink 3s ease-in-out infinite; }

        @keyframes floatBadge { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-6px) } }
        .float-badge { animation: floatBadge 3.4s ease-in-out infinite; }

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
              <span className="h-badge label label-blue">E-Commerce Website Development</span>
              <h1 className="h-title" style={{ fontSize:'clamp(2rem,5.5vw,3.6rem)', fontWeight:900, color:'#fff', lineHeight:1.1, letterSpacing:'-0.025em', marginBottom:18 }}>
                Online Stores That{' '}
                <span className="grad" style={{ background:'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #38bdf8 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  Actually Sell
                </span>
              </h1>
              <p className="h-sub" style={{ fontSize:'clamp(0.95rem,2vw,1.1rem)', color:'#94a3b8', maxWidth:480, marginBottom:32, lineHeight:1.75 }}>
                We build fast, secure online stores — from catalogue to checkout to courier — so every visitor has a smooth path to "order placed."
              </p>
              <div className="h-btns" style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
                <a href="./contact" className="btn btn-sky pulse">Get a Free Quote</a>
                <a href="#process" className="btn btn-ghost">See How It Works</a>
              </div>
              <div className="h-btns" style={{ display:'flex',gap:32,flexWrap:'wrap',marginTop:48,paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                {[['90+','Stores Launched'], ['₹40Cr+','GMV Processed'], ['99.9%','Checkout Uptime']].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontSize:'1.5rem',fontWeight:800,color:'#38bdf8',lineHeight:1 }}>{n}</div>
                    <div style={{ fontSize:11.5,color:'#64748b',marginTop:4,fontWeight:500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Storefront / product card mockup */}
            <div className="h-mock" style={{ position:'relative', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:18, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.4)' }}>
              <div style={{ background:'rgba(255,255,255,0.06)', padding:'12px 16px', display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ width:11,height:11,borderRadius:'50%',background:'#f87171aa' }} />
                <span style={{ width:11,height:11,borderRadius:'50%',background:'#fbbf24aa' }} />
                <span style={{ width:11,height:11,borderRadius:'50%',background:'#4ade80aa' }} />
                <div style={{ flex:1,marginLeft:10,background:'rgba(255,255,255,0.06)',borderRadius:6,padding:'5px 12px',fontSize:11.5,color:'#64748b' }}>https://yourstore.com/cart</div>
              </div>
              <div style={{ padding:24, display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ display:'flex', gap:14, alignItems:'center' }}>
                  <div style={{ width:60, height:60, borderRadius:12, background:'linear-gradient(135deg,rgba(56,189,248,0.3),rgba(129,140,248,0.25))', flexShrink:0 }} />
                  <div style={{ flex:1 }}>
                    <div className="mock-bar" style={{ height:11, width:'70%', background:'rgba(255,255,255,0.12)', borderRadius:5, marginBottom:8 }} />
                    <div className="mock-bar" style={{ height:9, width:'40%', background:'rgba(255,255,255,0.06)', borderRadius:5, animationDelay:'0.3s' }} />
                  </div>
                  <div style={{ color:'#38bdf8', fontWeight:800, fontSize:14 }}>₹2,499</div>
                </div>
                <div style={{ display:'flex', gap:14, alignItems:'center' }}>
                  <div style={{ width:60, height:60, borderRadius:12, background:'linear-gradient(135deg,rgba(16,185,129,0.28),rgba(34,211,238,0.2))', flexShrink:0 }} />
                  <div style={{ flex:1 }}>
                    <div className="mock-bar" style={{ height:11, width:'58%', background:'rgba(255,255,255,0.12)', borderRadius:5, marginBottom:8, animationDelay:'0.5s' }} />
                    <div className="mock-bar" style={{ height:9, width:'34%', background:'rgba(255,255,255,0.06)', borderRadius:5, animationDelay:'0.8s' }} />
                  </div>
                  <div style={{ color:'#38bdf8', fontWeight:800, fontSize:14 }}>₹899</div>
                </div>
                <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:14, display:'flex', justifyContent:'space-between', fontSize:12.5, color:'#94a3b8' }}>
                  <span>Subtotal</span><span style={{ color:'#fff', fontWeight:700 }}>₹3,398</span>
                </div>
                <div style={{ height:42, background:'linear-gradient(135deg,#0ea5e9,#38bdf8)', borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:13.5 }}>
                  Proceed to Checkout →
                </div>
              </div>
              <span className="float-badge" style={{ position:'absolute', top:64, right:-10, background:'rgba(16,185,129,0.16)', border:'1px solid rgba(16,185,129,0.4)', color:'#4ade80', fontSize:11, fontWeight:700, padding:'5px 12px', borderRadius:999 }}>✓ Payment Secured</span>
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
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>Stores We Build</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:460, margin:'0 auto' }}>Every category has its own buying behaviour — we design catalogues and checkout flows around it.</p>
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
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff' }}>Every Store Includes</h2>
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
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:480, margin:'0 auto' }}>From strategy to a store that's actually taking orders — a clear path with no surprises.</p>
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

      {/* ══════════ TECH STACK ══════════ */}
      <section className="sec" style={{ background:'#05080f', position:'relative', overflow:'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R style={{ textAlign:'center', marginBottom:40 }}>
            <span className="label label-purple">Technologies</span>
            <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:800, color:'#fff', marginBottom:12 }}>Our Commerce Stack</h2>
            <p style={{ color:'#64748b', fontSize:14.5, maxWidth:460, margin:'0 auto' }}>Proven commerce platforms and infrastructure chosen to fit your catalogue size and growth plans.</p>
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

      {/* ══════════ PAYMENTS & LOGISTICS ══════════ */}
      <section className="sec" style={{ background:'#080d1a', position:'relative', overflow:'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position:'relative',zIndex:10 }}>
          <R cls="g2">
            <div>
              <span className="label label-blue">Payments &amp; Logistics</span>
              <h2 style={{ fontSize:'clamp(1.6rem,4vw,2.4rem)', fontWeight:800, color:'#fff', marginBottom:18, lineHeight:1.18 }}>Checkout That Doesn't Lose Sales</h2>
              <p style={{ color:'#94a3b8', lineHeight:1.8, fontSize:14.5, marginBottom:24 }}>
                We wire up every payment method your customers actually use, plus shipping and tax logic that works correctly the first time — so carts convert instead of getting abandoned.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {PAYMENTS_LIST.map(item => (
                  <div key={item} style={{ display:'flex', alignItems:'flex-start', gap:11 }}>
                    <span style={{ color:'#38bdf8', fontWeight:700, fontSize:14, marginTop:1 }}>✓</span>
                    <span style={{ color:'#cbd5e1', fontSize:14 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
              {PAYMENTS.map(c => (
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
      <section className="sec" style={{ background:'#05080f', position:'relative', overflow:'hidden' }}>
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