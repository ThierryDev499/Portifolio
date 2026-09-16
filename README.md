# Portfólio | Thierry de Matos Azevedo

Portfólio de engenharia de software, backend, automação e IA aplicada. Implementado em HTML, CSS e JavaScript, com publicação no GitHub Pages.

**Site:** https://thierrydev499.github.io/Portifolio/

## Executar localmente

Requer Node.js. O servidor não depende de pacotes externos.

```sh
npm start
```

Acesse http://localhost:4173/. A variável `PORT` permite usar outra porta. Os arquivos `.mjs` são servidos como módulos JavaScript.

## Estrutura

- `index.html`: conteúdo institucional, navegação, case profissional, SEO e dados estruturados.
- `styles.css`: identidade visual, estados de foco e layouts responsivos.
- `script.js`: renderização dos destaques, atualizações do GitHub e menu mobile.
- `content/pt-BR.mjs`: catálogo editorial de projetos e textos das interações em português.
- `github.mjs`: seleção de projetos, URLs e cliente da API pública do GitHub.
- `assets/`: foto pública do perfil, favicon e ícones locais.
- `tests/github.test.mjs`: testes da seleção, URLs, falhas e tempo limite da API.

## Curadoria de projetos

Os destaques atuais, em ordem editorial, são:

1. [Simplea Sales AI](https://github.com/ThierryDev499/Sales-Comercial): CRM desktop e inteligência comercial.
2. [AI Document Intelligence](https://github.com/ThierryDev499/ai-document-intelligence): PDFs, embeddings e perguntas com fontes usando IA local.
3. [Automation Orchestrator](https://github.com/ThierryDev499/automation-orchestrator): fila persistente de automações, retries, logs e resultados.
4. [AI Support Agent](https://github.com/ThierryDev499/ai-support-agent): triagem com RAG e revisão humana de respostas.
5. [AI Lead Qualifier](https://github.com/ThierryDev499/ai-lead-qualifier): qualificação explicável, webhook idempotente e CRM simulado local.

**CNPJ Lookup** permanece em **Outros projetos**, com sua demonstração pública existente. Os quatro projetos novos possuem código, instruções de execução, testes, exemplos reais de API e screenshots nos respectivos repositórios. Seus backends rodam localmente; não há botão de demonstração pública sem serviço hospedado.

As imagens em `assets/projects/` são capturas das aplicações em execução. Os projetos novos usam dados fictícios; a captura do CNPJ Lookup usa o exemplo público do Banco do Brasil. O Simplea mantém o destaque sem screenshot enquanto não houver uma captura verificada disponível.

O case **Automação de contas de consumo** reúne `CadastroElectron`, `OCR-Contas-de-luz`, `JS_PDF_SABESP` e `JS_DAEB_RS`. Esses componentes nunca são renderizados como quatro projetos independentes.

Projetos básicos de estudo continuam nos seus repositórios, acessíveis pelo link "Ver todos no GitHub". Não são destacados automaticamente no portfólio.

Para adicionar um destaque, inclua um item em `content/pt-BR.mjs`, com:

```js
{
  slug: "identificador-unico",
  repository: "nome-exato-no-github",
  status: "published",
  name: "Nome do projeto",
  category: "ÁREA / CONTEXTO",
  description: "Descrição curta e verificável.",
  problem: "Problema que a aplicação resolve.",
  stack: ["Tecnologia", "Tecnologia"],
  highlights: ["Ponto técnico", "Ponto técnico"],
  screenshot: "assets/projects/identificador-unico.jpg",
  demo: null
}
```

Use `status: "planned"` enquanto o projeto não estiver publicado; esses itens não aparecem na página. Use `group: "other"` para exibir um projeto em Outros projetos. O layout aceita novos itens sem alterar os componentes. O campo `screenshot` deve apontar para uma captura real e `demo` só deve ser preenchido quando existir uma demonstração pública funcional.

## Integração com GitHub

A página consulta a API pública, sem token, para obter as datas dos repositórios selecionados. Textos e ordem são editoriais, não substituídos pela ordenação da API. Em caso de limite, resposta inválida ou indisponibilidade, os destaques e links permanecem acessíveis. A requisição tem limite de oito segundos.

## Idiomas

Português é o idioma principal. Textos dinâmicos, datas e descrições dos projetos estão separados em `content/pt-BR.mjs`. Uma versão em inglês pode reutilizar os mesmos estilos e funções com um catálogo `content/en.mjs` e uma página traduzida. Ao adicioná-la, ajustar `lang`, metadados, canonical e `hreflang`; não há seletor de idioma sem tradução disponível.

## Qualidade

```sh
npm ci
npm run check
```

O comando valida o HTML e executa testes com `node:test`. `html-validate` é uma dependência exclusiva de desenvolvimento, sem impacto no JavaScript entregue ao navegador.

A revisão visual cobre 1366x768, 1920x1080, 768x1024 e 390x844, além de menu por teclado, links, expansão do case, console e ausência de rolagem horizontal.

## Publicação

O repositório e o GitHub Pages existentes são mantidos. Publicar na branch `main` aciona o fluxo configurado pelo GitHub. Não há migração de framework, hospedagem ou domínio. Atualizar os parâmetros de versão dos arquivos CSS e JavaScript quando necessário para invalidar caches.

## Créditos

- Foto: perfil público de [ThierryDev499](https://github.com/ThierryDev499).
- Tipografia: Inter, com fontes de sistema como alternativa.
- Ícones: [Lucide](https://lucide.dev/), versão 0.468.0, mantidos localmente com licença em `assets/icons/LICENSE`.
- Contato: [LinkedIn](https://www.linkedin.com/in/thierry-de-matos-azevedo-8a3b15161/?locale=pt).
