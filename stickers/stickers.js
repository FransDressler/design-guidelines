// Stickers: resolves the variant (element or page default), gives each a stable pseudo-random tilt from its text,
// loads the handwriting font only when a scribble is used.
(() => {
  const init = () => {
    const def = document.documentElement.dataset.stickers || 'stamp';
    let scribble = false;
    document.querySelectorAll('.sticker').forEach(s => {
      const forced = new URLSearchParams(location.search).has('stickers');
      const v = !forced && s.dataset.sticker && s.dataset.sticker !== 'auto' ? s.dataset.sticker : def;
      s.dataset.v = v === 'none' ? def : v;
      if (s.dataset.v === 'scribble') scribble = true;
      let h = 0; for (const c of s.textContent) h = (h * 31 + c.charCodeAt(0)) | 0;
      if (!s.style.getPropertyValue('--rot')) s.style.setProperty('--rot', ((Math.abs(h) % 17) - 8 || 5) + 'deg');
      s.setAttribute('aria-hidden', 'true');
    });
    if (scribble && !document.getElementById('font-caveat')) {
      const l = document.createElement('link'); l.id = 'font-caveat'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap'; document.head.append(l);
    }
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  new MutationObserver(init).observe(document.documentElement, { attributes: true, attributeFilter: ['data-stickers'] });
})();
