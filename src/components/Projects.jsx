import { useEffect, useMemo, useRef, useState } from 'react';
import { projectGroups } from '../data/projects.js';

const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const folderDefaults = [
  { x: -235, y: 8, rotate: -15 },
  { x: 0, y: -34, rotate: 1 },
  { x: 235, y: 10, rotate: 16 },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function DraggableFolder({ groupKey, index, selected, onOpen }) {
  const group = projectGroups[groupKey];
  const [position, setPosition] = useState(folderDefaults[index]);
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);

  const pointerDown = (event) => {
    if (selected) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
      distance: 0,
    };
    setDragging(true);
  };

  const pointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--cursor-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--cursor-y', `${event.clientY - bounds.top}px`);
    if (!drag.current || drag.current.id !== event.pointerId) return;
    if (event.pointerType === 'touch') return;
    const dx = event.clientX - drag.current.startX;
    const dy = event.clientY - drag.current.startY;
    drag.current.distance = Math.hypot(dx, dy);
    setPosition((current) => ({
      ...current,
      x: clamp(drag.current.originX + dx, -320, 320),
      y: clamp(drag.current.originY + dy, -125, 105),
    }));
  };

  const pointerUp = (event) => {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    const shouldOpen = drag.current.distance < 7;
    drag.current = null;
    setDragging(false);
    if (shouldOpen) onOpen(groupKey);
  };

  return (
    <button
      className={`spatial-folder spatial-folder-${index + 1} ${dragging ? 'is-dragging' : ''} ${selected ? 'is-extracting' : ''}`}
      style={{
        '--folder-x': `${position.x}px`,
        '--folder-center-x': `${position.x * .28}px`,
        '--folder-y': `${position.y}px`,
        '--folder-rotate': `${position.rotate}deg`,
        '--folder-hover-rotate': `${position.rotate * .55}deg`,
        '--folder-accent': group.accent,
      }}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={() => { drag.current = null; setDragging(false); }}
      onClick={(event) => { if (event.detail === 0) onOpen(groupKey); }}
      aria-label={`Open ${group.label} archive`}
      aria-expanded={selected}
      aria-controls="project-timeline"
    >
      <span className="spatial-folder-back"><i /></span>
      <span className="spatial-folder-tab">{group.code}</span>
      <span className="spatial-folder-front">
        <small>JEAN JIANG / {String(group.projects.length).padStart(2, '0')} RECORDS</small>
        <strong>{group.label}</strong>
        <em>DRAG / CLICK TO OPEN</em>
      </span>
      <span className="spatial-folder-edge" />
      <span className="folder-cursor-label" aria-hidden="true">OPEN {group.label.toUpperCase()}</span>
    </button>
  );
}

