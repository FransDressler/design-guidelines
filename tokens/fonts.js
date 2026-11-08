// generated — loads the Google Fonts for <html data-type>; re-runs when data-type changes
// also: ?palette=…&type=…&radius=…&density=…&motion=…&skeleton=…&stickers=…&grain=… override the <html> data attributes (used by generator.html)
(() => {
  const q = new URLSearchParams(location.search);
  for (const k of ['palette', 'type', 'radius', 'density', 'motion', 'skeleton', 'stickers', 'grain']) if (q.get(k)) document.documentElement.dataset[k] = q.get(k);
  const F = {"grotesk":"family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Instrument+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800","editorial":"family=Fraunces:wght@400;500;600;700;800&family=Instrument+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800","technical":"family=Space+Grotesk:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700;800","serif":"family=Instrument+Serif&family=Newsreader:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800","poster":"family=Anton&family=Archivo:wght@400;500;600;700;800&family=Space+Mono:wght@400;500;600;700;800","friendly":"family=Gabarito:wght@400;500;600;700;800&family=Figtree:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;600;700;800"};
  const load = () => { const k = document.documentElement.dataset.type; if (!F[k] || document.getElementById('font-' + k)) return;
    const l = document.createElement('link'); l.id = 'font-' + k; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?' + F[k] + '&display=swap'; document.head.appendChild(l); };
  load(); new MutationObserver(load).observe(document.documentElement, { attributes: true, attributeFilter: ['data-type'] });
})();
