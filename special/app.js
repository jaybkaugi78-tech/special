/* ── LOGIN ── */
  const CORRECT_EMAIL = 'Jaymillie@gmail.com';
  const CORRECT_PASS  = 'formysweetwife';

  function tryEnter() {
    const email = document.getElementById('gate-email').value.trim();
    const pass  = document.getElementById('gate-pass').value;
    const err   = document.getElementById('gate-err');

    if (email.toLowerCase() === CORRECT_EMAIL.toLowerCase() && pass === CORRECT_PASS) {
      err.textContent = '';
      document.getElementById('gate').classList.add('hide');
      setTimeout(() => document.getElementById('gate').style.display = 'none', 1000);
    } else {
      err.textContent = 'That doesn\'t look right, love. Try again.';
      const fields = document.querySelectorAll('.gate-field');
      fields.forEach(f => {
        f.style.borderColor = 'rgba(248,113,113,0.5)';
        setTimeout(() => f.style.borderColor = '', 1200);
      });
    }
  }

  document.getElementById('gate-pass').addEventListener('keydown', e => {
    if (e.key === 'Enter') tryEnter();
  });
  document.getElementById('gate-email').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('gate-pass').focus();
  });

  /* ── DAYS COUNTER ── */
  // Set your start date here (YYYY, MM-1, DD) — currently set to Jan 1 2024
  const startDate = new Date(2024, 0, 1);
  const today = new Date();
  const diffMs = today - startDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const el = document.getElementById('days-count');
  if (el) el.innerHTML = `<span>${diffDays.toLocaleString()}</span>`;

  /* ── GALLERY PHOTO UPLOAD ── */
  function triggerUpload(index) {
    const inputs = document.querySelectorAll('#gallery-grid input[type="file"]');
    if (inputs[index]) inputs[index].click();
  }

  function loadPhoto(input, index) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const item = input.closest('.gallery-item');
      // Remove placeholder content
      const placeholder = item.querySelector('.gallery-placeholder');
      if (placeholder) placeholder.remove();
      // Remove existing img if any
      const existingImg = item.querySelector('.gallery-img');
      if (existingImg) existingImg.remove();
      // Insert image
      const img = document.createElement('img');
      img.className = 'gallery-img';
      img.src = e.target.result;
      item.insertBefore(img, item.querySelector('.upload-overlay'));
    };
    reader.readAsDataURL(file);
  }

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));

  /* ── FALLING PETALS ── */
  const canvas = document.getElementById('petal-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PETAL_COUNT = 28;
  const petals = [];

  const colors = [
    'rgba(168,85,247,0.35)',
    'rgba(139,92,246,0.28)',
    'rgba(216,180,254,0.22)',
    'rgba(124,58,237,0.2)',
    'rgba(243,232,255,0.18)',
  ];

  class Petal {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height : -20;
      this.size = 4 + Math.random() * 7;
      this.speedY = 0.4 + Math.random() * 0.7;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.02;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = 0.15 + Math.random() * 0.35;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.015 + Math.random() * 0.01;
    }
    update() {
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.4;
      this.y += this.speedY;
      this.angle += this.spin;
      if (this.y > canvas.height + 30) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.55, this.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PETAL_COUNT; i++) petals.push(new Petal());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();