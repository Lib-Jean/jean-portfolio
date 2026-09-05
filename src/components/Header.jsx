export default function Header({ language, setLanguage }) {
  return (
    <header className="site-header minimal-header">
      <div className="language-switch" aria-label="Language selection">
        <button className={language === 'cn' ? 'active' : ''} onClick={() => setLanguage('cn')}>CN</button>
        <i>/</i>
        <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
      </div>
    </header>
  );
}
