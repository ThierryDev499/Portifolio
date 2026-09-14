const githubUser = "ThierryDev499";

const fallbackProfile = {
  avatar_url: "https://avatars.githubusercontent.com/u/88457739?v=4",
  public_repos: 10,
  followers: 1,
  created_at: "2021-08-04T19:19:30Z",
  updated_at: "2026-04-23T23:31:34Z"
};

const fallbackRepos = [
  {
    name: "for-my-girlfriend",
    description: "Página HTML publicada com GitHub Pages.",
    html_url: "https://github.com/ThierryDev499/for-my-girlfriend",
    language: "HTML",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2025-05-08T14:10:50Z",
    size: 3745
  },
  {
    name: "Web-Com-API-youtube",
    description: "Site com interação de uma API.",
    html_url: "https://github.com/ThierryDev499/Web-Com-API-youtube",
    language: "API",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2024-03-06T02:58:58Z",
    size: 0
  },
  {
    name: "JS_DAEB_RS",
    description: "Tratativa de leitura de PDF_DAEB utilizando JavaScript.",
    html_url: "https://github.com/ThierryDev499/JS_DAEB_RS",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2023-12-28T18:25:12Z",
    size: 34
  },
  {
    name: "HTML_e_CSS_indroducao",
    description: "Estudos com HTML e CSS.",
    html_url: "https://github.com/ThierryDev499/HTML_e_CSS_indroducao",
    language: "HTML/CSS",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2023-12-26T16:59:11Z",
    size: 0
  },
  {
    name: "JS_PDF_SABESP",
    description: "Tratativa para obter dados de PDF utilizando JavaScript.",
    html_url: "https://github.com/ThierryDev499/JS_PDF_SABESP",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2023-12-26T13:46:22Z",
    size: 59
  },
  {
    name: "numero-secreto",
    description: "Projeto de compartilhamento e estudo de lógica.",
    html_url: "https://github.com/ThierryDev499/numero-secreto",
    language: "Web",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2023-11-28T23:41:51Z",
    size: 0
  },
  {
    name: "OCR-Contas-de-luz",
    description: "Tratativas de leitura de contas de luz com OCR avançado.",
    html_url: "https://github.com/ThierryDev499/OCR-Contas-de-luz",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2023-09-06T13:48:19Z",
    size: 171
  },
  {
    name: "CadastroElectron",
    description: "Aplicação de cadastro construída com Electron.",
    html_url: "https://github.com/ThierryDev499/CadastroElectron",
    language: "JavaScript",
    stargazers_count: 1,
    forks_count: 0,
    pushed_at: "2022-07-07T04:23:34Z",
    size: 109
  },
  {
    name: "projeto",
    description: "Repositório inicial de estudos.",
    html_url: "https://github.com/ThierryDev499/projeto",
    language: "Estudo",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2022-07-05T03:32:59Z",
    size: 0
  },
  {
    name: "Servidor-DataHoraAtual",
    description: "Servidor que responde ao cliente com a data e hora atual.",
    html_url: "https://github.com/ThierryDev499/Servidor-DataHoraAtual",
    language: "C",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2021-08-04T19:42:50Z",
    size: 2
  }
];

const repoGrid = document.querySelector("#repoGrid");
const profileStats = document.querySelector("#profileStats");
const avatar = document.querySelector("#profileAvatar");
const filterButtons = [...document.querySelectorAll(".filter-button")];
let activeFilter = "all";
let currentRepos = fallbackRepos;

const formatDate = (dateValue) =>
  new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric"
  }).format(new Date(dateValue));

const getPrimaryLanguage = (repo) => {
  if (repo.language) {
    return repo.language;
  }

  const lowerName = repo.name.toLowerCase();

  if (lowerName.includes("html") || lowerName.includes("css")) {
    return "HTML/CSS";
  }

  if (lowerName.includes("js") || lowerName.includes("pdf") || lowerName.includes("ocr")) {
    return "JavaScript";
  }

  return "Projeto";
};

const getDescription = (repo) => {
  if (repo.description) {
    return repo.description;
  }

  const descriptions = {
    "for-my-girlfriend": "Página HTML publicada com GitHub Pages.",
    CadastroElectron: "Aplicação de cadastro construída com Electron.",
    projeto: "Repositório inicial de estudos."
  };

  return descriptions[repo.name] || "Projeto público no GitHub de Thierry.";
};

const filterRepos = (repos) => {
  if (activeFilter === "all") {
    return repos;
  }

  return repos.filter((repo) => {
    const language = getPrimaryLanguage(repo);

    if (activeFilter === "Outros") {
      return language !== "JavaScript" && language !== "HTML";
    }

    if (activeFilter === "HTML") {
      return language === "HTML" || language === "HTML/CSS";
    }

    return language === activeFilter;
  });
};

const renderProfile = (profile, repos) => {
  avatar.src = profile.avatar_url || fallbackProfile.avatar_url;

  const githubSince = new Date(profile.created_at || fallbackProfile.created_at).getFullYear();
  const languages = new Set(repos.map(getPrimaryLanguage).filter(Boolean));

  profileStats.innerHTML = `
    <div>
      <dt>Repos</dt>
      <dd>${profile.public_repos || repos.length}</dd>
    </div>
    <div>
      <dt>GitHub</dt>
      <dd>${githubSince}</dd>
    </div>
    <div>
      <dt>Stacks</dt>
      <dd>${languages.size}</dd>
    </div>
  `;
};

const renderRepos = (repos) => {
  const visibleRepos = filterRepos(repos);

  repoGrid.innerHTML = visibleRepos
    .map((repo) => {
      const language = getPrimaryLanguage(repo);
      const pushedAt = repo.pushed_at ? formatDate(repo.pushed_at) : "Sem data";
      const size = Number(repo.size || 0);

      return `
        <article class="repo-card">
          <header>
            <span class="repo-language">${language}</span>
            <h3>${repo.name}</h3>
          </header>
          <p>${getDescription(repo)}</p>
          <div class="repo-meta" aria-label="Metadados do repositório">
            <span>${pushedAt}</span>
            <span>${repo.stargazers_count || 0} estrelas</span>
            <span>${repo.forks_count || 0} forks</span>
            <span>${size} KB</span>
          </div>
          <a class="button secondary" href="${repo.html_url}" target="_blank" rel="noreferrer">
            Abrir no GitHub
          </a>
        </article>
      `;
    })
    .join("");
};

const loadGithubData = async () => {
  try {
    const [profileResponse, repoResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${githubUser}`),
      fetch(`https://api.github.com/users/${githubUser}/repos?sort=pushed&per_page=100`)
    ]);

    if (!profileResponse.ok || !repoResponse.ok) {
      throw new Error("GitHub API unavailable");
    }

    const [profile, repos] = await Promise.all([profileResponse.json(), repoResponse.json()]);
    currentRepos = repos.sort((first, second) => new Date(second.pushed_at) - new Date(first.pushed_at));
    renderProfile(profile, currentRepos);
    renderRepos(currentRepos);
  } catch (error) {
    renderProfile(fallbackProfile, fallbackRepos);
    renderRepos(fallbackRepos);
  }
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((currentButton) => currentButton.classList.remove("active"));
    button.classList.add("active");
    renderRepos(currentRepos);
  });
});

renderProfile(fallbackProfile, fallbackRepos);
renderRepos(fallbackRepos);
loadGithubData();
