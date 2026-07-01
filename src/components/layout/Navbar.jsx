import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import logo from "../../assets/company-logo.png";

const serviceItems = [
  { label: 'Website Design',       to: '/websitedesign' },
  { label: 'Software Development', to: '/softwaredevelopement' },
  { label: 'E-Commerce Website',   to: '/ecommercewebsite' },
  //{ label: 'Domain Registration',  to: '/domainregistration' },
  //{ label: 'Web Hosting',          to: '/webhosting' },
  { label: 'Digital Marketing',    to: '/digitalmarketing' },
]

const links = [
  { label: 'Home',    to: '/' },
  { label: 'About',   to: '/about' },
  { label: 'Clients', to: '/clients' },
  { label: 'Career',  to: '/career' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen]                     = useState(false)
  const [dropOpen, setDropOpen]             = useState(false)
  const [mobileServicesOpen, setMobSvc]     = useState(false)
  const [scrolled, setScrolled]             = useState(false)
  const { pathname } = useLocation()
  const dropRef = useRef(null)

  /* close dropdown on outside click */
  useEffect(() => {
    const fn = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  /* close everything on route change */
  useEffect(() => { setOpen(false); setMobSvc(false); setDropOpen(false) }, [pathname])

  /* shadow/blur boost on scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isServiceActive = serviceItems.some(s => pathname === s.to)

  return (
    <>
      <style>{`
        /* ── Navbar base ── */
        .nb {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: box-shadow 0.3s ease, background 0.3s ease;
        }
        .nb-inner {
          background: rgba(5,8,15,0.92);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          transition: border-color 0.3s;
        }
        .nb-inner.scrolled {
          border-bottom-color: rgba(56,189,248,0.18);
          box-shadow: 0 4px 32px rgba(0,0,0,0.45);
        }

        /* ── Logo ── */
        .nb-logo {
          font-size: 17px; font-weight: 800; color: #fff;
          text-decoration: none; letter-spacing: -0.02em;
          display: flex; align-items: center; gap: 2px;
        }
        .nb-logo span { color: #38bdf8; }
        .nb-logo-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: linear-gradient(135deg,#38bdf8,#818cf8);
          margin-left: 3px; margin-bottom: 8px; flex-shrink: 0;
        }

        /* ── Desktop nav row ── */
        .nb-row {
          max-width: 1180px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px;
        }
        @media(min-width:1024px){ .nb-row { padding: 0 48px; } }

        /* ── Desktop links ── */
        .nb-links { display: none; align-items: center; gap: 6px; list-style: none; }
        @media(min-width:768px){ .nb-links { display: flex; } }

        .nb-link {
          padding: 6px 12px; border-radius: 8px; font-size: 13.5px; font-weight: 500;
          color: #94a3b8; text-decoration: none; cursor: pointer; border: none;
          background: transparent; font-family: inherit;
          transition: color 0.2s, background 0.2s;
          display: flex; align-items: center; gap: 4px;
          position: relative;
        }
        .nb-link:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .nb-link.active {
          color: #fff; font-weight: 600;
          background: rgba(56,189,248,0.1);
        }
        .nb-link.active::after {
          content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 20px; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg,#38bdf8,#818cf8);
        }

        /* ── Services dropdown ── */
        .nb-drop-wrap { position: relative; }
        .nb-drop {
          position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%);
          min-width: 210px;
          background: rgba(8,13,26,0.97);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 16px; padding: 8px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          animation: dropIn 0.22s cubic-bezier(0.16,1,0.3,1);
          z-index: 200;
        }
        @keyframes dropIn {
          from { opacity:0; transform: translateX(-50%) translateY(-8px) scale(0.97); }
          to   { opacity:1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        .nb-drop-item {
          display: block; padding: 9px 14px; border-radius: 10px;
          font-size: 13px; font-weight: 500; color: #94a3b8; text-decoration: none;
          transition: background 0.18s, color 0.18s;
        }
        .nb-drop-item:hover { background: rgba(56,189,248,0.1); color: #fff; }
        .nb-drop-item.active { color: #38bdf8; font-weight: 600; background: rgba(56,189,248,0.08); }
        .nb-drop-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 4px 0; }

        /* ── CTA button ── */
        .nb-cta {
          display: none; padding: 9px 20px; border-radius: 10px; font-size: 13px;
          font-weight: 700; color: #fff; text-decoration: none;
          background: linear-gradient(135deg,#0ea5e9,#38bdf8);
          box-shadow: 0 3px 14px rgba(56,189,248,0.3);
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          position: relative; overflow: hidden;
        }
        .nb-cta::after {
          content:''; position:absolute; top:0; left:-75%; width:50%; height:100%;
          background: linear-gradient(120deg,transparent,rgba(255,255,255,0.28),transparent);
          transform: skewX(-20deg); transition: left 0.5s ease;
        }
        .nb-cta:hover::after { left:125%; }
        .nb-cta:hover { opacity:0.9; transform:translateY(-1px); box-shadow:0 6px 22px rgba(56,189,248,0.4); }
        @media(min-width:768px){ .nb-cta { display: inline-flex; align-items:center; } }

        /* ── Mobile toggle ── */
        .nb-toggle {
          display: flex; align-items:center; justify-content:center;
          width: 38px; height: 38px; border-radius: 10px; border: none; cursor: pointer;
          background: rgba(255,255,255,0.06); color: #fff;
          transition: background 0.2s;
        }
        .nb-toggle:hover { background: rgba(255,255,255,0.12); }
        @media(min-width:768px){ .nb-toggle { display:none; } }

        /* ── Mobile drawer ── */
        .nb-mobile {
          background: rgba(5,8,15,0.98);
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 12px 16px 20px;
          display: flex; flex-direction:column; gap:4px;
          animation: slideDown 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @media(min-width:768px){ .nb-mobile { display:none!important; } }

        .nb-m-link {
          display: block; padding: 11px 14px; border-radius: 10px; font-size: 14px;
          font-weight: 500; color: #94a3b8; text-decoration: none;
          transition: background 0.18s, color 0.18s;
        }
        .nb-m-link:hover { background: rgba(255,255,255,0.06); color:#fff; }
        .nb-m-link.active { background:rgba(56,189,248,0.1); color:#fff; font-weight:600; }

        /* ── Mobile services accordion ── */
        .nb-m-svc-btn {
          width:100%; display:flex; align-items:center; justify-content:space-between;
          padding: 11px 14px; border-radius:10px; border:none; cursor:pointer;
          font-size:14px; font-weight:500; font-family:inherit;
          background:transparent; transition: background 0.18s, color 0.18s;
        }
        .nb-m-svc-btn.active-svc { background:rgba(56,189,248,0.1); color:#fff; font-weight:600; }
        .nb-m-svc-btn:not(.active-svc) { color:#94a3b8; }
        .nb-m-svc-btn:hover { background:rgba(255,255,255,0.06); color:#fff; }

        .nb-m-svc-list {
          margin: 4px 0 4px 12px;
          border-left: 1.5px solid rgba(56,189,248,0.2);
          padding-left: 12px;
          display: flex; flex-direction:column; gap:2px;
          animation: slideDown 0.2s ease;
        }
        .nb-m-svc-item {
          display:block; padding:9px 12px; border-radius:8px; font-size:13px;
          font-weight:500; color:#64748b; text-decoration:none;
          transition:background 0.18s, color 0.18s;
        }
        .nb-m-svc-item:hover { background:rgba(255,255,255,0.05); color:#fff; }
        .nb-m-svc-item.active { color:#38bdf8; font-weight:600; }

        .nb-m-cta {
          margin-top:8px; display:block; padding:13px; border-radius:12px; text-align:center;
          font-size:14px; font-weight:700; color:#fff; text-decoration:none;
          background:linear-gradient(135deg,#0ea5e9,#38bdf8);
          box-shadow:0 4px 16px rgba(56,189,248,0.3);
          transition:opacity 0.2s;
        }
        .nb-m-cta:hover { opacity:0.88; }

        .nb-m-divider { height:1px; background:rgba(255,255,255,0.06); margin:6px 0; }

        /* ── Chevron ── */
        .chev { transition:transform 0.22s ease; flex-shrink:0; }
        .chev.open { transform: rotate(180deg); }
      `}</style>

      <nav className="nb">
        <div className={`nb-inner${scrolled ? ' scrolled' : ''}`}>
          <div className="nb-row">

            {/* Logo */}

            
            <Link to="/" className="nb-logo">
            <img src={logo} alt="MBP Digital India" className="h-9 w-auto object-contain" /> 
              MBP<span>&nbsp;Digital India Pvt Ltd</span>
              <div className="nb-logo-dot" />
            </Link>

            {/* Desktop links */}
            <ul className="nb-links">
              <li>
                <Link to="/" className={`nb-link${pathname === '/' ? ' active' : ''}`}>Home</Link>
              </li>

              {/* Services dropdown */}
              <li className="nb-drop-wrap" ref={dropRef}>
                <button
                  className={`nb-link${isServiceActive ? ' active' : ''}`}
                  onClick={() => setDropOpen(v => !v)}
                >
                  Services
                  <ChevronDown size={13} className={`chev${dropOpen ? ' open' : ''}`} />
                </button>

                {dropOpen && (
                  <div className="nb-drop">
                    <p style={{ fontSize:10.5, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#475569', padding:'4px 14px 8px', margin:0 }}>
                      What We Offer
                    </p>
                    <div className="nb-drop-divider" />
                    {serviceItems.map(item => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setDropOpen(false)}
                        className={`nb-drop-item${pathname === item.to ? ' active' : ''}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {links.filter(l => l.to !== '/').map(l => (
                <li key={l.to}>
                  <Link to={l.to} className={`nb-link${pathname === l.to ? ' active' : ''}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <Link to="contact" className="nb-cta">Get in Touch</Link>

            {/* Mobile toggle */}
            <button className="nb-toggle" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="nb-mobile">
            <Link to="/" className={`nb-m-link${pathname === '/' ? ' active' : ''}`}>Home</Link>

            {/* Services accordion */}
            <div>
              <button
                className={`nb-m-svc-btn${isServiceActive ? ' active-svc' : ''}`}
                onClick={() => setMobSvc(v => !v)}
              >
                Services
                <ChevronDown size={15} className={`chev${mobileServicesOpen ? ' open' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="nb-m-svc-list">
                  {serviceItems.map(item => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className={`nb-m-svc-item${pathname === item.to ? ' active' : ''}`}
                      onClick={() => { setOpen(false); setMobSvc(false) }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="nb-m-divider" />

            {links.filter(l => l.to !== '/').map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`nb-m-link${pathname === l.to ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            <Link to="/contact" className="nb-m-cta" onClick={() => setOpen(false)}>
              Get in Touch
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}
