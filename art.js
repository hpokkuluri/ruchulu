// Food illustrations, drawn as SVG so they stay sharp and work offline.
// All dishes are seen from above, as if laid out on a banana leaf.
(function () {
  // Small deterministic random, so the specks look the same every time.
  function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function specks(cx, cy, r, n, colors, seed, size) {
    const rand = rng(seed); let out = '';
    for (let i = 0; i < n; i++) {
      const a = rand() * Math.PI * 2, d = Math.sqrt(rand()) * r, s = size * (0.6 + rand() * 0.8);
      out += `<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" r="${s.toFixed(1)}" fill="${colors[i % colors.length]}"/>`;
    }
    return out;
  }
  // A brass katori (small bowl) seen from above, filled with `fill`.
  function katori(id, cx, cy, r, fill, inner) {
    return `<g>
      <circle cx="${cx + r * .06}" cy="${cy + r * .1}" r="${r * 1.04}" fill="rgba(0,0,0,.28)"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#brass-${id})"/>
      <circle cx="${cx}" cy="${cy}" r="${r * .84}" fill="#8a6418"/>
      <circle cx="${cx}" cy="${cy}" r="${r * .8}" fill="${fill}"/>
      ${inner || ''}
      <path d="M${cx - r * .62} ${cy - r * .5} A${r * .8} ${r * .8} 0 0 1 ${cx + r * .2} ${cy - r * .78}" stroke="rgba(255,255,255,.35)" stroke-width="${r * .06}" fill="none" stroke-linecap="round"/>
    </g>`;
  }
  const brassDef = id => `<radialGradient id="brass-${id}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#f6dc8c"/><stop offset=".45" stop-color="#d7a53c"/><stop offset="1" stop-color="#8f6416"/></radialGradient>`;
  const leafG = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
  function curryLeaf(x, y, rot, s) {
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 C6 -9 18 -9 26 0 C18 9 6 9 0 0Z" fill="#2f6b2a"/><path d="M1 0 H24" stroke="#5c9a45" stroke-width="1.1"/></g>`;
  }
  function greenChilli(x, y, rot, s) {
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 C14 -6 40 -4 58 6 C40 2 16 4 2 6Z" fill="#3f8f2f"/><path d="M4 2 C18 -2 36 -1 50 4" stroke="#7cc35a" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M0 0 C-5 -3 -8 -8 -7 -13" stroke="#2e6a22" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
  }
  function redChilli(x, y, rot, s) {
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 C12 -5 34 -4 50 5 C34 2 14 4 2 6Z" fill="#a8231a"/><path d="M5 1.5 C18 -1.5 32 -1 44 3" stroke="#d9574a" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M0 1 C-4 -2 -6 -6 -5 -10" stroke="#5b6b2a" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`;
  }
  function roti(cx, cy, r, seed) {
    const rand = rng(seed); let spots = '';
    for (let i = 0; i < 14; i++) {
      const a = rand() * 6.283, d = Math.sqrt(rand()) * r * .8, s = r * (.05 + rand() * .09);
      spots += `<ellipse cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" rx="${s.toFixed(1)}" ry="${(s * .7).toFixed(1)}" fill="#9b6a32" opacity="${(.35 + rand() * .45).toFixed(2)}"/>`;
    }
    return `<circle cx="${cx + r * .05}" cy="${cy + r * .08}" r="${r}" fill="rgba(0,0,0,.25)"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#e9cf9b"/><circle cx="${cx}" cy="${cy}" r="${r * .92}" fill="#efd8a8"/>${spots}`;
  }
  function riceMound(cx, cy, r, base, seed, grainColor) {
    const rand = rng(seed); let g = '';
    for (let i = 0; i < 70; i++) {
      const a = rand() * 6.283, d = Math.sqrt(rand()) * r * .9, rot = rand() * 180;
      g += `<ellipse cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" rx="${(r * .07).toFixed(1)}" ry="${(r * .026).toFixed(1)}" fill="${grainColor}" transform="rotate(${rot.toFixed(0)} ${(cx + Math.cos(a) * d).toFixed(1)} ${(cy + Math.sin(a) * d).toFixed(1)})"/>`;
    }
    return `<circle cx="${cx + r * .06}" cy="${cy + r * .1}" r="${r}" fill="rgba(0,0,0,.22)"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${base}"/>${g}`;
  }
  function cashew(x, y, rot, s) {
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 C-2 -8 6 -14 12 -10 C8 -8 6 -4 8 0 C5 3 1 3 0 0Z" fill="#f1d7a2" stroke="#c9a463" stroke-width=".6"/></g>`;
  }

  const ART = {};

  // Home: a full meal laid out on the leaf.
  ART.meal = () => `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A meal on a banana leaf">
    <defs>${brassDef('m')}<radialGradient id="ghee" cx="40%" cy="35%"><stop offset="0" stop-color="#fff6c8"/><stop offset="1" stop-color="#f3c64a" stop-opacity="0"/></radialGradient></defs>
    ${riceMound(198, 214, 78, '#fbf7ec', 11, '#ffffff')}
    <circle cx="218" cy="196" r="16" fill="url(#ghee)"/>
    ${katori('m', 92, 120, 46, '#d2691e', specks(92, 120, 30, 26, ['#a84a12', '#f2a33a', '#3f7d3a'], 3, 2.2))}
    ${katori('m', 300, 112, 42, '#7aa83a', specks(300, 112, 28, 30, ['#4f7f22', '#c7e08a', '#2e2e1e'], 7, 1.7))}
    ${katori('m', 318, 270, 40, '#b4311f', specks(318, 270, 26, 24, ['#7d1c12', '#e2683a', '#f4c76a'], 9, 1.8))}
    ${katori('m', 86, 290, 42, '#e8b230', `${specks(86, 290, 28, 18, ['#3f7d3a', '#fff1c4'], 5, 3.2)}<rect x="74" y="280" width="11" height="11" rx="2" fill="#fff6e0"/><rect x="92" y="294" width="10" height="10" rx="2" fill="#fff6e0"/><rect x="80" y="300" width="9" height="9" rx="2" fill="#fff6e0"/>`)}
    ${roti(200, 352, 40, 4)}
    ${curryLeaf(150, 70, -30, 1.2)}${curryLeaf(164, 60, 10, 1)}
    ${greenChilli(232, 60, 18, 1)}
    ${redChilli(36, 196, 70, .9)}
    ${specks(360, 190, 8, 9, ['#2b2b2b'], 21, 1.5)}
  </svg>`;

  // Category tiles.
  ART.podulu = () => `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${brassDef('p')}</defs>
    ${katori('p', 70, 74, 44, '#b8321f', specks(70, 74, 30, 60, ['#8b1f14', '#d4573a', '#e57a4d'], 2, 1.4))}
    ${katori('p', 140, 118, 40, '#e8a51e', specks(140, 118, 28, 50, ['#c47f0c', '#f4c552', '#a86a08'], 5, 1.3))}
    ${katori('p', 66, 158, 36, '#8a5a2b', specks(66, 158, 24, 50, ['#6a4120', '#b07a43', '#3d2612'], 8, 1.3))}
    ${redChilli(130, 36, 30, .8)}${curryLeaf(150, 170, -20, 1)}</svg>`;

  ART.pachallu = () => `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${brassDef('c')}
    <radialGradient id="oil" cx="35%" cy="30%"><stop offset="0" stop-color="#ffb27a" stop-opacity=".75"/><stop offset="1" stop-color="#ffb27a" stop-opacity="0"/></radialGradient></defs>
    ${katori('c', 96, 100, 66, '#a92a1a', `${specks(96, 100, 48, 40, ['#7a1a10', '#d0603d'], 4, 2)}${specks(96, 100, 40, 22, ['#1f1a14'], 6, 1.6)}<circle cx="80" cy="84" r="22" fill="url(#oil)"/>`)}
    ${greenChilli(118, 168, -14, 1)}${curryLeaf(30, 168, -40, 1.1)}
    <g transform="translate(160 40)"><ellipse cx="0" cy="0" rx="12" ry="15" fill="#f6efe0"/><path d="M0 -15 V15 M-7 -12 C-10 0 -9 8 -5 13 M7 -12 C10 0 9 8 5 13" stroke="#d9cfb6" stroke-width="1.2" fill="none"/></g></svg>`;

  ART.kooralu = () => `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><radialGradient id="kd" cx="40%" cy="35%"><stop offset="0" stop-color="#4a4a48"/><stop offset="1" stop-color="#1b1b1a"/></radialGradient></defs>
    <path d="M18 100 C4 92 4 108 18 100Z M182 100 C196 92 196 108 182 100Z" fill="#1b1b1a"/>
    <rect x="2" y="92" width="26" height="16" rx="8" fill="#2a2a28"/><rect x="172" y="92" width="26" height="16" rx="8" fill="#2a2a28"/>
    <circle cx="104" cy="106" r="80" fill="rgba(0,0,0,.25)"/>
    <circle cx="100" cy="100" r="80" fill="url(#kd)"/>
    <circle cx="100" cy="100" r="68" fill="#c9502a"/>
    ${specks(100, 100, 56, 30, ['#e0763a', '#a83a1c'], 3, 3)}
    <rect x="70" y="72" width="20" height="20" rx="3" fill="#fbf2dd" transform="rotate(12 80 82)"/><rect x="104" y="92" width="20" height="20" rx="3" fill="#fbf2dd" transform="rotate(-8 114 102)"/>
    <rect x="76" y="114" width="19" height="19" rx="3" fill="#f6ead0" transform="rotate(20 85 123)"/><rect x="118" y="60" width="18" height="18" rx="3" fill="#fbf2dd" transform="rotate(4 127 69)"/>
    <path d="M128 120 C138 112 150 118 146 130" stroke="#4f9a32" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M60 96 C56 84 66 76 74 80" stroke="#4f9a32" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M100 140 C108 134 118 138 116 146" stroke="#3d8226" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${specks(100, 100, 50, 14, ['#2f6b2a', '#7cc35a'], 9, 2.2)}
    <path d="M60 64 A60 60 0 0 1 120 44" stroke="rgba(255,255,255,.18)" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;

  ART.annalu = () => `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="104" cy="106" r="84" fill="rgba(0,0,0,.25)"/>
    <circle cx="100" cy="100" r="84" fill="#d9dcd9"/><circle cx="100" cy="100" r="74" fill="#eef0ee"/>
    ${riceMound(100, 100, 62, '#e0782e', 17, '#f7a05a')}
    ${specks(100, 100, 50, 20, ['#b8461a', '#ffd38a'], 4, 2.6)}
    ${cashew(80, 84, 20, 1.3)}${cashew(118, 110, -40, 1.3)}${cashew(96, 126, 70, 1.2)}
    ${curryLeaf(108, 70, 30, .8)}${specks(100, 100, 46, 16, ['#3c8a2c'], 12, 2.4)}</svg>`;

  ART.rottelu = () => `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${brassDef('r')}</defs>
    ${roti(110, 114, 70, 3)}${roti(96, 100, 68, 8)}${roti(84, 88, 66, 13)}
    ${katori('r', 160, 46, 30, '#c2552c', specks(160, 46, 20, 24, ['#f2e5c8', '#8a2a14'], 5, 1.8))}</svg>`;

  // Logo: a brass bowl with the first letter of రుచులు.
  ART.logo = () => `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${brassDef('l')}</defs>
    <circle cx="60" cy="60" r="56" fill="url(#brass-l)"/><circle cx="60" cy="60" r="46" fill="#0d3524"/>
    <path d="M24 46 A40 40 0 0 1 70 18" stroke="rgba(255,255,255,.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <text x="60" y="78" text-anchor="middle" font-family="Gurajada" font-size="58" fill="#f3c04a">రు</text></svg>`;

  window.RUCHULU_ART = ART;
})();
