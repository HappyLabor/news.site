document.addEventListener("DOMContentLoaded", function () {
  //请将此处数据替换为你的实际发表文章信息
  const publications = [
    {
      id: 1,
      title:
        "Context-specific expression quantitative trait loci dynamics uncover genetic pleiotropy in schizophrenia",
      authors: "叶林燕, 沈宗锐, 杨奇",
      venue: "Neurobiology of Disease",
      year: 2025,
      link: "https://doi.org/10.1016/j.nbd.2025.107236",
      abstract:
        "构建多情境脑组织表达数量性状位点（ eQTL）动态图谱，系统揭示了遗传调控在精神分裂症中的“情境特异性”，并阐明了一种由基因竞争共享调控元件所驱动的遗传多效性新机制",
    },
    {
      id: 2,
      title:
        "Allele‐Specific Methylation Links Non‐coding Variant of rs2280906 to MYOM2 Regulation in Schizophrenia",
      authors: "李启阳、盖元元、李忠炜",
      venue: "Molecular Neurobiology",
      year: 2025,
      link: "https://link.springer.com/article/10.1007/s12035-025-05469-1",
      abstract:
        "利用孟德尔随机化整合ASM、脑组织表达数量性状位点（eQTL）及精神分裂症GWAS数据，鉴定ASM位点所调控的精神分裂症风险基因集，并揭示了ASM位点rs2280906调控疾病风险基因MYOM2 的表达参与精神分裂症的调控机制",
    },
    {
      id: 3,
      title:
        "Mendelian randomization facilitates identification of schizophrenia risk enhancer RNAs",
      authors: "叶林燕,倪超颖",
      venue: "Molecular Psychiatry",
      year: 2025,
      link: "https://www.nature.com/articles/s41380-025-03358-6",
      abstract:
        "该研究通过构建大规模增强子RNA表达数量性状位点（eQTL）图谱，并结合孟德尔随机化分析，揭示了增强子RNA在SZ发病风险中的因果作用及其调控机制。",
    },
    {
      id: 4,
      title:
        "Gain of Alternative Allele Expression of LINC02449 at rs149707223 in Schizophrenia and Bipolar Disorder: Inducing Synaptic Transmission and Behavioral Deficits in Mice",
      authors: "杨腾飞、陈恰琪、邓志颖、倪超颖、刘津铭",
      venue: "Nature Communications",
      year: 2025,
      link: "https://doi.org/10.1038/s41467-025-64717-z",
      abstract:
        "详细阐述了LINC02449在位点rs149707223上的等位基因特异性表达如何激活小鼠的mPFC-NAc神经环路，诱导小鼠突触传递和行为异常，揭示了从非编码遗传变异到行为异常——等位基因特异性表达参与精神疾病的新机制",
    },
    {
      id: 5,
      title:
        "Allele-Specific Regulation of PAXIP1-AS1 by SMC3/CEBPB at rs112651172 in Psychiatric Disorders Drives Synaptic and Behavioral Dysfunctions in Mice",
      authors: "倪超颖、陈鹤、陈洽琪、廖扬阳",
      venue: "Advanced Science",
      year: 2025,
      link: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202508259",
      abstract:
        "揭示了非编码遗传变异通过等位基因特异性调控长链非编码RNA（lncRNA）PAXIP1-AS1，驱动突触功能紊乱与精神障碍表型",
    },
  ];

  // 初始化年份选择框
  const yearSel = document.getElementById("pub-year");
  const years = Array.from(new Set(publications.map((p) => p.year))).sort(
    (a, b) => b - a
  );
  years.forEach((y) => {
    const opt = document.createElement("option");
    opt.value = String(y);
    opt.textContent = String(y);
    yearSel.appendChild(opt);
  });

  function renderList(items) {
    const container = document.getElementById("pub-list");
    container.innerHTML = "";
    if (items.length === 0) {
      container.innerHTML =
        '<div class="pub-item">未检索到符合条件的结果。</div>';
      return;
    }
    items.forEach((p) => {
      const el = document.createElement("div");
      el.className = "pub-item";
      el.innerHTML = `
        <h3><a href="${p.link}" target="_blank" rel="noopener">${p.title}</a></h3>
        <div class="pub-meta">${p.authors} — ${p.venue} (${p.year})</div>
        <p class="pub-abstract">${p.abstract}</p>
      `;
      container.appendChild(el);
    });
  }

  function applyFilters() {
    const q = (document.getElementById("pub-search").value || "").toLowerCase();
    const year = document.getElementById("pub-year").value;
    const filtered = publications.filter((p) => {
      const byYear = year === "all" || p.year === parseInt(year);
      const byText =
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q);
      return byYear && byText;
    });
    renderList(filtered);
  }

  document.getElementById("pub-search").addEventListener("input", applyFilters);
  document.getElementById("pub-year").addEventListener("change", applyFilters);

  renderList(publications);

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });
  }
  /* --- VS Code Assistant Added: Mobile Menu & Visual Enhancements --- */

  // Mobile Menu Logic
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });

    // Close menu when clicking a link (smooth scroll behavior)
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }

  // Scroll Reveal Logic
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const observeElements = (elements) => {
    elements.forEach((el, index) => {
      el.classList.add("reveal-on-scroll");
      // Add stagger delay for lists
      if (el.classList.contains("pub-item") || el.tagName === "LI") {
        el.style.transitionDelay = `${(index % 5) * 100}ms`;
      }
      observer.observe(el);
    });
  };

  // Select key structural elements to animate
  const staticSelectors = document.querySelectorAll(
    "section h2, .card, .hero-content > *, .grid-3 li, .contact-wrapper, .news-list li"
  );
  observeElements(staticSelectors);

  // Initial publication items
  observeElements(document.querySelectorAll(".pub-item"));

  // Monitor dynamic publication list changes (for search/filter)
  const pubList = document.getElementById("pub-list");
  if (pubList) {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const newNodes = Array.from(mutation.addedNodes).filter(
          (n) => n.nodeType === 1
        );
        if (newNodes.length > 0) observeElements(newNodes);
      });
    });
    mutationObserver.observe(pubList, { childList: true });
  }
});
