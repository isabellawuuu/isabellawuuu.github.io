 // English-only + simple page router
(function () {
  const lang = "en";

  function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text ?? "";
  }

  function safeSetHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html ?? "";
  }

  function safeSetSrc(id, src) {
    const el = document.getElementById(id);
    if (el) el.src = src ?? "";
  }

  function renderNavbar() {
    // Optional: only if you have navbar elements on the page
    safeSetText("navbar_title", enNavbarData?.title);

    const linksEl = document.getElementById("navbar_links");
    if (!linksEl || typeof navbarLinks === "undefined") return;

    const items = [];
    if (navbarLinks.home) items.push({ href: "/", label: enNavbarData.Home });
    if (navbarLinks.research)
      items.push({ href: "/research.html", label: enNavbarData.Research });
    if (navbarLinks.contact)
      items.push({ href: "/contact.html", label: enNavbarData.Contact });

    linksEl.innerHTML = items
      .map(
        (it) => `
        <li class="nav-item">
          <a class="nav-link" href="${it.href}">${it.label}</a>
        </li>`
      )
      .join("");
  }

  function renderHome() {
    // Add LTR class if wrapper exists
    document.getElementById("content_wrapper")?.classList.add("ltr_wrapper");

    safeSetText("page_title", enHomePageData?.name);
    safeSetSrc("home_image", globalData?.image);
    safeSetText("home_name", enHomePageData?.name);
    safeSetText("home_job_title", enHomePageData?.jobTitle);
    safeSetText("home_title", enHomePageData?.home_title);
    safeSetHTML("home_content", enHomePageData?.home_content);

    // Links (email + linkedin + etc.)
    const linksEl = document.getElementById("home_links");
    if (linksEl && globalData) {
      const links = [
        globalData.email
          ? { href: `mailto:${globalData.email}`, icon: "/assets/images/icons/mail.png", alt: "Email" }
          : null,
        globalData.linkedin
          ? { href: globalData.linkedin, icon: "/assets/images/icons/linkedin.png", alt: "LinkedIn" }
          : null,
        globalData.github
          ? { href: globalData.github, icon: "/assets/images/icons/github.png", alt: "GitHub" }
          : null,
        globalData.resume
          ? { href: globalData.resume, icon: "/assets/images/icons/resume.png", alt: "CV" }
          : null,
      ].filter(Boolean);

      linksEl.innerHTML = `
        <ul class="home_links">
          ${links
            .map(
              (l) => `
              <li>
                <a href="${l.href}" target="_blank" rel="noopener">
                  <img src="${l.icon}" alt="${l.alt}" />
                </a>
              </li>`
            )
            .join("")}
        </ul>
      `;
    }
  }

  function renderResearch() {
    safeSetText("page_title", "Research");
    safeSetText("research_title", enResearchPageData?.title);
    safeSetHTML("research_data", enResearchPageData?.content);
  }

  function renderContact() {
    safeSetText("page_title", "Contact");
    safeSetText("contact_title", "Contact");

    const listEl = document.getElementById("contact_data");
    if (!listEl) return;

    const items = [
      globalData?.enAddress ? { text: globalData.enAddress } : null,
      globalData?.email ? { href: `mailto:${globalData.email}`, text: globalData.email } : null,
      globalData?.linkedin ? { href: globalData.linkedin, text: "LinkedIn" } : null,
    ].filter(Boolean);

    listEl.innerHTML = items
      .map((it) =>
        it.href
          ? `<li><a href="${it.href}" target="_blank" rel="noopener">${it.text}</a></li>`
          : `<li>${it.text}</li>`
      )
      .join("");
  }

  function route() {
    const path = window.location.pathname;

    // Home: "/" or "/index.html"
    if (path === "/" || path.endsWith("/index.html")) return renderHome();

    if (path.endsWith("/research.html")) return renderResearch();
    if (path.endsWith("/contact.html")) return renderContact();
  }

  // Run after DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    renderNavbar();
    route();
  });
})();
