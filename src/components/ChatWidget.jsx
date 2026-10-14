import { useEffect, useRef, useState } from 'react';
import { ChatIcon, WhatsAppIcon } from './Icon';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [position, setPosition] = useState(null);
  const [panelPlacement, setPanelPlacement] = useState('above');
  const dragState = useRef(null);
  const suppressClick = useRef(false);
  const [choice, setChoice] = useState(null);
  const panelRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const updatePanelPlacement = () => {
      const panel = panelRef.current;
      const widget = widgetRef.current;
      if (!panel || !widget) return;

      const panelHeight = panel.getBoundingClientRect().height;
      const widgetBounds = widget.getBoundingClientRect();
      const spaceAbove = widgetBounds.top;
      const spaceBelow = window.innerHeight - widgetBounds.bottom;
      setPanelPlacement(spaceBelow >= panelHeight || spaceAbove < panelHeight ? 'below' : 'above');
    };

    const frame = window.requestAnimationFrame(updatePanelPlacement);
    window.addEventListener('resize', updatePanelPlacement);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', updatePanelPlacement);
    };
  }, [open, position]);

  useEffect(() => {
    const move = (event) => {
      const drag = dragState.current;
      if (!drag) return;

      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      if (!drag.moved && Math.hypot(deltaX, deltaY) < 5) return;
      drag.moved = true;

      const width = drag.width;
      const height = drag.height;
      const left = Math.min(Math.max(8, drag.left + deltaX), window.innerWidth - width - 8);
      const top = Math.min(Math.max(8, drag.top + deltaY), window.innerHeight - height - 8);
      setPosition({ left, top });
    };

    const stop = () => {
      if (dragState.current) { suppressClick.current = dragState.current.moved; dragState.current = null; }
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
    };
  }, []);

  useEffect(() => {
    const resetPosition = () => { setPosition(null); setPanelPlacement('above'); };
    window.addEventListener('resize', resetPosition);
    return () => window.removeEventListener('resize', resetPosition);
  }, []);

  if (removed) return null;

  const beginDrag = (event) => {
    if (event.button !== 0) return;
    suppressClick.current = false;
    const widget = event.currentTarget.parentElement;
    const bounds = widget.getBoundingClientRect();
    dragState.current = {
      startX: event.clientX,
      startY: event.clientY,
      left: bounds.left,
      top: bounds.top,
      width: bounds.width,
      height: bounds.height,
      moved: false
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const toggleChat = () => {
    if (suppressClick.current) { suppressClick.current = false; return; }
    setOpen((value) => !value);
  };

  const widgetStyle = position ? { left: `${position.left}px`, top: `${position.top}px`, right: 'auto', bottom: 'auto' } : undefined;

  return <div ref={widgetRef} className={`chat-widget${open ? '' : ' closed'}${position ? ' is-positioned' : ''}`} style={widgetStyle}>
    <div className="chat-tip">Ask us anything</div>
    <div ref={panelRef} role="region" aria-label="Design helper" className={`chat-panel chat-panel--${panelPlacement}`}><div className="chat-panel-head"><span>Loom Interiors</span><button onClick={() => setOpen(false)} type="button" aria-label="Close chat">✕</button></div><div className="chat-panel-body"><div className="chat-bubble"><div className="who">Loom Interiors</div>Hi! What are you planning?</div><div className="chat-options">{['New Home', 'Renovation', 'Kitchen', 'Bedroom', 'Full Home', 'Commercial'].map((option) => <button type="button" key={option} aria-pressed={choice === option} onClick={() => setChoice(option)}>{option}</button>)}</div>{choice && <div className="chat-bubble" role="status">{choice === 'Kitchen' ? 'For a kitchen, start with storage, appliance locations, and the way you cook.' : choice === 'Bedroom' ? 'For a bedroom, think about wardrobe space, bedside lighting, and a calm material palette.' : `For your ${choice.toLowerCase()} project, note your location, approximate area, and preferred style.`} Create a consultation brief below to record your ideas.</div>}<p className="chat-demo-note">Demo helper · fixed replies</p></div><a href="#consult" onClick={() => setOpen(false)} className="chat-start"><WhatsAppIcon />Continue to consultation</a></div>
    <button className="chat-remove" onClick={() => setRemoved(true)} type="button" aria-label="Remove chat widget">✕</button>
    <button className="chat-fab" onPointerDown={beginDrag} onClick={toggleChat} type="button" aria-expanded={open} aria-label={open ? 'Close chat' : 'Open chat'}><ChatIcon /></button>
  </div>;
}