function TimelineArchive({ groupKey, language, onClose }) {
  const group = projectGroups[groupKey];
  const projects = useMemo(
    () => [...group.projects].sort((a, b) => a.date.localeCompare(b.date)),
    [group.projects],
  );
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const wheelLock = useRef(0);

  useEffect(() => {
    const enterDelay = reduceMotion() ? 0 : (window.matchMedia('(max-width: 760px)').matches ? 1100 : 2350);
    const timer = window.setTimeout(() => setEntered(true), enterDelay);
    return () => window.clearTimeout(timer);
  }, []);

  const activeProject = projects[active];
  const activeMonth = Number(activeProject.date.slice(5));

  const wheel = (event) => {
    event.preventDefault();
    const now = Date.now();
    if (!entered || now - wheelLock.current < 460 || Math.abs(event.deltaY) < 4) return;
    wheelLock.current = now;
    setActive((current) => clamp(current + (event.deltaY > 0 ? 1 : -1), 0, projects.length - 1));
  };

  return (
    <div
      className={`timeline-archive ${entered ? 'has-entered' : 'is-entering'} archive-${groupKey}`}
      style={{ '--archive-accent': group.accent, '--active-step': active }}
      onWheel={wheel}
    >
      <header className="timeline-header">
        <button onClick={onClose}>← RETURN TO BOX</button>
        <span>{group.code} / {group.label.toUpperCase()}</span>
        <span>{language === 'cn' ? '滚动鼠标浏览时间轴' : 'SCROLL TO MOVE THROUGH TIME'}</span>
      </header>

      <div className="timeline-stage">
        <div className="timeline-origin-line" />
        <div className="timeline-plane">
          {monthNames.map((month, index) => (
            <div className={`month-rail ${activeMonth === index + 1 ? 'is-current' : ''}`} key={month}>
              <i /><span>{String(index + 1).padStart(2, '0')}</span><strong>{month}</strong><i />
            </div>
          ))}
        </div>

        <div className="timeline-card-layer">
          {projects.map((project, index) => {
            const offset = index - active;
            const distance = Math.abs(offset);
            const x = offset === 0 ? 0 : (offset % 2 === 0 ? -1 : 1) * (135 + distance * 30);
            const y = offset * 92;
            const z = offset === 0 ? 170 : -distance * 145;
            return (
              <button
                className={`timeline-project tone-${project.tone} ${index === active ? 'is-active' : ''} ${groupKey === 'photography' ? 'is-book' : ''}`}
                key={`${project.date}-${project.title}`}
                onClick={() => setActive(index)}
                style={{
                  '--card-x': `${x}px`,
                  '--card-y': `${y}px`,
                  '--card-z': `${z}px`,
                  '--card-opacity': distance > 3 ? 0 : Math.max(.16, 1 - distance * .25),
                  '--card-scale': index === active ? 1.18 : Math.max(.58, .88 - distance * .08),
                  '--card-rotate': `${offset * -7}deg`,
                  '--card-z-index': 20 - distance,
                }}
              >
                <span className="timeline-project-image"><i /><b>{project.month}</b></span>
                <span className="timeline-project-meta"><small>{project.date}</small><strong>{project.title}</strong></span>
              </button>
            );
          })}
        </div>

        <aside className="timeline-detail" key={`${groupKey}-${active}`}>
          <span>{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <p>{activeProject.type} · {activeProject.date}</p>
          <h3>{activeProject.title}</h3>
          <div>{activeProject.keywords.map((keyword) => <i key={keyword}>{keyword}</i>)}</div>
          <a href={activeProject.pdf} onClick={(event) => event.preventDefault()}>PROJECT PDF / SLOT ↗</a>
        </aside>

        <div className="timeline-scroll-meter">
          <span>JAN</span><i><b style={{ height: `${((active + 1) / projects.length) * 100}%` }} /></i><span>DEC</span>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ language = 'en' }) {
  const keys = Object.keys(projectGroups);
  const [openGroup, setOpenGroup] = useState(null);
  const [openingGroup, setOpeningGroup] = useState(null);

  useEffect(() => {
    if (!openGroup) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenGroup(null);
        window.setTimeout(() => setOpeningGroup(null), reduceMotion() ? 0 : 360);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [openGroup]);

  const openFolder = (groupKey) => {
    if (openingGroup || openGroup) return;
    document.getElementById('project-archive-room')?.scrollIntoView({
      behavior: reduceMotion() ? 'auto' : 'smooth',
      block: 'center',
    });
    setOpeningGroup(groupKey);
    window.setTimeout(() => {
      setOpenGroup(groupKey);
    }, reduceMotion() ? 0 : 920);
  };

  const closeFolder = () => {
    setOpenGroup(null);
    window.setTimeout(() => setOpeningGroup(null), reduceMotion() ? 0 : 360);
  };

  const moveScene = (event) => {
    if (event.pointerType === 'touch' || openingGroup || openGroup) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = clamp((event.clientX - bounds.left) / bounds.width - .5, -.5, .5);
    const y = clamp((event.clientY - bounds.top) / bounds.height - .5, -.5, .5);
    event.currentTarget.style.setProperty('--scene-x', `${x * 10}px`);
    event.currentTarget.style.setProperty('--scene-y', `${y * 6}px`);
  };

  const resetScene = (event) => {
    event.currentTarget.style.setProperty('--scene-x', '0px');
    event.currentTarget.style.setProperty('--scene-y', '0px');
  };

  return (
    <section className="section projects spatial-projects" id="projects">
      <div className="section-shell projects-shell">
        <div className="archive-intro-bar">
          <span>02 / SELECTED ARCHIVE</span>
          <p>{language === 'cn' ? '拖动文件夹，或点击进入时间档案。' : 'DRAG A FOLDER, OR CLICK TO ENTER ITS TIMELINE.'}</p>
          <i>PORTFOLIO / PHOTOGRAPHY / FINE ART</i>
        </div>

        <div
          className={`spatial-room ${openingGroup ? 'has-selection' : ''} ${openGroup ? 'has-open-archive' : ''}`}
          id="project-archive-room"
          onPointerMove={moveScene}
          onPointerLeave={resetScene}
        >
          <div className="archive-box-scene" aria-hidden={Boolean(openGroup)}>
            <div className="room-horizon" />
            <div className="box-ground-shadow" />
            <div className="dimensional-box">
              <div className="box-inner-shadow" />
              <div className="box-back-wall" />
              <div className="box-floor-plane" />
              <div className="box-left-wall" />
              <div className="box-right-wall" />
              <div className="spatial-folder-layer">
                {keys.map((key, index) => (
                  <DraggableFolder key={key} groupKey={key} index={index} selected={openingGroup === key} onOpen={openFolder} />
                ))}
              </div>
              <div className="box-front-wall"><span>JJ / ARCHIVE BOX 01</span><strong>SELECTED WORKS</strong><i>2024—2026</i></div>
              <div className="box-front-edge" />
            </div>
            <p className="spatial-instruction"><span>↔</span> {language === 'cn' ? '文件夹可在箱内拖动 · 点击打开' : 'FOLDERS ARE DRAGGABLE · CLICK TO OPEN'}</p>
          </div>
          {openGroup && (
            <div className="archive-open-layer" id="project-timeline">
              <TimelineArchive groupKey={openGroup} language={language} onClose={closeFolder} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
