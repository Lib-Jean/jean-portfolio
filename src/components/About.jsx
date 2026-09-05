import { useEffect, useState } from 'react';

const photos = [
  '/about/jean-01.jpg',
  '/about/jean-02.jpg',
  '/about/jean-03.jpg',
  '/about/jean-04.jpg',
  '/about/jean-05-converted.jpg',
];

const sections = {
  intro: {
    en: { title: "Welcome to Jean's space.", lead: 'Scroll around and explore my world—where products, interfaces, images and daily observations connect.', body: 'I am an Industrial and Product Designer specializing in concept ideation, prototyping and human-centered innovation, accompanied by expertise in UI/UX. I connect design intent with manufacturability, user experience and clear visual storytelling.' },
    cn: { title: '欢迎来到 Jean 的空间。', lead: '向下探索我的世界——产品、界面、图像与日常观察在这里相互连接。', body: '我是一名工业与产品设计师，专注概念构思、原型制作与以人为本的创新，同时具备 UI/UX 能力。我关注设计意图、可制造性、用户体验与视觉叙事之间的连接。' },
  },
  education: {
    en: { title: 'San José State University', lead: 'B.S. Industrial Design · Minor in Interaction Design · GPA 3.8/4.0', body: 'Aug 2025—Present · San Jose, California. Coursework includes Materials & Manufacturing Processes, Human Factors & Ergonomics, Sketching, 3D CAD and Modeling.' },
    cn: { title: '圣何塞州立大学', lead: '工业设计学士 · 交互设计辅修 · GPA 3.8/4.0', body: '2025 年 8 月至今 · 加州圣何塞。课程包括材料与制造工艺、人因与人体工程学、设计手绘、3D CAD 与建模。' },
  },
  experience: {
    en: { title: 'Product Designer', lead: 'Brixoo · Part-time · Remote · Jul 2026—Present', body: 'Developing modular consumer product concepts from ideation through 3D visualization with BrickLink Studio, balancing form, color, buildability and market appeal. Previously Design Assistant at One-Mile, Changsha, supporting research, sketching, digital modeling and presentation development.' },
    cn: { title: '产品设计师', lead: 'Brixoo · 兼职 · 远程 · 2026 年 7 月至今', body: '使用 BrickLink Studio 推进模块化消费产品从概念到 3D 可视化，在形态、色彩、可建造性与市场吸引力之间取得平衡。此前在长沙 One-Mile 担任设计助理，参与研究、草图、数字建模与提案制作。' },
  },
  software: {
    en: { title: 'Software & Digital Tools', lead: 'Rhino · Blender · SolidWorks · KeyShot · BrickLink Studio · Figma · Adobe Creative Cloud', body: 'Additional tools: InDesign, Illustrator, Photoshop, Lightroom, Acrobat, ChatGPT, Midjourney, Python, HTML, CSS and JavaScript.' },
    cn: { title: '软件与数字工具', lead: 'Rhino · Blender · SolidWorks · KeyShot · BrickLink Studio · Figma · Adobe Creative Cloud', body: '其他工具包括 InDesign、Illustrator、Photoshop、Lightroom、Acrobat、ChatGPT、Midjourney、Python、HTML、CSS 与 JavaScript。' },
  },
  skills: {
    en: { title: 'Design Skills', lead: 'Research · Concept Development · Product Sketching · Human-centered Design · CMF', body: 'Physical prototyping, 3D modeling, rendering and product storytelling. Bilingual in Chinese and English.' },
    cn: { title: '设计技能', lead: '研究 · 概念开发 · 产品手绘 · 以人为本设计 · CMF', body: '同时具备实体原型、3D 建模、渲染与产品叙事能力；中英文双语。' },
  },
  life: {
    en: { title: 'Life Outside Design', lead: 'Photography, painting, material experiments and collecting fragments of ordinary life.', body: 'These practices slow down my attention and bring texture, emotion and unexpected references back into my design work.' },
    cn: { title: '设计之外', lead: '摄影、绘画、材料实验，以及收集日常生活里的细小片段。', body: '这些实践让我重新放慢观察，并把质感、情绪与意外的灵感带回设计工作。' },
  },
  contact: {
    en: { title: 'Contact', lead: 'Open to collaborations, conversations and unfamiliar problems.', body: 'lib1021jean@gmail.com · linkedin.com/in/jeanjiang1021 · Instagram @i_am._.jean' },
    cn: { title: '联系方式', lead: '欢迎合作、交流，以及一起面对尚未被定义的问题。', body: 'lib1021jean@gmail.com · linkedin.com/in/jeanjiang1021 · Instagram @i_am._.jean' },
  },
};

