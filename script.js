const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(el => observer.observe(el));

const modal = document.getElementById("platformModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalText = document.getElementById("modalText");
const modalList = document.getElementById("modalList");

const platformData = {
  wellbeing: {
    eyebrow: "PLATFORM 01",
    title: "Youth Mental & Spiritual Well-Being",
    text: "I want to create a safe, welcoming, and prayerful space where the youth can freely express their struggles, worries, and experiences without fear of being judged.",
    list: [
      "Taizé Prayer — a peaceful time of prayer, silence, reflection, and songs.",
      "Krisma — a space for sharing, reflection, and strengthening faith.",
      "Small faith-sharing and reflection sessions.",
      "Listening and prayer circles."
    ]
  },
  worship: {
    eyebrow: "PLATFORM 02",
    title: "Meaningful Worship & Liturgy",
    text: "I want to help make our worship more meaningful, understandable, and engaging for the youth. It should be something we understand, participate in, and carry into daily life.",
    list: [
      "Help the youth understand the meaning behind liturgical celebrations.",
      "Provide moments for reflection before or after worship.",
      "Give more opportunities for the youth to serve.",
      "Make celebrations more welcoming and meaningful."
    ]
  }
};

document.querySelectorAll(".platform").forEach(card => {
  card.addEventListener("click", () => {
    const data = platformData[card.dataset.platform];
    modalEyebrow.textContent = data.eyebrow;
    modalTitle.textContent = data.title;
    modalText.textContent = data.text;
    modalList.innerHTML = "<ul>" + data.list.map(item => `<li>${item}</li>`).join("") + "</ul>";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeTheModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", closeTheModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeTheModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeTheModal();
});

document.getElementById("surpriseBtn").addEventListener("click", () => {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
});

let catClicks = 0;

document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "c") {
    catClicks++;
    if (catClicks >= 3) {
      const toast = document.getElementById("toast");
      toast.textContent = "🐈 MEOOOW. Secret cat unlocked.";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
      catClicks = 0;
    }
  }
});

document.querySelector(".menu-btn").addEventListener("click", () => {
  const nav = document.querySelector(".nav nav");
  const open = nav.style.display === "flex";
  nav.style.display = open ? "" : "flex";

  if (!open) {
    nav.style.position = "absolute";
    nav.style.top = "68px";
    nav.style.right = "7vw";
    nav.style.flexDirection = "column";
    nav.style.background = "var(--paper)";
    nav.style.padding = "18px";
    nav.style.border = "1px solid var(--line)";
  }
});
