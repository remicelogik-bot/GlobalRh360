const fs = require("fs");
const path = require("path");
const { layout, jsonLd, SITE_URL, EMAIL, RDV_HREF } = require("./templates");
const CATALOG = require("./catalog-data");

const ROOT = path.join(__dirname, "..");

const generatedPaths = [];

function write(outPath, html) {
  const full = path.join(ROOT, outPath, "index.html");
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, "utf8");
  const urlPath = outPath === "/" ? "/" : outPath.replace(/\/?$/, "/");
  generatedPaths.push(urlPath);
}

// ---------- réusable content helpers ----------

function faqBlock(items) {
  return `<div class="faq">
    ${items
      .map(
        (it) => `<details class="faq-item">
      <summary>${it.q}</summary>
      <p>${it.a}</p>
    </details>`
      )
      .join("\n    ")}
  </div>`;
}

function placeholder(label, text) {
  return `<div class="placeholder-block">
    <strong>${label}</strong>
    ${text}
  </div>`;
}

function priceRangePlaceholder() {
  return placeholder(
    "Fourchette de tarif, à compléter avec Céline",
    "[À COMPLÉTER AVEC CÉLINE, ex. « à partir de … € », pour afficher une fourchette de prix comme sur le Kit Starter]"
  );
}

function statsPlaceholders() {
  return `<div class="stats-grid">
    ${placeholder("Chiffre clé à compléter", "[ex. nombre de bilans de compétences réalisés]")}
    ${placeholder("Chiffre clé à compléter", "[ex. nombre de recrutements menés]")}
    ${placeholder("Chiffre clé à compléter", "[ex. nombre de PME accompagnées]")}
  </div>`;
}

function testimonialPlaceholder() {
  return placeholder(
    "Témoignage à ajouter",
    "[À COMPLÉTER AVEC CÉLINE, témoignage réel d'un client ou d'une entreprise accompagnée]"
  );
}

function initials(name) {
  return name
    .split(" ")
    .filter((w) => w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

// ---------- pages ----------

function buildHome() {
  const entries = [
    {
      tag: "Particuliers",
      title: "Particuliers",
      desc: "Vous cherchez à y voir clair sur votre avenir professionnel. Bilan de compétences, orientation des jeunes, recherche d'emploi.",
      href: "/particuliers/",
    },
    {
      tag: "OSM'OSE",
      title: "OSM'OSE",
      desc: "Vous entreprenez, seul mais pas isolé. Un collectif de 10 experts, 14 thématiques pour sécuriser votre activité.",
      href: "/osmose/",
    },
    {
      tag: "Kit Starter",
      title: "Kit Starter",
      desc: "Vous vous apprêtez à embaucher votre premier salarié. Contrat, déclarations, obligations : clé en main.",
      href: "/kit-starter/",
    },
    {
      tag: "Entreprises",
      title: "Entreprises (PME)",
      desc: "Vous dirigez une PME. Recrutement, prestation RH ponctuelle, formation, ou DRH externalisée à la carte.",
      href: "/entreprises/",
    },
  ];

  const body = `
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Conseil · Accompagnement · Formation RH</p>
      <h1>La RH, sous toutes ses formes, la vôtre.</h1>
      <p class="lead">Que vous soyez en recherche d'orientation, à la tête d'une PME dans le Var ou en train de lancer votre activité, je vous accompagne avec l'expertise qu'il faut, au moment où il le faut.</p>
      <blockquote class="pull-quote">Et pour les PME : « La DRH que les PME n'ont pas en interne. »</blockquote>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#par-ou-commencer">Trouver mon accompagnement</a>
        <a class="btn btn-secondary" href="${RDV_HREF}">Réserver 20 minutes</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <blockquote class="pull-quote">Une bonne décision RH change une trajectoire, alors décidez juste sans décider seul.</blockquote>
      <p style="max-width:720px;">Depuis 25 ans, j'accompagne des parcours professionnels, qu'ils appartiennent à une personne, une équipe ou une entreprise. Bilan de compétences, recrutement, formation, direction RH externalisée : ce ne sont pas des métiers différents, c'est la même conviction déclinée à chaque étape. Je la porte seule pour les particuliers et les PME, et collectivement avec OSM'OSE pour les entrepreneurs.</p>
    </div>
  </section>

  <section class="section section-alt" id="par-ou-commencer">
    <div class="container">
      <div class="section-header">
        <h2>Par où commencer ?</h2>
        <p>Quatre situations, quatre accompagnements. Choisissez celle qui ressemble le plus à la vôtre aujourd'hui.</p>
      </div>
      <div class="entry-grid">
        ${entries
          .map(
            (e) => `<div class="entry-card">
          <span class="tag">${e.tag}</span>
          <h3>${e.title}</h3>
          <p>${e.desc}</p>
          <a class="card-link" href="${e.href}">Découvrir →</a>
        </div>`
          )
          .join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2>Pourquoi Céline</h2>
        <p>Une lecture de la RH par les deux bouts.</p>
      </div>
      <div class="cards-grid">
        <div class="card">
          <h3>Une expertise transversale</h3>
          <p>Pas une spécialisation étroite : je comprends la RH du point de vue du candidat comme de celui du dirigeant.</p>
        </div>
        <div class="card">
          <h3>25 ans en direction des ressources humaines</h3>
          <p>DESS Gestion des RH et relations sociales, option psychologie appliquée à la RH.</p>
        </div>
        <div class="card">
          <h3>Un réseau activable, via OSM'OSE</h3>
          <p>Quand vos besoins dépassent la RH, dix experts sont déjà autour de la table.</p>
        </div>
      </div>
      <p style="margin-top:2em; font-size:0.92rem; color:#64748b;">Certaines prestations, dont le bilan de compétences, sont éligibles à un financement CPF ou via votre OPCO, dans le cadre de FORM RH, organisme de formation certifié Qualiopi.</p>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-header">
        <h2>Quelques repères</h2>
        <p>Ces chiffres seront complétés avec Céline avant la mise en ligne définitive, pas question d'en inventer.</p>
      </div>
      ${statsPlaceholders()}
    </div>
  </section>

  <section class="section">
    <div class="container" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1em;">
      <div>
        <h2 style="margin-bottom:0.3em;">Une intervention près de chez vous</h2>
        <p style="margin:0;">Présentiel dans le Var et en PACA, ou visio partout en France.</p>
      </div>
      <a class="btn btn-secondary" href="/zone-intervention/">Voir la zone d'intervention →</a>
    </div>
  </section>

  <section class="cta-band section-navy">
    <div class="container">
      <h2>Une question, un besoin, une envie d'échanger ?</h2>
      <p>Chaque parcours est différent. Le plus simple est d'en parler directement.</p>
      <div class="hero-actions">
        <a class="btn btn-outline-light" href="/contact/">Me contacter</a>
        <a class="btn btn-outline-light" href="${RDV_HREF}">Réserver 20 minutes</a>
      </div>
    </div>
  </section>
  `;

  write(
    "/",
    layout({
      title: "GLOBAL RH | Bilan de compétences, recrutement et DRH externalisée dans le Var",
      description:
        "Cabinet RH indépendant basé à Le Val (Var) : bilan de compétences, recrutement, formation RH Qualiopi et DRH externalisée pour particuliers et PME du Var et de PACA.",
      path: "/",
      bodyHtml: body,
      extraSchema: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "GLOBAL RH",
          url: SITE_URL,
          logo: SITE_URL + "/assets/img/logo-global-rh.png",
          description: "Conseil, accompagnement et formation RH pour particuliers et PME, basé dans le Var.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "3564 route de Bras",
            addressLocality: "Le Val",
            postalCode: "83143",
            addressRegion: "Var",
            addressCountry: "FR",
          },
        }),
        jsonLd({ "@context": "https://schema.org", "@type": "WebSite", name: "GLOBAL RH", url: SITE_URL }),
      ],
    })
  );
}

