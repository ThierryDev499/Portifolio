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

Os destaques atuais são **Simplea Sales AI** (`Sales-Comercial`) e **CNPJ Lookup**. As descrições foram conferidas nos respectivos repositórios. A demonstração do CNPJ Lookup usa o GitHub Pages existente.

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
  stack: ["Tecnologia", "Tecnologia"],
  highlights: ["Ponto técnico", "Ponto técnico"],
  demo: null
}
```

Use `status: "planned"` enquanto o projeto não estiver publicado. O layout aceita novos itens sem alterar os componentes. Isso permite incluir futuramente `enterprise-rag-assistant`, `ai-agent-toolkit`, `ai-email-automation` e `ai-code-reviewer` quando estiverem prontos. Nenhum deles é apresentado como entrega existente.

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
