// Illustrations décoratives, dessinées à la main en SVG inline (pas de photos,
// pas de banque d'images) : évite de fabriquer de fausses photos de Céline,
// de clients ou de membres du collectif OSM'OSE.

function heroHome() {
  return `<svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
    <circle cx="210" cy="190" r="170" fill="#eaf6e1"/>
    <path d="M60 260C110 200 150 320 210 250S330 140 370 190" stroke="#9fb8d6" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>
    <g>
      <circle cx="70" cy="255" r="30" fill="#001880"/>
      <circle cx="70" cy="255" r="10.5" fill="none" stroke="#fff" stroke-width="2"/>
      <path d="M58 268c2.5-6.5 6.5-9.2 12-9.2s9.5 2.7 12 9.2" stroke="#fff" stroke-width="2" fill="none"/>
    </g>
    <g>
      <circle cx="185" cy="140" r="34" fill="#046bd2"/>
      <circle cx="175" cy="134" r="7" fill="none" stroke="#fff" stroke-width="2"/>
      <circle cx="198" cy="140" r="5.5" fill="none" stroke="#fff" stroke-width="2"/>
      <path d="M167 152c1.6-5.6 5-7.8 8.6-7.8s6.6 2 8.2 6.4M191 152c1.3-4.4 3.9-6.2 7-6.2" stroke="#fff" stroke-width="2" fill="none"/>
    </g>
    <g>
      <circle cx="300" cy="120" r="28" fill="#6fae3f"/>
      <rect x="290" y="110" width="20" height="16" rx="2.5" fill="none" stroke="#fff" stroke-width="2"/>
      <path d="M296 110v-3.5c0-1.5 1.3-2.7 3-2.7h2c1.7 0 3 1.2 3 2.7v3.5" stroke="#fff" stroke-width="2" fill="none"/>
    </g>
    <g>
      <circle cx="355" cy="225" r="32" fill="#001880"/>
      <rect x="341" y="213" width="16" height="24" rx="1.5" fill="none" stroke="#fff" stroke-width="2"/>
      <path d="M357 220h8v18h-8" fill="none" stroke="#fff" stroke-width="2"/>
    </g>
    <circle cx="235" cy="300" r="3" fill="#6fae3f"/>
    <circle cx="120" cy="90" r="3" fill="#046bd2"/>
    <circle cx="380" cy="300" r="3" fill="#001880"/>
  </svg>`;
}

function heroOsmose() {
  const satellites = [
    { angle: -90, color: "#001880" },
    { angle: -18, color: "#046bd2" },
    { angle: 54, color: "#6fae3f" },
    { angle: 126, color: "#046bd2" },
    { angle: 198, color: "#001880" },
    { angle: 270 - 360, color: "#6fae3f" },
  ];
  const cx = 210,
    cy = 190,
    r = 118;
  const nodes = satellites
    .map((s) => {
      const rad = (s.angle * Math.PI) / 180;
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      return { x, y, color: s.color };
    })
    .map(
      (n) =>
        `<line x1="${cx}" y1="${cy}" x2="${n.x.toFixed(1)}" y2="${n.y.toFixed(1)}" stroke="#c7d6ea" stroke-width="2"/>
         <circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="20" fill="${n.color}"/>`
    )
    .join("\n    ");
  return `<svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
    <circle cx="210" cy="190" r="170" fill="#eaf6e1"/>
    ${nodes}
    <circle cx="${cx}" cy="${cy}" r="44" fill="#fff" stroke="#001880" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="34" fill="#001880"/>
    <circle cx="${cx - 8}" cy="${cy - 6}" r="9" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M${cx - 22} ${cy + 16}c3-7 8-10 14-10s11 3 14 10" stroke="#fff" stroke-width="2" fill="none"/>
  </svg>`;
}

function heroEntreprises() {
  return `<svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
    <circle cx="210" cy="190" r="170" fill="#eaf6e1"/>
    <rect x="70" y="150" width="220" height="150" rx="4" fill="#fff" stroke="#c7d6ea" stroke-width="2"/>
    <rect x="90" y="230" width="26" height="55" fill="#c7e5b8"/>
    <rect x="130" y="205" width="26" height="80" fill="#046bd2"/>
    <rect x="170" y="180" width="26" height="105" fill="#001880"/>
    <rect x="210" y="160" width="26" height="125" fill="#6fae3f"/>
    <path d="M90 220l40-25 40 12 45-45" stroke="#001880" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M175 155h20v20" stroke="#001880" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="330" cy="110" r="26" fill="#046bd2"/>
    <path d="M320 110l7 7 13-14" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function decorBlob(color = "#eaf6e1") {
  return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation" class="hero-deco-svg">
    <path d="M45 25C75 5 140 10 165 45C190 80 180 140 145 165C110 190 55 185 30 150C5 115 15 45 45 25Z" fill="${color}"/>
  </svg>`;
}

