/* =========================================
   CARL HAIDEN MALLORCA CAMPAIGN
   FINAL SCRIPT
   ========================================= */

function showPage(targetId) {

  const sections = document.querySelectorAll("main > section");
  const navLinks = document.querySelectorAll(".nav nav a");

  sections.forEach(section => {
    section.classList.remove("page-active");
  });

  const target = document.querySelector(targetId);

  if (!target) return;

  target.classList.add("page-active");

  target.querySelectorAll(".reveal").forEach(element => {
    element.classList.add("visible");
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === targetId
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}

window.showPage = showPage;


document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------
     NAVIGATION
  ----------------------------- */

  const navLinks = document.querySelectorAll(".nav nav a");
  const mobileNav = document.querySelector(".nav nav");
  const menuBtn = document.getElementById("menuBtn");

  showPage("#home");

  navLinks.forEach(link => {

    link.addEventListener("click", event => {

      event.preventDefault();

      const targetId = link.getAttribute("href");

      showPage(targetId);

      if (mobileNav) {
        mobileNav.classList.remove("open");
      }

    });

  });

  if (menuBtn && mobileNav) {

    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });

  }


  /* -----------------------------
     REVEAL ANIMATIONS
  ----------------------------- */

  const revealElements = document.querySelectorAll(".reveal");

  revealElements.forEach(element => {
    if (element.closest("#home")) {
      element.classList.add("visible");
    }
  });


  /* -----------------------------
     PLATFORM MODAL
  ----------------------------- */

  const platforms = document.querySelectorAll(".platform");

  const modal = document.getElementById("platformModal");
  const closeModalButton = document.getElementById("closeModal");

  const modalEyebrow = document.getElementById("modalEyebrow");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const modalList = document.getElementById("modalList");

  const platformData = {

    wellbeing: {
      eyebrow: "PLATFORM 01",
      title: "Youth Mental & Spiritual Well-Being",

      text:
        "I want to help create a youth ministry environment where young people feel welcomed, heard, and supported.",

      list: [
        "Prayer and reflection activities",
        "Welcoming spaces for youth",
        "Encouraging meaningful conversations",
        "Activities that strengthen faith and community"
      ]
    },

    worship: {
      eyebrow: "PLATFORM 02",
      title: "Meaningful Worship & Liturgy",

      text:
        "I want to help young people understand that worship is not simply something we attend, but something we actively participate in.",

      list: [
        "Encourage active participation",
        "Help explain the meaning behind liturgical celebrations",
        "Support youth involvement in worship",
        "Make liturgical activities more meaningful"
      ]
    }

  };


  platforms.forEach(platform => {

    platform.addEventListener("click", () => {

      const type = platform.dataset.platform;
      const data = platformData[type];

      if (!data || !modal) return;

      modalEyebrow.textContent = data.eyebrow;
      modalTitle.textContent = data.title;
      modalText.textContent = data.text;

      modalList.innerHTML = "";

      data.list.forEach(item => {

        const paragraph = document.createElement("p");

        paragraph.textContent = "• " + item;

        modalList.appendChild(paragraph);

      });

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");

    });

  });


  function closePlatformModal() {

    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

  }

  if (closeModalButton) {
    closeModalButton.addEventListener(
      "click",
      closePlatformModal
    );
  }

  if (modal) {

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        closePlatformModal();
      }

    });

  }


  /* -----------------------------
     ONE MORE THING
  ----------------------------- */

  const surpriseBtn = document.getElementById("surpriseBtn");
  const toast = document.getElementById("toast");

  if (surpriseBtn && toast) {

    surpriseBtn.addEventListener("click", () => {

      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 3500);

    });

  }


  /* -----------------------------
     SECRET CAT
  ----------------------------- */

  let pressCount = 0;

  document.addEventListener("keydown", event => {

    if (event.key.toLowerCase() === "c") {

      pressCount++;

      if (pressCount >= 3) {

        document.body.classList.toggle("secret-cat");

        pressCount = 0;

      }

    }

  });


  /* -----------------------------
     MUSIC
  ----------------------------- */

  const musicFrame = document.getElementById("musicFrame");
  const musicBtn = document.getElementById("musicBtn");
  const musicStatus = document.getElementById("musicStatus");

  const floatingMusicBtn =
    document.getElementById("floatingMusicBtn");

  const floatingMusicText =
    document.getElementById("floatingMusicText");

  let musicPlaying = false;


  function sendYouTubeCommand(command) {

    if (!musicFrame || !musicFrame.contentWindow) return;

    musicFrame.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: []
      }),
      "*"
    );

  }


  function playSong() {

    sendYouTubeCommand("playVideo");

    musicPlaying = true;

    if (musicBtn) {
      musicBtn.textContent = "⏸ Pause Campaign Song";
    }

    if (musicStatus) {
      musicStatus.textContent = "Now playing";
    }

    if (floatingMusicText) {
      floatingMusicText.textContent = "Pause Song";
    }

  }


  function pauseSong() {

    sendYouTubeCommand("pauseVideo");

    musicPlaying = false;

    if (musicBtn) {
      musicBtn.textContent = "▶ Play Campaign Song";
    }

    if (musicStatus) {
      musicStatus.textContent = "Music for the journey";
    }

    if (floatingMusicText) {
      floatingMusicText.textContent = "Play Song";
    }

  }


  function toggleMusic() {

    if (musicPlaying) {
      pauseSong();
    } else {
      playSong();
    }

  }


  if (musicBtn) {
    musicBtn.addEventListener("click", toggleMusic);
  }

  if (floatingMusicBtn) {
    floatingMusicBtn.addEventListener(
      "click",
      toggleMusic
    );
  }


  /* -----------------------------
     ESCAPE KEY
  ----------------------------- */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closePlatformModal();

      if (mobileNav) {
        mobileNav.classList.remove("open");
      }

    }

  });

});
