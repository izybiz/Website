function getSection(el) {
  var section = el && el.closest ? el.closest("[data-section]") : null;
  return section && section.dataset && section.dataset.section
    ? section.dataset.section
    : "unknown";
}

function trackEvent(name, params) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params || {});
}

function normalizeText(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

window.izybizTrackEvent = trackEvent;

// CTA clicks
document.querySelectorAll("[data-cta]").forEach(function (el) {
  el.setAttribute("data-track", "cta");
  if (!el.getAttribute("data-location")) {
    el.setAttribute(
      "data-location",
      (el.dataset && el.dataset.cta) || getSection(el),
    );
  }

  el.addEventListener("click", function () {
    trackEvent("cta_clicked", {
      button_text: normalizeText(el.textContent),
      button_location: (el.dataset && el.dataset.location) || getSection(el),
    });
  });
});

// Outbound links
document.addEventListener(
  "click",
  function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;
    var link = target.closest("a[href]");
    if (!link) return;

    var href = link.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("/")) return;

    var url;
    try {
      url = new URL(link.href, window.location.origin);
    } catch (_e) {
      return;
    }

    if (url.hostname === window.location.hostname) return;

    trackEvent("outbound_link_clicked", {
      link_url: url.href,
      link_text: normalizeText(link.textContent),
    });
  },
  true,
);

// Note : un observateur mesurait autrefois la visibilité des sections via
// [data-service-section]. Cet attribut a disparu avec la page services, et
// l'événement service_section_viewed n'était donc plus jamais émis. Retiré le
// 2026-08-13. Les sections portent maintenant [data-section] : rebrancher une
// mesure de visibilité dessus est possible, mais reste à décider.

// Scroll depth tracking
(function initScrollDepthTracking() {
  var thresholds = [25, 50, 75, 90];
  var fired = new Set();

  function onScroll() {
    var fullHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (fullHeight <= 0) return;
    var scrolledPct = Math.round((window.scrollY / fullHeight) * 100);

    thresholds.forEach(function (threshold) {
      if (scrolledPct >= threshold && !fired.has(threshold)) {
        fired.add(threshold);
        trackEvent("scroll_depth_reached", { percent: threshold });
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
