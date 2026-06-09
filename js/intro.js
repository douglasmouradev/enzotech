(() => {
  const intro = document.getElementById('intro');
  const canvas = document.getElementById('intro-canvas');
  const skipBtn = document.getElementById('intro-skip');

  if (!intro || !canvas) return;

  const skipIntro = () => {
    if (intro.classList.contains('is-done')) return;
    intro.classList.add('is-done');
    document.body.classList.remove('intro-active');
    sessionStorage.setItem('enzotech-intro', '1');
    cancelAnimationFrame(rafId);
  };

  if (
    sessionStorage.getItem('enzotech-intro') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    intro.classList.add('is-done');
    return;
  }

  document.body.classList.add('intro-active');

  const ctx = canvas.getContext('2d');
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const fontSize = 14;
  let columns = 0;
  let drops = [];
  let rafId = 0;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -50);
  };

  const draw = () => {
    ctx.fillStyle = 'rgba(6, 10, 20, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      const isAccent = Math.random() > 0.96;
      ctx.fillStyle = isAccent ? '#ff6b1a' : `rgba(0, 229, 255, ${0.35 + Math.random() * 0.45})`;
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    rafId = requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener('resize', resize);

  skipBtn.addEventListener('click', skipIntro);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') skipIntro();
  });

  setTimeout(skipIntro, 2800);
})();
