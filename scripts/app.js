(function () {
  var PAGE_MAP = {
    home: "index.html",
    research: "research.html",
    team: "team.html",
    join: "join.html",
    contact: "contact.html"
  };

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

  function getBasePath() {
    if (window.location.protocol === "file:") {
      return "";
    }
    return window.location.pathname.indexOf("/news.site/") === 0 ? "/news.site" : "";
  }

  function pagePath(pageKey, lang) {
    var filename = PAGE_MAP[pageKey] || PAGE_MAP.home;
    return lang === "en" ? "/en/" + filename : "/" + filename;
  }

  function resolveSitePath(path) {
    if (!path || /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("mailto:") || path.startsWith("tel:") || path.startsWith("#")) {
      return path;
    }
    return getBasePath() + path;
  }

  function relativePageHref(pageKey, lang, currentLang) {
    var filename = PAGE_MAP[pageKey] || PAGE_MAP.home;
    if (currentLang === "en") {
      return lang === "en" ? filename : "../" + filename;
    }
    return lang === "en" ? "en/" + filename : filename;
  }

  function pageHref(pageKey, lang, currentLang) {
    if (window.location.protocol === "file:") {
      return relativePageHref(pageKey, lang, currentLang);
    }
    return resolveSitePath(pagePath(pageKey, lang));
  }

  function languageHref(pageKey, lang, currentLang) {
    return pageHref(pageKey, lang, currentLang);
  }

  function createNav(site, pageKey) {
    var currentLang = document.body.dataset.lang || "zh";
    return site.nav
      .map(function (item) {
        const active = item.key === pageKey ? "is-active" : "";
        return '<a class="nav-link ' + active + '" href="' + pageHref(item.key, currentLang, currentLang) + '">' + item.label + "</a>";
      })
      .join("");
  }

  function createLanguageSwitch(lang, pageKey, label) {
    const targetLang = lang === "en" ? "zh" : "en";
    return '<a class="language-switch" href="' + languageHref(pageKey, targetLang, lang) + '">' + label + "</a>";
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
      '<a class="button button-primary" href="' + resolveSitePath(site.brand.ctaPrimary.href) + '">' + site.brand.ctaPrimary.label + "</a>" +
      '<a class="button button-secondary" href="' + resolveSitePath(site.brand.ctaSecondary.href) + '">' + site.brand.ctaSecondary.label + "</a>" +
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
      '<img src="' + resolveSitePath(site.faculty.image) + '" alt="' + escapeHtml(site.faculty.name) + '">' +
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
    var introHtml = intro ? '<p>' + escapeHtml(intro) + "</p>" : "";
    if (actionHref && actionLabel) {
      action = '<a class="section-action" href="' + actionHref + '">' + actionLabel + "</a>";
    }
    return (
      '<div class="section-header reveal">' +
      '<div><p class="section-index">' + escapeHtml(index) + '</p><h2>' + escapeHtml(title) + "</h2></div>" +
      '<div class="section-header-meta">' + introHtml + action + "</div>" +
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
    var currentLang = document.body.dataset.lang || "zh";
    return (
      '<section class="content-section">' +
      createSectionHeader("02", site.sectionLabels.faculty, site.faculty.summary, pageHref("team", currentLang, currentLang), site.buttons.learnMore) +
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
    var currentLang = document.body.dataset.lang || "zh";
    return (
      '<section class="content-section">' +
      createSectionHeader("03", site.sectionLabels.updates, site.pageMeta.research.lead, pageHref("research", currentLang, currentLang), site.buttons.viewAll) +
      '<div class="paper-grid">' +
      papers.slice(0, limit).map(function (item) {
        return (
          '<article class="paper-card reveal">' +
          '<div class="paper-meta"><span>' + escapeHtml(item.journal || item.source) + '</span><span>' + escapeHtml(String(item.year)) + '</span><span>' + escapeHtml(item.mechanism || item.tag) + "</span></div>" +
          '<h3>' + escapeHtml(item.title) + "</h3>" +
          '<p>' + escapeHtml(item.summary) + "</p>" +
          '<a class="text-link" href="' + resolveSitePath(item.url) + '" target="_blank" rel="noreferrer">' + site.buttons.external + "</a>" +
          "</article>"
        );
      }).join("") +
      "</div>" +
      "</section>"
    );
  }

  function getUniqueKeywords(papers) {
    var seen = new Set();
    var list = [];
    papers.forEach(function (item) {
      (item.keywords || []).forEach(function (keyword) {
        if (!seen.has(keyword)) {
          seen.add(keyword);
          list.push(keyword);
        }
      });
    });
    return list;
  }

  function createFilterBar(site, papers) {
    var keywords = getUniqueKeywords(papers);
    return (
      '<section class="content-section">' +
      '<div class="filter-shell reveal">' +
      '<div class="filter-heading"><span>' + escapeHtml(site.ui.filterTitle) + '</span><p>' + escapeHtml(site.ui.mechanismLabel + site.ui.paperMetaSeparator + site.pageMeta.research.lead) + '</p></div>' +
      '<div class="filter-group" data-filter-group>' +
      '<button class="filter-chip is-active" type="button" data-filter="all">' + escapeHtml(site.ui.filterAll) + "</button>" +
      keywords.map(function (keyword) {
        return '<button class="filter-chip" type="button" data-filter="' + escapeHtml(keyword) + '">' + escapeHtml(keyword) + "</button>";
      }).join("") +
      "</div></div></section>"
    );
  }

  function createJoinAndContact(site) {
    var currentLang = document.body.dataset.lang || "zh";
    return (
      '<section class="content-section dual-section">' +
      '<div class="dual-panel">' +
      createSectionHeader("04", site.sectionLabels.join, site.join.intro, pageHref("join", currentLang, currentLang), site.buttons.learnMore) +
      '<div class="callout-card reveal">' +
      '<h3>' + escapeHtml(site.join.title) + "</h3>" +
      '<div class="callout-grid">' +
      site.join.cards.map(function (item) {
        return '<article><h4>' + escapeHtml(item.title) + '</h4><p>' + escapeHtml(item.body) + "</p></article>";
      }).join("") +
      "</div>" +
      '<a class="button button-primary" href="' + resolveSitePath(site.join.cta.href) + '">' + site.join.cta.label + "</a>" +
      "</div>" +
      "</div>" +
      '<div class="dual-panel">' +
      createSectionHeader("05", site.sectionLabels.contact, site.contact.note, pageHref("contact", currentLang, currentLang), site.buttons.contactUs) +
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
      createFilterBar(site, papers) +
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
          '<div class="paper-grid" data-paper-grid>' +
          group.map(function (item) {
            return (
              '<article class="paper-card reveal" data-keywords="' + escapeHtml((item.keywords || []).join("|")) + '">' +
              '<div class="paper-meta"><span>' + escapeHtml(item.journal || item.source) + '</span><span>' + escapeHtml(String(item.year)) + '</span><span>' + escapeHtml(item.mechanism || item.tag) + "</span></div>" +
              '<h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.summary) + '</p>' +
              '<a class="text-link" href="' + resolveSitePath(item.url) + '" target="_blank" rel="noreferrer">' + site.buttons.external + "</a>" +
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
      '<div class="team-photo"><img src="' + resolveSitePath(site.faculty.image) + '" alt="' + escapeHtml(site.faculty.name) + '"></div>' +
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
    var currentLang = document.body.dataset.lang || "zh";
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
      '</ul><a class="button button-primary" href="' + resolveSitePath(site.join.cta.href) + '">' + site.join.cta.label + "</a></div></section>" +
      '<section class="content-section">' +
      createSectionHeader("02", site.sectionLabels.team, site.teamSnapshot.body, pageHref("team", currentLang, currentLang), site.buttons.learnMore) +
      '<div class="metric-band reveal">' +
      site.teamSnapshot.metrics.map(function (item) {
        return '<div class="mini-metric"><strong>' + escapeHtml(item.value) + '</strong><span>' + escapeHtml(item.label) + "</span></div>";
      }).join("") +
      "</div></section>";
  }

  function renderContact(main, site) {
    var contactNote = site.contact.note ? '<p class="section-note">' + escapeHtml(site.contact.note) + "</p>" : "";
    main.innerHTML =
      '<section class="page-hero reveal"><p class="eyebrow">' + escapeHtml(site.labName) + '</p><h1>' + escapeHtml(site.pageMeta.contact.title) + '</h1><p>' + escapeHtml(site.pageMeta.contact.lead) + '</p></section>' +
      '<section class="content-section two-column">' +
      '<div class="data-card reveal"><h2>' + escapeHtml(site.contact.title) + '</h2><div class="contact-stack">' +
      site.contact.blocks.map(function (item) {
        return '<div class="contact-card"><span>' + escapeHtml(item.label) + '</span><strong>' + escapeHtml(item.value) + "</strong></div>";
      }).join("") +
      '</div>' + contactNote + '</div>' +
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

  function initResearchFilter() {
    var filterGroup = document.querySelector("[data-filter-group]");
    if (!filterGroup) {
      return;
    }
    var chips = Array.from(filterGroup.querySelectorAll("[data-filter]"));
    var cards = Array.from(document.querySelectorAll("[data-keywords]"));
    var sections = Array.from(document.querySelectorAll("[id^='year-']"));

    function applyFilter(value) {
      chips.forEach(function (chip) {
        chip.classList.toggle("is-active", chip.dataset.filter === value);
      });

      cards.forEach(function (card) {
        var keywords = (card.dataset.keywords || "").split("|").filter(Boolean);
        var visible = value === "all" || keywords.indexOf(value) !== -1;
        card.style.display = visible ? "" : "none";
      });

      sections.forEach(function (section) {
        var visibleCards = Array.from(section.querySelectorAll("[data-keywords]")).filter(function (card) {
          return card.style.display !== "none";
        });
        section.style.display = visibleCards.length ? "" : "none";
      });
    }

    filterGroup.addEventListener("click", function (event) {
      var chip = event.target.closest("[data-filter]");
      if (!chip) {
        return;
      }
      applyFilter(chip.dataset.filter);
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
      '<a class="brand-lockup" href="' + pageHref("home", lang, lang) + '"><span class="brand-mark">HL</span><span class="brand-text"><strong>' + escapeHtml(site.labName) + '</strong><em>' + escapeHtml(site.brand.kicker) + '</em></span></a>' +
      '<button class="menu-toggle" data-menu-toggle aria-expanded="false" aria-label="Toggle menu"><span></span><span></span></button>' +
      '<div class="nav-shell" data-mobile-nav><nav aria-label="' + escapeHtml(site.navLabel) + '">' + createNav(site, pageKey) + '</nav>' + createLanguageSwitch(lang, pageKey, site.languageSwitchLabel) + "</div>" +
      "</div>";
    footer.innerHTML =
      '<div class="footer-shell"><p>' + escapeHtml(site.footer) + '</p><div class="footer-links">' +
      site.nav.map(function (item) { return '<a href="' + pageHref(item.key, lang, lang) + '">' + escapeHtml(item.label) + "</a>"; }).join("") +
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
    initResearchFilter();
    initReveal();
  }

  document.addEventListener("DOMContentLoaded", initPage);
})();
