import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    let frame = null;
    const schedule = () => { if (frame === null) frame = requestAnimationFrame(() => { frame = null; updateProgress(); }); };
    updateProgress();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return <div className="scroll-progress" role="progressbar" aria-label="Page progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
    <span className="scroll-progress-label">{progress}%</span>
    <span className="scroll-progress-track"><span className="scroll-progress-fill" style={{ height: `${progress}%` }} /></span>
    <span className="scroll-progress-end">END</span>
  </div>;
}