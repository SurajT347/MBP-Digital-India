import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

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
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
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
const iconProps = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

const Icons = {
  pin: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  mail: (p) => (
    <svg {...iconProps} {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  ),
  clock: (p) => (
    <svg {...iconProps} {...p}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  zap: (p) => (
    <svg {...iconProps} {...p}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  shield: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M12 2 4 5v6c0 5.25 3.4 9.74 8 11 4.6-1.26 8-5.75 8-11V5l-8-3z" />
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
  warning: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  check: (p) => (
    <svg {...iconProps} {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  externalLink: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
}

function Icon({ name, size = 22, color = '#fff' }) {
  const Cmp = Icons[name]
  return Cmp ? Cmp({ width: size, height: size, style: { color }, 'aria-hidden': 'true', focusable: 'false' }) : null
}

const INFO = [
  {
    icon: 'pin',
    title: 'Visit Us',
    accent: '#38bdf8',
    bg: 'rgba(56,189,248,0.06)',
    border: 'rgba(56,189,248,0.18)',
    lines: ['Office No. 402, 4th Floor', 'Vishva Arcade Building', 'Near Navale Bridge', 'Pune, Maharashtra – 411041'],
  },
  {
    icon: 'mail',
    title: 'Email Us',
    accent: '#818cf8',
    bg: 'rgba(129,140,248,0.06)',
    border: 'rgba(129,140,248,0.18)',
    lines: ['hr@mpbdigi.in'],
    href: 'mailto:hr@mpbdigi.in',
  },
  {
    icon: 'clock',
    title: 'Business Hours',
    accent: '#10b981',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.18)',
    lines: ['Mon – Fri: 9:00 AM – 6:00 PM', 'Sat: 10:00 AM – 2:00 PM', 'Sun: Closed'],
  },
]

const BADGES = [
  { icon: 'zap', text: 'Reply within 1 business day', color: '#f59e0b' },
  { icon: 'shield', text: 'Your data is safe with us', color: '#10b981' },
  { icon: 'handshake', text: 'Free initial consultation', color: '#38bdf8' },
]

/* ══ MAP CONFIG ══
   Uses the key-free Google Maps embed endpoint (google.com/maps?...&output=embed).
   Swap MAP_QUERY for your exact address, or replace the src with an
   embed link copied from Google Maps → Share → Embed a map, if you have a
   Maps Embed API key and want that version instead. */
const MAP_QUERY = 'Vishva Arcade Building, Near Navale Bridge, Pune, Maharashtra 411041'
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`

/* ══ EMAILJS CONFIG ══ */
const EMAILJS_SERVICE_ID = 'service_x8k4p2d'
const EMAILJS_TEMPLATE_ID = 'template_bb4955f'
const EMAILJS_PUBLIC_KEY = 'yJdOizs-pLUV_uAVE'

// The mailbox that should receive every form submission.
// This value is also passed as `to_email` in the template params below,
// so make sure your EmailJS template's "To Email" field uses {{to_email}}.
const RECIPIENT_EMAIL = 'surajthorat1419@gmail.com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState('')
  const [mapLoaded, setMapLoaded] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = () => {
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.')
      return
    }

    setSending(true)
    setError('')

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        // Sender's details, filled in from the form
        name: form.name,
        email: form.email,
        phone: form.phone || 'Not provided',
        message: form.message,
        // Destination mailbox — must match the variable name used
        // in the EmailJS template's "To Email" field, e.g. {{to_email}}
        to_email: RECIPIENT_EMAIL,
        reply_to: form.email,
      },
      EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setSending(false)
        setSubmitted(true)
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
        setSending(false)
        setError('Something went wrong. Please try again or email us directly at')
      })
  }

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

        .div-line { width: 48px; height: 3px; border-radius: 2px; margin: 14px auto 0; }

        .btn { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; padding: 13px 30px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; cursor: pointer; border: none; transition: opacity 0.2s, transform 0.2s; font-family: inherit; }
        .btn::after { content:''; position:absolute; top:0; left:-75%; width:50%; height:100%; background:linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent); transform:skewX(-20deg); transition:left 0.55s ease; }
        .btn:hover::after { left:125%; }
        .btn:hover { transform: translateY(-1px); }
        .btn-sky { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #fff; box-shadow: 0 4px 20px rgba(56,189,248,0.3); }
        .btn-sky:hover { box-shadow: 0 6px 28px rgba(56,189,248,0.45); }
        .btn-sky:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
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
        .card:hover { transform: translateY(-4px); }

        .inp {
          width: 100%; border: 1.5px solid rgba(255,255,255,0.08); border-radius: 12px;
          padding: 13px 16px; font-size: 14px; color: #e2e8f0;
          background: rgba(255,255,255,0.04); outline: none; font-family: inherit;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .inp::placeholder { color: #334155; }
        .inp:focus { border-color: #38bdf8; background: rgba(56,189,248,0.04); box-shadow: 0 0 0 3px rgba(56,189,248,0.1); }

        @keyframes checkPop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
        .check-pop { animation: checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }

        .map-wrap { position: relative; width: 100%; aspect-ratio: 16 / 11; border-radius: 16px; overflow: hidden; border: 1.5px solid rgba(56,189,248,0.18); background: rgba(255,255,255,0.03); }
        .map-wrap iframe { width: 100%; height: 100%; border: 0; display: block; filter: grayscale(0.25) invert(0.92) contrast(0.9); transition: opacity 0.4s ease; }
        .map-skel { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(56,189,248,0.05), rgba(129,140,248,0.05)); color: #475569; font-size: 12.5px; letter-spacing: 0.04em; }

        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

        a:focus-visible,
        button:focus-visible,
        .inp:focus-visible,
        iframe:focus-visible {
          outline: 2.5px solid #38bdf8;
          outline-offset: 3px;
          border-radius: 8px;
        }

        @media(prefers-reduced-motion:reduce){ *, *::before, *::after { animation:none!important; transition:none!important; } .rv-wrap { opacity:1!important; transform:none!important; } }
      `}</style>

      {/* ══ HERO ══ */}
      <section id="contact" aria-labelledby="contact-hero-heading" style={{ minHeight: '52vh', background: '#05080f', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
        <Bg count={20} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div className="blob-a" style={{ position: 'absolute', top: '18%', left: '50%', width: 'min(560px,90vw)', height: 'min(460px,55vh)', background: 'rgba(56,189,248,0.07)', borderRadius: '50%', filter: 'blur(90px)' }} />
          <div className="blob-b" style={{ position: 'absolute', bottom: 0, right: 0, width: 320, height: 320, background: 'rgba(108,99,255,0.06)', borderRadius: '50%', filter: 'blur(70px)' }} />
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', padding: '72px 24px' }}>
          <span className="h-in1 label label-blue" aria-hidden="true">Get in Touch</span>
          <h1 id="contact-hero-heading" className="h-in2" style={{ fontSize: 'clamp(2rem,6vw,4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 24 }}>
            <span style={{ display: 'block', marginBottom: 6 }}>Let's Build Something</span>
            <span className="grad" style={{
              display: 'block',
              background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Together</span>
          </h1>
          <p className="h-in3" style={{ fontSize: 'clamp(0.95rem,2.2vw,1.1rem)', color: '#94a3b8', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
            We'd love to hear from you. Fill out the form and we'll get back to you within one business day.
          </p>
        </div>
      </section>

      {/* ══ INFO CARDS ══ */}
      <section aria-labelledby="contact-info-heading" className="sec" style={{ background: '#080d1a', position: 'relative', overflow: 'hidden', paddingTop: 56, paddingBottom: 0 }}>
        <Bg count={8} />
        <h2 id="contact-info-heading" className="sr-only">Contact details</h2>
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
            {INFO.map((info, i) => (
              <R key={info.title} delay={i * 80} cls="card" style={{
                background: info.bg, border: `1px solid ${info.border}`,
                borderRadius: 18, padding: '24px 22px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${info.accent}18`, border: `1px solid ${info.accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: info.accent }}>
                    <Icon name={info.icon} size={19} color={info.accent} />
                  </div>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{info.title}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {info.lines.map((line, j) => (
                    info.href
                      ? <a key={j} href={info.href} style={{ color: info.accent, fontSize: 13.5, fontWeight: 600, textDecoration: 'none' }}
                          onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                          onMouseLeave={e => e.target.style.textDecoration = 'none'}
                        >{line}</a>
                      : <span key={j} style={{ color: '#64748b', fontSize: 13.5, lineHeight: 1.7 }}>{line}</span>
                  ))}
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FORM + MAP ══ */}
      <section aria-labelledby="contact-form-heading" className="sec" style={{ background: '#080d1a', position: 'relative', overflow: 'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label label-blue" aria-hidden="true">Send a Message</span>
            <h2 id="contact-form-heading" style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Contact Us</h2>
            <p style={{ color: '#64748b', fontSize: 14.5, maxWidth: 400, margin: '0 auto' }}>Fill out the form and we'll get back to you within one business day.</p>
            <div className="div-line" style={{ background: 'linear-gradient(90deg,#38bdf8,#818cf8)' }} />
          </R>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40, maxWidth: 1000, margin: '0 auto', alignItems: 'start' }}>

            {/* Address block */}
            <R>
              <h3 id="our-location-heading" style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 20 }}>Our Location</h3>
              <div style={{ background: 'rgba(56,189,248,0.04)', border: '1.5px solid rgba(56,189,248,0.15)', borderRadius: 16, padding: '24px 22px', marginBottom: 14 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, marginTop: 2, color: '#38bdf8' }}><Icon name="pin" size={22} color="#38bdf8" /></span>
                  <div>
                    <p style={{ fontWeight: 700, color: '#fff', fontSize: 14, marginBottom: 8 }}>MBP Digital India Pune</p>
                    <p style={{ color: '#64748b', fontSize: 13.5, lineHeight: 1.8 }}>
                      Office No. 402, 4th Floor<br />
                      Vishva Arcade Building<br />
                      Near Navale Bridge<br />
                      Pune, Maharashtra – 411041
                    </p>
                  </div>
                </div>
              </div>
              

              {/* ══ GOOGLE MAP ══ */}
              <div
                className="map-wrap"
                role="region"
                aria-labelledby="our-location-heading"
                style={{ marginBottom: 14 }}
              >
                {!mapLoaded && (
                  <div className="map-skel" role="status" aria-live="polite">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon name="pin" size={16} color="#475569" /> Loading map…
                    </span>
                  </div>
                )}
                <iframe
                  title="Map showing MBP Digital India office at Vishva Arcade Building, Near Navale Bridge, Pune, Maharashtra 411041"
                  src={MAP_SRC}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                  style={{ opacity: mapLoaded ? 1 : 0 }}
                  allowFullScreen
                />
              </div>
              <p className="sr-only">
                An interactive Google Map is shown above. The office is located at Office No. 402, 4th Floor,
                Vishva Arcade Building, Near Navale Bridge, Pune, Maharashtra – 411041.
              </p>

             
            </R>

            {/* Form */}
            <R delay={120}>
              {submitted ? (
                <div role="status" aria-live="polite" style={{
                  background: 'rgba(16,185,129,0.06)', border: '1.5px solid rgba(16,185,129,0.25)',
                  borderRadius: 20, padding: '56px 32px', textAlign: 'center',
                }}>
                  <div className="check-pop" style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: '#10b981' }}>
                    <Icon name="check" size={52} color="#10b981" />
                  </div>
                  <h4 style={{ fontWeight: 800, color: '#10b981', fontSize: '1.2rem', marginBottom: 10 }}>Message Sent!</h4>
                  <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>Thanks for reaching out. We'll get back to you within one business day.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }}
                    style={{ marginTop: 24, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', borderRadius: 10, padding: '10px 24px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <div
                  role="form"
                  aria-labelledby="contact-form-heading"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 'clamp(22px,4vw,36px)' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {[
                      { name: 'name',    label: 'Name',         placeholder: 'Your full name',   type: 'text',  required: true },
                      { name: 'email',   label: 'Email',        placeholder: 'your@email.com',   type: 'email', required: true },
                      { name: 'phone',   label: 'Phone (optional)', placeholder: '+91 98765 43210', type: 'tel', required: false },
                    ].map(f => (
                      <div key={f.name}>
                        <label
                          htmlFor={`contact-${f.name}`}
                          style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: focused === f.name ? '#38bdf8' : '#94a3b8', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.2s' }}
                        >
                          {f.label}{f.required && <span aria-hidden="true"> *</span>}
                        </label>
                        <input
                          id={`contact-${f.name}`}
                          className="inp" name={f.name} type={f.type}
                          value={form[f.name]} onChange={handle}
                          placeholder={f.placeholder}
                          required={f.required}
                          aria-required={f.required}
                          onFocus={() => setFocused(f.name)}
                          onBlur={() => setFocused('')}
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit() } }}
                        />
                      </div>
                    ))}
                    <div>
                      <label
                        htmlFor="contact-message"
                        style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: focused === 'message' ? '#38bdf8' : '#94a3b8', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.2s' }}
                      >
                        Message<span aria-hidden="true"> *</span>
                      </label>
                      <textarea
                        id="contact-message"
                        className="inp" name="message"
                        value={form.message} onChange={handle}
                        placeholder="How can we help you?"
                        rows={5} style={{ resize: 'vertical' }}
                        required
                        aria-required="true"
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused('')}
                      />
                    </div>

                    {error && (
                      <div role="alert" aria-live="assertive" style={{
                        background: 'rgba(245,158,11,0.08)', border: '1.5px solid rgba(245,158,11,0.3)',
                        borderRadius: 12, padding: '14px 16px',
                        display: 'flex', gap: 10, alignItems: 'flex-start',
                      }}>
                        <span style={{ flexShrink: 0, color: '#f59e0b' }}><Icon name="warning" size={17} color="#f59e0b" /></span>
                        <p style={{ color: '#f59e0b', fontSize: 13, lineHeight: 1.6 }}>
                          {error}{' '}
                          <a href={`mailto:${RECIPIENT_EMAIL}`} style={{ color: '#f59e0b', fontWeight: 700, textDecoration: 'underline' }}>
                            {RECIPIENT_EMAIL}
                          </a>
                        </p>
                      </div>
                    )}

                    <button
                      onClick={submit}
                      disabled={sending}
                      aria-busy={sending}
                      className="btn btn-sky"
                      style={{ width: '100%', marginTop: 4 }}
                    >
                      {sending ? 'Sending…' : 'Send Message'}
                    </button>
                  </div>
                </div>
              )}
            </R>
          </div>
        </div>
      </section>
    </>
  )
}