import test from "node:test";
import assert from "node:assert/strict";
import {
  loadGitHubUpdates,
  repositoryUrl,
  safeHttpsUrl,
  selectFeaturedProjects,
  selectRepositoryUpdates,
} from "../github.mjs";
import content from "../content/pt-BR.mjs";

const projects = selectFeaturedProjects(content.projects);

test("curation keeps the professional case unified and unpublished projects hidden", () => {
  const candidates = [
    ...content.projects,
    { repository: "CadastroElectron", status: "published" },
    { repository: "OCR-Contas-de-luz", status: "published" },
    { repository: "JS_PDF_SABESP", status: "published" },
    { repository: "JS_DAEB_RS", status: "published" },
    { repository: "enterprise-rag-assistant", status: "planned" },
  ];
  assert.deepEqual(selectFeaturedProjects(candidates), content.projects);
});

test("only curated repositories supply dates, in presentation order", () => {
  const updates = selectRepositoryUpdates(
    [
      { name: "numero-secreto", pushed_at: "2026-09-15T12:00:00Z" },
      { name: "cnpj-lookup", pushed_at: "2026-07-14T01:58:34Z" },
      { name: "Sales-Comercial", pushed_at: "2026-07-28T00:47:38Z" },
    ],
    projects,
  );
  assert.deepEqual(updates, [
    { repository: "Sales-Comercial", pushedAt: "2026-07-28T00:47:38.000Z" },
    { repository: "cnpj-lookup", pushedAt: "2026-07-14T01:58:34.000Z" },
  ]);
});

test("missing, private and invalid repository dates do not break fallback content", () => {
  const updates = selectRepositoryUpdates(
    [
      null,
      { name: "Sales-Comercial", pushed_at: "invalid" },
      { name: "cnpj-lookup", private: true, pushed_at: "2026-07-14T01:58:34Z" },
    ],
    projects,
  );
  assert.ok(updates.every((update) => update.pushedAt === null));
  assert.equal(selectRepositoryUpdates([], projects).length, projects.length);
  assert.throws(
    () => selectRepositoryUpdates({ message: "rate limited" }, projects),
    TypeError,
  );
});

test("demo links accept HTTPS and reject script URLs or embedded credentials", () => {
  assert.equal(
    safeHttpsUrl("https://thierrydev499.github.io/cnpj-lookup/"),
    content.projects[1].demo,
  );
  for (const url of [
    null,
    "javascript:alert(1)",
    "data:text/html,test",
    "http://example.com",
    "https://user:password@example.com",
    "not a URL",
  ]) {
    assert.equal(safeHttpsUrl(url), null);
  }
  assert.equal(
    repositoryUrl("ThierryDev499", "Sales-Comercial"),
    "https://github.com/ThierryDev499/Sales-Comercial",
  );
});

test("GitHub data loads without authorization headers or secrets", async () => {
  let request;
  const result = await loadGitHubUpdates(content.githubUser, projects, {
    fetchImpl: async (url, options) => {
      request = { url, options };
      return {
        ok: true,
        json: async () => [
          { name: "Sales-Comercial", pushed_at: "2026-07-28T00:47:38Z" },
        ],
      };
    },
  });
  assert.equal(
    request.url,
    "https://api.github.com/users/ThierryDev499/repos?sort=pushed&per_page=100",
  );
  assert.equal(request.options.headers.Authorization, undefined);
  assert.equal(result[0].pushedAt, "2026-07-28T00:47:38.000Z");
});

test("API rate limits and invalid JSON reject cleanly for the UI fallback", async () => {
  await assert.rejects(
    loadGitHubUpdates(content.githubUser, projects, {
      fetchImpl: async () => ({ ok: false, status: 403 }),
    }),
    /403/,
  );
  await assert.rejects(
    loadGitHubUpdates(content.githubUser, projects, {
      fetchImpl: async () => ({
        ok: true,
        json: async () => {
          throw new SyntaxError("Invalid JSON");
        },
      }),
    }),
    SyntaxError,
  );
});

test("a stalled API request is aborted", async () => {
  await assert.rejects(
    loadGitHubUpdates(content.githubUser, projects, {
      timeoutMs: 10,
      fetchImpl: (_url, { signal }) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener("abort", () => reject(new Error("aborted")), {
            once: true,
          });
        }),
    }),
    /aborted/,
  );
});
