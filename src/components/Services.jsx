import { imagePath } from '../data/projects';
const services = [
  ['Kitchen', 'kitchen.jpg', 'Storage, surfaces, and space to gather.'],
  ['Bedroom', 'bedroom.jpg', 'A quieter place to start and end the day.'],
  ['Living room', 'Living-area.jpg', 'Comfort that makes room for everyone.'],
  ['Commercial', 'aster-clinic.jpg', 'Spaces that welcome people and work well.'],
];
export default function Services({ onSelectProject }) {
  return <section id="services" className="services"><div className="section-head"><div><div className="kicker">Made for everyday life</div><h2>Start with your space.</h2></div><p>A single room or a fresh start. Choose where you would like to begin.</p></div><div className="service-photo-grid">{services.map(([name, image, description]) => <a href="#consult" className="service-photo-card" key={name} onClick={() => onSelectProject(`${name} design`)}><div className="service-image"><img src={imagePath(image)} alt={`${name} design inspiration`} loading="lazy" /></div><div className="service-copy"><h3>{name}<span aria-hidden="true">↗</span></h3><p>{description}</p></div></a>)}</div></section>;
}
