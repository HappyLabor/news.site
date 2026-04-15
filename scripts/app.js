(function () {
  function getSiteData(lang) {
    return lang === "en" ? window.SITE_EN : window.SITE_ZH;
  }

  function getPaperData(lang) {
    return lang === "en" ? window.PAPERS_EN : window.PAPERS_ZH;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function languageHref(pageKey, lang) {
    const map = {
      home: "index.html",
      research: "research.html",
      team: "team.html",
      join: "join.html",
      contact: "contact.html"
    };
    return lang === "en" ? `/en/${map[pageKey]}` : `/${map[pageKey]}`;
  }

  function createNav(site, pageKey) {
    return site.nav
      .map(function (item) {
        const active = item.key === pageKey ? "is-active" : "";
        return '<a class="nav-link ' + active + '" href="' + item.href + '">' + item.label + "</a>";
      })
      .join("");
  }

  function createLanguageSwitch(lang, pageKey, label) {
    const targetLang = lang === "en" ? "zh" : "en";
    return '<a class="language-switch" href="' + languageHref(pageKey, targetLang) + '">' + label + "</a>";
  }

  function createHero(site, papers) {
    return (
      '<section class="hero reveal">' +
      '<div class="hero-copy">' +
      '<p class="eyebrow">' + escapeHtml(site.brand.kicker) + "</p>" +
      '<h1 class="hero-title">' + escapeHtml(site.brand.title) + "</h1>" +
      '<p class="hero-subtitle">' + escapeHtml(site.brand.subtitle) + "</p>" +
      '<p class="hero-mission">' + escapeHtml(site.brand.mission) + "</p>" +
      '<div class="hero-actions">' +
      '<a class="button button-primary" href="' + site.brand.ctaPrimary.href + '">' + site.brand.ctaPrimary.label + "</a>" +
      '<a class="button button-secondary" href="' + site.brand.ctaSecondary.href + '">' + site.brand.ctaSecondary.label + "</a>" +
      "</div>" +
      '<div class="stat-grid">' +
      site.heroStats
        .map(function (item) {
          return '<div class="stat-card"><span class="stat-value">' + escapeHtml(item.value) + '</span><span class="stat-label">' + escapeHtml(item.label) + "</span></div>";
        })
        .join("") +
      "</div>" +
      "</div>" +
      '<div class="hero-visual">' +
      '<div class="hero-panel hero-portrait">' +
      '<img src="' + site.faculty.image + '" alt="' + escapeHtml(site.faculty.name) + '">' +
      '<div class="panel-caption"><span>' + escapeHtml(site.ui.piTag) + '</span><strong>' + escapeHtml(site.faculty.name) + "</strong></div>" +
      "</div>" +
      '<div class="hero-panel hero-signal">' +
      '<p class="signal-title">' + escapeHtml(site.ui.researchLog) + "</p>" +
      '<div class="signal-lines">' +
      papers.slice(0, 4)
        .map(function (item) {
          return '<div class="signal-line"><span>' + escapeHtml(String(item.year)) + '</span><strong>' + escapeHtml(item.tag) + '</strong><em>' + escapeHtml(item.title) + "</em></div>";
        })
        .join("") +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function createSectionHeader(index, title, intro, actionHref, actionLabel) {
    var action = "";
    if (actionHref && actionLabel) {
      action = '<a class="section-action" href="' + actionHref + '">' + actionLabel + "</a>";
    }
    return (
      '<div class="section-header reveal">' +
      '<div><p class="section-index">' + escapeHtml(index) + '</p><h2>' + escapeHtml(title) + "</h2></div>" +
      '<div class="section-header-meta"><p>' + escapeHtml(intro) + "</p>" + action + "</div>" +
      "</div>"
    );
  }

  function createHighlights(site) {
    return (
      '<section class="content-section">' +
      createSectionHeader("01", site.sectionLabels.highlights, site.pageMeta.home.lead, null, null) +
      '<div class="pillar-grid">' +
      site.highlights
        .map(function (item) {
          return '<article class="pillar-card reveal"><span class="pillar-id">' + escapeHtml(item.id) + '</span><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.body) + "</p></article>";
        })
        .join("") +
      "</div>" +
      "</section>"
    );
  }

  function createFaculty(site) {
    return (
      '<section class="content-section">' +
      createSectionHeader("02", site.sectionLabels.faculty, site.faculty.summary, site.nav[2].href, site.buttons.learnMore) +
      '<div class="faculty-layout reveal">' +
      '<div class="faculty-bio">' +
      '<h3>' + escapeHtml(site.faculty.name) + "</h3>" +
      '<p class="faculty-title">' + escapeHtml(site.faculty.title) + "</p>" +
      '<ul class="badge-list">' +
      site.faculty.roles.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") +
      "</ul>" +
      '<p>' + escapeHtml(site.faculty.summary) + "</p>" +
      '<div class="contact-inline"><span>' + escapeHtml(site.ui.emailLabel) + '</span><a href="mailto:' + site.faculty.email + '">' + site.faculty.email + '</a></div>' +
      '<div class="contact-inline"><span>' + escapeHtml(site.ui.orcidLabel) + '</span><strong>' + escapeHtml(site.faculty.orcid) + "</strong></div>" +
      "</div>" +
      '<div class="faculty-data">' +
      '<div class="data-card"><h4>' + escapeHtml(site.teamSnapshot.title) + "</h4><p>" + escapeHtml(site.teamSnapshot.body) + "</p></div>" +
      '<div class="metric-row">' +
      site.teamSnapshot.metrics.map(function (item) {
        return '<div class="mini-metric"><strong>' + escapeHtml(item.value) + '</strong><span>' + escapeHtml(item.label) + "</span></div>";
      }).join("") +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function createPapers(site, papers, limit) {
    return (
      '<section class="content-section">' +
      createSectionHeader("03", site.sectionLabels.updates, site.pageMeta.research.lead, site.nav[1].href, site.buttons.viewAll) +
      '<div class="paper-grid">' +
      papers.slice(0, limit).map(function (item) {
        return (
          '<article class="paper-card reveal">' +
          '<div class="paper-meta"><span>' + escapeHtml(String(item.year)) + '</span><span>' + escapeHtml(item.tag) + "</span></div>" +
          '<h3>' + escapeHtml(item.title) + "</h3>" +
          '<p class="paper-source">' + escapeHtml(item.source) + "</p>" +
          '<p>' + escapeHtml(item.summary) + "</p>" +
          '<a class="text-link" href="' + item.url + '" target="_blank" rel="noreferrer">' + site.buttons.external + "</a>" +
          "</article>"
        );
      }).join("") +
      "</div>" +
      "</section>"
    );
  }

  function createJoinAndContact(site) {
    return (
      '<section class="content-section dual-section">' +
      '<div class="dual-panel">' +
      createSectionHeader("04", site.sectionLabels.join, site.join.intro, site.nav[3].href, site.buttons.learnMore) +
      '<div class="callout-card reveal">' +
      '<h3>' + escapeHtml(site.join.title) + "</h3>" +
      '<div class="callout-grid">' +
      site.join.cards.map(function (item) {
        return '<article><h4>' + escapeHtml(item.title) + '</h4><p>' + escapeHtml(item.body) + "</p></article>";
      }).join("") +
      "</div>" +
      '<a class="button button-primary" href="' + site.join.cta.href + '">' + site.join.cta.label + "</a>" +
      "</div>" +
      "</div>" +
      '<div class="dual-panel">' +
      createSectionHeader("05", site.sectionLabels.contact, site.contact.note, site.nav[4].href, site.buttons.contactUs) +
      '<div class="contact-stack reveal">' +
      site.contact.blocks.map(function (item) {
        return '<div class="contact-card"><span>' + escapeHtml(item.label) + '</span><strong>' + escapeHtml(item.value) + "</strong></div>";
      }).join("") +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function renderHome(main, site, papers) {
    main.innerHTML = createHero(site, papers) + createHighlights(site) + createFaculty(site) + createPapers(site, papers, 4) + createJoinAndContact(site);
  }

  function renderResearch(main, site, papers) {
    var yearIndex = Array.from(new Set(papers.map(function (item) { return item.year; }))).sort(function (a, b) { return b - a; });
    main.innerHTML =
      '<section class="page-hero reveal"><p class="eyebrow">' + escapeHtml(site.labName) + '</p><h1>' + escapeHtml(site.pageMeta.research.title) + '</h1><p>' + escapeHtml(site.pageMeta.research.lead) + '</p></section>' +
      '<section class="content-section"><div class="year-filter reveal">' +
      yearIndex.map(function (year) {
        return '<a href="#year-' + year + '">' + year + "</a>";
      }).join("") +
      "</div></section>" +
      yearIndex.map(function (year, index) {
        var group = papers.filter(function (item) { return item.year === year; });
        return (
          '<section class="content-section" id="year-' + year + '">' +
          createSectionHeader(String(index + 1).padStart(2, "0"), String(year), site.sectionLabels.updates, null, null) +
          '<div class="paper-grid">' +
          group.map(function (item) {
            return (
              '<article class="paper-card reveal">' +
              '<div class="paper-meta"><span>' + escapeHtml(String(item.year)) + '</span><span>' + escapeHtml(item.tag) + "</span></div>" +
              '<h3>' + escapeHtml(item.title) + '</h3><p class="paper-source">' + escapeHtml(item.source) + '</p><p>' + escapeHtml(item.summary) + '</p>' +
              '<a class="text-link" href="' + item.url + '" target="_blank" rel="noreferrer">' + site.buttons.external + "</a>" +
              "</article>"
            );
          }).join("") +
          "</div></section>"
        );
      }).join("");
  }

  function renderTeam(main, site) {
    main.innerHTML =
      '<section class="page-hero reveal"><p class="eyebrow">' + escapeHtml(site.labName) + '</p><h1>' + escapeHtml(site.pageMeta.team.title) + '</h1><p>' + escapeHtml(site.pageMeta.team.lead) + '</p></section>' +
      '<section class="content-section">' +
      createSectionHeader("01", site.sectionLabels.faculty, site.faculty.summary, null, null) +
      '<div class="team-hero reveal">' +
      '<div class="team-photo"><img src="' + site.faculty.image + '" alt="' + escapeHtml(site.faculty.name) + '"></div>' +
      '<div class="team-copy"><h2>' + escapeHtml(site.faculty.name) + '</h2><p class="faculty-title">' + escapeHtml(site.faculty.title) + '</p><p>' + escapeHtml(site.faculty.summary) + '</p>' +
      '<ul class="badge-list">' + site.faculty.roles.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + "</ul></div>" +
      "</div></section>" +
      '<section class="content-section">' +
      createSectionHeader("02", site.sectionLabels.highlights, site.teamSnapshot.body, null, null) +
      '<div class="pillar-grid">' +
      site.researchAreas.map(function (item, index) {
        return '<article class="pillar-card reveal"><span class="pillar-id">0' + (index + 1) + '</span><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.body) + "</p></article>";
      }).join("") +
      "</div></section>" +
      '<section class="content-section two-column">' +
      '<div class="data-card reveal"><h3>' + escapeHtml(site.ui.careerLabel) + '</h3><div class="timeline">' +
      site.timeline.map(function (item) {
        return '<article><span>' + escapeHtml(item.period) + '</span><h4>' + escapeHtml(item.title) + '</h4><p>' + escapeHtml(item.body) + "</p></article>";
      }).join("") +
      "</div></div>" +
      '<div class="data-card reveal"><h3>' + escapeHtml(site.ui.recognitionLabel) + '</h3><ul class="plain-list">' +
      site.honors.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") +
      '</ul><h3>' + escapeHtml(site.ui.fundingLabel) + '</h3><ul class="plain-list">' +
      site.funding.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") +
      "</ul></div>" +
      "</section>";
  }

  function renderJoin(main, site) {
    main.innerHTML =
      '<section class="page-hero reveal"><p class="eyebrow">' + escapeHtml(site.labName) + '</p><h1>' + escapeHtml(site.pageMeta.join.title) + '</h1><p>' + escapeHtml(site.pageMeta.join.lead) + '</p></section>' +
      '<section class="content-section">' +
      createSectionHeader("01", site.sectionLabels.join, site.join.intro, null, null) +
      '<div class="callout-card reveal"><h2>' + escapeHtml(site.join.title) + '</h2><div class="callout-grid">' +
      site.join.cards.map(function (item) {
        return '<article><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.body) + "</p></article>";
      }).join("") +
      '</div><ul class="plain-list checklist">' +
      site.join.checklist.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") +
      '</ul><a class="button button-primary" href="' + site.join.cta.href + '">' + site.join.cta.label + "</a></div></section>" +
      '<section class="content-section">' +
      createSectionHeader("02", site.sectionLabels.team, site.teamSnapshot.body, site.nav[2].href, site.buttons.learnMore) +
      '<div class="metric-band reveal">' +
      site.teamSnapshot.metrics.map(function (item) {
        return '<div class="mini-metric"><strong>' + escapeHtml(item.value) + '</strong><span>' + escapeHtml(item.label) + "</span></div>";
      }).join("") +
      "</div></section>";
  }

  function renderContact(main, site) {
    main.innerHTML =
      '<section class="page-hero reveal"><p class="eyebrow">' + escapeHtml(site.labName) + '</p><h1>' + escapeHtml(site.pageMeta.contact.title) + '</h1><p>' + escapeHtml(site.pageMeta.contact.lead) + '</p></section>' +
      '<section class="content-section two-column">' +
      '<div class="data-card reveal"><h2>' + escapeHtml(site.contact.title) + '</h2><div class="contact-stack">' +
      site.contact.blocks.map(function (item) {
        return '<div class="contact-card"><span>' + escapeHtml(item.label) + '</span><strong>' + escapeHtml(item.value) + "</strong></div>";
      }).join("") +
      '</div><p class="section-note">' + escapeHtml(site.contact.note) + '</p></div>' +
      '<div class="data-card reveal"><h2>' + escapeHtml(site.faculty.name) + '</h2><p class="faculty-title">' + escapeHtml(site.faculty.title) + '</p>' +
      '<p>' + escapeHtml(site.faculty.summary) + '</p>' +
      '<div class="contact-inline"><span>' + escapeHtml(site.ui.emailLabel) + '</span><a href="mailto:' + site.faculty.email + '">' + site.faculty.email + '</a></div>' +
      '<div class="contact-inline"><span>' + escapeHtml(site.ui.addressLabel) + '</span><strong>' + escapeHtml(site.faculty.address) + '</strong></div>' +
      "</div></section>";
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    items.forEach(function (item) { observer.observe(item); });
  }

  function initMenu() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var nav = document.querySelector("[data-mobile-nav]");
    if (!toggle || !nav) {
      return;
    }
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open");
    });
  }

  function initPage() {
    var root = document.body;
    var lang = root.dataset.lang || "zh";
    var pageKey = root.dataset.page || "home";
    var site = getSiteData(lang);
    var papers = getPaperData(lang).slice().sort(function (a, b) { return b.year - a.year; });
    document.documentElement.lang = site.htmlLang;
    document.title = site.pageMeta[pageKey].title;
    var app = document.querySelector("#app");
    var header = document.querySelector("#site-header");
    var footer = document.querySelector("#site-footer");
    header.innerHTML =
      '<div class="header-shell">' +
      '<a class="brand-lockup" href="' + site.nav[0].href + '"><span class="brand-mark">HL</span><span class="brand-text"><strong>' + escapeHtml(site.labName) + '</strong><em>' + escapeHtml(site.brand.kicker) + '</em></span></a>' +
      '<button class="menu-toggle" data-menu-toggle aria-expanded="false" aria-label="Toggle menu"><span></span><span></span></button>' +
      '<div class="nav-shell" data-mobile-nav><nav aria-label="' + escapeHtml(site.navLabel) + '">' + createNav(site, pageKey) + '</nav>' + createLanguageSwitch(lang, pageKey, site.languageSwitchLabel) + "</div>" +
      "</div>";
    footer.innerHTML =
      '<div class="footer-shell"><p>' + escapeHtml(site.footer) + '</p><div class="footer-links">' +
      site.nav.map(function (item) { return '<a href="' + item.href + '">' + escapeHtml(item.label) + "</a>"; }).join("") +
      "</div></div>";

    if (pageKey === "home") {
      renderHome(app, site, papers);
    } else if (pageKey === "research") {
      renderResearch(app, site, papers);
    } else if (pageKey === "team") {
      renderTeam(app, site);
    } else if (pageKey === "join") {
      renderJoin(app, site);
    } else if (pageKey === "contact") {
      renderContact(app, site);
    }

    initMenu();
    initReveal();
  }

  document.addEventListener("DOMContentLoaded", initPage);
})();
