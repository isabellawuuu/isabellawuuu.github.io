/* ============================
   scripts.js (EN only)
   - Home / Research / Contact
   - GitHub Pages safe
   ============================ */

// Force English only (no FA toggle)
localStorage.setItem("lang", "en");

const path = window.location.pathname;
const isHome =
  path === "/" ||
  path.endsWith("/index.html") ||
  path.endsWith("/index") ||
  path.endsWith("/shuwu.github.io/") ||
  path.includes("/shuwu.github.io/index");

if (isHome) {
  homeData();
}
function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text ?? "";
}

function safeSetHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html ?? "";
}

function safeSetAttr(id, attr, value) {
  const el = document.getElementById(id);
  if (el) el.setAttribute(attr, value ?? "");
}

function isHomePath(p) {
  return p === "" || p === "/" || p === "/index";
}

function normalizeHref(href) {
  // Allow mailto:, https://, http://, and local paths (/files/..)
  return href ?? "";
}

function renderNavbar() {
  // globalData + navbarLinks should come from /data/global.js
  if (typeof globalData === "undefined") return;
  if (typeof navbarLinks === "undefined") return;

  safeSetText("navbar_title", globalData.name || "");

  const links = [];

  if (navbarLinks.home) links.push({ label: "Home", href: "/" });
  if (navbarLinks.research) links.push({ label: "Research", href: "/research" });
  if (navbarLinks.contact) links.push({ label: "Contact", href: "/contact" });

  const html = links
    .map(
      (l) => `
      <li class="nav-item">
        <a class="nav-link" href="${l.href}">${l.label}</a>
      </li>`
    )
    .join("");

  safeSetHTML("navbar_links", html);
}

function renderHome() {
  if (typeof globalData === "undefined" || typeof enHomePageData === "undefined")
    return;

  safeSetText("page_title", enHomePageData.name || globalData.name || "");
  safeSetAttr("home_image", "src", globalData.image || "/files/profile.jpg");
  safeSetText("home_name", enHomePageData.name || globalData.name || "");
  safeSetText("home_job_title", enHomePageData.jobTitle || "");

  // Icons / links (only show if value exists)
  const links = [
    {
      href: globalData.email ? `mailto:${globalData.email}` : "",
      img: "/assets/images/icons/mail.png",
      alt: "Email",
      active: !!globalData.email,
    },
    {
      href: globalData.linkedin || "",
      img: "/assets/images/icons/linkedin.png",
      alt: "LinkedIn",
      active: !!globalData.linkedin,
    },
    {
      href: globalData.github || "",
      img: "/assets/images/icons/github.png",
      alt: "GitHub",
      active: !!globalData.github,
    },
    {
      href: globalData.resume || "",
      img: "/assets/images/icons/resume.png",
      alt: "CV",
      active: !!globalData.resume,
    },
  ].filter((x) => x.active);

  const linksHTML = links
    .map(
      (l) => `
      <a href="${normalizeHref(l.href)}" target="_blank" rel="noopener noreferrer"
         style="display:inline-block;margin-right:14px;">
        <img src="${l.img}" alt="${l.alt}" style="width:28px;height:28px;" />
      </a>`
    )
    .join("");

  safeSetHTML("home_links", linksHTML);

  safeSetText("home_title", enHomePageData.home_title || "About");

  // IMPORTANT: Use innerHTML so you can do line breaks/paragraphs in en.js
  // In en.js, you can write: "Paragraph 1<br><br>Paragraph 2 ..."
  safeSetHTML("home_content", enHomePageData.home_content || "");
}

function renderResearch() {
  if (
    typeof globalData === "undefined" ||
    typeof enResearchPageData === "undefined"
  )
    return;

  safeSetText("page_title", "Research");
  safeSetText("research_title", enResearchPageData.title || "Research");
  safeSetHTML("research_data", enResearchPageData.content || "");
}

function renderContact() {
  if (typeof globalData === "undefined") return;

  safeSetText("page_title", "Contact");
  safeSetText("contact_title", "Contact");

  const items = [
    {
      icon: "/assets/images/icons/mail.png",
      label: globalData.email,
      href: globalData.email ? `mailto:${globalData.email}` : "",
      active: !!globalData.email,
    },
    {
      icon: "/assets/images/icons/linkedin.png",
      label: "LinkedIn",
      href: globalData.linkedin || "",
      active: !!globalData.linkedin,
    },
    {
      icon: "/assets/images/icons/github.png",
      label: "GitHub",
      href: globalData.github || "",
      active: !!globalData.github,
    },
    {
      icon: "/assets/images/icons/resume.png",
      label: "CV (PDF)",
      href: globalData.resume || "",
      active: !!globalData.resume,
    },
  ].filter((x) => x.active);

  const html = items
    .map(
      (x) => `
      <li style="display:flex;align-items:center;gap:10px;margin:10px 0;">
        <img src="${x.icon}" alt="" style="width:22px;height:22px;" />
        <a href="${normalizeHref(x.href)}" target="_blank" rel="noopener noreferrer">
          ${x.label}
        </a>
      </li>`
    )
    .join("");

  safeSetHTML("contact_data", html);
}

$(document).ready(function () {
  // Set direction class if wrapper exists
  const wrapper = document.getElementById("content_wrapper");
  if (wrapper) wrapper.classList.add("ltr_wrapper");

  // Navbar
  renderNavbar();

  // Route
  if (isHomePath(pathname)) {
    renderHome();
  } else if (pathname === "/research") {
    renderResearch();
  } else if (pathname === "/contact") {
    renderContact();
  } else if (pathname === "/index") {
    renderHome();
  }
});
