// Folds long text sections (.collapsible) to a short preview with a
// "Baca lagi / Sembunyi" button. The text stays in the page, so search
// engines still read it.
document.querySelectorAll(".collapsible").forEach((box) => {
  if (box.scrollHeight <= box.clientHeight + 60) {
    box.classList.add("open");
    return;
  }
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "toggle-btn";
  btn.setAttribute("aria-expanded", "false");
  btn.textContent = "Baca lagi ▾";
  btn.addEventListener("click", () => {
    const open = box.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Sembunyi ▴" : "Baca lagi ▾";
    if (!open) box.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
  box.after(btn);
});