function buildParticuliers() {
  const body = `
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Particuliers</p>
      <h1>Vous avez besoin d'y voir clair sur votre avenir professionnel.</h1>
      <p class="lead">Que vous soyez en questionnement de carrière, en reconversion, à un tournant de vos études, ou en recherche active d'emploi, je vous accompagne avec un cadre structuré et une écoute personnalisée, dans le Var ou en visio.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Faire le point, pour choisir en connaissance de cause</h2>
      <p>Vous sentez qu'il est temps de faire une pause pour réfléchir à la suite : rester, évoluer, ou tout changer ? Le bilan de compétences vous donne un cadre structuré pour explorer vos compétences, vos motivations profondes et les pistes professionnelles réalistes qui s'offrent à vous.</p>
      <h3>Ce que vous en retirez</h3>
      <ul class="check-list">
        <li>Une meilleure connaissance de vos compétences, valeurs et moteurs professionnels</li>
        <li>Un ou plusieurs projets professionnels validés et réalistes</li>
        <li>Un plan d'action concret pour la suite</li>
      </ul>
      <h3>Le déroulé</h3>
      <div class="steps">
        <div class="step"><span class="num">1</span><h4>Phase préliminaire</h4><p>Comprendre votre demande et vos attentes.</p></div>
        <div class="step"><span class="num">2</span><h4>Phase d'investigation</h4><p>Exploration de votre parcours, tests, pistes de projet.</p></div>
        <div class="step"><span class="num">3</span><h4>Phase de conclusion</h4><p>Synthèse, plan d'action, restitution écrite.</p></div>
      </div>
      <p style="margin-top:1.5em;">Le bilan de compétences peut être financé via votre CPF (Mon Compte Formation), votre employeur, ou un OPCO. Dans ce cadre, la prestation est portée par FORM RH, organisme de formation certifié Qualiopi.</p>
      ${priceRangePlaceholder()}
      <div class="hero-actions" style="margin-top:1.5em;">
        <a class="btn btn-primary" href="/contact/">Parlons de votre projet</a>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2>Aider votre enfant à choisir une voie qui lui ressemble</h2>
      <p>Choisir une orientation, une filière, un premier métier : c'est un cap important, souvent source de stress pour le jeune comme pour les parents. Le bilan d'orientation aide votre enfant à mieux se connaître, à explorer des pistes concrètes, et à gagner en confiance dans son choix.</p>
      <h3>Ce que ça apporte</h3>
      <ul class="check-list">
        <li>Une meilleure connaissance de ses centres d'intérêt et de ses atouts</li>
        <li>Des pistes de filières ou de métiers concrètes, pas seulement théoriques</li>
        <li>Une posture plus confiante face aux choix d'orientation (Parcoursup, filières, alternance…)</li>
      </ul>
      <p><strong>Pour qui :</strong> collégiens, lycéens, étudiants en réflexion ou en réorientation.</p>
      <a class="btn btn-primary" href="/contact/">Prendre rendez-vous pour mon enfant</a>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Transformer votre recherche d'emploi en démarche efficace</h2>
      <p>Chercher un emploi, ce n'est pas seulement envoyer des candidatures : c'est savoir se présenter, cibler les bonnes opportunités, et convaincre en entretien. Je vous accompagne sur les trois piliers qui font la différence.</p>
      <div class="cards-grid">
        <div class="card"><h3>Retravailler votre CV</h3><p>Clarté, impact, adéquation avec vos cibles.</p></div>
        <div class="card"><h3>Identifier les bonnes annonces</h3><p>Au-delà des jobboards, cibler ce qui vous correspond vraiment.</p></div>
        <div class="card"><h3>Préparer vos entretiens</h3><p>Anticiper les questions, structurer votre discours, gagner en aisance.</p></div>
      </div>
      <p style="margin-top:1.5em;"><strong>Pour qui :</strong> toute personne en recherche active d'emploi, en poste ou non, quel que soit le secteur.</p>
      <a class="btn btn-primary" href="/contact/">Booster ma recherche d'emploi</a>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2>Questions fréquentes</h2>
      ${faqBlock([
        { q: "Le bilan de compétences est-il finançable ?", a: "Oui, via votre CPF (Mon Compte Formation), votre employeur ou un OPCO. La prestation est alors portée par FORM RH, organisme de formation certifié Qualiopi." },
        { q: "Combien de temps dure un bilan de compétences ?", a: "En général entre 12 et 24 heures, réparties sur plusieurs semaines, pour laisser le temps à la réflexion entre chaque phase." },
        { q: "Le bilan se fait-il en présentiel ou à distance ?", a: "Les deux sont possibles : en présentiel dans le Var, ou intégralement en visio, selon ce qui vous convient le mieux." },
        { q: "Mon employeur aura-t-il accès au contenu de mon bilan ?", a: "Non. Que le bilan soit financé par le CPF ou l'employeur, son contenu reste strictement confidentiel : seule la synthèse vous appartient et n'est transmise qu'avec votre accord." },
        { q: "À partir de quel âge le bilan d'orientation est-il adapté ?", a: "Dès le collège et jusqu'aux études supérieures, le format s'adapte à l'âge et à la maturité du jeune." },
      ])}
    </div>
  </section>

  <section class="cta-band">
    <div class="container">
      <h2>Une écoute avant tout</h2>
      <p>Chaque accompagnement démarre par un échange, sans engagement, pour comprendre votre situation et vous orienter vers la formule la plus adaptée.</p>
      <div class="hero-actions"><a class="btn btn-primary" href="/contact/">Échanger avec Céline</a></div>
    </div>
  </section>
  `;

  write(
    "/particuliers",
    layout({
      title: "Bilan de compétences Var | Orientation et recherche d'emploi, GLOBAL RH",
      description:
        "Bilan de compétences finançable CPF/OPCO, bilan d'orientation pour jeunes et accompagnement recherche d'emploi, dans le Var et en visio, avec Céline Rinaudo.",
      path: "/particuliers/",
      bodyHtml: body,
      breadcrumbItems: [
        { name: "Accueil", url: "/" },
        { name: "Particuliers", url: "/particuliers/" },
      ],
    })
  );
}

