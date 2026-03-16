const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const menu = document.querySelector("[data-nav-menu]");

function closeMenu() {
  if (!toggle || !menu) return;
  toggle.setAttribute("aria-expanded", "false");
  menu.classList.remove("is-open");
}

function openMenu() {
  if (!toggle || !menu) return;
  toggle.setAttribute("aria-expanded", "true");
  menu.classList.add("is-open");
}

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    const clickedInside = menu.contains(target) || toggle.contains(target);
    if (!clickedInside) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });
}

// Reveal-on-scroll for subtle premium motion
const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const items = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.18 }
  );
  items.forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Improve in-page anchor focus behavior on keyboard
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", () => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    const el = document.querySelector(href);
    if (el && el instanceof HTMLElement) {
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      window.setTimeout(() => el.removeAttribute("tabindex"), 600);
    }
  });
});

