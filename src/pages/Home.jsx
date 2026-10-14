import { useState } from 'react';
import ProjectNotes from '../components/ProjectNotes';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Process from '../components/Process';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import TrendingIdeas from '../components/TrendingIdeas';
import FitCheck from '../components/FitCheck';
import ScrollProgress from '../components/ScrollProgress';

export default function Home() {
  const [selection, setSelection] = useState(null);
  const [lookName, setLookName] = useState('Soft mineral');
  const [chatVisible, setChatVisible] = useState(true);
  function chooseProject(text) { setSelection({ text }); }
  return <><a className="skip-link" href="#main">Skip to content</a><Navbar /><ScrollProgress /><main id="main"><Hero /><Portfolio onSelectProject={chooseProject} /><Services onSelectProject={chooseProject} /><TrendingIdeas onSelectLook={setLookName} /><FitCheck lookName={lookName} onSelectLook={setLookName} onSelectProject={chooseProject} /><Process /><About /><Contact selection={selection} /><ProjectNotes onRestoreChat={() => setChatVisible(true)} /></main><Footer />{chatVisible && <ChatWidget onSelectProject={chooseProject} onDismiss={() => setChatVisible(false)} />}</>;
}
