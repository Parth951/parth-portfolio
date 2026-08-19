/* ============================================================
   DATA ANALYST PORTFOLIO — script.js
   Handles: canvas animation, stat counters, proficiency bars,
            typing effect, mobile nav, active link tracking
   ============================================================ */

// ── Mobile nav toggle ──────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// ── Smooth scroll + active link ────────────────────────────
const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (navMenu.classList.contains('open')) navMenu.classList.remove('open');
  });
});

const sectionIds = ['#about', '#projects', '#skills', '#education', '#contact'];
const secObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const matching = navLinks.find(a => a.getAttribute('href') === '#' + entry.target.id);
    if (matching && entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      matching.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
sectionIds.forEach(id => { const el = document.querySelector(id); if (el) secObserver.observe(el); });

// ── Footer year ─────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ── Permanent Data Analyst Title ──────────────────────────────
// (Static title under name: Data Analyst)

// ── Animated stat counters ──────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.stat-value[data-count]').forEach(animateCounter);
      io.disconnect();
    }
  }, { threshold: 0.4 });
  io.observe(statsBar);
}

// ── Proficiency bar animation ────────────────────────────────
const profBars = document.querySelectorAll('.prof-bar-fill');
if (profBars.length) {
  const profObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width + '%';
        profObs.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });
  profBars.forEach(bar => profObs.observe(bar));
}

// ── Data Analytics Hero Canvas ───────────────────────────────
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], edges = [], frame = 0;
  const NODE_COUNT = 55;
  const ACCENT = [0, 212, 255];
  const ACCENT2 = [123, 94, 167];
  const NODE_SPEED_MAX = 0.35;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

  function spawnNode() {
    const t = Math.random();
    const color = t < 0.6 ? ACCENT : ACCENT2;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * NODE_SPEED_MAX * 2,
      vy: (Math.random() - 0.5) * NODE_SPEED_MAX * 2,
      r: Math.random() * 2 + 1.2,
      color,
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function initNodes() {
    nodes = Array.from({ length: NODE_COUNT }, spawnNode);
  }

  // Mini bar chart drawn in bottom-right of canvas
  const chartBars = [0.3, 0.6, 0.5, 0.8, 0.45, 0.7, 0.55, 0.9, 0.65, 0.75];
  function drawMiniChart() {
    const bw = 18, gap = 6, count = chartBars.length;
    const totalW = count * (bw + gap) - gap;
    const ox = W - totalW - 40;
    const oy = H - 40;
    const maxH = 120;

    chartBars.forEach((h, i) => {
      const bh = h * maxH;
      const x = ox + i * (bw + gap);
      const y = oy - bh;
      const alpha = 0.12 + 0.06 * Math.sin(frame * 0.02 + i * 0.5);
      ctx.fillStyle = rgba(ACCENT, alpha);
      ctx.beginPath();
      ctx.roundRect(x, y, bw, bh, [3, 3, 0, 0]);
      ctx.fill();
    });
    // X-axis line
    ctx.beginPath();
    ctx.moveTo(ox - 4, oy);
    ctx.lineTo(ox + totalW + 4, oy);
    ctx.strokeStyle = rgba(ACCENT, 0.12);
    ctx.lineWidth = 1;
    ctx.stroke();

    // Animated trend line over bars
    ctx.beginPath();
    chartBars.forEach((h, i) => {
      const bh = h * maxH;
      const x = ox + i * (bw + gap) + bw / 2;
      const y = oy - bh;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = rgba(ACCENT, 0.35);
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Scatter dots in top-left area
  const scatterDots = Array.from({ length: 28 }, () => ({
    x: 40 + Math.random() * 180,
    y: 60 + Math.random() * 120,
    r: Math.random() * 3 + 1,
    c: Math.random() > 0.5 ? ACCENT : ACCENT2,
  }));
  function drawScatter() {
    scatterDots.forEach(d => {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = rgba(d.c, 0.2);
      ctx.fill();
    });
    // Regression line
    ctx.beginPath();
    ctx.moveTo(50, 170);
    ctx.lineTo(210, 80);
    ctx.strokeStyle = rgba(ACCENT, 0.15);
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    // Edges between close nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.12;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = rgba(ACCENT, alpha);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Nodes
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      n.pulse += 0.03;
      const pr = n.r + Math.sin(n.pulse) * 0.5;

      // Outer glow
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr * 6);
      grad.addColorStop(0, rgba(n.color, 0.25));
      grad.addColorStop(1, rgba(n.color, 0));
      ctx.beginPath();
      ctx.arc(n.x, n.y, pr * 6, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
      ctx.fillStyle = rgba(n.color, 0.55);
      ctx.fill();
    });

    // Static chart decorations
    drawMiniChart();
    drawScatter();

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initNodes(); });
  resize();
  initNodes();
  draw();
})();
