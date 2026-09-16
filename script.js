import content from "./content/pt-BR.mjs?v=20260916-editorial-1";
import {
  loadGitHubUpdates,
  repositoryUrl,
  safeHttpsUrl,
  selectFeaturedProjects,
} from "./github.mjs?v=20260915-redesign-1";

const projects = selectFeaturedProjects(content.projects);
const featured = document.querySelector("#featuredProjects");
const otherProjects = document.querySelector("#otherProjects");
const activity = document.querySelector("#githubActivity");
const status = document.querySelector("#githubStatus");
const nav = document.querySelector("#mainNav");
const menuToggle = document.querySelector(".menu-toggle");
const mobile = window.matchMedia("(max-width: 760px)");

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function icon(name) {
  const node = element("span", `icon icon-${name}`);
  node.setAttribute("aria-hidden", "true");
  return node;
}

function externalLink(label, href, accessibleLabel) {
  const link = element("a", "text-link", label);
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  if (accessibleLabel) link.setAttribute("aria-label", accessibleLabel);
  link.append(icon("arrow-up-right"));
  return link;
}

function renderProjects() {
  const fragment = document.createDocumentFragment();
  const others = document.createDocumentFragment();
  projects.forEach((project, index) => {
    const article = element("article", "project");
    article.dataset.repository = project.repository;
    const number = element(
      "span",
      "project-index",
      String(index + 1).padStart(2, "0"),
    );
    number.setAttribute("aria-hidden", "true");
    const overview = element("div", "project-overview");
    const title = element(project.group === "other" ? "h4" : "h3", "", project.name);
    title.id = project.slug;
    article.setAttribute("aria-labelledby", title.id);
    overview.append(
      element("p", "project-category", project.category),
      title,
      element("p", "project-description", project.description),
      element("p", "project-stack", project.stack.join(" · ")),
    );
    let preview = null;
    if (project.screenshot) {
      preview = element("a", "project-preview");
      preview.href = project.screenshot;
      preview.target = "_blank";
      preview.rel = "noopener noreferrer";
      preview.setAttribute("aria-label", `Ampliar captura de ${project.name}`);
      const screenshot = element("img");
      screenshot.src = project.screenshot;
      screenshot.alt = `Interface de ${project.name} em execução com dados fictícios`;
      screenshot.loading = "lazy";
      screenshot.width = 1366;
      screenshot.height = 900;
      preview.append(screenshot);
    }
    const detail = element("div", "project-detail");
    const points = element("ul", "project-points");
    project.highlights.forEach((point) =>
      points.append(element("li", "", point)),
    );
    const links = element("div", "project-links");
    links.append(
      externalLink(
        content.labels.github,
        repositoryUrl(content.githubUser, project.repository),
        content.labels.githubFor.replace("{name}", project.name),
      ),
    );
    const demo = safeHttpsUrl(project.demo);
    if (demo)
      links.append(
        externalLink(
          content.labels.demo,
          demo,
          content.labels.demoFor.replace("{name}", project.name),
        ),
      );
    if (project.problem) detail.append(element("p", "project-problem", project.problem));
    detail.append(points, links);
    article.append(number, overview, detail);
    if (preview) article.append(preview);
    (project.group === "other" ? others : fragment).append(article);
  });
  featured.replaceChildren(fragment);
  otherProjects.replaceChildren(others);
}

function renderActivity(updates = []) {
  const dates = new Map(
    updates.map((update) => [update.repository, update.pushedAt]),
  );
  const formatter = new Intl.DateTimeFormat(content.locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const fragment = document.createDocumentFragment();
  projects.forEach((project) => {
    const row = element("div", "github-row");
    row.append(
      externalLink(
        project.repository,
        repositoryUrl(content.githubUser, project.repository),
      ),
    );
    const date = dates.get(project.repository);
    if (date) {
      const time = element(
        "time",
        "",
        content.labels.updated.replace(
          "{date}",
          formatter.format(new Date(date)),
        ),
      );
      time.dateTime = date;
      row.append(time);
    } else {
      row.append(element("span", "github-status", content.labels.repository));
    }
    fragment.append(row);
  });
  activity.replaceChildren(fragment);
}

function setMenu(open, returnFocus = false) {
  nav.dataset.open = String(open);
  menuToggle.setAttribute("aria-expanded", String(open));
  const label = open ? content.labels.closeMenu : content.labels.openMenu;
  menuToggle.setAttribute("aria-label", label);
  menuToggle.title = label;
  if (returnFocus) menuToggle.focus();
}

document.documentElement.classList.add("js");
menuToggle.hidden = false;
menuToggle.addEventListener("click", () =>
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true"),
);
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  )
    setMenu(false, true);
});
document.addEventListener("click", (event) => {
  if (mobile.matches && !event.target.closest(".site-header")) setMenu(false);
});
mobile.addEventListener("change", () => setMenu(false));

const navLinks = [...nav.querySelectorAll("a")];
function updateCurrentLink() {
  navLinks.forEach((link) => {
    if (link.hash === window.location.hash)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("hashchange", updateCurrentLink);
updateCurrentLink();
renderProjects();
renderActivity();
loadGitHubUpdates(content.githubUser, projects)
  .then(renderActivity)
  .catch(() => {
    status.textContent = content.labels.unavailable;
  });
