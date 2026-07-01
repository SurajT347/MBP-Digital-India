import { useRef, useEffect, useState } from 'react'
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
const iconProps = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

const Icons = {
  rocket: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15c4-1 8-4.5 9.5-9.5C21.5 5 21.5 2.5 21.5 2.5S19 2.5 18.5 2.5C13.5 4 10 8 9 12l3 3z" />
      <path d="M9 12c-1.5-.5-3.5 0-4.5 1.5C3.5 15 3 18 3 18s3-.5 4.5-1.5C9 15.5 9.5 13.5 9 12z" />
    </svg>
  ),
  home: (p) => (
    <svg {...iconProps} {...p}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  bulb: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.7.6 1 1.4 1 2.3h6c0-.9.3-1.7 1-2.3A7 7 0 0 0 12 2z" />
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
  target: (p) => (
    <svg {...iconProps} {...p}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  heart: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  close: (p) => (
    <svg {...iconProps} {...p}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  upload: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  file: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  check: (p) => (
    <svg {...iconProps} {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  warning: (p) => (
    <svg {...iconProps} {...p}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
}

function Icon({ name, size = 24, color = '#fff' }) {
  const Cmp = Icons[name]
  return Cmp ? Cmp({ width: size, height: size, style: { color }, 'aria-hidden': 'true', focusable: 'false' }) : null
}

/* ══ DATA ══ */
const PERKS = [
  { icon: 'rocket',    title: 'Growth-First Culture',    desc: 'Learning budgets, mentorship, and clear career ladders so you always level up.', color: '#818cf8' },
  { icon: 'home',      title: 'Flexible Work',            desc: 'Hybrid-friendly setup — work from where you do your best thinking.',             color: '#38bdf8' },
  { icon: 'bulb',      title: 'Real Ownership',           desc: 'Ship products that matter. Your work reaches real clients from day one.',         color: '#10b981' },
  { icon: 'handshake', title: 'Collaborative Team',       desc: 'Tight-knit crew of designers, engineers, and strategists who share knowledge.',   color: '#f59e0b' },
  { icon: 'target',    title: 'Impactful Projects',       desc: 'From AI integrations to SAP deployments — no two projects are the same.',        color: '#f43f5e' },
  { icon: 'heart',     title: 'People-First Values',      desc: 'We care about work-life balance, mental health, and long-term wellbeing.',        color: '#ec4899' },
]

/* Only 2 current openings */
const ROLES = [
  { title: 'Node.js Developer', type: 'Full-Time', dept: 'Engineering',        color: '#38bdf8', desc: 'Build and scale backend services and APIs powering our client platforms.' },
  { title: 'QA / Test Engineer', type: 'Full-Time', dept: 'Quality Assurance', color: '#10b981', desc: 'Own manual and automated testing to keep every release solid and reliable.' },
]

const STEPS = [
  { step: '01', title: 'Send Your Resume',    desc: 'Email us at hr@mpbdigi.in with your CV and a short note about yourself.',      color: '#38bdf8' },
  { step: '02', title: 'Initial Screening',   desc: 'Our HR team reviews your profile and reaches out within 3–5 business days.',  color: '#818cf8' },
  { step: '03', title: 'Technical Round',     desc: 'A practical task or interview to understand your skills and approach.',        color: '#10b981' },
  { step: '04', title: 'Culture Fit Chat',    desc: 'A relaxed conversation with the team to make sure its a great match.',       color: '#f59e0b' },
  { step: '05', title: 'Offer & Onboarding', desc: 'Get your offer, sign up, and start building something great together.',        color: '#f43f5e' },
]

/* ══ EMAILJS CONFIG ══
   Reuses the same EmailJS service as the contact form. File attachments via
   sendForm require the "Attachments" feature on your EmailJS plan — if your
   plan doesn't support it, the resume file name will still be included as
   text so HR knows to follow up by email. */
const EMAILJS_SERVICE_ID = 'service_x8k4p2d'
const EMAILJS_TEMPLATE_ID = 'template_bb4955f'
const EMAILJS_PUBLIC_KEY = 'yJdOizs-pLUV_uAVE'
const MAX_RESUME_MB = 5

/* ══ APPLICATION MODAL ══ */
function ApplyModal({ role, onClose }) {
  const formRef = useRef(null)
  const firstFieldRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [fileError, setFileError] = useState('')
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    firstFieldRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const handleFile = e => {
    const f = e.target.files?.[0]
    setFileError('')
    if (!f) { setFileName(''); return }
    if (f.size > MAX_RESUME_MB * 1024 * 1024) {
      setFileError(`File is too large — please keep it under ${MAX_RESUME_MB}MB.`)
      e.target.value = ''
      setFileName('')
      return
    }
    setFileName(f.name)
  }

  const submit = e => {
    e.preventDefault()
    if (!formRef.current) return
    setSending(true)
    setError('')
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => { setSending(false); setSubmitted(true) })
      .catch(err => {
        console.error('EmailJS error:', err)
        setSending(false)
        setError('Something went wrong. Please try again or email your resume directly to')
      })
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="apply-modal-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close application form">
          <Icon name="close" size={18} color="#94a3b8" />
        </button>

        {submitted ? (
          <div role="status" aria-live="polite" style={{ textAlign: 'center', padding: '20px 4px 4px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: '#10b981' }}>
              <Icon name="check" size={48} color="#10b981" />
            </div>
            <h3 style={{ color: '#10b981', fontSize: '1.15rem', fontWeight: 800, marginBottom: 10 }}>Application Sent!</h3>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              Thanks for applying to <strong style={{ color: '#cbd5e1' }}>{role.title}</strong>. Our HR team will review your resume and get back to you within 3–5 business days.
            </p>
            <button type="button" onClick={onClose} className="btn btn-sky" style={{ width: '100%' }}>Done</button>
          </div>
        ) : (
          <>
            <span className="label" style={{ background: `${role.color}18`, color: role.color, border: `1px solid ${role.color}33` }}>
              {role.dept} · {role.type}
            </span>
            <h3 id="apply-modal-title" style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 800, marginTop: 10, marginBottom: 8 }}>
              Apply — {role.title}
            </h3>
            <p style={{ color: '#64748b', fontSize: 13.5, lineHeight: 1.65, marginBottom: 22 }}>{role.desc}</p>

            <form ref={formRef} onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="hidden" name="role_title" value={role.title} />

              <div>
                <label htmlFor="apply-name" className="field-label">Full Name</label>
                <input ref={firstFieldRef} id="apply-name" className="inp" name="name" type="text" placeholder="Your full name" required aria-required="true" />
              </div>

              <div>
                <label htmlFor="apply-email" className="field-label">Email</label>
                <input id="apply-email" className="inp" name="email" type="email" placeholder="your@email.com" required aria-required="true" />
              </div>

              <div>
                <label htmlFor="apply-phone" className="field-label">Phone (optional)</label>
                <input id="apply-phone" className="inp" name="phone" type="tel" placeholder="+91 98765 43210" />
              </div>

              <div>
                <label htmlFor="apply-message" className="field-label">A short note (optional)</label>
                <textarea id="apply-message" className="inp" name="message" rows={3} style={{ resize: 'vertical' }} placeholder="Anything you'd like us to know" />
              </div>

              <div>
                <label htmlFor="apply-resume" className="field-label">Resume <span aria-hidden="true">*</span></label>
                <label htmlFor="apply-resume" className="file-drop">
                  <Icon name="upload" size={18} color="#38bdf8" />
                  <span style={{ color: fileName ? '#e2e8f0' : '#64748b' }}>
                    {fileName || 'Click to upload PDF or Word (max 5MB)'}
                  </span>
                </label>
                <input
                  id="apply-resume" name="resume" type="file"
                  accept=".pdf,.doc,.docx"
                  required aria-required="true"
                  onChange={handleFile}
                  className="sr-only-file"
                />
                {fileName && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, color: '#38bdf8', fontSize: 12.5 }}>
                    <Icon name="file" size={14} color="#38bdf8" /> {fileName}
                  </div>
                )}
                {fileError && (
                  <p role="alert" style={{ color: '#f59e0b', fontSize: 12.5, marginTop: 8 }}>{fileError}</p>
                )}
              </div>

              {error && (
                <div role="alert" aria-live="assertive" style={{
                  background: 'rgba(245,158,11,0.08)', border: '1.5px solid rgba(245,158,11,0.3)',
                  borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start',
                }}>
                  <span style={{ flexShrink: 0, color: '#f59e0b' }}><Icon name="warning" size={16} color="#f59e0b" /></span>
                  <p style={{ color: '#f59e0b', fontSize: 12.5, lineHeight: 1.6 }}>
                    {error}{' '}
                    <a href="mailto:hr@mpbdigi.in" style={{ color: '#f59e0b', fontWeight: 700, textDecoration: 'underline' }}>hr@mpbdigi.in</a>
                  </p>
                </div>
              )}

              <button type="submit" disabled={sending} aria-busy={sending} className="btn btn-sky" style={{ width: '100%', marginTop: 4 }}>
                {sending ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

/* ══ MAIN ══ */
export default function Career() {
  const [hoveredRole, setHoveredRole] = useState(null)
  const [applyRole, setApplyRole] = useState(null)

  const openApply = role => setApplyRole(role)
  const closeApply = () => setApplyRole(null)

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rv-wrap { opacity: 0; transform: translateY(22px); transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1); }
        .rv-wrap.rv { opacity: 1; transform: translateY(0); }

        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

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

        .btn { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 13px 30px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; cursor: pointer; border: none; transition: transform 0.2s; font-family: inherit; }
        .btn::after { content:''; position:absolute; top:0; left:-75%; width:50%; height:100%; background:linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent); transform:skewX(-20deg); transition:left 0.55s ease; }
        .btn:hover::after { left:125%; }
        .btn:hover { transform: translateY(-1px); }
        .btn-sky    { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #fff; box-shadow: 0 4px 20px rgba(56,189,248,0.3); }
        .btn-sky:hover { box-shadow: 0 6px 28px rgba(56,189,248,0.45); }
        .btn-sky:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .btn-purple { background: linear-gradient(135deg, #6c63ff, #818cf8); color: #fff; box-shadow: 0 4px 20px rgba(108,99,255,0.3); }
        .btn-ghost  { background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.16); color: #fff; }
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

        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(108,99,255,0.45)}70%{box-shadow:0 0 0 14px rgba(108,99,255,0)} }
        .pulse { animation: pulse 2.6s ease-out infinite; }

        .perk-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.28s, background 0.28s; }
        .perk-card:hover { transform: translateY(-5px); }

        .role-row { transition: background 0.22s, border-color 0.22s, transform 0.25s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
        .role-row:hover { transform: translateX(4px); }
        .role-row:focus-visible { outline: 2.5px solid #38bdf8; outline-offset: -2px; }

        .step-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.28s; }
        .step-card:hover { transform: translateY(-4px); }
        .step-num { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .step-card:hover .step-num { transform: scale(1.18); }

        /* ── Form inputs (application modal) ── */
        .field-label { display: block; font-size: 11.5px; font-weight: 700; color: #94a3b8; margin-bottom: 7px; letter-spacing: 0.06em; text-transform: uppercase; }
        .inp {
          width: 100%; border: 1.5px solid rgba(255,255,255,0.08); border-radius: 12px;
          padding: 12px 15px; font-size: 14px; color: #e2e8f0;
          background: rgba(255,255,255,0.04); outline: none; font-family: inherit;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .inp::placeholder { color: #334155; }
        .inp:focus { border-color: #38bdf8; background: rgba(56,189,248,0.04); box-shadow: 0 0 0 3px rgba(56,189,248,0.1); }

        .file-drop {
          display: flex; align-items: center; gap: 10px;
          border: 1.5px dashed rgba(56,189,248,0.3); border-radius: 12px;
          padding: 14px 16px; cursor: pointer; font-size: 13.5px;
          background: rgba(56,189,248,0.03); transition: border-color 0.2s, background 0.2s;
        }
        .file-drop:hover { border-color: rgba(56,189,248,0.55); background: rgba(56,189,248,0.06); }
        .sr-only-file { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .sr-only-file:focus-visible + .file-drop,
        .sr-only-file:focus + .file-drop { outline: 2.5px solid #38bdf8; outline-offset: 2px; }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(3,6,14,0.72); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: fadeUp 0.25s ease-out both;
        }
        .modal-card {
          position: relative; width: 100%; max-width: 460px; max-height: 88vh; overflow-y: auto;
          background: #0b1120; border: 1px solid rgba(56,189,248,0.2);
          border-radius: 22px; padding: clamp(22px,4vw,32px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .modal-close {
          position: absolute; top: 16px; right: 16px;
          width: 32px; height: 32px; border-radius: 10px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s;
        }
        .modal-close:hover { background: rgba(255,255,255,0.12); }

        a:focus-visible, button:focus-visible, .inp:focus-visible {
          outline: 2.5px solid #38bdf8; outline-offset: 3px; border-radius: 8px;
        }

        @media(prefers-reduced-motion:reduce){ *, *::before, *::after { animation:none!important; transition:none!important; } .rv-wrap { opacity:1!important; transform:none!important; } }
      `}</style>

      {/* ══ HERO ══ */}
      <section id="career" style={{ minHeight: '72vh', background: '#05080f', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>
        <Bg count={22} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div className="blob-a" style={{ position: 'absolute', top: '18%', left: '50%', width: 'min(620px,90vw)', height: 'min(520px,58vh)', background: 'rgba(108,99,255,0.08)', borderRadius: '50%', filter: 'blur(90px)' }} />
          <div className="blob-b" style={{ position: 'absolute', bottom: 0, right: 0, width: 'min(340px,60vw)', height: 'min(340px,60vw)', background: 'rgba(56,189,248,0.06)', borderRadius: '50%', filter: 'blur(70px)' }} />
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', padding: '80px 24px' }}>
          <span className="h-in1 label label-purple">Join Our Team</span>
          <h1 className="h-in2" style={{ fontSize: 'clamp(2rem,6.5vw,4.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 26 }}>
            <span style={{ display: 'block', marginBottom: 6 }}>Build Your Career</span>
            <span className="grad" style={{
              display: 'block',
              background: 'linear-gradient(135deg, #6c63ff 0%, #818cf8 40%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>at MBP Digital</span>
          </h1>
          <p className="h-in3" style={{ fontSize: 'clamp(0.95rem,2.2vw,1.12rem)', color: '#94a3b8', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.8 }}>
            We're always looking for talented engineers, designers, and strategists. Send us your resume and let's build something great together.
          </p>
          <div className="h-in4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:hr@mpbdigi.in" className="btn btn-purple pulse">Apply Now — hr@mpbdigi.in</a>
            <a href="#open-roles" className="btn btn-ghost">See Open Roles ↓</a>
          </div>

          {/* Mini strip */}
          <div className="h-in4" style={{ display: 'flex', gap: 36, justifyContent: 'center', flexWrap: 'wrap', marginTop: 60, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {[['2', 'Open Roles'], ['Hybrid', 'Work Model'], ['Pune', 'HQ India']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#818cf8', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 4, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PERKS ══ */}
      <section className="sec" style={{ background: '#080d1a', position: 'relative', overflow: 'hidden' }}>
        <Bg count={10} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label label-purple">Why Us</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Life at MBP Digital</h2>
            <p style={{ color: '#64748b', fontSize: 14.5, maxWidth: 460, margin: '0 auto' }}>We invest in the people who build our products. Here's what working with us looks like.</p>
            <div className="div-line" style={{ background: 'linear-gradient(90deg,#6c63ff,#818cf8)' }} />
          </R>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
            {PERKS.map((p, i) => (
              <R key={p.title} delay={(i % 3) * 70}>
                <div className="perk-card" style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 18, padding: '26px 22px', height: '100%',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = `${p.color}44`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: `${p.color}18`, border: `1px solid ${p.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: p.color }}>
                    <Icon name={p.icon} size={22} color={p.color} />
                  </div>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.72 }}>{p.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OPEN ROLES ══ */}
      <section id="open-roles" className="sec" style={{ background: '#05080f', position: 'relative', overflow: 'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label label-blue">Hiring Now</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Open Roles</h2>
            <p style={{ color: '#64748b', fontSize: 14.5, maxWidth: 440, margin: '0 auto' }}>Click a role to apply directly — don't see your fit? Send us a general application, we're always open to great talent.</p>
            <div className="div-line" style={{ background: 'linear-gradient(90deg,#38bdf8,#6c63ff)' }} />
          </R>

          <R>
            <div style={{ background: '#0d1324', border: '1px solid rgba(56,189,248,0.12)', borderRadius: 22, overflow: 'hidden' }}>
              {ROLES.map((role, i) => (
                <div key={role.title} className="role-row"
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-label={`Apply for ${role.title}`}
                  onClick={() => openApply(role)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openApply(role) } }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
                    padding: '20px 28px',
                    borderBottom: i < ROLES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    background: hoveredRole === i ? 'rgba(255,255,255,0.03)' : 'transparent',
                  }}
                  onMouseEnter={() => setHoveredRole(i)}
                  onMouseLeave={() => setHoveredRole(null)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div aria-hidden="true" style={{ width: 10, height: 10, borderRadius: '50%', background: role.color, flexShrink: 0, boxShadow: `0 0 8px ${role.color}66` }} />
                    <div>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: 14.5, display: 'block' }}>{role.title}</span>
                      <span style={{ color: '#64748b', fontSize: 12, display: 'block', marginTop: 2 }}>{role.desc}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span style={{ background: `${role.color}15`, border: `1px solid ${role.color}33`, color: role.color, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, letterSpacing: '0.05em' }}>{role.dept}</span>
                    <span style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999 }}>{role.type}</span>
                    <button
                      type="button"
                      className="btn btn-sky"
                      style={{ padding: '7px 18px', fontSize: 12, borderRadius: 8 }}
                      onClick={e => { e.stopPropagation(); openApply(role) }}
                    >
                      Apply →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="sec" style={{ background: '#080d1a', position: 'relative', overflow: 'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="label label-green">How It Works</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Our Hiring Process</h2>
            <p style={{ color: '#64748b', fontSize: 14.5, maxWidth: 420, margin: '0 auto' }}>Simple, transparent, and respectful of your time.</p>
            <div className="div-line" style={{ background: 'linear-gradient(90deg,#10b981,#38bdf8)' }} />
          </R>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 16 }}>
            {STEPS.map((s, i) => (
              <R key={s.step} delay={i * 70}>
                <div className="step-card" style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 18, padding: '26px 20px', textAlign: 'center', height: '100%',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}44`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                >
                  <div className="step-num" style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: `${s.color}18`, border: `2px solid ${s.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: 13, fontWeight: 800, color: s.color, letterSpacing: '-0.01em',
                  }}>{s.step}</div>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: '#64748b', fontSize: 12.5, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="sec" style={{ background: '#05080f', position: 'relative', overflow: 'hidden' }}>
        <Bg count={8} />
        <div className="wrap" style={{ position: 'relative', zIndex: 10 }}>
          <R style={{
            maxWidth: 660, margin: '0 auto', textAlign: 'center',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(129,140,248,0.22)',
            borderRadius: 28, padding: 'clamp(36px,6vw,64px)',
          }}>
            <span className="label label-purple">Ready to Apply?</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
              Don't Wait — Start Your<br />Journey With Us Today
            </h2>
            <p style={{ color: '#64748b', fontSize: 14.5, lineHeight: 1.75, marginBottom: 36 }}>
              Send your CV and a short intro to <strong style={{ color: '#818cf8' }}>hr@mpbdigi.in</strong> and our team will get back to you within 3–5 business days.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:hr@mpbdigi.in" className="btn btn-purple pulse" style={{ textDecoration: 'none' }}>Apply Now — hr@mpbdigi.in</a>
              <a href="#contact" className="btn btn-ghost" style={{ textDecoration: 'none' }}>General Enquiry</a>
            </div>
          </R>
        </div>
      </section>

      {applyRole && <ApplyModal role={applyRole} onClose={closeApply} />}
    </>
  )
}