// Petites icônes ligne, dessinées à la main (SVG inline), pas de librairie externe.
// viewBox 24x24, stroke=currentColor : la couleur se pilote en CSS via `color`.

const PATHS = {
  user: '<circle cx="12" cy="8" r="3.4"/><path d="M5 20c1.2-4 4-5.6 7-5.6s5.8 1.6 7 5.6"/>',
  users: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9.5" r="2.4"/><path d="M3.5 20c1-3.6 3.4-5 5.5-5s4.5 1.4 5.5 5"/><path d="M15 15.3c2 .2 3.6 1.6 4.5 4.7"/>',
  "clipboard-check": '<rect x="6" y="4.5" width="12" height="16" rx="1.6"/><path d="M9 4.5V3.6c0-.6.5-1.1 1.1-1.1h3.8c.6 0 1.1.5 1.1 1.1v.9"/><path d="M9 12.5l2 2 4-4.4"/>',
  building: '<rect x="5" y="3.5" width="9" height="17" rx="0.8"/><path d="M14 9.5h5v11h-5"/><path d="M8 7.5h1M11 7.5h1M8 11h1M11 11h1M8 14.5h1M11 14.5h1M16.5 12.5h1M16.5 15.5h1"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1"/>',
  leaf: '<path d="M6 18c-1.5-5.5 1-11 10.5-12.5C18 14.5 13 18.5 6 18z"/><path d="M6 18c2-3 4.5-5.5 9-9"/>',
  "user-plus": '<circle cx="9.5" cy="8" r="3.2"/><path d="M3.5 20c1-3.8 3.4-5.4 6-5.4s5 1.6 6 5.4"/><path d="M18 5.5v5M15.5 8h5"/>',
  folder: '<path d="M3.5 6.5c0-.7.6-1.3 1.3-1.3h4.4l1.6 2h8.4c.7 0 1.3.6 1.3 1.3v9.5c0 .7-.6 1.3-1.3 1.3H4.8c-.7 0-1.3-.6-1.3-1.3z"/>',
  "heart-pulse": '<path d="M12 19.5S3.8 14.7 3.8 8.9C3.8 6 6 4 8.6 4c1.5 0 2.8.7 3.4 1.8C12.6 4.7 13.9 4 15.4 4 18 4 20.2 6 20.2 8.9c0 5.8-8.2 10.6-8.2 10.6z"/><path d="M6.5 10.5h2.3l1.2-2.3 2 4.6 1.1-2.3h4.4"/>',
  "graduation-cap": '<path d="M12 5l9 4-9 4-9-4z"/><path d="M6.5 11v4.3c0 1 2.5 2.2 5.5 2.2s5.5-1.2 5.5-2.2V11"/><path d="M21 9v5.5"/>',
  timeline: '<path d="M4 12h16"/><circle cx="7" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="17" cy="12" r="1.6"/><path d="M7 12V6.5M17 12v5.5"/>',
  scale: '<path d="M12 3.5v17M7 20.5h10"/><path d="M12 6l-5 .4L4.5 11a2.5 2.5 0 0 0 5 0z"/><path d="M12 6l5 .4L19.5 11a2.5 2.5 0 0 1-5 0z"/>',
  "chat-bubbles": '<path d="M4 6.8c0-.9.7-1.6 1.6-1.6h9.8c.9 0 1.6.7 1.6 1.6v5.4c0 .9-.7 1.6-1.6 1.6H9.5L6 16.5v-2.7H5.6A1.6 1.6 0 0 1 4 12.2z"/><path d="M18 9.5h.8c.9 0 1.6.7 1.6 1.6v4.6c0 .9-.7 1.6-1.6 1.6H19v2l-2.7-2h-4a1.6 1.6 0 0 1-1.6-1.6"/>',
  "users-team": '<circle cx="8" cy="7.5" r="2.6"/><circle cx="16" cy="7.5" r="2.6"/><path d="M3.2 19c.8-3.4 2.6-4.8 4.8-4.8s4 1.4 4.8 4.8"/><path d="M11.2 19c.8-3.4 2.6-4.8 4.8-4.8s4 1.4 4.8 4.8"/>',
  puzzle: '<path d="M9 4.5h4v2.2a1.6 1.6 0 0 0 3.1.5V4.5h2.4c.7 0 1.3.6 1.3 1.3v2.4a1.6 1.6 0 1 1 0 3.1v2.5c0 .7-.6 1.3-1.3 1.3h-2.4v-2a1.6 1.6 0 1 0-3.2 0v2H9v-2.4a1.6 1.6 0 1 0 0-3.2z"/>',
  smile: '<circle cx="12" cy="12" r="8.5"/><circle cx="9" cy="10.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="15" cy="10.5" r="0.9" fill="currentColor" stroke="none"/><path d="M8.2 14.5c1 1.4 2.3 2.1 3.8 2.1s2.8-.7 3.8-2.1"/>',
  sparkle: '<path d="M12 3.5l1.6 4.9 4.9 1.6-4.9 1.6-1.6 4.9-1.6-4.9-4.9-1.6 4.9-1.6z"/><path d="M19 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  package: '<path d="M12 3.5l8 4.2v8.6l-8 4.2-8-4.2V7.7z"/><path d="M4 7.7l8 4.1 8-4.1M12 11.8v8.7"/>',
  baby: '<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20c1-4.6 4-6.7 7.5-6.7s6.5 2.1 7.5 6.7"/><path d="M9.6 8.2c.5.6 1.2.9 2.4.9s1.9-.3 2.4-.9"/>',
  cpu: '<rect x="7" y="7" width="10" height="10" rx="1.2"/><rect x="10" y="10" width="4" height="4"/><path d="M12 3.5V7M12 17v3.5M3.5 12H7M17 12h3.5M7 7l-1.8-1.8M17 7l1.8-1.8M7 17l-1.8 1.8M17 17l1.8 1.8"/>',
  share: '<circle cx="6" cy="12" r="2.4"/><circle cx="17.5" cy="6" r="2.4"/><circle cx="17.5" cy="18" r="2.4"/><path d="M8.1 10.8l7.4-3.6M8.1 13.2l7.4 3.6"/>',
  "trending-up": '<path d="M4 16l5.5-6 3.5 3 6.5-7.5"/><path d="M15.5 5h4v4"/>',
  shield: '<path d="M12 3.7l7 2.6v5.4c0 4.6-2.9 7.8-7 8.9-4.1-1.1-7-4.3-7-8.9V6.3z"/><path d="M9 12l2 2 4-4.4"/>',
  heart: '<path d="M12 19S4.5 14.5 4.5 9.2C4.5 6.3 6.7 4 9.4 4c1.4 0 2.7.7 2.6 2 -0.1-1.3 1.2-2 2.6-2 2.7 0 4.9 2.3 4.9 5.2C19.5 14.5 12 19 12 19z"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1.4"/><path d="M4 6.5l8 6.5 8-6.5"/>',
  pin: '<path d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="M15 9l-2 5-5 2 2-5z"/>',
};

function icon(name, size = 28) {
  const p = PATHS[name];
  if (!p) throw new Error(`Icône inconnue: ${name}`);
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

module.exports = { icon, PATHS };
