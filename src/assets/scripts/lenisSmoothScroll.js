import "@styles/lenis.css";
import Lenis from "lenis";

// Optimized smooth scroll with performance settings
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Optimize easing
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false, // Disable on touch devices for better performance
    touchMultiplier: 2,
    infinite: false,
});

// Cleanup function
function destroy() {
    lenis.destroy();
}

// Optimized RAF
let rafId = null;
function raf(time) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
}

// Start animation and add cleanup
rafId = requestAnimationFrame(raf);

// Cleanup on page unload
window.addEventListener('unload', () => {
    cancelAnimationFrame(rafId);
    destroy();
}, { passive: true });