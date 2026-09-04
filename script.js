document.addEventListener("DOMContentLoaded", () => {

  /* ============================
     NAVIGATION
  ============================ */

  const navLinks = document.querySelectorAll(".nav nav a");
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mainNav");

  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      if (mobileNav) {
        mobileNav.classList.remove("open");
      }

    });

  });


  /* ============================
     ACTIVE TAB WHILE SCROLLING
  ============================ */

  const sections = document.querySelectorAll("main section[id]");

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {
            link.classList.remove("active");
          });

          const activeLink = document.querySelector(
            `.nav nav a[href="#${entry.target.id}"]`
          );

          if (activeLink) {
            activeLink.classList.add("active");
          }

        }

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach(section => {
    observer.observe(section);
  });


  /* ============================
     MOBILE MENU
  ============================ */

  if (menuBtn && mobileNav) {

    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });

  }


  /* ============================
     REVEAL ANIMATIONS
  ============================ */

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.1
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* ============================
     PLATFORM MODAL
  ============================ */

  const platforms =
    document.querySelectorAll(".platform");

  const modal =
    document.getElementById("platformModal");

  const closeModal =
    document.getElementById("closeModal");

  const modalEyebrow =
    document.getElementById("modalEyebrow");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalText =
    document.getElementById("modalText");

  const modalList =
    document.getElementById("modalList");


  const platformData = {

    wellbeing: {

      eyebrow: "PLATFORM 01",

      title:
        "Youth Mental & Spiritual Well-Being",

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

      title:
        "Meaningful Worship & Liturgy",

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

      const type =
        platform.dataset.platform;

      const data =
        platformData[type];

      if (!data || !modal) return;

      modalEyebrow.textContent =
        data.eyebrow;

      modalTitle.textContent =
        data.title;

      modalText.textContent =
        data.text;

      modalList.innerHTML = "";

      data.list.forEach(item => {

        const p =
          document.createElement("p");

        p.textContent = "• " + item;

        modalList.appendChild(p);

      });

      modal.classList.add("open");

    });

  });


  function closePlatformModal() {

    if (!modal) return;

    modal.classList.remove("open");

  }


  if (closeModal) {

    closeModal.addEventListener(
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


  /* ============================
     ONE MORE THING
  ============================ */

  const surpriseBtn =
    document.getElementById("surpriseBtn");

  const toast =
    document.getElementById("toast");

  if (surpriseBtn && toast) {

    surpriseBtn.addEventListener("click", () => {

      toast.classList.add("show");

      setTimeout(() => {

        toast.classList.remove("show");

      }, 3500);

    });

  }


  /* ============================
     MUSIC
  ============================ */

  const musicFrame =
    document.getElementById("musicFrame");

  const musicBtn =
    document.getElementById("musicBtn");

  const musicStatus =
    document.getElementById("musicStatus");

  const floatingMusicBtn =
    document.getElementById("floatingMusicBtn");

  const floatingMusicText =
    document.getElementById("floatingMusicText");

  let musicPlaying = false;


  function sendYouTubeCommand(command) {

    if (
      !musicFrame ||
      !musicFrame.contentWindow
    ) {
      return;
    }

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
      musicBtn.textContent =
        "⏸ Pause Campaign Song";
    }

    if (musicStatus) {
      musicStatus.textContent =
        "Now playing";
    }

    if (floatingMusicText) {
      floatingMusicText.textContent =
        "Pause Song";
    }

  }


  function pauseSong() {

    sendYouTubeCommand("pauseVideo");

    musicPlaying = false;

    if (musicBtn) {
      musicBtn.textContent =
        "▶ Play Campaign Song";
    }

    if (musicStatus) {
      musicStatus.textContent =
        "Music for the journey";
    }

    if (floatingMusicText) {
      floatingMusicText.textContent =
        "Play Song";
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

    musicBtn.addEventListener(
      "click",
      toggleMusic
    );

  }


  if (floatingMusicBtn) {

    floatingMusicBtn.addEventListener(
      "click",
      toggleMusic
    );

  }


  /* ============================
     ESCAPE
  ============================ */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closePlatformModal();

      if (mobileNav) {
        mobileNav.classList.remove("open");
      }

    }

  });

});document.addEventListener("DOMContentLoaded", () => {

  /* ============================
     NAVIGATION
  ============================ */

  const navLinks = document.querySelectorAll(".nav nav a");
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mainNav");

  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      if (mobileNav) {
        mobileNav.classList.remove("open");
      }

    });

  });


  /* ============================
     ACTIVE TAB WHILE SCROLLING
  ============================ */

  const sections = document.querySelectorAll("main section[id]");

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {
            link.classList.remove("active");
          });

          const activeLink = document.querySelector(
            `.nav nav a[href="#${entry.target.id}"]`
          );

          if (activeLink) {
            activeLink.classList.add("active");
          }

        }

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach(section => {
    observer.observe(section);
  });


  /* ============================
     MOBILE MENU
  ============================ */

  if (menuBtn && mobileNav) {

    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });

  }


  /* ============================
     REVEAL ANIMATIONS
  ============================ */

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.1
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* ============================
     PLATFORM MODAL
  ============================ */

  const platforms =
    document.querySelectorAll(".platform");

  const modal =
    document.getElementById("platformModal");

  const closeModal =
    document.getElementById("closeModal");

  const modalEyebrow =
    document.getElementById("modalEyebrow");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalText =
    document.getElementById("modalText");

  const modalList =
    document.getElementById("modalList");


  const platformData = {

    wellbeing: {

      eyebrow: "PLATFORM 01",

      title:
        "Youth Mental & Spiritual Well-Being",

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

      title:
        "Meaningful Worship & Liturgy",

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

      const type =
        platform.dataset.platform;

      const data =
        platformData[type];

      if (!data || !modal) return;

      modalEyebrow.textContent =
        data.eyebrow;

      modalTitle.textContent =
        data.title;

      modalText.textContent =
        data.text;

      modalList.innerHTML = "";

      data.list.forEach(item => {

        const p =
          document.createElement("p");

        p.textContent = "• " + item;

        modalList.appendChild(p);

      });

      modal.classList.add("open");

    });

  });


  function closePlatformModal() {

    if (!modal) return;

    modal.classList.remove("open");

  }


  if (closeModal) {

    closeModal.addEventListener(
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


  /* ============================
     ONE MORE THING
  ============================ */

  const surpriseBtn =
    document.getElementById("surpriseBtn");

  const toast =
    document.getElementById("toast");

  if (surpriseBtn && toast) {

    surpriseBtn.addEventListener("click", () => {

      toast.classList.add("show");

      setTimeout(() => {

        toast.classList.remove("show");

      }, 3500);

    });

  }


  /* ============================
     MUSIC
  ============================ */

  const musicFrame =
    document.getElementById("musicFrame");

  const musicBtn =
    document.getElementById("musicBtn");

  const musicStatus =
    document.getElementById("musicStatus");

  const floatingMusicBtn =
    document.getElementById("floatingMusicBtn");

  const floatingMusicText =
    document.getElementById("floatingMusicText");

  let musicPlaying = false;


  function sendYouTubeCommand(command) {

    if (
      !musicFrame ||
      !musicFrame.contentWindow
    ) {
      return;
    }

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
      musicBtn.textContent =
        "⏸ Pause Campaign Song";
    }

    if (musicStatus) {
      musicStatus.textContent =
        "Now playing";
    }

    if (floatingMusicText) {
      floatingMusicText.textContent =
        "Pause Song";
    }

  }


  function pauseSong() {

    sendYouTubeCommand("pauseVideo");

    musicPlaying = false;

    if (musicBtn) {
      musicBtn.textContent =
        "▶ Play Campaign Song";
    }

    if (musicStatus) {
      musicStatus.textContent =
        "Music for the journey";
    }

    if (floatingMusicText) {
      floatingMusicText.textContent =
        "Play Song";
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

    musicBtn.addEventListener(
      "click",
      toggleMusic
    );

  }


  if (floatingMusicBtn) {

    floatingMusicBtn.addEventListener(
      "click",
      toggleMusic
    );

  }


  /* ============================
     ESCAPE
  ============================ */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closePlatformModal();

      if (mobileNav) {
        mobileNav.classList.remove("open");
      }

    }

  });

});
