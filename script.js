(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const link = (key) => esc(S.links[key] || "#");

  // ---------- Carousel ----------
  const track = $("carouselTrack");
  const dots = $("carouselDots");
  track.innerHTML = S.banners.map((src, i) =>
    `<a class="slide" href="${link("register")}"><img src="${esc(src)}" alt="Promosi ${esc(S.brand.name)} ${i + 1}" width="1198" height="475"${i ? ' loading="lazy"' : ' fetchpriority="high"'}></a>`
  ).join("");
  dots.innerHTML = S.banners.map((_, i) => `<button aria-label="Slide ${i + 1}"></button>`).join("");

  let slide = 0;
  const goTo = (i) => {
    slide = (i + S.banners.length) % S.banners.length;
    track.scrollTo({ left: slide * track.clientWidth, behavior: "smooth" });
  };
  const syncDots = () => {
    slide = Math.round(track.scrollLeft / track.clientWidth);
    [...dots.children].forEach((d, i) => d.classList.toggle("active", i === slide));
  };
  [...dots.children].forEach((d, i) => d.addEventListener("click", () => goTo(i)));
  track.addEventListener("scroll", syncDots, { passive: true });
  syncDots();
  // The first banner stays for 8s before rotating every 4s. A slide change in
  // the first few seconds makes speed tests count the page as still loading.
  let timer = setTimeout(() => {
    goTo(slide + 1);
    timer = setInterval(() => goTo(slide + 1), 4000);
  }, 8000);
  track.addEventListener("pointerdown", () => { clearTimeout(timer); clearInterval(timer); }, { once: true });

  // ---------- Referral ----------
  const copyLink = () =>
    navigator.clipboard.writeText(S.referralUrl).then(() => toast("Link referral disalin"), () => toast(S.referralUrl));
  $("copyBtn").addEventListener("click", copyLink);
  $("shareBtn").addEventListener("click", () => {
    if (navigator.share) navigator.share({ title: S.brand.name, url: S.referralUrl }).catch(() => {});
    else copyLink();
  });

  // ---------- Games ----------
  $("hotGames").innerHTML = S.hotGames.map((src, i) =>
    `<a class="hot" href="${link("games")}"><img src="${esc(src)}" alt="Hot game ${i + 1}" width="300" height="353" loading="lazy"></a>`
  ).join("");
  $("categories").innerHTML = S.categories.map((c, i) =>
    `<a class="cat${i ? "" : " on"}" href="${link("games")}"><img src="${esc(c.img)}" alt="${esc(c.label)}" width="120" height="106" loading="lazy"></a>`
  ).join("");
  $("games").innerHTML = S.games.map((g) =>
    `<a class="game" href="${link("games")}"><img src="${esc(g.img)}" alt="${esc(g.name)}" width="300" height="450" loading="lazy"><span class="play">PLAY</span></a>`
  ).join("");

  // ---------- Footer ----------
  $("payments").innerHTML = S.payments.map((p) => `<img src="${esc(p.img)}" alt="${esc(p.name)}" width="36" height="36" loading="lazy">`).join("");
  $("socials").innerHTML = S.socials.map((s) =>
    `<a href="${esc(s.url)}" target="_blank" rel="noopener"><img src="${esc(s.img)}" alt="${esc(s.name)}" width="36" height="36" loading="lazy"></a>`
  ).join("");

  // ---------- Links ----------
  document.querySelectorAll("[data-link]").forEach((el) => {
    el.href = S.links[el.dataset.link] || "#";
  });

  // ---------- Toast ----------
  let toastTimer;
  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }
})();
