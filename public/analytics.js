function getSection(el) {
  var section = el && el.closest ? el.closest("[data-section]") : null;
  return section && section.dataset && section.dataset.section ? section.dataset.section : "unknown";
}

function trackEvent(name, params) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params || {});
}

// Beta access (mailto:)
document.querySelectorAll('a[href^="mailto"]').forEach(function (el) {
  el.addEventListener("click", function () {
    trackEvent("beta_access_requested", {
      method: "email_click",
      location: getSection(el),
    });
  });
});

// Main CTAs
document.querySelectorAll("[data-cta]").forEach(function (el) {
  el.addEventListener("click", function () {
    trackEvent("cta_clicked", {
      button_text: (el.textContent || "").trim(),
      location: (el.dataset && el.dataset.cta) || getSection(el),
    });
  });
});

// LinkedIn button
document.querySelectorAll("a[data-linkedin], a[href*=\"linkedin.com\"]").forEach(function (el) {
  el.addEventListener("click", function () {
    trackEvent("linkedin_clicked", {
      location: getSection(el),
    });
  });
});

// Blog: read at 50%
if (document.body.classList.contains("page-blog-article")) {
  var blogFired = false;
  window.addEventListener("scroll", function () {
    var fullHeight = document.body.scrollHeight - window.innerHeight;
    if (fullHeight <= 0) return;
    var scrolled = window.scrollY / fullHeight;
    if (scrolled >= 0.5 && !blogFired) {
      blogFired = true;
      trackEvent("blog_article_read", {
        article_title: document.title,
        article_slug: window.location.pathname,
      });
    }
  });
}
