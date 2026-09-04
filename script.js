```javascript
/* =========================================
   CARL HAIDEN MALLORCA CAMPAIGN
   FIXED SCRIPT
   ========================================= */


/* =========================================
   PAGE NAVIGATION
   ========================================= */

function showPage(targetId) {

  const sections = document.querySelectorAll("main > section");
  const navLinks = document.querySelectorAll(".nav nav a");

  /* Hide all sections */
  sections.forEach(section => {
    section.classList.remove("page-active");
  });

  /* Show selected section */
  const target = document.querySelector(targetId);

  if (target) {
    target.classList.add("page-active");

    /* Make content visible */
    target.querySelectorAll(".reveal").forEach(element => {
      element.classList.add("visible");
    });
  }

  /* Update active navigation */
  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === targetId) {
      link.classList.add("active");
    }

  });

}


/* Make it available to HTML onclick buttons */
window.showPage = showPage;



/* =========================================
   EVERYTHING STARTS AFTER PAGE LOAD
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =========================================
     INITIAL PAGE
     ========================================= */

  showPage("#home");


  /* =========================================
     NAVIGATION LINKS
     ========================================= */

  const navLinks = document.querySelectorAll(".nav nav a");

  navLinks.forEach(link => {

    link.addEventListener("click", event => {

      event.preventDefault();

      const targetId = link.getAttribute("href");

      showPage(targetId);

      /* Close mobile menu */
      const nav = document.querySelector(".nav nav");

      if (nav) {
        nav.classList.remove("open");
      }

    });

  });



  /* =========================================
     REVEAL ANIMATIONS
     ========================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }

        });

      },
      {
        threshold: 0.1
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    /* Fallback for older browsers */

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }



  /* =========================================
     PLATFORM MODAL
     ========================================= */

  const platforms = document.querySelectorAll(".platform");

  const modal = document.getElementById("platformModal");
  const closeModal = document.getElementById("closeModal");

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


      if (modalEyebrow) {
        modalEyebrow.textContent = data.eyebrow;
      }

      if (modalTitle) {
        modalTitle.textContent = data.title;
      }

      if (modalText) {
        modalText.textContent = data.text;
      }


      if (modalList) {

        modalList.innerHTML = "";

        data.list.forEach(item => {

          const p = document.createElement("p");

          p.textContent = "• " + item;

          modalList.appendChild(p);

        });

      }


      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");

    });

  });



  /* =========================================
     CLOSE MODAL
     ========================================= */

  function closePlatformModal() {

    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

  }


  if (closeModal) {

    closeModal.addEventListener("click", closePlatformModal);

  }


  if (modal) {

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        closePlatformModal();
      }

    });

  }



  /* =========================================
     SURPRISE BUTTON
     ========================================= */

  const surpriseBtn = document.getElementById("surpriseBtn");
  const toast = document.getElementById("toast");


  if (surpriseBtn) {

    surpriseBtn.addEventListener("click", () => {

      if (!toast) return;

      toast.classList.add("show");

      setTimeout(() => {

        toast.classList.remove("show");

      }, 3500);

    });

  }



  /* =========================================
     SECRET CAT
     ========================================= */

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



  /* =========================================
     MOBILE MENU
     ========================================= */

  const menuBtn = document.querySelector(".menu-btn");
  const mobileNav = document.querySelector(".nav nav");


  if (menuBtn && mobileNav) {

    menuBtn.addEventListener("click", () => {

      mobileNav.classList.toggle("open");

    });

  }



  /* =========================================
     YOUTUBE CAMPAIGN SONG
     ========================================= */

  const musicFrame = document.getElementById("musicFrame");

  const musicBtn = document.getElementById("musicBtn");

  const musicStatus = document.getElementById("musicStatus");

  const floatingMusicBtn =
    document.getElementById("floatingMusicBtn");

  const floatingMusicText =
    document.getElementById("floatingMusicText");


  let musicPlaying = false;


  function playSong() {

    if (!musicFrame) return;


    musicFrame.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "playVideo",
        args: []
      }),
      "*"
    );


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

    if (!musicFrame) return;


    musicFrame.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "pauseVideo",
        args: []
      }),
      "*"
    );


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
    floatingMusicBtn.addEventListener("click", toggleMusic);
  }



  /* =========================================
     ESCAPE KEY
     ========================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closePlatformModal();

      if (mobileNav) {
        mobileNav.classList.remove("open");
      }

    }

  });

});
```

