export const consumptionAutomationRepos = new Set([
  "CadastroElectron",
  "OCR-Contas-de-luz",
  "JS_PDF_SABESP",
  "JS_DAEB_RS",
]);

export function selectFeaturedProjects(projects) {
  return projects.filter(
    (project) =>
      project.status === "published" &&
      !consumptionAutomationRepos.has(project.repository),
  );
}

export function repositoryUrl(user, repository) {
  return `https://github.com/${encodeURIComponent(user)}/${encodeURIComponent(repository)}`;
}

export function safeHttpsUrl(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export function selectRepositoryUpdates(repositories, projects) {
  if (!Array.isArray(repositories))
    throw new TypeError("Invalid GitHub response");
  const publicRepos = new Map(
    repositories
      .filter((repo) => repo && typeof repo.name === "string" && !repo.private)
      .map((repo) => [repo.name, repo]),
  );
  return projects.map((project) => {
    const value = publicRepos.get(project.repository)?.pushed_at;
    const date =
      typeof value === "string" && Number.isFinite(Date.parse(value))
        ? new Date(value).toISOString()
        : null;
    return { repository: project.repository, pushedAt: date };
  });
}

export async function loadGitHubUpdates(
  user,
  projects,
  { fetchImpl = globalThis.fetch, timeoutMs = 8000 } = {},
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(
      `https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=pushed&per_page=100`,
      {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" },
      },
    );
    if (!response.ok)
      throw new Error(`GitHub unavailable (${response.status})`);
    return selectRepositoryUpdates(await response.json(), projects);
  } finally {
    clearTimeout(timer);
  }
}
