document.addEventListener("DOMContentLoaded", function () {
  // --- 数据部分 ---
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
        "构建多情境脑组织表达数量性状位点（eQTL）动态图谱，系统揭示了遗传调控在精神分裂症中的“情境特异性”，并阐明了一种由基因竞争共享调控元件所驱动的遗传多效性新机制。",
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
        "利用孟德尔随机化整合ASM、脑组织表达数量性状位点（eQTL）及精神分裂症GWAS数据，鉴定ASM位点所调控的精神分裂症风险基因集，并揭示了ASM位点rs2280906调控疾病风险基因MYOM2 的表达参与精神分裂症的调控机制。",
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
        "Gain of Alternative Allele Expression of LINC02449 at rs149707223 in Schizophrenia and Bipolar Disorder",
      authors: "杨腾飞、陈恰琪、邓志颖",
      venue: "Nature Communications",
      year: 2025,
      link: "https://doi.org/10.1038/s41467-025-64717-z",
      abstract:
        "详细阐述了LINC02449在位点rs149707223上的等位基因特异性表达如何激活小鼠的mPFC-NAc神经环路，诱导小鼠突触传递和行为异常。",
    },
    {
      id: 5,
      title:
        "Allele-Specific Regulation of PAXIP1-AS1 by SMC3/CEBPB at rs112651172 in Psychiatric Disorders",
      authors: "倪超颖、陈鹤",
      venue: "Advanced Science",
      year: 2025,
      link: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202508259",
      abstract:
        "揭示了非编码遗传变异通过等位基因特异性调控长链非编码RNA（lncRNA）PAXIP1-AS1，驱动突触功能紊乱与精神障碍表型。",
    },
  ];

  // --- 论文渲染逻辑 ---
  const pubListContainer = document.getElementById("pub-list");
  const yearSel = document.getElementById("pub-year");
  const searchInput = document.getElementById("pub-search");

  // 初始化年份下拉框
  if (yearSel) {
    const years = Array.from(new Set(publications.map((p) => p.year))).sort(
      (a, b) => b - a
    );
    years.forEach((y) => {
      const opt = document.createElement("option");
      opt.value = String(y);
      opt.textContent = String(y);
      yearSel.appendChild(opt);
    });
  }

  function renderList(items) {
    if (!pubListContainer) return;
    pubListContainer.innerHTML = "";

    if (items.length === 0) {
      pubListContainer.innerHTML =
        '<div style="padding:20px; color:#7F8C8D;">未检索到符合条件的结果。</div>';
      return;
    }

    items.forEach((p) => {
      const el = document.createElement("div");
      el.className = "pub-item";
      // 点击标题触发 Modal，而不是直接跳转
      el.innerHTML = `
        <h3><a href="javascript:void(0)" class="pub-link" data-id="${p.id}">${p.title}</a></h3>
        <div class="pub-meta">${p.authors} — <span style="font-weight:600; color:var(--primary);">${p.venue}</span> (${p.year})</div>
      `;
      pubListContainer.appendChild(el);
    });

    // 绑定点击事件到标题
    document.querySelectorAll(".pub-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        const pubId = e.target.getAttribute("data-id");
        const pub = publications.find((p) => p.id == pubId);
        openModal(pub);
      });
    });
  }

  function applyFilters() {
    if (!searchInput || !yearSel) return;
    const q = searchInput.value.toLowerCase();
    const year = yearSel.value;

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

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (yearSel) yearSel.addEventListener("change", applyFilters);

  // 初始渲染
  renderList(publications);

  // --- Modal 弹窗逻辑 ---
  const modal = document.getElementById("abstract-modal");
  const closeBtn = document.querySelector(".close-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMeta = document.getElementById("modal-meta");
  const modalText = document.getElementById("modal-text");
  const modalLink = document.getElementById("modal-link");

  function openModal(pub) {
    if (!modal) return;
    modalTitle.textContent = pub.title;
    modalMeta.textContent = `${pub.authors} | ${pub.venue} (${pub.year})`;
    modalText.textContent = pub.abstract;
    modalLink.href = pub.link;
    modal.style.display = "flex";
  }

  if (closeBtn) {
    closeBtn.onclick = () => (modal.style.display = "none");
  }

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // --- 实习表单提交模拟 ---
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // 改变按钮状态
      btn.textContent = "提交中...";
      btn.style.opacity = "0.7";
      btn.disabled = true;

      // 模拟网络请求
      setTimeout(() => {
        alert("申请提交成功！我们会尽快通过邮件联系您。");
        contactForm.reset();
        btn.textContent = originalText;
        btn.style.opacity = "1";
        btn.disabled = false;
      }, 1500);
    });
  }

  // --- 移动端菜单逻辑 ---
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove("active");
      }
    });
  }

  // --- 滚动显现动画 (Scroll Reveal) ---
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const observeElements = (elements) => {
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

      // 添加一个类来触发上述 transition
      // 注意：我们在CSS中没有定义 .is-visible 的具体样式，而是利用 JS 直接控制 style
      // 为了更清洁的代码，这里动态添加 transition 逻辑
      observer.observe(el);
    });
  };

  // 修改 Observer 回调以配合内联样式
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const animatedElements = document.querySelectorAll(
    ".section, .hero-banner, .sidebar-sticky"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    revealObserver.observe(el);
  });
});
