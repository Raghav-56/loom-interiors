import { imagePath } from '../data/projects';

const ideas = [
  ['Quiet luxury, warmer', 'Layer natural oak, brushed metal, and soft stone for a room that feels calm but never flat.', 'Living-area.jpg', 'Soft mineral'],
  ['Colour drenching', 'Wrap one confident shade across walls, joinery, and soft furnishings to make compact spaces feel intentional.', 'bedroom.jpg', 'Cedar quiet'],
  ['The social kitchen', 'Design around the way people gather: generous prep zones, low lighting, and a table that stays in the conversation.', 'kitchen.jpg', 'Garden room']
];

export default function TrendingIdeas({ onSelectLook }) {
  return <section className="trending-section" id="ideas">
    <div className="section-head trending-head">
      <div className="kicker">What is shaping interiors now</div>
      <h2>Ideas worth bringing home.</h2>
      <p>Explore a material palette, try it in the preview, and add it to your brief.</p>
    </div>
    <div className="trending-grid">
      {ideas.map(([title, description, image, look]) => <article className="idea-card" key={title}>
        <div className="idea-image"><img src={imagePath(image)} alt={title} /></div>
        <div className="idea-copy"><h3>{title}</h3><p>{description}</p><a href="#fit-check" onClick={() => onSelectLook(look)}>Try this direction <span aria-hidden="true">↗</span></a></div>
      </article>)}
    </div>
  </section>;
}