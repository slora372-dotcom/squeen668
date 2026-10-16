// Guide pages: point the buttons at the links in config.js.
document.querySelectorAll("[data-link]").forEach((el) => {
  el.href = window.SITE.links[el.dataset.link] || "#";
});