function buildOsmose() {
  const familles = [
    { name: "Développer son activité", items: ["Stratégie d'entreprise", "Savoir se vendre", "Gestion des réseaux sociaux", "RSE"] },
    { name: "Sécuriser son activité", items: ["Structure juridique et comptable", "Gestion administrative", "Prévoyance", "RC Pro", "Cybersécurité", "CGV et RGPD"] },
    { name: "Prendre soin de soi et de son image", items: ["Image de soi", "Massage et points de pression", "Santé physique et mentale", "Gestion du temps et des priorités"] },
  ];
  const team = [
    { name: "Céline RINAUDO", role: "Premier contact · stratégie · gestion du temps et des priorités · RSE · santé physique et mentale", lead: true },
    { name: "Isabelle BICHET", role: "CGV et RGPD" },
    { name: "Gaëlle GIRAUD", role: "Statuts juridiques · comptabilité" },
    { name: "Jonathan D'ALLEST", role: "Prévoyance et épargne" },
    { name: "Valérie REBAUDO", role: "Assurance · RC Pro" },
    { name: "Cyril SIMONNOT", role: "Informatique · cybersécurité" },
    { name: "Marie WATERKEYN", role: "Community management · stratégie commerciale" },
    { name: "Nathalie JAMAIN", role: "Secrétariat administratif" },
    { name: "Céline MARION", role: "Image de soi" },
    { name: "Valérie MAZELLIER", role: "Massage et points de pression" },
  ];

  const body = `
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Le collectif</p>
      <h1>Entreprendre seul, sans être seul sur tout le reste.</h1>
      <p class="lead">OSM'OSE réunit 10 experts autour des auto-entrepreneurs, pour sécuriser et structurer chaque dimension de leur activité, au-delà de leur seul métier.</p>
      <blockquote class="pull-quote">« Pour entreprendre et réussir »</blockquote>
      <div class="hero-actions"><a class="btn btn-primary" href="#thematiques">Découvrir les 14 thématiques</a></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Pourquoi OSM'OSE existe</h2>
      <p>Quand on lance son activité en solo, on devient malgré soi expert-comptable, community manager, juriste, commercial et gestionnaire du temps, souvent sans formation ni goût pour ça. OSM'OSE est né de ce constat : réunir des expertises complémentaires autour de l'auto-entrepreneur, pour qu'il puisse se concentrer sur son cœur de métier sans négliger le reste.</p>
      <h3>Ce qui nous différencie</h3>
      <ul class="check-list">
        <li>Un collectif, pas un simple annuaire de prestataires</li>
        <li>Des experts qui se connaissent et travaillent ensemble, pas des interventions cloisonnées</li>
        <li>Une approche globale de l'activité, du juridique au bien-être du dirigeant</li>
      </ul>
      ${priceRangePlaceholder()}
    </div>
  </section>

  <section class="section section-alt" id="thematiques">
    <div class="container">
      <div class="section-header">
        <h2>Tout ce qui structure une activité, réuni au même endroit</h2>
        <p>14 thématiques, regroupées en trois familles pour s'y retrouver d'un coup d'œil.</p>
      </div>
      <div class="cards-grid">
        ${familles
          .map(
            (f) => `<div class="card">
          <h3>${f.name}</h3>
          <ul class="check-list">${f.items.map((i) => `<li>${i}</li>`).join("")}</ul>
        </div>`
          )
          .join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2>Les experts du collectif</h2>
        <p>Chaque thématique est portée par un expert dédié, choisi pour sa spécialisation et sa capacité à s'adapter à la réalité d'un auto-entrepreneur, pas à celle d'une grande entreprise.</p>
      </div>
      <div class="team-grid">
        ${team
          .map(
            (m) => `<div class="team-card${m.lead ? " lead" : ""}">
          <div class="avatar">${initials(m.name)}</div>
          ${m.lead ? '<span class="role-badge">Premier contact</span><br/>' : ""}
          <h3>${m.name}</h3>
          <p>${m.role}</p>
        </div>`
          )
          .join("\n        ")}
      </div>
      <p class="form-note" style="margin-top:1.5em;">Photos des membres du collectif à intégrer (fichiers image réels à demander à Céline, remplaceront ces avatars).</p>
    </div>
  </section>

  <section class="section section-navy">
    <div class="container">
      <div class="section-header">
        <h2>Comment ça fonctionne</h2>
        <p>Un point d'entrée simple vers 10 expertises.</p>
      </div>
      <div class="steps">
        <div class="step"><span class="num">1</span><h4>Vous exposez votre besoin</h4><p>Votre situation, votre difficulté du moment, sans avoir à la classer.</p></div>
        <div class="step"><span class="num">2</span><h4>On identifie les thématiques concernées</h4><p>Souvent plus d'une, et rarement celles qu'on croyait au départ.</p></div>
        <div class="step"><span class="num">3</span><h4>Vous êtes mis en relation</h4><p>Avec l'expert adapté au sein du collectif.</p></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Questions fréquentes</h2>
      ${faqBlock([
        { q: "OSM'OSE est-il réservé aux auto-entrepreneurs ?", a: "Le collectif est pensé en priorité pour les auto-entrepreneurs et petites structures, mais certains experts interviennent aussi auprès de TPE en croissance." },
        { q: "Combien coûte une mise en relation avec un expert ?", a: "Le premier échange avec Céline est sans engagement. Le tarif dépend ensuite de l'expert et de la prestation choisie." },
        { q: "Puis-je échanger à distance ?", a: "Oui, la plupart des experts du collectif interviennent en visio, en complément du présentiel pour ceux basés dans le Var." },
        { q: "Mes informations sont-elles partagées avec tout le collectif ?", a: "Non. Vous échangez d'abord avec Céline, qui vous met en relation uniquement avec le ou les experts pertinents pour votre besoin." },
        { q: "Comment rejoindre OSM'OSE si je suis moi-même expert ?", a: "Contactez Céline directement : le collectif s'élargit avec des profils complémentaires, pas concurrents, aux expertises déjà présentes." },
      ])}
    </div>
  </section>

  <section class="cta-band section-alt">
    <div class="container">
      <h2>Un collectif pensé pour les auto-entrepreneurs</h2>
      <p>OSM'OSE n'est pas une agence généraliste : c'est un collectif construit spécifiquement autour de vos besoins, avec des experts qui parlent le même langage que vous.</p>
      <div class="hero-actions"><a class="btn btn-primary" href="/contact/">Rejoindre l'énergie OSM'OSE</a></div>
    </div>
  </section>
  `;

  write(
    "/osmose",
    layout({
      title: "OSM'OSE, collectif d'experts pour auto-entrepreneurs | GLOBAL RH",
      description:
        "10 experts, 14 thématiques pour sécuriser et développer votre activité d'auto-entrepreneur : juridique, image, gestion du temps, cybersécurité, dans le Var et en visio.",
      path: "/osmose/",
      bodyHtml: body,
      breadcrumbItems: [
        { name: "Accueil", url: "/" },
        { name: "OSM'OSE", url: "/osmose/" },
      ],
    })
  );
}

