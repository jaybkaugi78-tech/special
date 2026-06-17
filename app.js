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

  /* ── PLAYLIST: open the real track on Spotify ── */
  function playTrack(el) {
    const track = el.dataset.track;
    const artist = el.dataset.artist;
    const url = 'https://open.spotify.com/search/' + encodeURIComponent(track + ' ' + artist);
    window.open(url, '_blank', 'noopener');
  }

  document.querySelectorAll('.playlist-track').forEach(t => {
    t.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playTrack(t);
      }
    });
  });

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