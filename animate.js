// Images on the first screen show a still frame first. Their animated GIFs
// (several MB in total) load when the visitor first scrolls or touches the
// page, so they never compete with the main banner on a slow connection.
(function () {
  const events = ["scroll", "touchstart", "pointerdown", "mousemove", "keydown"];
  const animate = () => {
    events.forEach((t) => window.removeEventListener(t, animate));
    document.documentElement.classList.add("animated");
    document.querySelectorAll("img[data-anim]").forEach((el) => { el.src = el.dataset.anim; });
  };
  events.forEach((t) => window.addEventListener(t, animate, { passive: true }));
})();
