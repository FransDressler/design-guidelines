// Skeletons: pixel (blocks flicker while loading, then the image de-pixelates 4 → full res), scan, blur, type.
// Markup: <figure data-skel-media[="pixel|scan|blur|type"]><img ...></figure>
//         <div data-skel-text data-skel-wait="1200"><div class="skel-lines"><i class="skel-line w80"></i>…</div>…content…</div>
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const done = el => el.classList.add('skel-done');

  function pixel(el, img) {
    if (reduce) return { finish: () => done(el) };
    const c = document.createElement('canvas'); c.className = 'skel-canvas'; el.prepend(c);
    const x = c.getContext('2d');
    const size = () => { const r = el.getBoundingClientRect(); c.width = Math.max(1, r.width); c.height = Math.max(1, r.height); };
    size();
    const B = 14, cols = () => Math.ceil(c.width / B), rows = () => Math.ceil(c.height / B);
    const palette = [css('--surface'), css('--line'), css('--bg')];
    let raf, alive = true;
    const flicker = () => {
      if (!alive) return;
      for (let i = 0; i < 40; i++) {
        x.fillStyle = palette[(Math.random() * 3) | 0];
        x.fillRect(((Math.random() * cols()) | 0) * B, ((Math.random() * rows()) | 0) * B, B, B);
      }
      raf = setTimeout(() => requestAnimationFrame(flicker), 60);
    };
    x.fillStyle = palette[0]; x.fillRect(0, 0, c.width, c.height); flicker();

    const finish = () => {
      alive = false; clearTimeout(raf); size();
      // object-fit: cover crop
      const iw = img.naturalWidth, ih = img.naturalHeight, s = Math.max(c.width / iw, c.height / ih);
      const sw = c.width / s, sh = c.height / s, sx = (iw - sw) / 2, sy = (ih - sh) / 2;
      const steps = [64, 40, 24, 14, 8, 4];
      const tmp = document.createElement('canvas'), t = tmp.getContext('2d');
      let i = 0;
      const step = () => {
        if (i >= steps.length) {
          // dissolve: remove blocks in random order over the sharp image
          done(el);
          const cells = []; for (let a = 0; a < cols(); a++) for (let b = 0; b < rows(); b++) cells.push([a, b]);
          cells.sort(() => Math.random() - .5);
          const per = Math.ceil(cells.length / 10);
          const eat = () => { for (const [a, b] of cells.splice(0, per)) x.clearRect(a * B, b * B, B, B); cells.length ? requestAnimationFrame(eat) : c.remove(); };
          return eat();
        }
        const w = Math.max(1, Math.round(c.width / steps[i])), h = Math.max(1, Math.round(c.height / steps[i]));
        tmp.width = w; tmp.height = h; t.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
        x.imageSmoothingEnabled = false; x.clearRect(0, 0, c.width, c.height); x.drawImage(tmp, 0, 0, w, h, 0, 0, c.width, c.height);
        i++; setTimeout(step, 85);
      };
      step();
    };
    return { finish };
  }

  function media(el) {
    const img = el.querySelector('img'); if (!img) return;
    const mode = el.dataset.skelMedia || document.documentElement.dataset.skeleton || 'pixel';
    el.dataset.skelMode = mode;
    if (!el.dataset.skelLabel) el.dataset.skelLabel = (img.alt || 'bild').slice(0, 28) + ' …';
    const ctl = mode === 'pixel' ? pixel(el, img) : { finish: () => done(el) };
    const wait = +(el.dataset.skelWait || 0);
    const go = () => setTimeout(ctl.finish, wait);
    // start reveal only when visible, so the effect is actually seen
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); img.complete && img.naturalWidth ? go() : (img.onload = go, img.onerror = () => done(el)); } }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
  }

  function text(el) {
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); setTimeout(() => done(el), reduce ? 0 : +(el.dataset.skelWait || 900)); } });
    io.observe(el);
  }

  const init = () => { document.querySelectorAll('[data-skel-media]').forEach(media); document.querySelectorAll('[data-skel-text]').forEach(text); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  window.BlankSkeleton = { media, text };
})();
