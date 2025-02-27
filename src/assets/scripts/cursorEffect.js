// Optimized cursor glow effect
document.addEventListener('DOMContentLoaded', () => {
  const glow = document.createElement('div');
  glow.classList.add('cursor-glow');
  document.body.appendChild(glow);

  let ticking = false;
  const updateGlowPosition = (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    ticking = false;
  };

  document.addEventListener('mousemove', (e) => {
    if (!ticking) {
      requestAnimationFrame(() => updateGlowPosition(e));
      ticking = true;
    }
  }, { passive: true });
});