const tabs = [
  ['intro', 'Introduction', '自我介绍'],
  ['education', 'Education', '教育'],
  ['experience', 'Experience', '工作经历'],
  ['software', 'Software', '软件'],
  ['skills', 'Skills', '技能'],
  ['life', 'Life', '生活'],
  ['contact', 'Contact', '联系'],
];

const stats = [
  ['12+', 'Projects', '项目'],
  ['03', 'Design Fields', '设计领域'],
  ['14+', 'Tools', '工具'],
  ['100%', 'System Thinking', '系统思维'],
];

export default function About({ language = 'en' }) {
  const [active, setActive] = useState('intro');
  const [photoIndex, setPhotoIndex] = useState(0);
  const content = sections[active][language];

  useEffect(() => {
    const timer = window.setInterval(() => setPhotoIndex((index) => (index + 1) % photos.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section about about-white" id="about">
      <div className="section-shell">
        <div className="about-slim-heading"><span>01 / ABOUT JEAN</span><p>{language === 'cn' ? '请选择你想了解的内容。' : 'Choose what you would like to know.'}</p></div>

        <div className="about-index-grid">
          <div className="portrait-frame portrait-clean photo-carousel hover-lift" aria-label="Jean Jiang photo carousel">
            {photos.map((photo, index) => <img key={photo} src={photo} alt={`Jean Jiang portrait ${index + 1}`} className={index === photoIndex ? 'active' : ''} />)}
            <div className="photo-progress">{photos.map((_, index) => <button key={index} className={index === photoIndex ? 'active' : ''} onClick={() => setPhotoIndex(index)} aria-label={`Show photo ${index + 1}`} />)}</div>
            <div className="portrait-meta"><span>JEAN / PERSONAL ARCHIVE</span><span>{String(photoIndex + 1).padStart(2, '0')} / 05</span></div>
          </div>

          <div className="about-information">
            <div className="info-tabs" role="tablist">
              {tabs.map(([key, en, cn], index) => (
                <button key={key} className={active === key ? 'active' : ''} onClick={() => setActive(key)} role="tab">
                  <span>{String(index + 1).padStart(2, '0')}</span>{language === 'cn' ? cn : en}
                </button>
              ))}
            </div>
            <article className="info-record" key={`${active}-${language}`}>
              <span>RECORD / {active.toUpperCase()}</span>
              <h3>{content.title}</h3>
              <p className="info-lead">{content.lead}</p>
              <p className="info-body">{content.body}</p>
              {active === 'contact' && (
                <div className="info-contact-links">
                  <a href="mailto:lib1021jean@gmail.com">EMAIL ↗</a>
                  <a href="https://linkedin.com/in/jeanjiang1021" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
                  <a href="https://www.instagram.com/i_am._.jean" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
                </div>
              )}
            </article>
          </div>
        </div>

        <div className="stats-grid compact-stats">
          {stats.map(([value, en, cn], index) => (
            <article className={`stat-card stat-color-${index + 1} hover-lift`} key={en}>
              <span>0{index + 1}</span><strong>{value}</strong><p>{language === 'cn' ? cn : en}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
