/* ============================================================
   RELIQUIA · Lógica de la guía
   ============================================================ */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---------- NAVBAR: scroll, menú móvil, link activo ---------- */
  const navbar  = $("#navbar");
  const navLinks = $("#navLinks");
  const navToggle = $("#navToggle");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  });

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open);
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Resaltar sección activa
  const sections = $$("section[id]");
  const linkFor = {};
  $$(".nav-links a").forEach(a => linkFor[a.getAttribute("href").slice(1)] = a);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        $$(".nav-links a").forEach(a => a.classList.remove("active"));
        const link = linkFor[en.target.id];
        if (link) link.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => spy.observe(s));

  /* ---------- Animación reveal al hacer scroll ---------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); } });
  }, { threshold: .12 });
  function reveal(node) { node.classList.add("reveal"); revealObs.observe(node); }

  /* ---------- Contadores del hero ---------- */
  const counters = $$(".stat-num");
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const node = en.target, target = +node.dataset.count;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => { cur = Math.min(target, cur + step); node.textContent = cur; if (cur < target) requestAnimationFrame(tick); };
      tick();
      countObs.unobserve(node);
    });
  }, { threshold: .6 });
  counters.forEach(c => countObs.observe(c));

  /* ---------- HISTORIA ---------- */
  const timeline = $("#timeline");
  DATA.timeline.forEach(t => {
    const item = el("div", "tl-item", `
      <div class="tl-era">${t.era}</div>
      <div class="tl-title">${t.title}</div>
      <div class="tl-text">${t.text}</div>`);
    timeline.appendChild(item);
    reveal(item);
  });

  /* ---------- ITEMS ---------- */
  const grid = $("#itemsGrid");
  const emptyState = $("#itemsEmpty");
  const filtersBox = $("#itemFilters");
  const searchInput = $("#itemSearch");
  let activeCat = "Todos";

  const rarityLabel = { common: "Común", rare: "Raro", epic: "Épico", legendary: "Legendario" };
  const rarityVar   = { common: "var(--r-common)", rare: "var(--r-rare)", epic: "var(--r-epic)", legendary: "var(--r-legendary)" };

  DATA.itemCategories.forEach(cat => {
    const chip = el("button", "chip" + (cat === "Todos" ? " active" : ""), cat);
    chip.addEventListener("click", () => {
      activeCat = cat;
      $$(".chip", filtersBox).forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderItems();
    });
    filtersBox.appendChild(chip);
  });

  function renderItems() {
    const q = searchInput.value.trim().toLowerCase();
    grid.innerHTML = "";
    const list = DATA.items.filter(it =>
      (activeCat === "Todos" || it.cat === activeCat) &&
      (!q || it.name.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q))
    );
    emptyState.hidden = list.length > 0;
    list.forEach(it => {
      const card = el("article", "item-card", `
        <div class="item-emoji">${it.emoji}</div>
        <div class="item-name">${it.name}</div>
        <div class="item-cat">${it.cat}</div>
        <div class="item-desc">${it.desc}</div>
        <span class="rarity-badge">${rarityLabel[it.rarity]}</span>`);
      card.style.setProperty("--rar", rarityVar[it.rarity]);
      grid.appendChild(card);
    });
  }
  searchInput.addEventListener("input", renderItems);
  renderItems();

  /* ---------- COMBINACIONES ---------- */
  const recipesBox = $("#recipesList");
  DATA.recipes.forEach(rc => {
    const node = el("article", "recipe", `
      <div class="recipe-name">${rc.name}</div>
      <div class="recipe-formula">
        <div class="recipe-ing"><span>${rc.a[0]}</span><small>${rc.a[1]}</small></div>
        <div class="recipe-op">+</div>
        <div class="recipe-ing"><span>${rc.b[0]}</span><small>${rc.b[1]}</small></div>
        <div class="recipe-op">=</div>
        <div class="recipe-ing recipe-result"><span>${rc.r[0]}</span><small>${rc.r[1]}</small></div>
      </div>
      <div class="recipe-note">💡 ${rc.note}</div>`);
    recipesBox.appendChild(node);
    reveal(node);
  });

  /* ---------- VILLANOS ---------- */
  const legend = $("#tierLegend");
  Object.values(DATA.tiers).forEach(t => {
    legend.appendChild(el("span", "tier-pill",
      `<span class="tier-dot" style="background:${t.color}"></span>${t.label}`));
  });

  const villBox = $("#villainsList");
  DATA.villains.forEach(v => {
    const tier = DATA.tiers[v.tier];
    const isGod = v.tier === "dios";
    const statsHtml = Object.entries(v.stats).map(([k, val]) =>
      `<div class="vstat"><span>${k}</span><div class="vbar"><i style="width:${val}%"></i></div></div>`).join("");
    const card = el("article", "villain" + (isGod ? " god" : ""), `
      ${isGod ? '<span class="god-badge">JEFE FINAL</span>' : ""}
      <div class="villain-top">
        <div class="villain-emoji">${v.emoji}</div>
        <span class="villain-tier">${tier.label}</span>
      </div>
      <div class="villain-name">${v.name}</div>
      <div class="villain-chapter">${v.chapter}</div>
      <div class="villain-desc">${v.desc}</div>
      <div class="villain-stats">${statsHtml}</div>`);
    card.style.setProperty("--tcol", tier.color);
    villBox.appendChild(card);
    reveal(card);
  });

  /* ---------- MAPA ---------- */
  const map = $("#map");
  const mInfoName = $("#mapInfoName");
  const mInfoDesc = $("#mapInfoDesc");
  const mInfoTag  = $("#mapInfoTag");

  function showRegion(r, node) {
    $$(".region", map).forEach(p => p.classList.remove("active"));
    if (node) node.classList.add("active");
    mInfoName.textContent = r.name;
    mInfoDesc.textContent = r.desc;
    mInfoTag.textContent  = r.tag;
    mInfoTag.hidden = false;
  }

  DATA.regions.forEach(r => {
    const dot = el("button", "region", `<span class="region-label">${r.name}</span>`);
    dot.style.left = r.x + "%";
    dot.style.top  = r.y + "%";
    dot.setAttribute("aria-label", r.name);
    dot.addEventListener("mouseenter", () => showRegion(r, dot));
    dot.addEventListener("focus", () => showRegion(r, dot));
    dot.addEventListener("click",  () => showRegion(r, dot));
    map.appendChild(dot);
  });

  /* ---------- NEWS ---------- */
  const newsBox = $("#newsList");
  DATA.news.forEach(n => {
    const card = el("article", "news-card", `
      <div class="news-banner" style="background:${n.color}">${n.emoji}</div>
      <div class="news-body">
        <span class="news-tag ${n.type}">${n.tag}</span>
        <span class="news-date"> · ${n.date}</span>
        <div class="news-title">${n.title}</div>
        <div class="news-text">${n.text}</div>
      </div>`);
    newsBox.appendChild(card);
    reveal(card);
  });

  /* ---------- Año footer ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
