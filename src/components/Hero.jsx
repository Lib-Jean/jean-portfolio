import { useEffect, useRef, useState } from 'react';

const menu = [
  ['01', 'ABOUT ME', '关于我', 'about'],
  ['02', 'PROJECTS', '项目', 'projects'],
  ['03', 'OTHERS', '其他创作', 'skills'],
  ['04', 'CONTACT ME', '联系我', 'contact'],
];

export default function Hero({ language }) {
  const heroRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    const move = (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      hero.style.setProperty('--mx', `${x * 100}%`);
      hero.style.setProperty('--my', `${y * 100}%`);
      hero.style.setProperty('--shift-x', `${(x - 0.5) * 10}px`);
      hero.style.setProperty('--shift-y', `${(y - 0.5) * 8}px`);
    };
    hero.addEventListener('pointermove', move);
    return () => hero.removeEventListener('pointermove', move);
  }, []);

  const goTo = (anchor) => {
    setMenuOpen(false);
    window.setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 180);
  };

  return (
    <section className="hero hero-light" id="index" ref={heroRef}>
      <div className="hero-light-field" aria-hidden="true">
        <i className="cursor-halo" />
        <i className="pixel pixel-a" />
        <i className="pixel pixel-b" />
      </div>

      <div className="hero-center">
        <button className="name-trigger" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen}>
          <span className="typed-name">JEAN JIANG</span>
        </button>
        <p>{language === 'cn' ? '工业设计师 / 产品设计师 / 交互与 UIUX 设计师' : 'INDUSTRIAL / PRODUCT / INTERACTION & UIUX DESIGNER'}</p>
        <small>{language === 'cn' ? '点击姓名进入档案' : 'CLICK MY NAME TO ENTER THE ARCHIVE'}</small>
      </div>

      <div className="hero-footer-line">
        <span>PORTFOLIO — 2026</span>
        <a className="view-work-drawer" href="#projects"><i /><strong>VIEW WORK</strong><span>↑</span></a>
        <span>SAN JOSE / AVAILABLE WORLDWIDE</span>
      </div>

      <div className={`name-menu-overlay ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <button className="menu-close" onClick={() => setMenuOpen(false)}>CLOSE ×</button>
        <div className="overlay-name">JEAN JIANG</div>
        <nav aria-label="Section menu">
          {menu.map(([number, en, cn, anchor]) => (
            <button key={anchor} onClick={() => goTo(anchor)}>
              <span>{number}</span>
              <strong>{language === 'cn' ? cn : en}</strong>
              <i>↗</i>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
