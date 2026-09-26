document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navigation-bar a.btn");
  const sections = document.querySelectorAll("section[id]");

  let isClickScrolling = false;
  let scrollTimeout = null;

  // Helper om de actieve class te wisselen
  function setActiveLink(targetId) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${targetId}`) {
        link.classList.add("btn--filled");
      } else {
        link.classList.remove("btn--filled");
      }
    });
  }

  // 1. Bij klikken op een nav-item
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").replace("#", "");
      
      // Zet de active status direct op het geklikte item
      setActiveLink(targetId);

      // Blokkeer de observer tijdens het scrollen
      isClickScrolling = true;

      // Reset de timer als er snel achter elkaar geklikt wordt
      if (scrollTimeout) clearTimeout(scrollTimeout);

      // Schakel de observer pas weer in nadat de smooth scroll klaar is (1000ms)
      scrollTimeout = setTimeout(() => {
        isClickScrolling = false;
      }, 1000);
    });
  });

  // 2. Bij handmatig scrollen automatisch actief maken
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    // Als er door een klik wordt gescroold, negeren we de tussenliggende secties
    if (isClickScrolling) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
});