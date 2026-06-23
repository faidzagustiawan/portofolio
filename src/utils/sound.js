let audioCtx = null;
let userHasInteracted = false;

if (typeof window !== 'undefined') {
  const markInteracted = () => {
    userHasInteracted = true;
    window.removeEventListener('click', markInteracted);
    window.removeEventListener('keydown', markInteracted);
    window.removeEventListener('touchstart', markInteracted);
  };
  window.addEventListener('click', markInteracted);
  window.addEventListener('keydown', markInteracted);
  window.addEventListener('touchstart', markInteracted);
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!userHasInteracted) return null; // Don't create ctx before interaction to avoid warning
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function playHoverSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Very subtle, high-pitched short tick
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.03);
    
    // Low volume
    gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    // Silent fail if AudioContext is blocked
  }
}

export function playClickSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Slightly deeper pop for click
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    
    // Slightly louder than hover
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Silent fail
  }
}
