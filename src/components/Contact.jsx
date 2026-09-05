export default function Contact({ language = 'en' }) {
  return (
    <footer className="contact" id="contact">
      <div className="contact-grid" aria-hidden="true" />
      <div className="contact-top">
        <span>04 / CONTACT</span>
        <span>LOS ANGELES / OPEN WORLDWIDE</span>
        <span>RESPONSE TIME / 24—48 HRS</span>
      </div>
      <div className="contact-main">
        <p>{language === 'cn' ? '有新的问题、合作想法，或一个还未被定义的挑战？' : 'HAVE A QUESTION, COLLABORATION OR UNFAMILIAR PROBLEM?'}</p>
        <h2>{language === 'cn' ? <>一起创造<br />真正有意义的<br /><em>作品。</em></> : <>LET’S BUILD<br />SOMETHING<br /><em>MEANINGFUL.</em></>}</h2>
      </div>
      <div className="contact-bottom">
        <a className="contact-button hover-lift" href="mailto:lib1021jean@gmail.com">START A CONVERSATION <span>↗</span></a>
        <div className="contact-links">
          <a href="mailto:lib1021jean@gmail.com">EMAIL ↗</a>
          <a href="https://linkedin.com/in/jeanjiang1021" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a href="https://www.instagram.com/i_am._.jean" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
        </div>
        <p>© 2026 JEAN JIANG<br />DESIGNED WITH INTENT</p>
      </div>
      <div className="contact-marquee"><span>INDUSTRIAL DESIGN / PRODUCT DESIGN / INTERACTION DESIGN / UI UX / </span></div>
    </footer>
  );
}
