const SITE_URL = "https://globalrh360.fr";
const SITE_NAME = "GLOBAL RH";
const PHONE_PLACEHOLDER = "[Téléphone à compléter avec Céline]";
const EMAIL = "cr.globalrh@gmail.com";
const RDV_HREF = "/contact/"; // en attente d'un outil de prise de RDV réel (Calendly ou équivalent) à définir avec Céline

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/particuliers/", label: "Particuliers" },
  { href: "/osmose/", label: "OSM'OSE" },
  { href: "/kit-starter/", label: "Kit Starter" },
  { href: "/entreprises/", label: "Entreprises" },
  { href: "/entreprises/formation/", label: "Formations" },
  { href: "/contact/", label: "Contact" },
];

function escAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}

function nav(currentPath) {
  return NAV.map((item) => {
    const current = item.href === currentPath ? ' aria-current="page"' : "";
    return `<a href="${item.href}"${current}>${item.label}</a>`;
  }).join("\n        ");
}

function breadcrumbs(items) {
  // items: [{name, url}], url relative, first is always Accueil
  if (!items || items.length < 2) return "";
  const links = items
    .map((it, i) => {
      if (i === items.length - 1) {
        return `<span aria-current="page">${it.name}</span>`;
      }
      return `<a href="${it.url}">${it.name}</a>`;
    })
    .join('<span class="sep">/</span>');
  return `<nav class="breadcrumbs container" aria-label="Fil d'Ariane">${links}</nav>`;
}

function breadcrumbSchema(items) {
  if (!items || items.length < 2) return "";
  const list = items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: SITE_URL + it.url,
  }));
  return jsonLd({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: list });
}

function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function header(currentPath) {
  return `<header class="site-header">
    <div class="header-inner">
      <a class="brand" href="/" aria-label="GLOBAL RH, accueil">
        <img src="/assets/img/logo-global-rh.png" alt="GLOBAL RH, accueil" width="105" height="38" />
      </a>
      <nav class="main-nav" aria-label="Navigation principale">
        ${nav(currentPath)}
      </nav>
      <div class="header-actions">
        <span class="header-phone">${PHONE_PLACEHOLDER}</span>
        <a class="btn btn-primary btn-sm" href="${RDV_HREF}">Prendre rendez-vous</a>
        <button class="nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h4>GLOBAL RH</h4>
          <p style="font-size:0.92rem; max-width:280px;">Conseil, accompagnement et formation RH pour les particuliers, les entrepreneurs et les PME du Var et de PACA.</p>
        </div>
        <div>
          <h4>Offres</h4>
          <ul>
            <li><a href="/particuliers/">Particuliers</a></li>
            <li><a href="/osmose/">OSM'OSE</a></li>
            <li><a href="/kit-starter/">Kit Starter</a></li>
            <li><a href="/entreprises/">Entreprises</a></li>
            <li><a href="/entreprises/formation/">Catalogue de formation</a></li>
          </ul>
        </div>
        <div>
          <h4>À propos</h4>
          <ul>
            <li><a href="/a-propos/">Qui suis-je</a></li>
            <li><a href="/zone-intervention/">Zone d'intervention</a></li>
            <li><a href="/contact/">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
            <li>${PHONE_PLACEHOLDER}</li>
            <li>Le Val (83), Var</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} GLOBAL RH, Céline Rinaudo. Tous droits réservés.</span>
        <a href="/mentions-legales/">Mentions légales</a>
      </div>
    </div>
  </footer>`;
}

function layout({ title, description, path, bodyHtml, breadcrumbItems, extraSchema = [] }) {
  const canonical = SITE_URL + path;
  const crumbs = breadcrumbItems ? breadcrumbs(breadcrumbItems) : "";
  const schemas = [];
  if (breadcrumbItems) schemas.push(breadcrumbSchema(breadcrumbItems));
  schemas.push(...extraSchema);

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${escAttr(description)}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${escAttr(title)}" />
<meta property="og:description" content="${escAttr(description)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:site_name" content="${SITE_NAME}" />
<meta property="og:image" content="${SITE_URL}/assets/img/logo-global-rh.png" />
<meta name="twitter:card" content="summary" />
<link rel="icon" href="/assets/img/favicon.png" type="image/png" />
<link rel="apple-touch-icon" href="/assets/img/favicon.png" />
<link rel="stylesheet" href="/assets/css/style.css" />
${schemas.join("\n")}
</head>
<body>
<a class="skip-link" href="#main">Aller au contenu</a>
${header(path)}
${crumbs}
<main id="main">
${bodyHtml}
</main>
${footer()}
<script src="/assets/js/main.js"></script>
</body>
</html>
`;
}

module.exports = {
  SITE_URL,
  SITE_NAME,
  PHONE_PLACEHOLDER,
  EMAIL,
  RDV_HREF,
  layout,
  jsonLd,
};
