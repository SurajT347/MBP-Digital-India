import { useState } from 'react'
import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home',    to: '/' },
  { label: 'About',   to: '/about' },
  { label: 'Clients', to: '/clients' },
  { label: 'Career',  to: '/career' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = [
  { label: 'Website Design',       to: '/websitedesign' },
  { label: 'Software Development', to: '/softwaredevelopement' },
  { label: 'E-Commerce Website',   to: '/ecommercewebsite' },
  //{ label: 'Domain Registration',  to: '/domainregistration' },
  //{ label: 'Web Hosting',          to: '/webhosting' },
  { label: 'Digital Marketing',    to: '/digitalmarketing' },
]

const socials = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-3a2 2 0 110-4 2 2 0 010 4z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)

  const handleSub = () => {
    if (email.includes('@')) { setSubbed(true); setEmail('') }
  }

  return (
    <>
      <style>{`
        /* ── Footer base ── */
        .ft { background: #05080f; border-top: 1px solid rgba(56,189,248,0.12); }

        /* ── Top bar ── */
        .ft-top {
          max-width: 1180px; margin: 0 auto; padding: 56px 24px 48px;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.4fr;
          gap: 40px;
        }
        @media(max-width:1024px){ .ft-top { grid-template-columns: 1fr 1fr; gap: 32px; padding: 48px 24px 40px; } }
        @media(max-width:560px)  { .ft-top { grid-template-columns: 1fr; gap: 36px; padding: 40px 20px 32px; } }

        /* ── Brand col ── */
        .ft-logo { font-size: 18px; font-weight: 800; color: #fff; letter-spacing: -0.02em; margin-bottom: 14px; }
        .ft-logo span { color: #38bdf8; }
        .ft-logo-dot { display:inline-block; width:7px; height:7px; border-radius:50%; background:linear-gradient(135deg,#38bdf8,#818cf8); margin-left:3px; vertical-align:middle; margin-bottom:4px; }
        .ft-tagline { font-size: 13px; color: #475569; line-height: 1.75; margin-bottom: 18px; }
        .ft-addr { font-size: 12.5px; color: #475569; line-height: 1.8; }
        .ft-email { display:inline-block; margin-top:10px; font-size:13px; font-weight:600; color:#38bdf8; text-decoration:none; transition:color 0.2s; }
        .ft-email:hover { color:#7dd3fc; }

        /* ── Socials ── */
        .ft-socials { display:flex; gap:8px; margin-top:20px; }
        .ft-social {
          width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); color:#64748b;
          text-decoration:none; transition:background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
        }
        .ft-social:hover { background:rgba(56,189,248,0.1); border-color:rgba(56,189,248,0.3); color:#38bdf8; transform:translateY(-2px); }

        /* ── Column headings ── */
        .ft-col-head {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #38bdf8; margin-bottom: 18px;
          padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* ── Footer links ── */
        .ft-links { display:flex; flex-direction:column; gap:2px; list-style:none; }
        .ft-link { font-size:13.5px; color:#64748b; text-decoration:none; padding:5px 0; transition:color 0.2s, padding-left 0.2s; display:flex; align-items:center; gap:6px; }
        .ft-link::before { content:'›'; color:#38bdf8; opacity:0; transition:opacity 0.2s; font-size:14px; }
        .ft-link:hover { color:#cbd5e1; padding-left:4px; }
        .ft-link:hover::before { opacity:1; }

        /* ── Newsletter ── */
        .ft-news-text { font-size:13px; color:#475569; line-height:1.7; margin-bottom:16px; }
        .ft-inp-wrap { display:flex; gap:8px; flex-direction:column; }
        .ft-inp {
          flex:1; padding:11px 14px; border-radius:10px; font-size:13px;
          background:rgba(255,255,255,0.05); border:1.5px solid rgba(255,255,255,0.08);
          color:#e2e8f0; outline:none; font-family:inherit;
          transition:border-color 0.2s, box-shadow 0.2s;
        }
        .ft-inp::placeholder { color:#334155; }
        .ft-inp:focus { border-color:rgba(56,189,248,0.45); box-shadow:0 0 0 3px rgba(56,189,248,0.1); }
        .ft-sub-btn {
          padding:11px 18px; border-radius:10px; border:none; cursor:pointer;
          background:linear-gradient(135deg,#0ea5e9,#38bdf8); color:#fff;
          font-size:13px; font-weight:700; font-family:inherit;
          transition:opacity 0.2s, transform 0.2s;
          white-space:nowrap;
        }
        .ft-sub-btn:hover { opacity:0.88; transform:translateY(-1px); }
        .ft-sub-ok { font-size:13px; color:#10b981; font-weight:600; display:flex; align-items:center; gap:6px; padding:8px 0; }

        /* ── Divider ── */
        .ft-div {
          max-width:1180px; margin:0 auto; padding:0 24px;
          border-top:1px solid rgba(255,255,255,0.06);
        }
        @media(max-width:560px){ .ft-div { padding: 0 20px; } }
        .ft-bottom {
          padding:20px 0;
          display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;
        }
        .ft-copy { font-size:12px; color:#334155; }
        .ft-bottom-links { display:flex; gap:20px; }
        .ft-bottom-link { font-size:12px; color:#334155; text-decoration:none; transition:color 0.2s; }
        .ft-bottom-link:hover { color:#94a3b8; }

        /* ── Gradient accent line at very top of footer ── */
        .ft-accent-line {
          height:2px;
          background:linear-gradient(90deg,transparent,#38bdf8,#818cf8,transparent);
          opacity:0.6;
        }
      `}</style>

      <footer className="ft">
        <div className="ft-accent-line" />

        <div className="ft-top">
          {/* Brand */}
          <div>
            <div className="ft-logo">
              MBP <span>Digital India Pvt Ltd</span><span className="ft-logo-dot" />
            </div>
            <p className="ft-tagline">
              Building digital futures through cutting-edge software, AI, cloud, and enterprise solutions.
            </p>
            <p className="ft-addr">
              Office No. 402, 4th Floor<br />
              Vishva Arcade Building<br />
              Near Navale Bridge<br />
              Pune, Maharashtra – 411041
            </p>
            <a href="mailto:hr@mpbdigi.in" className="ft-email">hr@mpbdigi.in</a>
            <div className="ft-socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="ft-social" aria-label={s.label} target="_blank" rel="noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="ft-col-head">Company</p>
            <ul className="ft-links">
              {quickLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="ft-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="ft-col-head">Services</p>
            <ul className="ft-links">
              {serviceLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="ft-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="ft-col-head">Stay Updated</p>
            <p className="ft-news-text">
              Get the latest on tech trends, company news, and digital transformation insights.
            </p>
            {subbed ? (
              <div className="ft-sub-ok">
                <span>✅</span> You're subscribed — thanks!
              </div>
            ) : (
              <div className="ft-inp-wrap">
                <input
                  className="ft-inp"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSub()}
                />
                <button className="ft-sub-btn" onClick={handleSub}>Subscribe</button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ft-div">
          <div className="ft-bottom">
            <span className="ft-copy">
              © {new Date().getFullYear()} MBP Digital India Pvt Ltd. All rights reserved.
            </span>
            <div className="ft-bottom-links">
              <a href="#" className="ft-bottom-link">Privacy Policy</a>
              <a href="#" className="ft-bottom-link">Terms of Service</a>
              <a href="#" className="ft-bottom-link">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
