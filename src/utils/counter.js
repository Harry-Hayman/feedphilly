export function setupCounters() {
  const options = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute("data-count"));
        const duration = 2000;
        const startTime = performance.now();
        const isPercentage = target.getAttribute("data-percentage") === "true";

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(countTo * easeOutQuart);
          
          target.textContent = isPercentage ? `${current}%` : current.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        }

        requestAnimationFrame(updateCount);
        observer.unobserve(target);
      }
    });
  }, options);

  // Observe all elements with data-count attribute
  document.querySelectorAll('[data-count]').forEach((el) => observer.observe(el));
}