function buildKitStarter() {
  const body = `
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Première embauche</p>
      <h1>Embaucher votre premier salarié, sans craindre de faire un faux pas.</h1>
      <p class="lead">Contrat, déclarations, obligations légales, mise en place administrative : je vous accompagne pas à pas dans cette étape clé, pour que votre première embauche parte sur de bonnes bases.</p>
      <div class="hero-actions"><a class="btn btn-primary" href="#tarifs">Découvrir le Kit Starter</a></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Une première embauche, ça ne s'improvise pas</h2>
      <p>Recruter son premier salarié est une étape décisive pour une entreprise, mais aussi la plus risquée sur le plan juridique et administratif, précisément parce qu'elle est nouvelle pour vous. Convention collective, contrat de travail, DPAE, visite médicale, affiliation aux caisses, obligations de l'employeur : chaque oubli peut coûter cher, en temps comme en argent. Le Kit Starter vous évite d'apprendre ces règles sur le tas.</p>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2>Tout ce qu'il faut savoir et faire, avant, pendant et après l'embauche</h2>
      <div class="cards-grid">
        <div class="card">
          <h3>Avant l'embauche</h3>
          <ul class="check-list">
            <li>Identifier la convention collective applicable à votre activité</li>
            <li>Choisir le bon type de contrat (CDI, CDD, période d'essai, temps partiel…)</li>
            <li>Vérifier les obligations préalables selon votre secteur</li>
          </ul>
        </div>
        <div class="card">
          <h3>Au moment de l'embauche</h3>
          <ul class="check-list">
            <li>Déclaration préalable à l'embauche (DPAE)</li>
            <li>Rédaction du contrat de travail conforme</li>
            <li>Organisation de la visite médicale d'embauche</li>
            <li>Affiliation aux organismes obligatoires (mutuelle, prévoyance, retraite complémentaire)</li>
          </ul>
        </div>
        <div class="card">
          <h3>Après l'embauche</h3>
          <ul class="check-list">
            <li>Mise en place du bulletin de paie et des obligations déclaratives mensuelles</li>
            <li>Vos obligations d'employeur au quotidien (durée du travail, congés, registre du personnel…)</li>
            <li>Anticipation des échéances RH à venir (période d'essai, entretiens, renouvellement…)</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2>Un accompagnement structuré, à votre rythme</h2>
        <p>Deux formats, au choix : le kit en autonomie, ou le kit accompagné d'un temps d'échange avec moi pour l'adapter à votre situation.</p>
      </div>
      <div class="steps">
        <div class="step"><span class="num">1</span><h4>Diagnostic de votre situation</h4><p>Activité, statut, contexte de l'embauche.</p></div>
        <div class="step"><span class="num">2</span><h4>Feuille de route personnalisée</h4><p>Ce qu'il faut faire, dans quel ordre, avec quelles échéances.</p></div>
        <div class="step"><span class="num">3</span><h4>Accompagnement à la mise en œuvre</h4><p>Contrat, déclarations, documents obligatoires.</p></div>
        <div class="step"><span class="num">4</span><h4>Point de suivi</h4><p>Sécuriser les premières semaines après l'arrivée du salarié.</p></div>
      </div>
    </div>
  </section>

  <section class="section section-alt" id="tarifs">
    <div class="container">
      <div class="section-header">
        <h2>Deux formats, un prix clair</h2>
        <p>Pas de devis à attendre : vous savez ce que vous payez avant de me contacter.</p>
      </div>
      <div class="price-grid">
        <div class="price-card">
          <span class="label">En autonomie</span>
          <h3>Le Kit Starter</h3>
          <p class="amount">297 € <small>TTC</small></p>
          <p>Tout ce qu'il faut pour mener votre première embauche vous-même, sans rien oublier.</p>
          <ul class="check-list">
            <li>Le guide pas-à-pas de la première embauche</li>
            <li>La checklist complète des obligations légales</li>
            <li>Les modèles de documents : contrat de travail, DPAE, courriers types</li>
          </ul>
          <a class="btn btn-primary" href="/contact/">Commander le Kit Starter</a>
        </div>
        <div class="price-card featured">
          <span class="label">Avec un temps d'échange</span>
          <h3>Le Kit Starter accompagné</h3>
          <p class="amount">597 € <small>TTC</small></p>
          <p>Le kit complet, plus un rendez-vous pour l'adapter à votre situation réelle.</p>
          <ul class="check-list">
            <li>Tout le contenu du Kit Starter</li>
            <li>Un appel de 45 min à 1 h avec moi</li>
            <li>Validation de votre convention collective, de votre type de contrat et de vos échéances</li>
          </ul>
          <a class="btn btn-primary" href="/contact/">Réserver mon accompagnement</a>
        </div>
      </div>
      <p style="margin-top:1.5em;"><strong>Pour qui :</strong> dirigeants de TPE, indépendants en croissance, jeunes entreprises : toute structure qui s'apprête à passer le cap de sa première embauche, quel que soit le secteur d'activité.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Questions fréquentes</h2>
      ${faqBlock([
        { q: "Le Kit Starter est-il finançable via le CPF ou l'OPCO ?", a: "Non : c'est un accompagnement forfaitaire, pas une formation Qualiopi. Le tarif est fixe et connu à l'avance, sans démarche de financement à engager." },
        { q: "Combien de temps dure l'accompagnement ?", a: "Le kit en autonomie est disponible immédiatement. La formule accompagnée inclut un appel de 45 minutes à 1 heure, puis un point de suivi après l'arrivée du salarié." },
        { q: "L'accompagnement se fait-il en visio ou en présentiel ?", a: "Par défaut en visio, pour rester réactif. Un échange en présentiel est possible dans le Var sur demande." },
        { q: "Mes informations restent-elles confidentielles ?", a: "Oui, les échanges et documents partagés dans le cadre du Kit Starter restent strictement confidentiels." },
        { q: "Que se passe-t-il après l'achat du kit ?", a: "Vous recevez le guide, la checklist et les modèles de documents. En formule accompagnée, on planifie ensuite votre appel de cadrage." },
      ])}
    </div>
  </section>

  <section class="cta-band section-navy">
    <div class="container">
      <h2>Une étape à ne pas gérer seul</h2>
      <p>Le Kit Starter n'est pas une formation théorique : c'est un accompagnement concret, pensé pour un dirigeant qui embauche pour la première fois et veut le faire dans les règles.</p>
      <div class="hero-actions"><a class="btn btn-outline-light" href="/contact/">Préparer sereinement ma première embauche</a></div>
    </div>
  </section>
  `;

  write(
    "/kit-starter",
    layout({
      title: "Kit Starter, première embauche TPE | 297€, GLOBAL RH",
      description:
        "Embaucher votre premier salarié sans faux pas : contrat, DPAE, obligations légales. Kit Starter à 297€ TTC, ou accompagné à 597€ TTC avec un appel avec Céline Rinaudo.",
      path: "/kit-starter/",
      bodyHtml: body,
      breadcrumbItems: [
        { name: "Accueil", url: "/" },
        { name: "Kit Starter", url: "/kit-starter/" },
      ],
    })
  );
}

