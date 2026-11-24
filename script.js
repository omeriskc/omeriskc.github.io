// WhatsApp numarası (başında ülke kodu, + ve boşluk olmadan)
const WHATSAPP_NUMBER = "905550000000";

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

// Formları WhatsApp mesajına çevir
document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const labels = {
      ad: "Ad Soyad",
      telefon: "Telefon",
      hizmet: "Hizmet",
      adres: "İlçe / Semt",
      mesaj: "Mesaj",
    };

    let text = "Merhaba, web sitenizden ulaşıyorum.\n\n";
    for (const [key, value] of data.entries()) {
      if (value.trim()) text += `${labels[key] || key}: ${value.trim()}\n`;
    }

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );
    form.reset();
  });
});

// Yıl
document.getElementById("year").textContent = new Date().getFullYear();