function pins() {
  return `<svg viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
    <ellipse cx="150" cy="190" rx="120" ry="16" fill="#eaf6e1"/>
    <g fill="#001880"><path d="M90 60c0-16 13-29 29-29s29 13 29 29c0 22-29 55-29 55s-29-33-29-55z"/><circle cx="119" cy="58" r="10" fill="#fff"/></g>
    <g fill="#046bd2"><path d="M175 95c0-13 10.5-23.5 23.5-23.5S222 82 222 95c0 17.5-23.5 44-23.5 44S175 112.5 175 95z"/><circle cx="198.5" cy="93" r="8" fill="#fff"/></g>
    <g fill="#6fae3f"><path d="M40 110c0-11.5 9.5-21 21-21s21 9.5 21 21c0 15.5-21 39-21 39s-21-23.5-21-39z"/><circle cx="61" cy="108" r="7" fill="#fff"/></g>
  </svg>`;
}

function envelope() {
  return `<svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
    <circle cx="130" cy="100" r="95" fill="#eaf6e1"/>
    <rect x="55" y="65" width="150" height="105" rx="8" fill="#fff" stroke="#001880" stroke-width="3"/>
    <path d="M55 72l75 58 75-58" stroke="#001880" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="195" cy="55" r="22" fill="#046bd2"/>
    <path d="M186 55h18M195 46v18" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;
}

function pathConverge() {
  return `<svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
    <circle cx="130" cy="100" r="95" fill="#eaf6e1"/>
    <path d="M40 150C80 120 90 90 130 90" stroke="#046bd2" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M220 150C180 120 170 90 130 90" stroke="#6fae3f" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="150" r="12" fill="#046bd2"/>
    <circle cx="220" cy="150" r="12" fill="#6fae3f"/>
    <circle cx="130" cy="90" r="18" fill="#001880"/>
    <path d="M130 55v20M117 65l13-10 13 10" stroke="#001880" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function stack() {
  return `<svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
    <circle cx="130" cy="100" r="95" fill="#eaf6e1"/>
    <rect x="65" y="120" width="130" height="20" rx="3" fill="#001880"/>
    <rect x="80" y="95" width="100" height="20" rx="3" fill="#046bd2"/>
    <rect x="95" y="70" width="70" height="20" rx="3" fill="#6fae3f"/>
    <path d="M130 55l8 12h-16z" fill="#001880"/>
  </svg>`;
}

function checklist() {
  return `<svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
    <circle cx="130" cy="100" r="95" fill="#eaf6e1"/>
    <rect x="70" y="45" width="120" height="130" rx="8" fill="#fff" stroke="#001880" stroke-width="3"/>
    <path d="M100 40h60v14h-60z" fill="#001880"/>
    <g stroke="#046bd2" stroke-width="3" stroke-linecap="round">
      <path d="M88 90l8 8 14-16"/>
      <path d="M88 122l8 8 14-16"/>
      <path d="M88 154l8 8 14-16"/>
    </g>
    <g stroke="#c7d6ea" stroke-width="4" stroke-linecap="round">
      <path d="M120 94h50"/>
      <path d="M120 126h50"/>
      <path d="M120 158h35"/>
    </g>
  </svg>`;
}

function compassIllustration() {
  return `<svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
    <circle cx="130" cy="100" r="95" fill="#eaf6e1"/>
    <circle cx="130" cy="100" r="55" fill="#fff" stroke="#001880" stroke-width="3"/>
    <circle cx="130" cy="100" r="4" fill="#001880"/>
    <path d="M130 100l18-32 -8 28z" fill="#046bd2"/>
    <path d="M130 100l-18 32 8-28z" fill="#6fae3f"/>
    <circle cx="130" cy="52" r="3" fill="#001880"/>
    <circle cx="130" cy="148" r="3" fill="#001880"/>
    <circle cx="82" cy="100" r="3" fill="#001880"/>
    <circle cx="178" cy="100" r="3" fill="#001880"/>
  </svg>`;
}

module.exports = {
  heroHome,
  heroOsmose,
  heroEntreprises,
  decorBlob,
  pins,
  envelope,
  pathConverge,
  stack,
  checklist,
  compassIllustration,
};