function buildEntreprises() {
  const body = `
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Entreprises · PME</p>
      <h1>Un appui RH à la hauteur de vos enjeux, sans le coût d'un poste à temps plein.</h1>
      <p class="lead">Recrutement d'un poste clé, besoin RH ponctuel, pilotage RH au long cours, ou montée en compétences de vos équipes : je m'adapte à la taille de votre structure et à l'intensité de votre besoin.</p>
      <blockquote class="pull-quote">« La DRH que les PME n'ont pas en interne »</blockquote>
      ${priceRangePlaceholder()}
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Trouver la bonne personne, pas juste un CV qui coche les cases</h2>
      <p>Un recrutement raté coûte cher, en temps, en argent, en énergie d'équipe. Je vous accompagne sur tout ou partie du processus : définition du poste, sourcing, présélection, entretiens, jusqu'à l'aide à la décision finale.</p>
      <h3>Ce que vous obtenez</h3>
      <ul class="check-list">
        <li>Une définition de poste claire, alignée avec vos besoins réels</li>
        <li>Une présélection de candidats qualifiés, pas une pile de CV à trier vous-même</li>
        <li>Un regard extérieur et objectif sur l'adéquation candidat / poste / équipe</li>
      </ul>
      <p><strong>Pour qui :</strong> PME qui recrutent sans service RH dédié, ou qui veulent déléguer un recrutement sensible.</p>
      <a class="btn btn-primary" href="/contact/">Confier un recrutement</a>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2>Un renfort RH ponctuel, sur un sujet précis</h2>
      <p>Vous n'avez pas besoin d'un DRH à demeure, mais un sujet RH précis vous dépasse ou vous prend trop de temps : une procédure disciplinaire, un entretien annuel à structurer, un document RH à mettre en conformité, une situation délicate à gérer. J'interviens ponctuellement, sur le périmètre exact de votre besoin.</p>
      <h3>Exemples d'interventions</h3>
      <ul class="check-list">
        <li>Structuration des entretiens annuels ou professionnels</li>
        <li>Mise en conformité de documents RH (règlement intérieur, contrats types…)</li>
        <li>Accompagnement sur une situation RH sensible (conflit, sanction, rupture)</li>
        <li>Appui ponctuel à un dirigeant ou un manager sur une décision RH</li>
      </ul>
      <p><strong>Pour qui :</strong> PME avec un besoin RH ciblé et limité dans le temps, sans vouloir s'engager sur une mission longue.</p>
      <a class="btn btn-primary" href="/contact/">Exposer mon besoin RH ponctuel</a>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>La fonction RH, pilotée par une experte, sans la charge d'un recrutement interne</h2>
      <p>Vous voulez structurer durablement votre fonction RH, recrutement, gestion administrative, développement des compétences, climat social, sans les coûts et la lourdeur d'un poste de DRH à temps plein. Je prends en charge cette fonction, à la carte ou dans le cadre d'un forfait annualisé, selon le rythme et les priorités de votre entreprise.</p>
      <div class="cards-grid cols-2">
        <div class="card"><h3>À la carte</h3><p>Intervention ajustée au fil de l'eau selon vos besoins du moment.</p></div>
        <div class="card"><h3>Forfait annualisé</h3><p>Un nombre de jours défini sur l'année, pour un accompagnement RH continu et anticipé.</p></div>
      </div>
      <h3 style="margin-top:1.5em;">Ce que ça change pour vous</h3>
      <ul class="check-list">
        <li>Une fonction RH pilotée avec méthode, sans improvisation</li>
        <li>Un interlocuteur unique sur tous les sujets RH, du recrutement au disciplinaire</li>
        <li>Une visibilité budgétaire claire, sans les coûts cachés d'un recrutement interne</li>
      </ul>
      <p><strong>Pour qui :</strong> PME en croissance, ou dirigeants qui veulent professionnaliser leur RH sans recruter en interne dans l'immédiat.</p>
      <a class="btn btn-primary" href="/contact/">Échanger sur un accompagnement DRH</a>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2>Faire monter vos équipes en compétences, sur des sujets qui comptent</h2>
      <p>Au-delà du conseil et du pilotage RH ponctuel, je propose des formations pour vos équipes, sur deux volets complémentaires.</p>
      <div class="cards-grid cols-2">
        <div class="card">
          <h3>Formation en entreprise</h3>
          <p>Des formations construites autour de vos besoins concrets, les miennes sur les fondamentaux RH, ou celles de mes partenaires experts sur des sujets complémentaires (réseaux sociaux, prise de parole en public, site internet, gestion de l'IA). Un seul interlocuteur, même quand plusieurs experts interviennent.</p>
        </div>
        <div class="card">
          <h3>Formation RH</h3>
          <p>Des formations dédiées aux fondamentaux RH pour vos managers ou vos équipes : recrutement, entretiens professionnels, droit social au quotidien, gestion des situations RH sensibles.</p>
        </div>
      </div>
      <p style="margin-top:1.5em;">Ces formations peuvent être éligibles à un financement via votre OPCO ou votre budget formation, dans le cadre d'un organisme de formation certifié Qualiopi.</p>
      <a class="btn btn-primary" href="/entreprises/formation/">Voir les 17 thématiques de formation →</a>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Questions fréquentes</h2>
      ${faqBlock([
        { q: "Comment est calculé le tarif d'une DRH externalisée ?", a: "Il dépend du volume de jours et du périmètre confié (recrutement, administratif, disciplinaire…). [Détail à compléter avec Céline : grille indicative ou méthode de calcul]." },
        { q: "Sur quelle durée s'engage-t-on ?", a: "L'intervention ponctuelle n'implique aucun engagement de durée. Le forfait annualisé est calé sur un nombre de jours défini à l'année, ajustable d'une année sur l'autre." },
        { q: "Intervenez-vous en présentiel dans nos locaux ?", a: "Oui, dans le Var et en PACA, en complément d'un suivi à distance pour le quotidien." },
        { q: "Les situations RH sensibles restent-elles confidentielles ?", a: "Oui, systématiquement. La confidentialité est un prérequis pour intervenir sur des sujets RH sensibles." },
        { q: "Les formations sont-elles finançables ?", a: "Oui, via votre OPCO ou votre budget formation, dans le cadre de FORM RH, organisme de formation certifié Qualiopi." },
      ])}
    </div>
  </section>

  <section class="cta-band section-navy">
    <div class="container">
      <h2>Un accompagnement qui s'adapte, pas l'inverse</h2>
      <p>On démarre toujours par un échange pour cerner votre besoin réel, avant de vous proposer la formule la plus adaptée.</p>
      <div class="hero-actions"><a class="btn btn-outline-light" href="/contact/">Discuter de votre besoin RH</a></div>
    </div>
  </section>
  `;

  write(
    "/entreprises",
    layout({
      title: "DRH externalisée PME Var | Recrutement et RH, GLOBAL RH",
      description:
        "DRH externalisée, recrutement et prestations RH ponctuelles pour PME du Var et de PACA. La DRH que les PME n'ont pas en interne, avec Céline Rinaudo.",
      path: "/entreprises/",
      bodyHtml: body,
      breadcrumbItems: [
        { name: "Accueil", url: "/" },
        { name: "Entreprises", url: "/entreprises/" },
      ],
    })
  );
}

