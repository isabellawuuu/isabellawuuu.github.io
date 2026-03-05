// English-only + simple page router
(function () {
  const lang = "en";

  function byId(id) {
    return document.getElementById(id);
  }

  function safeSetText(id, text) {
    const el = byId(id);
    if (el) el.innerText = text ?? "";
  }

  function safeSetHTML(id, html) {
    const el = byId(id);
    if (el) el.innerHTML = html ?? "";
  }

  function safeSetSrc(id, src) {
    const el = byId(id);
    if (el) el.src = src ?? "";
  }

  function normalizePath(pathname) {
    // GitHub Pages sometimes serves "/" or "/index.html"
    if (!pathname) return "/";
    return pathname
      .replace(/\/index\.html$/, "/")
      .replace(/\.html$/, "")
      .replace(/\/+$/, "") || "/";
  }

  function ensureLTR() {
    const wrapper = byId("content_wrapper");
    if (wrapper) {
      wrapper.classList.remove("rtl_wrapper");
      wrapper.classList.add("ltr_wrapper");
    }
  }

  function renderNavbar() {
    // expects: navbarLinks (from global.js) and enNavbarData (from en.js)
    const titleEl = byId("navbar_title");
    if (titleEl) {
      titleEl.innerText = enNavbarData?.title ?? "";
      titleEl.href = "/";
    }

    const linksEl = byId("navbar_links");
    if (!linksEl) return;

    const items = [];

    if (navbarLinks?.home) {
      items.push({ href: "/", label: enNavbarData?.Home ?? "Home" });
    }
    if (navbarLinks?.research) {
      items.push({ href: "/research", label: enNavbarData?.Research ?? "Research" });
    }
    if (navbarLinks?.contact) {
      items.push({ href: "/contact", label: enNavbarData?.Contact ?? "Contact" });
    }

    linksEl.innerHTML = items
      .map(
        (it) => `
          <li class="nav-item">
            <a class="nav-link" href="${it.href}">${it.label}</a>
          </li>
        `
      )
      .join("");
  }

  function renderHome() {
    safeSetText("page_title", enHomePageData?.name ?? "");
    safeSetSrc("home_image", globalData?.image ?? "");

    safeSetText("home_name", enHomePageData?.name ?? "");
    safeSetText("home_job_title", enHomePageData?.jobTitle ?? "");

    // ICON LINKS (email/linkedin/resume)
    const links = [];

    if (globalData?.email) {
      links.push({
        href: `mailto:${globalData.email}`,
        img: "/assets/images/icons/mail.png",
        alt: "Email",
      });
    }

    if (globalData?.linkedin) {
      links.push({
        href: globalData.linkedin,
        img: "/assets/images/icons/linkedin.png",
        alt: "LinkedIn",
      });
    }

    if (globalData?.resume) {
      links.push({
        href: globalData.resume,
        img: "/assets/images/icons/resume.png",
        alt: "Resume",
      });
    }

    const homeLinksEl = byId("home_links");
    if (homeLinksEl) {
      homeLinksEl.innerHTML =
        `<ul class="home_links">` +
        links
          .map(
            (l) => `
            <li>
              <a href="${l.href}" target="_blank" rel="noopener">
                <img src="${l.img}" alt="${l.alt}" />
              </a>
            </li>
          `
          )
          .join("") +
        `</ul>`;
    }

    safeSetText("home_title", enHomePageData?.home_title ?? "");
    safeSetHTML("home_content", enHomePageData?.home_content ?? "");
  }

  function renderResearch() {
    safeSetText("page_title", "Research");
    safeSetText("research_title", enResearchPageData?.title ?? "Research");
    safeSetHTML("research_data", enResearchPageData?.content ?? "");
  }

  function renderContact() {
    safeSetText("page_title", "Contact");
    safeSetText("contact_title", "Contact");

    const items = [];

    if (globalData?.enAddress) {
      items.push({
        img: "/assets/images/icons/location.png",
        html: `<p>${globalData.enAddress}</p>`,
      });
    }

    if (globalData?.email) {
      items.push({
        img: "/assets/images/icons/mail.png",
        html: `<a href="mailto:${globalData.email}">${globalData.email}</a>`,
      });
    }

    if (globalData?.linkedin) {
      items.push({
        img: "/assets/images/icons/linkedin.png",
        html: `<a href="${globalData.linkedin}" target="_blank" rel="noopener">${globalData.linkedinTitle ?? "LinkedIn"}</a>`,
      });
    }

    const ul = byId("contact_data");
    if (ul) {
      ul.innerHTML = items
        .map(
          (x) => `
          <li>
            <img src="${x.img}" alt="" />
            ${x.html}
          </li>
        `
        )
        .join("");
    }
  }

  // ---------- RUN ----------
  document.addEventListener("DOMContentLoaded", function () {
    ensureLTR();
    renderNavbar();

    const path = normalizePath(window.location.pathname);

    if (path === "/" || path === "/index.html") return renderHome();
    if (path === "/research" || path === "/research.html") return renderResearch();
    if (path === "/contact" || path === "/contact.html") return renderContact();
  });
})();
