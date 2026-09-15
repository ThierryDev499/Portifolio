const githubUser = "ThierryDev499";

const fallbackProfile = {
  avatar_url: "https://avatars.githubusercontent.com/u/88457739?v=4",
  public_repos: 15,
  followers: 1,
  created_at: "2021-08-04T19:19:30Z",
  updated_at: "2026-07-30T02:40:43Z"
};

const fallbackRepos = [
  {
    name: "Portifolio",
    description: "Portfólio pessoal publicado com GitHub Pages.",
    html_url: "https://github.com/ThierryDev499/Portifolio",
    language: "CSS",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-09-14T13:59:53Z",
    size: 0
  },
  {
    name: "CRM",
    description: "Base pública para sistema de relacionamento e gestão comercial.",
    html_url: "https://github.com/ThierryDev499/CRM",
    language: "Produto",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-08-06T12:28:54Z",
    size: 0
  },
  {
    name: "Sales-Comercial",
    description: "Produto comercial em TypeScript com foco em operação e acompanhamento de vendas.",
    html_url: "https://github.com/ThierryDev499/Sales-Comercial",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-07-28T00:47:38Z",
    size: 1713
  },
  {
    name: "cnpj-lookup",
    description: "Frontend React standalone para consulta de CNPJs via API publica.cnpj.ws.",
    html_url: "https://github.com/ThierryDev499/cnpj-lookup",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-07-14T01:58:34Z",
    size: 54
  },
  {
    name: "nosNaRuaCardapio",
    description: "Experiência web publicada para cardápio e presença digital.",
    html_url: "https://github.com/ThierryDev499/nosNaRuaCardapio",
    language: "HTML",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-06-20T21:08:33Z",
    size: 1722
  },
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
    description: "Leitura e tratamento em JavaScript de PDFs da DAEB/RS para automação de contas de água, energia e energia solar.",
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
    description: "Parser em JavaScript para extração de dados de contas Sabesp em PDF dentro de fluxo RPA.",
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
    description: "OCR para leitura de contas de luz em PDF quando o arquivo não entrega texto estruturado.",
    html_url: "https://github.com/ThierryDev499/OCR-Contas-de-luz",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2023-09-06T13:48:19Z",
    size: 171
  },
  {
    name: "CadastroElectron",
    description: "Aplicação desktop em Electron para apoio operacional à captação e automação de contas em PDF.",
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

const consumptionAutomationRepos = new Set([
  "CadastroElectron",
  "OCR-Contas-de-luz",
  "JS_PDF_SABESP",
  "JS_DAEB_RS"
]);

const highlightedRepos = new Set([
  "CRM",
  "Sales-Comercial",
  "cnpj-lookup",
  "Portifolio"
]);

const getRepoRole = (repo) => {
  const roles = {
    Portifolio: "Marca pessoal",
    CRM: "Sistema de negócio",
    "Sales-Comercial": "Produto comercial",
    "cnpj-lookup": "Integração e dados",
    nosNaRuaCardapio: "Produto web",
    "OCR-Contas-de-luz": "Automação documental",
    JS_DAEB_RS: "RPA concessionárias",
    JS_PDF_SABESP: "PDF parsing RPA",
    CadastroElectron: "Operação RPA"
  };

  return roles[repo.name] || "Projeto público";
};

const getDescription = (repo) => {
  const descriptions = {
    Portifolio: "Portfólio pessoal publicado com GitHub Pages e dados dinâmicos do GitHub.",
    CRM: "Base pública para sistema de relacionamento e gestão comercial.",
    "Sales-Comercial": "Produto comercial em TypeScript com foco em operação e acompanhamento de vendas.",
    "cnpj-lookup": "Consulta empresarial em React/TypeScript conectada a API pública de CNPJ.",
    nosNaRuaCardapio: "Experiência web publicada para cardápio e presença digital.",
    "for-my-girlfriend": "Página HTML publicada com GitHub Pages.",
    "Web-Com-API-youtube": "Experimento web com consumo de API.",
    JS_DAEB_RS: "Leitura e tratamento em JavaScript de PDFs da DAEB/RS para automação de contas de água, energia e energia solar.",
    HTML_e_CSS_indroducao: "Estudos de base em HTML e CSS.",
    JS_PDF_SABESP: "Parser em JavaScript para extrair dados de contas Sabesp em PDF dentro de fluxo RPA.",
    "numero-secreto": "Projeto de lógica e compartilhamento.",
    "OCR-Contas-de-luz": "OCR para leitura de contas de luz em PDF quando o arquivo não entrega texto estruturado.",
    CadastroElectron: "Aplicação desktop em Electron para apoio operacional à captação e automação de contas em PDF.",
    projeto: "Repositório inicial de estudos."
  };

  return descriptions[repo.name] || repo.description || "Projeto público no GitHub de Thierry.";
};

const filterRepos = (repos) => {
  if (activeFilter === "all") {
    return repos;
  }

  return repos.filter((repo) => {
    const language = getPrimaryLanguage(repo);

    if (activeFilter === "Outros") {
      return language !== "TypeScript" && language !== "JavaScript" && language !== "HTML";
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
      <dt>Repositórios</dt>
      <dd>${profile.public_repos || repos.length}</dd>
    </div>
    <div>
      <dt>Desde</dt>
      <dd>${githubSince}</dd>
    </div>
    <div>
      <dt>Frentes</dt>
      <dd>${languages.size}</dd>
    </div>
  `;
};

const renderRepos = (repos) => {
  const visibleRepos = filterRepos(repos.filter((repo) => !consumptionAutomationRepos.has(repo.name)));

  if (!visibleRepos.length) {
    repoGrid.innerHTML = `
      <p class="repo-empty">
        Nenhum outro repositório neste filtro.
        <a href="#cases">Ver o case de automação de contas.</a>
      </p>
    `;
    return;
  }

  repoGrid.innerHTML = visibleRepos
    .map((repo) => {
      const language = getPrimaryLanguage(repo);
      const pushedAt = repo.pushed_at ? formatDate(repo.pushed_at) : "Sem data";
      const size = Number(repo.size || 0);

      return `
        <article class="repo-card ${highlightedRepos.has(repo.name) ? "featured" : ""}">
          <header>
            <span class="repo-language">${language}</span>
            <span class="repo-role">${getRepoRole(repo)}</span>
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