function buildFormationHub() {
  const body = `
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Entreprises · Formation</p>
      <h1>17 thématiques, plus de 120 modules de formation RH.</h1>
      <p class="lead">Toutes les formations de FORM RH, organisme certifié Qualiopi, présentées ici module par module plutôt qu'enfouies dans un PDF. Formations en intra ou inter-entreprises, dans le Var, en PACA ou à distance.</p>
      <div class="placeholder-block" style="margin-top:1em;"><strong>Plaquette PDF</strong>[Lien vers la plaquette complète du catalogue en PDF à ajouter, en complément de ces pages, pas en remplacement]</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="theme-grid">
        ${CATALOG.map(
          (t) => `<a class="theme-card" href="/entreprises/formation/${t.slug}/">
          <span class="num">${String(t.num).padStart(2, "0")}</span>
          <h3>${t.title}</h3>
          <p>${t.accroche}</p>
        </a>`
        ).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2>Financement et certification</h2>
      <p>Toutes ces formations sont dispensées dans le cadre de FORM RH, organisme de formation certifié Qualiopi n°QUA24120006. Selon votre statut, elles peuvent être finançables via votre OPCO ou votre budget formation.</p>
      <a class="btn btn-primary" href="/contact/">Construire une formation sur-mesure</a>
    </div>
  </section>
  `;

  write(
    "/entreprises/formation",
    layout({
      title: "Catalogue de formation RH Qualiopi | 17 thématiques, FORM RH",
      description:
        "17 thématiques et plus de 120 modules de formation RH éligibles à un financement OPCO, dispensés par FORM RH (Qualiopi) dans le Var, en PACA et à distance.",
      path: "/entreprises/formation/",
      bodyHtml: body,
      breadcrumbItems: [
        { name: "Accueil", url: "/" },
        { name: "Entreprises", url: "/entreprises/" },
        { name: "Formation", url: "/entreprises/formation/" },
      ],
    })
  );
}

function buildFormationTheme(t) {
  const body = `
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Thématique ${String(t.num).padStart(2, "0")} / 17</p>
      <h1>${t.title}</h1>
      <p class="lead">${t.accroche}</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Les modules de cette thématique</h2>
      <ul class="module-list">
        ${t.modules.map((m) => `<li>${m}</li>`).join("\n        ")}
      </ul>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="cards-grid cols-2">
        <div class="card">
          <h3>À qui ça s'adresse</h3>
          <p>Dirigeants, managers et équipes en TPE/PME, en intra-entreprise (votre équipe uniquement) ou en inter-entreprises.</p>
        </div>
        <div class="card">
          <h3>Format</h3>
          <p>En présentiel (Var / PACA) ou à distance, durée adaptée à vos objectifs, de quelques heures à plusieurs jours.</p>
        </div>
      </div>
      <p style="margin-top:1.5em;">Formation dispensée dans le cadre de FORM RH, organisme de formation certifié Qualiopi n°QUA24120006, éligible à un financement via votre OPCO ou votre budget formation selon votre situation.</p>
      <a class="btn btn-primary" href="/contact/">Discuter de vos besoins en formation</a>
    </div>
  </section>

  <section class="section">
    <div class="container" style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:1em; align-items:center;">
      <a href="/entreprises/formation/">← Retour au catalogue complet</a>
    </div>
  </section>
  `;

  write(
    `/entreprises/formation/${t.slug}`,
    layout({
      title: `${t.title} | Formation RH Qualiopi Var/PACA`,
      description: `${t.accroche} Formation ${t.keyword}, éligible OPCO, en intra ou inter-entreprises dans le Var, en PACA ou à distance, avec FORM RH (Qualiopi).`,
      path: `/entreprises/formation/${t.slug}/`,
      bodyHtml: body,
      breadcrumbItems: [
        { name: "Accueil", url: "/" },
        { name: "Entreprises", url: "/entreprises/" },
        { name: "Formation", url: "/entreprises/formation/" },
        { name: t.title, url: `/entreprises/formation/${t.slug}/` },
      ],
    })
  );
}

