import { useEffect, useRef, useState } from 'react';
import { CameraIcon } from './Icon';
import { imagePath } from '../data/projects';

const looks = [
  { name: 'Soft mineral', image: 'room-photo-1.jpg', tone: 'rgba(219, 205, 187, .38)', label: 'Warm stone + oak' },
  { name: 'Coastal ink', image: 'Living-area.jpg', tone: 'rgba(35, 91, 107, .34)', label: 'Teal + natural linen' },
  { name: 'Cedar quiet', image: 'bedroom.jpg', tone: 'rgba(118, 76, 52, .34)', label: 'Cedar + clay' },
  { name: 'Garden room', image: 'kitchen.jpg', tone: 'rgba(79, 111, 81, .34)', label: 'Sage + aged brass' }
];

export default function FitCheck() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const requestRef = useRef(0);
  const [activeLook, setActiveLook] = useState(looks[0]);
  const [cameraState, setCameraState] = useState('idle');

  useEffect(() => () => { requestRef.current += 1; streamRef.current?.getTracks().forEach((track) => track.stop()); }, []);

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraState('unsupported');
      return;
    }
    const request = ++requestRef.current;
    setCameraState('loading');
    try {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      if (request !== requestRef.current) { stream.getTracks().forEach((track) => track.stop()); return; }
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
        await videoRef.current.play();
      }
      if (request === requestRef.current) setCameraState('ready');
    } catch {
      if (request !== requestRef.current) return;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setCameraState('denied');
    }
  };

  const stopCamera = () => {
    requestRef.current += 1;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraState('idle');
  };

  return <section className="fit-check" id="fit-check">
    <div className="fit-check-grid">
      <div className="fit-check-copy">
        <div className="kicker">See it in your space</div>
        <h2>Find the look that fits your room.</h2>
        <p>Try four material palettes on the sample room, or open your camera for a live colour-tint preview. This is a mood preview, not furniture placement.</p>
        <div className="fit-check-actions">
          {cameraState === 'ready' || cameraState === 'loading' ? <button className="btn-ghost" type="button" onClick={stopCamera}>Close camera</button> : <button className="btn-coral" type="button" onClick={startCamera}><CameraIcon />Open camera</button>}
          <span className="camera-note">Camera stays on your device</span>
        </div>
        {(cameraState === 'denied' || cameraState === 'unsupported') && <p className="camera-status" role="status">Camera access is unavailable here. You can still browse the design directions below.</p>}
      </div>
      <div className={`camera-stage camera-stage--${cameraState}`}>
        <video ref={videoRef} className="camera-feed" muted playsInline aria-label="Live camera preview" />
        {cameraState !== 'ready' && <div className="camera-placeholder"><CameraIcon /><span>{cameraState === 'loading' ? 'Preparing your camera...' : 'Your room, your next direction'}</span></div>}
        <div className="camera-overlay" style={{ background: cameraState === 'ready' ? activeLook.tone : `linear-gradient(135deg, ${activeLook.tone}, transparent 70%), url(${imagePath(activeLook.image)}) center / cover` }} aria-hidden="true" />
        <div className="camera-stage-label"><span>Preview</span><strong>{activeLook.label}</strong></div>
      </div>
    </div>
    <div className="look-picker" aria-label="Choose a design direction">
      {looks.map((look) => <button className={activeLook.name === look.name ? 'look-option active' : 'look-option'} type="button" aria-pressed={activeLook.name === look.name} key={look.name} onClick={() => setActiveLook(look)}>
        <img src={imagePath(look.image)} alt="" /><span>{look.name}</span>
      </button>)}
    </div>
  </section>;
}