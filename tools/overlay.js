// Inject into a page: outlines elements by role and labels their size.
(() => {
  const vh = innerHeight * 1.0;
  const box = (el, color, label, dashed) => {
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.height < 8 || r.bottom < 0 || r.top > vh) return;
    const d = document.createElement('div');
    Object.assign(d.style, {
      position: 'fixed', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px',
      outline: `2px ${dashed ? 'dashed' : 'solid'} ${color}`, zIndex: 2147483646, pointerEvents: 'none',
    });
    if (label) {
      const t = document.createElement('span');
      t.textContent = label;
      Object.assign(t.style, {
        position: 'absolute', left: '0', top: '-15px', font: '600 10px/14px ui-monospace,monospace',
        background: color, color: '#fff', padding: '0 4px', whiteSpace: 'nowrap',
      });
      d.appendChild(t);
    }
    document.body.appendChild(d);
  };
  const fs = el => Math.round(parseFloat(getComputedStyle(el).fontSize));
  const hasOwnText = el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);

  document.querySelectorAll('section, header, footer, main > div').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.height > 120) box(el, '#7c3aed', `${el.tagName.toLowerCase()} ${Math.round(r.width)}×${Math.round(r.height)}`, true);
  });
  document.querySelectorAll('img, video, canvas, picture, svg').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > 80 && r.height > 60) box(el, '#ea580c', `media ${Math.round(r.width)}×${Math.round(r.height)}`);
  });
  document.querySelectorAll('h1,h2,h3,h4').forEach(el => box(el, '#dc2626', `${el.tagName.toLowerCase()} ${fs(el)}px`));
  document.querySelectorAll('p, li, span, div').forEach(el => {
    if (!hasOwnText(el) || el.closest('h1,h2,h3,h4,a,button')) return;
    const f = fs(el);
    if (f >= 28) box(el, '#dc2626', `display ${f}px`);
    else if (el.tagName === 'P') box(el, '#2563eb', `p ${f}px`);
  });
  document.querySelectorAll('button, a[class*="button" i], a[class*="btn" i], [role=button]').forEach(el =>
    box(el, '#16a34a', `btn ${fs(el)}px ${Math.round(el.getBoundingClientRect().height)}h`));
})();