function buildAPropos() {
  const body = `
  <section class="hero">
    <div class="container">
      <p class="eyebrow">À propos</p>
      <h1>Une conviction, portée sur deux terrains.</h1>
      <p class="lead">Je m'appelle Céline Rinaudo. Depuis 25 ans, la ressource humaine est mon métier, sous toutes ses formes, jusqu'à en faire le nom de GLOBAL RH.</p>
      <div class="avatar" style="width:110px; height:110px; font-size:1.7rem; margin:1em 0 0;">CR</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <blockquote class="pull-quote">« Une bonne décision RH change une trajectoire, alors décidez juste sans décider seul »</blockquote>
      <h2>Le parcours</h2>
      <p>25 ans en direction des ressources humaines m'ont appris une chose : une bonne décision RH change une trajectoire, celle d'une personne, celle d'une équipe, celle d'une entreprise. Je suis titulaire d'un DESS Gestion des RH et relations sociales, option psychologie appliquée à la RH, une formation qui m'a donné une lecture à la fois humaine et stratégique des enjeux RH.</p>
      <p>Cette double lecture, je la dois à la variété des postes occupés au fil de ce parcours : comprendre la RH du point de vue du candidat comme de celui du dirigeant n'est pas un slogan, c'est une expérience vécue des deux côtés de la table.</p>
      <h2>Pourquoi GLOBAL RH</h2>
      <p>GLOBAL RH réunit sous un même nom des métiers que l'on sépare trop souvent : bilan de compétences, recrutement, formation, direction RH externalisée. Ce ne sont pas des activités différentes, c'est la même conviction déclinée à chaque étape d'un parcours professionnel, celui d'un particulier comme celui d'une PME.</p>
      <h2>Et OSM'OSE</h2>
      <p>Pour les entrepreneurs, je porte cette conviction collectivement. Je suis le point d'entrée du collectif OSM'OSE, dix experts réunis pour sécuriser tout ce qui ne s'improvise pas quand on entreprend seul.</p>
      <a class="btn btn-secondary" href="/osmose/">Découvrir le collectif</a>
    </div>
  </section>

  <section class="cta-band section-alt">
    <div class="container">
      <h2>Parlons de votre situation</h2>
      <p>Le plus simple pour savoir si je peux vous aider, c'est d'en parler directement.</p>
      <div class="hero-actions"><a class="btn btn-primary" href="/contact/">Me contacter</a></div>
    </div>
  </section>
  `;

  write(
    "/a-propos",
    layout({
      title: "Céline Rinaudo, 25 ans en direction RH | GLOBAL RH",
      description:
        "Céline Rinaudo, consultante RH indépendante dans le Var : 25 ans en direction des ressources humaines, DESS RH, fondatrice de GLOBAL RH et du collectif OSM'OSE.",
      path: "/a-propos/",
      bodyHtml: body,
      breadcrumbItems: [
        { name: "Accueil", url: "/" },
        { name: "À propos", url: "/a-propos/" },
      ],
    })
  );
}

