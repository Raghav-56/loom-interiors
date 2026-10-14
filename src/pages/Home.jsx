import ProjectNotes from '../components/ProjectNotes';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Process from '../components/Process';
import About from '../components/About';
import Rooms from '../components/Rooms';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import TrendingIdeas from '../components/TrendingIdeas';
import FitCheck from '../components/FitCheck';
import ScrollProgress from '../components/ScrollProgress';

export default function Home() { return <><Navbar /><ScrollProgress /><a className="skip-link" href="#main">Skip to content</a><main id="main"><Hero /><Portfolio /><Services /><TrendingIdeas /><FitCheck /><Process /><About /><Rooms /><Testimonials /><Contact /><ProjectNotes /></main><Footer /><ChatWidget /></>; }