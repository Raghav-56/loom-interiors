import { useRef, useState } from 'react';
import { projects, imagePath } from '../data/projects';
const images = ['Living-area.jpg', 'aster-clinic.jpg', 'dining.jpg', 'ludhiana-residential-flat.jpg'];
export default function Portfolio() {
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  function open(project) { setSelected(project); dialogRef.current.showModal(); }
  return <section id="portfolio"><div className="section-head"><div className="kicker">Sample project gallery</div><h2>Spaces designed around real people, real routines, real homes.</h2></div><div className="portfolio-grid">{projects.map((project) => <article className={`project ${project.className}`} key={project.id}><div className="project-label"><div className="name">{project.title}</div><div className="loc">{project.location} · {project.category} · {project.style}</div><button type="button" className="view-project" onClick={() => open(project)}>View project</button></div></article>)}</div>
  <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-title" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
    {selected && <><button type="button" className="dialog-close" aria-label="Close project" onClick={() => dialogRef.current.close()}>×</button><img src={imagePath(images[selected.id - 1])} alt={`Sample ${selected.category.toLowerCase()} interior`} /><div className="dialog-copy"><p>Illustrative project</p><h2 id="project-title">{selected.title}</h2><p>{selected.location} · {selected.category} · {selected.style}</p><p>This concept explores a {selected.style.toLowerCase()} direction for a {selected.category.toLowerCase()} space. Consider circulation, natural light, storage, and the materials that fit daily use.</p><a className="btn-coral" href="#consult" onClick={() => dialogRef.current.close()}>Create a similar project brief</a></div></>}
  </dialog></section>;
}
