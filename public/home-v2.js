/* Home v2 — comportements de la refonte (août 2026).
 *
 * Remplace la logique React de la maquette Claude Design par du JS natif :
 *   1. onglets Attirer / Convertir / Vendre
 *   2. frise S9 qui se pose au scroll + compteurs de points
 *   3. neutralisation de l'envoi des formulaires (pas encore de destination)
 *
 * Ce fichier est chargé uniquement par la home (voir HomeV2Fr.astro).
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ------------------------------------------------------------------ *
   * 1. Onglets
   * ------------------------------------------------------------------ */

  function initTabs() {
    var tablist = document.querySelector(".hv2-tabs");
    if (!tablist) return;

    var tabs = Array.prototype.slice.call(tablist.querySelectorAll(".hv2-tab"));
    if (!tabs.length) return;

    function select(index, moveFocus) {
      tabs.forEach(function (tab, i) {
        var selected = i === index;
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;

        var panel = document.getElementById(tab.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      if (moveFocus) tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        select(i, false);
      });

      tab.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowRight") next = (i + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;

        if (next !== null) {
          event.preventDefault();
          select(next, true);
        }
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 2. Frise S9
   * ------------------------------------------------------------------ */

  var STEP_DELAYS = [500, 1500, 2000, 3500, 4500];

  function animateChip(chip) {
    var target = parseInt(chip.getAttribute("data-chip"), 10);
    var big = chip.getAttribute("data-chip-big") === "true";
    var valueEl = chip.querySelector("[data-chip-value]");
    if (!target || !valueEl) return;

    chip.style.scale = big ? "1.25" : "1.15";
    chip.classList.add("is-up");
    window.setTimeout(function () {
      chip.classList.remove("is-up");
    }, 300);
    window.setTimeout(function () {
      chip.style.scale = "1";
    }, 350);

    var start = performance.now();
    var duration = target > 10 ? 600 : 300;

    function step(now) {
      var progress = Math.min(1, (now - start) / duration);
      // easing cubic-out, comme dans la maquette
      valueEl.textContent = String(
        Math.round(target * (1 - Math.pow(1 - progress, 3))),
      );

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else if (big) {
        chip.classList.add("is-flash");
        window.setTimeout(function () {
          chip.classList.remove("is-flash");
        }, 260);
      }
    }

    window.requestAnimationFrame(step);
  }

  function revealAllImmediately(cards) {
    cards.forEach(function (card) {
      card.classList.add("is-landed");
      var chip = card.querySelector(".hv2-tl__chip");
      if (chip) {
        chip.style.scale = "1";
        var valueEl = chip.querySelector("[data-chip-value]");
        if (valueEl) valueEl.textContent = chip.getAttribute("data-chip");
      }
    });
  }

  function initTimeline() {
    var root = document.querySelector("[data-timeline]");
    if (!root) return;

    var cards = Array.prototype.slice.call(root.querySelectorAll(".hv2-tl"));
    if (!cards.length) return;

    if (prefersReducedMotion) {
      revealAllImmediately(cards);
      return;
    }

    var played = false;

    function play() {
      if (played) return;
      played = true;

      cards.forEach(function (card, i) {
        var delay = STEP_DELAYS[i] != null ? STEP_DELAYS[i] : 500 + i * 1000;

        window.setTimeout(function () {
          card.classList.add("is-landed");

          var chip = card.querySelector(".hv2-tl__chip");
          if (!chip) return;

          var big = chip.getAttribute("data-chip-big") === "true";
          window.setTimeout(
            function () {
              animateChip(chip);
            },
            big ? 550 : 250,
          );
        }, delay);
      });
    }

    if (!("IntersectionObserver" in window)) {
      play();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            play();
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -15% 0px" },
    );

    observer.observe(root);

    // Filet de sécurité : si l'observer ne déclenche jamais (page très courte,
    // navigateur exotique), on joue quand même la séquence.
    window.setTimeout(function () {
      if (!played) {
        play();
        observer.disconnect();
      }
    }, 9000);
  }

  /* ------------------------------------------------------------------ *
   * 3. Formulaires de diagnostic
   * ------------------------------------------------------------------ */

  // Les trois formulaires de diagnostic partagent le même comportement :
  // on valide les deux champs, puis on affiche la modale de confirmation.
  //
  // ATTENTION : rien n'est encore envoyé nulle part. La modale annonce un mail
  // que personne n'envoie. Quand une destination existera, c'est sendDiagnostic()
  // ci-dessous — et elle seule — qu'il faudra remplir, en n'ouvrant la modale
  // qu'une fois la requête acceptée.
  function sendDiagnostic(/* data */) {
    return Promise.resolve();
  }

  // Le champ site est un <input type="url"> : le navigateur refuse
  // « izybiz.fr » tant qu'il n'y a pas de schéma. Or c'est exactement ce qu'un
  // visiteur tape. On complète donc en https:// à sa place, plutôt que de lui
  // opposer un « saisissez une URL valide » sur une adresse qui l'est.
  var HAS_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;

  function normalizeWebsite(input) {
    if (!input) return;
    var value = input.value.trim();
    if (!value || HAS_SCHEME.test(value)) {
      input.value = value;
      return;
    }
    input.value = "https://" + value;
  }

  function initForms() {
    var forms = Array.prototype.slice.call(
      document.querySelectorAll("[data-diagnostic-form]"),
    );
    if (!forms.length) return;

    var modal = document.getElementById("hv2-diagnostic-modal");

    if (modal) {
      modal.addEventListener("click", function (event) {
        // Un clic hors du panneau (donc sur le fond) referme la modale.
        if (event.target === modal) modal.close();
      });

      var closeBtn = modal.querySelector("[data-modal-close]");
      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          modal.close();
        });
      }
    }

    forms.forEach(function (form) {
      var website = form.querySelector('input[name="website"]');

      // Dès que le visiteur quitte le champ, il voit l'adresse complétée : pas
      // de correction invisible au moment de l'envoi.
      if (website) {
        website.addEventListener("blur", function () {
          normalizeWebsite(website);
        });
      }

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        normalizeWebsite(website);

        // Les formulaires portent `novalidate` : on déclenche nous-mêmes la
        // validation native, qui affiche ses messages en français.
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        var data = new FormData(form);

        sendDiagnostic(data).then(function () {
          if (modal && typeof modal.showModal === "function") {
            modal.showModal();
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 4. Arrivée sur #diagnostic
   * ------------------------------------------------------------------ */

  function focusDiagnostic() {
    var email = document.querySelector('#diagnostic input[name="email"]');
    if (!email) return;
    // preventScroll : le positionnement est déjà assuré par scroll-margin-top,
    // un focus classique le remettrait en haut de la fenêtre.
    try {
      email.focus({ preventScroll: true });
    } catch (error) {
      /* navigateurs sans options de focus : on laisse l'ancre faire son travail */
    }
  }

  function initAnchor() {
    if (window.location.hash === "#diagnostic") {
      window.setTimeout(focusDiagnostic, 400);
    }

    window.addEventListener("hashchange", function () {
      if (window.location.hash === "#diagnostic") focusDiagnostic();
    });

    // Clic sur un CTA alors que l'URL porte déjà #diagnostic : le navigateur
    // ne renvoie pas d'événement hashchange, on repositionne nous-mêmes.
    document.addEventListener("click", function (event) {
      var link = event.target.closest('a[href$="#diagnostic"]');
      if (!link) return;

      var target = document.getElementById("diagnostic");
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      if (window.history.replaceState) {
        window.history.replaceState(null, "", "#diagnostic");
      }
      window.setTimeout(focusDiagnostic, prefersReducedMotion ? 0 : 500);
    });
  }

  /* ------------------------------------------------------------------ */

  function init() {
    initTabs();
    initTimeline();
    initForms();
    initAnchor();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
