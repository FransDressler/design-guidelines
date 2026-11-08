// Motion: data-reveal, data-split, data-marquee, data-magnetic, data-hover-preview, data-count. No dependencies.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  function split(el) {
    const chars = el.dataset.split === 'chars';
    let i = 0;
    const walk = node => {
      for (const n of [...node.childNodes]) {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          for (const part of n.textContent.split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) { frag.append(part); continue; }
            const units = chars ? [...part] : [part];
            const word = document.createElement('span'); word.className = 'split-w';
            if (chars) { word.style.overflow = 'visible'; }
            for (const u of units) { const s = document.createElement('span'); s.textContent = u; s.style.setProperty('--i', i++); (chars ? (() => { const m = document.createElement('span'); m.className = 'split-w'; m.append(s); word.append(m); })() : word.append(s)); }
            frag.append(word);
          }
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      }
    };
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
    [...el.querySelectorAll('.split-w')].forEach(w => w.setAttribute('aria-hidden', 'true'));
  }

  function count(el) {
    const to = +el.dataset.count, t0 = performance.now(), d = 1200;
    const f = t => { const p = Math.min(1, (t - t0) / d), e = 1 - (1 - p) ** 3; el.textContent = Math.round(to * e).toLocaleString('de-DE'); p < 1 && requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }

  function init() {
    document.querySelectorAll('[data-split]').forEach(split);
    if (!reduce) root.classList.add('motion-ready');

    // stagger siblings that reveal together
    const groups = new Map();
    document.querySelectorAll('[data-reveal]').forEach(el => { const p = el.parentElement, n = groups.get(p) || 0; el.style.setProperty('--d', n * 70 + 'ms'); groups.set(p, n + 1); });

    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      if (e.target.dataset.count && !reduce) count(e.target);
    }), { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal],[data-split],[data-count]').forEach(el => io.observe(el));

    // marquee: duplicate content so the loop is seamless
    document.querySelectorAll('[data-marquee]').forEach(m => { const s = m.firstElementChild; if (s) for (let k = 0; k < 3; k++) { const c = s.cloneNode(true); c.setAttribute('aria-hidden', 'true'); m.append(c); } });

    if (reduce || matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('[data-magnetic]').forEach(b => {
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
      b.addEventListener('pointerleave', () => b.style.transform = '');
    });

    let prev;
    document.querySelectorAll('[data-hover-preview]').forEach(a => {
      a.addEventListener('pointerenter', () => { prev ??= Object.assign(document.createElement('img'), { className: 'hover-preview', alt: '' }); document.body.append(prev); prev.src = a.dataset.hoverPreview; prev.classList.add('on'); });
      a.addEventListener('pointermove', e => { prev.style.left = e.clientX + 'px'; prev.style.top = e.clientY + 'px'; });
      a.addEventListener('pointerleave', () => prev.classList.remove('on'));
    });
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
