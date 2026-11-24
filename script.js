// WhatsApp numarası (ülke kodu ile, + ve boşluk olmadan)
const WHATSAPP_NUMBER = "905550000000";

// Header: kaydırınca arka plan
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobil menü
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  nav.classList.toggle("open");
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    toggle.classList.remove("open");
    nav.classList.remove("open");
  })
);

// Kaydırınca beliren öğeler + sayaçlar
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const prefix = el.dataset.prefix || "";
  if (el.dataset.text || !target) return;
  const start = performance.now();
  const dur = 1600;
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(target * eased);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// Hizmet kartlarında fareyi takip eden ışık efekti
document.querySelectorAll(".service").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// Formları WhatsApp mesajına çevir
const labels = {
  ad: "Ad Soyad",
  telefon: "Telefon",
  hizmet: "Hizmet",
  adres: "İlçe / Semt",
  mesaj: "Mesaj",
};

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let text = "Merhaba Kaytes, web sitenizden servis talebi oluşturuyorum.\n\n";
    for (const [key, value] of new FormData(form).entries()) {
      if (value.trim()) text += `${labels[key] || key}: ${value.trim()}\n`;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    form.reset();
  });
});

// Yıl
document.getElementById("year").textContent = new Date().getFullYear();
