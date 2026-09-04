// ===============================
// SCROLL REVEAL
// ===============================

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(el => observer.observe(el));


// ===============================
// PLATFORM MODAL
// ===============================

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

    if (!data || !modal) return;

    modalEyebrow.textContent = data.eyebrow;
    modalTitle.textContent = data.title;
    modalText.textContent = data.text;

    modalList.innerHTML =
      "<ul>" +
      data.list.map(item => `<li>${item}</li>`).join("") +
      "</ul>";

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeTheModal() {
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

if (closeModal) {
  closeModal.addEventListener("click", closeTheModal);
}

if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      closeTheModal();
    }
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeTheModal();
  }
});


// ===============================
// SURPRISE BUTTON
// ===============================

const surpriseBtn = document.getElementById("surpriseBtn");
const toast = document.getElementById("toast");

if (surpriseBtn && toast) {
  surpriseBtn.addEventListener("click", () => {

    toast.textContent =
      "Thank you for taking the time to know the campaign. 💚";

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  });
}


// ===============================
// SECRET CAT
// Press C three times
// ===============================

let catClicks = 0;

document.addEventListener("keydown", e => {

  if (e.key.toLowerCase() === "c") {

    catClicks++;

    if (catClicks >= 3 && toast) {

      toast.textContent = "🐈 MEOOOW. Secret cat unlocked.";

      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);

      catClicks = 0;
    }
  }
});


// ===============================
// MOBILE MENU
// ===============================

const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav nav");

if (menuButton && nav) {

  menuButton.addEventListener("click", () => {

    nav.classList.toggle("show");

  });
}


// ===============================
// CAMPAIGN SONG
// ===============================

const musicBtn = document.getElementById("musicBtn");
const floatingMusicBtn = document.getElementById("floatingMusicBtn");
const floatingMusicText = document.getElementById("floatingMusicText");
const musicStatus = document.getElementById("musicStatus");
const musicFrame = document.getElementById("musicFrame");

let musicPlaying = false;

function playCampaignSong() {

  if (!musicFrame) return;

  musicFrame.src =
    "https://www.youtube.com/embed/-oK7SheOEA0?autoplay=1&enablejsapi=1";

  musicPlaying = true;

  if (musicBtn) {
    musicBtn.textContent = "🎵 Campaign Song Playing";
  }

  if (floatingMusicText) {
    floatingMusicText.textContent = "Song Playing";
  }

  if (musicStatus) {
    musicStatus.textContent =
      "Campaign song is playing while you explore.";
  }
}

if (musicBtn) {
  musicBtn.addEventListener("click", playCampaignSong);
}

if (floatingMusicBtn) {
  floatingMusicBtn.addEventListener("click", playCampaignSong);
}


// ===============================
// SMOOTH SCROLL FOR NAV LINKS
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", e => {

    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    // Close mobile menu after clicking
    if (nav) {
      nav.classList.remove("show");
    }
  });
});