function buildContact() {
  const body = `
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Contact</p>
      <h1>Une question, un projet, une envie d'échanger ?</h1>
      <p class="lead">Chaque parcours est différent. Écrivez-moi ce qui vous amène : je reviens vers vous personnellement, pour comprendre votre situation avant de vous orienter vers la formule la plus adaptée.</p>
    </div>
  </section>

  <section class="section">
    <div class="container contact-grid">
      <div>
        <h2>Envoyez-moi un message</h2>
        <div id="form-notice" class="placeholder-block" hidden style="border-color:#dc2626; background:#fef2f2; color:#991b1b;">
          <strong>Un champ obligatoire est manquant</strong>
          Merci de vérifier votre nom, votre email et votre message, puis de renvoyer le formulaire.
        </div>
        <form action="/contact.php" method="post">
          <div class="form-field">
            <label for="nom">Nom et prénom</label>
            <input type="text" id="nom" name="nom" required />
          </div>
          <div class="form-field">
            <label for="email">Adresse email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-field">
            <label for="telephone">Téléphone (facultatif)</label>
            <input type="tel" id="telephone" name="telephone" />
          </div>
          <div class="form-field">
            <label for="message">Votre message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button class="btn btn-primary" type="submit">Envoyer ma demande</button>
          <p class="form-note">En envoyant ce formulaire, vous acceptez que vos informations soient utilisées pour répondre à votre demande.</p>
        </form>
      </div>
      <div>
        <div class="card" style="margin-bottom:1.4em;">
          <h3>Me joindre directement</h3>
          <p><a href="mailto:${EMAIL}">${EMAIL}</a><br/>${require("./templates").PHONE_PLACEHOLDER}</p>
          <p style="margin:0;">Je réponds personnellement, généralement sous 48 h ouvrées.</p>
        </div>
        <div class="card">
          <h3>Déroulement</h3>
          <div class="steps" style="grid-template-columns:1fr;">
            <div class="step"><span class="num">1</span><h4>Un premier échange</h4><p>Par téléphone ou en visio, pour comprendre votre besoin. Sans engagement.</p></div>
            <div class="step"><span class="num">2</span><h4>Une proposition adaptée</h4><p>La formule la plus pertinente pour votre situation, avec un cadre clair.</p></div>
            <div class="step"><span class="num">3</span><h4>On démarre</h4><p>En visioconférence ou en présentiel selon votre localisation.</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  write(
    "/contact",
    layout({
      title: "Contact | GLOBAL RH, Le Val (Var)",
      description:
        "Contactez Céline Rinaudo, GLOBAL RH : bilan de compétences, recrutement, formation RH ou DRH externalisée dans le Var et en PACA. Réponse personnelle sous 48h.",
      path: "/contact/",
      bodyHtml: body,
      breadcrumbItems: [
        { name: "Accueil", url: "/" },
        { name: "Contact", url: "/contact/" },
      ],
    })
  );

  const merciBody = `
  <section class="hero">
    <div class="container">
      <h1>Message bien reçu, merci !</h1>
      <p class="lead">Votre message a été transmis à Céline. Elle revient vers vous personnellement, généralement sous 48 h ouvrées.</p>
      <div class="hero-actions"><a class="btn btn-primary" href="/">Retour à l'accueil</a></div>
    </div>
  </section>
  `;
  write(
    "/contact-merci",
    layout({
      title: "Message envoyé | GLOBAL RH",
      description: "Votre message a bien été envoyé à Céline Rinaudo, GLOBAL RH.",
      path: "/contact-merci/",
      bodyHtml: merciBody,
    })
  );
}

function buildZoneIntervention() {
  const zones = ["Le Val", "Toulon", "Draguignan", "Brignoles", "Var (83)", "Alpes-Maritimes (06)", "Bouches-du-Rhône (13)", "Provence-Alpes-Côte d'Azur", "Visio, partout en France"];
  const body = `
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Zone d'intervention</p>
      <h1>Un accompagnement RH dans le Var, en PACA, ou où que vous soyez.</h1>
      <p class="lead">Basée à Le Val (83), Céline Rinaudo intervient en présentiel dans le Var et en région Provence-Alpes-Côte d'Azur, et partout ailleurs en visioconférence.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <ul class="zone-list">
        ${zones.map((z) => `<li>${z}</li>`).join("\n        ")}
      </ul>
      <div class="cards-grid cols-2" style="margin-top:2em;">
        <div class="card">
          <h3>Bilans et accompagnements individuels</h3>
          <p>Bilan de compétences, bilan d'orientation, recherche d'emploi : en présentiel dans le Var ou intégralement en visio, selon votre préférence et votre disponibilité.</p>
        </div>
        <div class="card">
          <h3>Formations et missions RH en entreprise</h3>
          <p>Formations, ateliers et missions de DRH externalisée dispensés dans vos locaux en PACA, ou à distance pour les équipes réparties sur plusieurs sites.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-band section-alt">
    <div class="container">
      <h2>Votre situation ne rentre pas dans une carte ?</h2>
      <p>Le format s'adapte à vous : présentiel, visio, ou un mix des deux selon les étapes de votre accompagnement.</p>
      <div class="hero-actions"><a class="btn btn-primary" href="/contact/">Me contacter</a></div>
    </div>
  </section>
  `;

  write(
    "/zone-intervention",
    layout({
      title: "Zone d'intervention Var, PACA et visio | GLOBAL RH",
      description:
        "Bilans de compétences, recrutement et accompagnement RH en présentiel dans le Var (Le Val, Toulon, Draguignan, Brignoles) et en PACA, ou en visio partout en France.",
      path: "/zone-intervention/",
      bodyHtml: body,
      breadcrumbItems: [
        { name: "Accueil", url: "/" },
        { name: "Zone d'intervention", url: "/zone-intervention/" },
      ],
    })
  );
}

function buildMentionsLegales() {
  const body = `
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Informations légales</p>
      <h1>Mentions légales.</h1>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Éditeur du site</h2>
      <p>Le site globalrh360.fr est édité par Céline Rinaudo, exerçant sous les noms commerciaux GLOBAL RH (conseil et accompagnement RH) et FORM RH (organisme de formation certifié Qualiopi, pour les prestations éligibles à un financement telles que le bilan de compétences).</p>
      <h3>GLOBAL RH</h3>
      <p>Forme juridique : SASU<br/>SIRET : 939 285 979<br/>Siège social : 3564 route de Bras, 83143 Le Val (Var)</p>
      <h3>FORM RH, organisme de formation</h3>
      <p>Immatriculée au registre du commerce et des sociétés de Provence-Alpes-Côte d'Azur, SIREN 792 213 423<br/>Déclaration d'activité n°93830630083 auprès du préfet de la région Provence-Alpes-Côte d'Azur<br/>Certification Qualiopi n°QUA24120006</p>
      <p>Contact : <a href="mailto:${EMAIL}">${EMAIL}</a></p>
      <p>Directeur de la publication : Céline Rinaudo.</p>

      <h2>Hébergement</h2>
      <p>Ce site est un prototype de refonte. À la date de sa rédaction, le site en ligne globalrh360.fr est hébergé par la société O2SWITCH, SAS au capital de 100 000 €, dont le siège social est situé Chemin des Pardiaux, 63000 Clermont-Ferrand, France, RCS Clermont-Ferrand 510 909 807, www.o2switch.fr. Une migration vers Hostinger est envisagée pour cette V2 : ces mentions seront mises à jour avec les informations exactes avant toute mise en ligne définitive.</p>

      <h2>Propriété intellectuelle</h2>
      <p>L'ensemble des contenus présents sur ce site (textes, mise en page, identité visuelle) est la propriété de Céline Rinaudo, sauf mention contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable est interdite.</p>
      <p>Les portraits et le logo présentés sur la page OSM'OSE sont utilisés avec l'accord des membres du collectif et restent leur propriété respective.</p>

      <h2>Droit applicable et litiges</h2>
      <p>Le présent site est soumis au droit français. En cas de litige et à défaut de résolution amiable, les tribunaux compétents seront ceux du ressort du siège de l'éditeur.</p>

      <h2>Contact</h2>
      <p>Pour toute question relative au site ou à ces mentions : <a href="mailto:${EMAIL}">${EMAIL}</a></p>
    </div>
  </section>
  `;

  write(
    "/mentions-legales",
    layout({
      title: "Mentions légales | GLOBAL RH",
      description: "Mentions légales du site GLOBAL RH : éditeur, hébergement, propriété intellectuelle et droit applicable.",
      path: "/mentions-legales/",
      bodyHtml: body,
      breadcrumbItems: [
        { name: "Accueil", url: "/" },
        { name: "Mentions légales", url: "/mentions-legales/" },
      ],
    })
  );
}

// ---------- run ----------

buildHome();
buildParticuliers();
buildOsmose();
buildKitStarter();
buildEntreprises();
buildFormationHub();
CATALOG.forEach(buildFormationTheme);
buildAPropos();
buildContact();
buildZoneIntervention();
buildMentionsLegales();

function buildSitemap() {
  const urls = generatedPaths
    .filter((p) => p !== "/contact-merci/")
    .map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml, "utf8");
}

function buildRobots() {
  const txt = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(ROOT, "robots.txt"), txt, "utf8");
}

buildSitemap();
buildRobots();

console.log(`Généré : ${generatedPaths.length} pages, sitemap.xml et robots.txt.`);
