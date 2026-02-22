(function () {
  if (window.__BK_LAYOUT_INIT__) return;
  window.__BK_LAYOUT_INIT__ = true;

  var head = document.head;

  // Shared Tailwind config (must be set before loading the CDN script).
  window.tailwind = window.tailwind || {};
  window.tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          primary: "#e7d7b6",
          "background-light": "#f8f6f2",
          "background-dark": "#111111",
          "deep-black": "#111111",
          champagne: "#e8d8b8",
          taupe: "#81796a",
        },
        fontFamily: {
          display: ["Newsreader", "serif"],
        },
        borderRadius: {
          DEFAULT: "0.25rem",
          lg: "0.5rem",
          xl: "0.75rem",
          full: "9999px",
        },
      },
    },
  };

  function ensureLink(href, rel, extra) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var link = document.createElement("link");
    link.rel = rel || "stylesheet";
    link.href = href;
    if (extra) {
      Object.keys(extra).forEach(function (k) {
        link.setAttribute(k, extra[k]);
      });
    }
    head.appendChild(link);
  }

  ensureLink("https://fonts.googleapis.com", "preconnect");
  ensureLink("https://fonts.gstatic.com", "preconnect", { crossorigin: "" });
  ensureLink(
    "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Pinyon+Script&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    "stylesheet"
  );

  if (!document.querySelector('script[data-bk-tailwind="true"]')) {
    var tw = document.createElement("script");
    tw.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries";
    tw.setAttribute("data-bk-tailwind", "true");
    head.appendChild(tw);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.querySelector("[data-site-header]");
    if (!host) return;

    host.innerHTML =
      '<header class="relative z-50 w-full px-8 md:px-20 py-8 flex items-center justify-between">' +
      '<div class="flex items-center gap-2">' +
      '<span class="material-symbols-outlined text-taupe scale-75">flare</span>' +
      '<h2 class="text-sm font-semibold tracking-[0.3em] uppercase">B&amp;K</h2>' +
      "</div>" +
      '<nav class="hidden md:flex items-center gap-12 text-[11px] uppercase tracking-[0.2em] font-medium text-deep-black/70">' +
      '<a data-nav="home.html" class="hover:text-deep-black transition-colors" href="home.html">Our Story</a>' +
      '<a data-nav="rsvp.html" class="hover:text-deep-black transition-colors" href="rsvp.html">RSVP</a>' +
      '<a data-nav="venue.html" class="hover:text-deep-black transition-colors" href="venue.html">Venue</a>' +
      '<a data-nav="accommodation.html" class="hover:text-deep-black transition-colors" href="accommodation.html">Accommodation</a>' +
      '<a data-nav="registry.html" class="hover:text-deep-black transition-colors" href="registry.html">Registry</a>' +
      "</nav>" +
      '<div class="md:hidden"><span class="material-symbols-outlined cursor-pointer">menu</span></div>' +
      "</header>";

    var current = (location.pathname.split("/").pop() || "home.html").toLowerCase();
    var active = host.querySelector('[data-nav="' + current + '"]');
    if (active) {
      active.classList.add("border-b", "border-primary/40", "pb-1");
    }
  });
})();

