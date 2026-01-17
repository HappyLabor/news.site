document.addEventListener("DOMContentLoaded", function () {
  // 1. 实验室动态数据
  const newsData = [
    {
      date: "2026-03-01",
      content: "祝贺课题组在 Nature Neuroscience 发表最新研究成果！",
    },
    {
      date: "2026-02-15",
      content: "实验室年度学术年会顺利举行，李四获得优秀报告奖。",
    },
    {
      date: "2026-01-10",
      content: "欢迎 2026 级春季实习生加入 HappyLab 大家庭。",
    },
  ];

  // 渲染新闻
  const newsContainer = document.getElementById("news-list");
  if (newsContainer) {
    newsContainer.innerHTML = newsData
      .map(
        (item) => `
            <div class="news-item">
                <span class="news-date">${item.date}</span>
                <p class="news-content">${item.content}</p>
            </div>
        `,
      )
      .join("");
  }

  // 2. 发表文章数据
  const publications = [
    {
      id: 1,
      title:
        "Context-specific expression quantitative trait loci dynamics in schizophrenia",
      authors: "叶林燕, 沈宗锐等",
      venue: "Neurobiology of Disease",
      year: 2025,
      abstract:
        "本文构建了多情境脑组织表达数量性状位点动态图谱，揭示了精神分裂症的遗传多效性机制。",
      link: "https://doi.org/10.1016/j.nbd.2025.107236",
    },
  ];

  // 渲染文章
  const pubList = document.getElementById("pub-list");
  function renderPubs(items) {
    if (!pubList) return;
    pubList.innerHTML = items
      .map(
        (p) => `
            <div class="card pub-item" style="margin-bottom:15px; cursor:pointer;" onclick="openModal(${p.id})">
                <h3 style="font-size:16px; margin:0 0 10px;">${p.title}</h3>
                <p style="font-size:13px; color:#7F8C8D; margin:0;">${p.authors} | ${p.venue} (${p.year})</p>
            </div>
        `,
      )
      .join("");
  }
  renderPubs(publications);

  // 3. 弹窗逻辑
  const modal = document.getElementById("abstract-modal");
  window.openModal = function (id) {
    const p = publications.find((x) => x.id === id);
    document.getElementById("modal-title").innerText = p.title;
    document.getElementById("modal-text").innerText = p.abstract;
    document.getElementById("modal-link").href = p.link;
    modal.style.display = "flex";
  };

  document.querySelector(".close-modal").onclick = () =>
    (modal.style.display = "none");

  // 4. 实习申请提交模拟
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button");
      btn.innerText = "提交中...";
      setTimeout(() => {
        alert("申请已发出！我们会尽快联系您。");
        form.reset();
        btn.innerText = "提交申请";
      }, 1000);
    });
  }

  // 5. 移动端汉堡菜单简单切换
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  menuBtn.onclick = () => {
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    nav.style.flexDirection = "column";
  };
});
