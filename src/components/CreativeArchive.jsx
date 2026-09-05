import { useState } from 'react';

const archives = [
  {
    id: 'A-01',
    title: 'Photography',
    subtitle: 'Light / Place / Observation',
    count: '24 frames',
    type: 'photo',
  },
  {
    id: 'A-02',
    title: 'Fine Art',
    subtitle: 'Oil / Watercolor / Lacquer',
    count: '18 works',
    type: 'art',
  },
];

export default function CreativeArchive() {
  const [active, setActive] = useState(null);

  return (
    <section className="section creative-archive" id="archive">
      <div className="section-shell">
        <div className="section-kicker">
          <span>03 / Parallel Practices</span>
          <span>Independent from case studies</span>
        </div>
        <div className="archive-intro">
          <h2>THE WORK<br />OUTSIDE WORK.</h2>
          <p>
            Photography and fine art live beside the portfolio—not beneath it. Two separate
            collections share one archive system, showing how observation and material practice
            feed the design work.
          </p>
        </div>
        <div className="archive-panels">
          {archives.map((archive) => {
            const isActive = active === archive.type;
            return (
              <article className={`archive-panel ${isActive ? 'active' : ''}`} key={archive.id}>
                <button type="button" onClick={() => setActive(isActive ? null : archive.type)} aria-expanded={isActive}>
                  <span>{archive.id}</span>
                  <h3>{archive.title}</h3>
                  <p>{archive.subtitle}</p>
                  <b>{archive.count}</b>
                  <i>{isActive ? '×' : '↗'}</i>
                </button>
                <div className="archive-preview" aria-hidden={!isActive}>
                  {[1, 2, 3, 4].map((item) => (
                    <div className={`archive-frame ${archive.type}`} key={item}>
                      <span>{archive.id}.{String(item).padStart(2, '0')}</span>
                    </div>
                  ))}
                  <p>Collection template ready — replace frames with local images.</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
