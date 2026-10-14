import { useEffect, useState } from 'react';
const links = [['#portfolio', 'Projects'], ['#services', 'Services'], ['#ideas', 'Ideas'], ['#fit-check', 'Fit check'], ['#process', 'Process'], ['#philosophy', 'About']];
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(null);
  useEffect(() => {
    const update = () => {
      let current = null;
      links.forEach(([href]) => { const rect = document.querySelector(href)?.getBoundingClientRect(); if (rect && rect.top <= 180 && rect.bottom >= 180) current = href; });
      setActive(current);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const close = event => { if (event.key === 'Escape' || (event.type === 'click' && !event.target.closest('#siteHeader'))) setMenuOpen(false); };
    document.addEventListener('keydown', close); document.addEventListener('click', close);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('click', close); };
  }, []);
  return <><div className="offer-bar"><span>Interior design, thoughtfully considered.</span><a href="#project-notes">University project demo</a></div><header id="siteHeader"><nav className="nav" aria-label="Main navigation"><a className="wordmark" href="#main" aria-label="Loom Interiors home">Loom <em>Interiors</em></a><div id="siteNav" className={`nav-links${menuOpen ? ' mobile-open' : ''}`}>{links.map(([href, label]) => <a href={href} key={href} aria-current={active === href ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}</div><div className="nav-actions"><a href="#consult" className="nav-contact">Book Consultation <span aria-hidden="true">↗</span></a><button className="menu-btn" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="siteNav" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? '×' : '☰'}</button></div></nav></header></>;
}
