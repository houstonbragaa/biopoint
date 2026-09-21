// =========================================================
// ELO — Landing Page
// Loading inicial + scroll suave + nav reativo + menu mobile
// =========================================================

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var body = document.body;
  var loader = document.getElementById("loader");

  // ---------------------------------------------------------
  // Tela de carregamento inicial
  // ---------------------------------------------------------
  var MIN_LOADER_TIME = prefersReducedMotion ? 0 : 900;
  var startTime = Date.now();

  function finishLoading() {
    var elapsed = Date.now() - startTime;
    var remaining = Math.max(MIN_LOADER_TIME - elapsed, 0);

    window.setTimeout(function () {
      body.classList.remove("is-loading");
      if (loader) {
        loader.classList.add("is-done");
        loader.addEventListener(
          "transitionend",
          function () { loader.remove(); },
          { once: true }
        );
      }
    }, remaining);
  }

  if (document.readyState === "complete") {
    finishLoading();
  } else {
    window.addEventListener("load", finishLoading);
  }

  // ---------------------------------------------------------
  // Revelação suave ao rolar a página
  // ---------------------------------------------------------
  var revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---------------------------------------------------------
  // Menu fixo: ganha fundo sólido depois de rolar um pouco
  // ---------------------------------------------------------
  var nav = document.getElementById("nav");

  function updateNavBackground() {
    if (window.scrollY > 24) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }

  if (nav) {
    updateNavBackground();
    window.addEventListener("scroll", updateNavBackground, { passive: true });
  }

  // ---------------------------------------------------------
  // Menu mobile (hambúrguer)
  // ---------------------------------------------------------
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMobile.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMobile.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
