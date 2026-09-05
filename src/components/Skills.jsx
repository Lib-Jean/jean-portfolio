import { useState } from 'react';
import { skills } from '../data/skills.js';

const colors = ['#d8e3e7', '#e9d1c1', '#dce3ce', '#e6d8a7', '#d8d5e4', '#cfe0dc', '#edc8b9', '#e4dfd0'];

export default function Skills({ language = 'en' }) {
  const [selected, setSelected] = useState(0);

  return (
    <section className="section skills compact-skills" id="skills">
      <div className="section-shell">
        <div className="skills-slim-heading">
          <span>03 / CAPABILITIES</span>
          <p>{language === 'cn' ? '点击色块查看我的能力系统。' : 'SELECT A BLOCK TO MAP THE PRACTICE.'}</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <button
              className={`skill-card ${selected === index ? 'is-selected' : ''}`}
              key={skill.id}
              onClick={() => setSelected(index)}
              style={{ '--skill-color': colors[index] }}
            >
              <span>{skill.id}</span>
              <h3>{skill.title}</h3>
              <p>{skill.note}</p>
              <i>↗</i>
            </button>
          ))}
        </div>
        <div className="tools-line">
          <span>WORKING LANGUAGE</span>
          <p>Research / Strategy / Sketching / CAD / Rendering / Prototyping / Figma / Motion / Storytelling</p>
        </div>
      </div>
    </section>
  );
}
