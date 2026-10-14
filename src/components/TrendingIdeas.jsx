import { imagePath } from '../data/projects';

const ideas = [
  ['Quiet luxury, warmer', 'Layer natural oak, brushed metal, and soft stone for a room that feels calm but never flat.', 'Living-area.jpg', '01'],
  ['Colour drenching', 'Wrap one confident shade across walls, joinery, and soft furnishings to make compact spaces feel intentional.', 'bedroom.jpg', '02'],
  ['The social kitchen', 'Design around the way people gather: generous prep zones, low lighting, and a table that stays in the conversation.', 'kitchen.jpg', '03']
];

export default function TrendingIdeas() {
  return <section className="trending-section" id="ideas">
    <div className="section-head trending-head">
      <div className="kicker">What is shaping interiors now</div>
      <h2>Ideas worth bringing home.</h2>
      <p>Save a direction, share it with your designer, and turn a mood into a room that works for your everyday.</p>
    </div>
    <div className="trending-grid">
      {ideas.map(([title, description, image, number]) => <article className="idea-card" key={title}>
        <div className="idea-image"><img src={imagePath(image)} alt={title} /><span>{number}</span></div>
        <div className="idea-copy"><h3>{title}</h3><p>{description}</p><a href="#fit-check">Try this direction <span aria-hidden="true">↗</span></a></div>
      </article>)}
    </div>
  </section>;
}