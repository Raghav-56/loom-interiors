import { useEffect, useState } from 'react';
import { ProfileIcon } from './Icon';

const links = [['#portfolio', 'Projects'], ['#services', 'Services'], ['#ideas', 'Ideas'], ['#fit-check', 'Fit check'], ['#process', 'Process'], ['#philosophy', 'About']];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#portfolio');
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 18);
      let current = '#portfolio';
      links.forEach(([href]) => { const section = document.querySelector(href); if (section) { const rect = section.getBoundingClientRect(); if (rect.top <= window.innerHeight * 0.38 && rect.bottom >= window.innerHeight * 0.38) current = href; } });
      setActive(current);
    };
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update, { passive: true });
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  useEffect(() => {
    const close = (event) => { if (menuOpen && !event.target.closest('.nav')) setMenuOpen(false); };
    const escape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('click', close); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', escape); };
  }, [menuOpen]);
  const navLinks = (className = 'nav-links') => <div className={className} id="siteNav">{links.map(([href, label]) => <a className={active === href ? 'active' : ''} href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>;
  return <>
    <div className="offer-bar"><strong>University project demo</strong> · Explore Loom Interiors<a href="#project-notes">About this project</a></div>
    <header id="siteHeader" className={scrolled ? 'scrolled' : ''}><nav className="nav">
      <button className="menu-btn" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="siteNav" onClick={() => setMenuOpen((open) => !open)}>☰</button>
      <div className="wordmark">Loom <em>Interiors</em></div>{scrolled && <div className="scrolled-nav-links">{navLinks(menuOpen ? 'nav-links mobile-open' : 'nav-links')}</div>}
      <div className="nav-actions"><a href="#consult" className="nav-contact">Book Consultation</a><a href="#project-notes" className="profile-icon" aria-label="About this project"><ProfileIcon /></a></div>
    </nav>{!scrolled && <div className="nav-links-wrap">{navLinks(menuOpen ? 'nav-links mobile-open' : 'nav-links')}</div>}</header>
  </>;
}