import { useRef, useState } from 'react';

export default function Contact() {
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.name.trim().length < 2) {
      form.elements.name.setCustomValidity('Enter at least two characters for your name.');
      form.elements.name.reportValidity();
      return;
    }
    if (!/[a-zA-Z0-9]/.test(data.type)) {
      form.elements.type.setCustomValidity('Enter a location or project type.');
      form.elements.type.reportValidity();
      return;
    }
    setResult(data);
  }
  function download() {
    const text = `Loom Interiors consultation brief\nDemo request, not sent to a studio.\n\nName: ${result.name}\nEmail: ${result.email}\nPhone: ${result.phone}\nProject: ${result.type}\n`;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'loom-consultation-brief.txt'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <section id="consult" className="consult"><div className="consult-grid"><div><div className="kicker consult-kicker">Get started</div><h2>Ready to create a space that feels like you?</h2><p>Tell us about your room, your location, and the kind of change you have in mind.</p><p className="demo-note">This is a frontend demonstration. Your details stay in this page and are not sent to a studio. Use sample details during your presentation.</p></div><form ref={formRef} className="consult-form" onSubmit={submit} onInput={(event) => { event.target.setCustomValidity?.(''); setResult(null); }}>
    <div className="field"><label htmlFor="name">Full name</label><input name="name" id="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Your full name" /></div>
    <div className="field"><label htmlFor="email">Email address</label><input name="email" id="email" type="email" autoComplete="email" required maxLength={120} placeholder="you@example.com" /></div>
    <div className="field"><label htmlFor="phone">Phone number</label><input name="phone" id="phone" type="tel" autoComplete="tel" required pattern="[+]?[0-9 ()-]{10,18}" title="Enter 10 to 18 characters using digits, spaces, brackets, or hyphens, with an optional leading plus." placeholder="+91 98765 43210" /></div>
    <div className="field"><label htmlFor="type">Location and project type</label><input name="type" id="type" required minLength={3} maxLength={200} placeholder="Chandigarh, bedroom renovation" /></div>
    <button className="btn btn-dark" type="submit">Create consultation brief</button>
    {result && <div className="form-result" role="status"><strong>Your demo brief is ready, {result.name.trim()}.</strong><p>No request has been sent. Download the brief to keep a copy.</p><button type="button" className="btn-ghost" onClick={download}>Download brief</button><button type="button" className="btn-ghost" onClick={() => { formRef.current.reset(); setResult(null); }}>Clear details</button></div>}
  </form></div></section>;
}
