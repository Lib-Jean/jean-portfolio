import { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [language, setLanguage] = useState('en');

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Hero language={language} />
        <About language={language} />
        <Projects language={language} />
        <Skills language={language} />
      </main>
      <Contact language={language} />
    </>
  );
}
