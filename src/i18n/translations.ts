export const languages = {
  fr: "Français",
  en: "English",
  es: "Español",
} as const;

export const defaultLang = "fr";
export const fallbackLang = "en";

export const ui = {
  fr: {
    "nav.blog": "Blog",
    "cta.linkedin": "Message LinkedIn",
    "blog.readmore": "Lire l'article",
    "blog.title": "Blog",
    "blog.subtitle": "Insights dirigeants sur la transformation et l'IA",
    "footer.copyright": "© 2026 Izybiz — Tous droits réservés",
  },
  en: {
    "nav.blog": "Blog",
    "cta.linkedin": "LinkedIn message",
    "blog.readmore": "Read article",
    "blog.title": "Blog",
    "blog.subtitle": "Executive insights on transformation and AI",
    "footer.copyright": "© 2026 Izybiz — All rights reserved",
  },
  es: {
    "nav.blog": "Blog",
    "cta.linkedin": "Mensaje LinkedIn",
    "blog.readmore": "Leer artículo",
    "blog.title": "Blog",
    "blog.subtitle": "Perspectivas directivas sobre transformación e IA",
    "footer.copyright": "© 2026 Izybiz — Todos los derechos reservados",
  },
} as const;

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[fallbackLang][key];
  };
}

const normalizePath = (path: string) => (path.endsWith("/") ? path.slice(0, -1) || "/" : path);
const withTrailingSlash = (path: string) => (path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`);

const localizedRoutes = {
  home: { fr: "/", en: "/en/", es: "/es/" },
  blog: {
    fr: "/blog/",
    en: "/en/blog/",
    es: "/es/blog/",
  },
} as const;

export function getLocalizedPath(routeKey: keyof typeof localizedRoutes, lang: Lang) {
  return localizedRoutes[routeKey][lang];
}

export function mapPathToLang(pathname: string, targetLang: Lang): string {
  const normalized = normalizePath(pathname);
  const entries = Object.values(localizedRoutes);
  for (const route of entries) {
    const normalizedRouteValues = Object.values(route).map((path) => normalizePath(path));
    if (normalizedRouteValues.includes(normalized as never)) {
      return route[targetLang];
    }
  }
  if (normalized.startsWith("/en/") || normalized === "/en") {
    return withTrailingSlash(normalized.replace(/^\/en(?=\/|$)/, targetLang === "fr" ? "" : `/${targetLang}`) || "/");
  }
  if (normalized.startsWith("/es/") || normalized === "/es") {
    return withTrailingSlash(normalized.replace(/^\/es(?=\/|$)/, targetLang === "fr" ? "" : `/${targetLang}`) || "/");
  }
  if (targetLang === "fr") return withTrailingSlash(normalized);
  return withTrailingSlash(`/${targetLang}${normalized === "/" ? "/" : normalized}`);
}
