# Módulo 00 - Setup do projeto (Vite + React + TypeScript)

## Objetivo do módulo

Neste módulo você irá aprender:

- O que é o Vite e por que ele é usado para iniciar o projeto.
- Como o projeto React + TypeScript fica organizado logo na criação.
- O papel de cada arquivo de configuração (`package.json`, `vite.config.ts`,
  `tsconfig*.json`, `index.html`).
- Como o React é "ligado" à página HTML através do `main.tsx`.

---

## Por que Vite?

Assim como o backend usa o Node.js como ambiente de execução, o frontend
precisa de uma ferramenta que:

- Sirva os arquivos em modo de desenvolvimento, com atualização instantânea
  (hot reload).
- Empacote (build) o projeto para produção.
- Entenda TypeScript, JSX e CSS sem configuração manual complexa.

É exatamente esse o papel do Vite.

```bash
npm run dev
```

Esse comando (definido no `package.json`) sobe um servidor local de
desenvolvimento para o frontend, do mesmo jeito que `npm run dev` sobe o
servidor Fastify no backend.

---

## package.json do frontend

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

- `dev` — inicia o servidor de desenvolvimento do Vite.
- `build` — primeiro checa os tipos com `tsc -b`, depois gera os arquivos
  finais de produção (pasta `dist/`).
- `preview` — serve localmente o resultado do `build`, para conferir como
  ficaria em produção.
- `lint` — roda o ESLint, ferramenta que aponta problemas de estilo e
  possíveis erros no código.

As principais dependências deste projeto são:

- `react` e `react-dom` — a biblioteca de UI em si.
- `react-router` / `react-router-dom` — navegação entre páginas.
- `@tanstack/react-query` — busca e cache de dados vindos da API.
- `react-hook-form` + `zod` + `@hookform/resolvers` — formulários e validação.
- `tailwindcss` + `@tailwindcss/vite` — estilização.
- `lucide-react` — ícones.

Cada uma dessas bibliotecas ganha seu próprio módulo mais à frente.

---

## vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

O Vite funciona por meio de **plugins**. Aqui temos dois:

- `@vitejs/plugin-react` — ensina o Vite a entender arquivos `.tsx` (React +
  TypeScript) e a fazer o hot reload dos componentes.
- `@tailwindcss/vite` — integra o Tailwind CSS diretamente no processo de
  build, sem precisar de um arquivo `tailwind.config.js` separado (o
  Module-03 explica isso em detalhe).

---

## index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>professor-mensuring-front</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Diferente de um site tradicional, esse HTML é quase vazio. Ele só tem:

- Uma `<div id="root">` — o "espaço em branco" onde o React vai desenhar
  toda a aplicação.
- Uma tag `<script type="module" src="/src/main.tsx">` — que carrega o
  ponto de entrada real da aplicação.

Esse é o padrão de uma **SPA** (Single Page Application): existe uma única
página HTML, e é o JavaScript quem decide o que aparece nela.

---

## src/main.tsx — o ponto de entrada

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Esse arquivo faz três coisas:

1. Importa o CSS global (`index.css`) — o Module-03 explica o que tem
   dentro dele.
2. Importa o componente `App`, que concentra as rotas da aplicação
   (Module-02).
3. Usa `createRoot(...).render(...)` para "plugar" o componente `App`
   dentro da `<div id="root">` do `index.html`.

`StrictMode` é um recurso do próprio React que ajuda a encontrar problemas
comuns durante o desenvolvimento (não afeta o build de produção).

---

## TypeScript no frontend

O projeto usa três arquivos de configuração do TypeScript:

```text
tsconfig.json        → só referencia os outros dois
tsconfig.app.json     → configuração do código da aplicação (pasta src/)
tsconfig.node.json    → configuração dos arquivos que rodam em Node (ex.: vite.config.ts)
```

Essa separação existe porque o código que roda **no navegador** (dentro de
`src/`) e o código que roda **no seu computador** durante o build (como o
`vite.config.ts`) têm necessidades de tipos diferentes — por isso cada um
tem sua própria configuração.

---

## Materiais complementares

### Documentações

Vite

https://vitejs.dev/guide/

React

https://react.dev/learn

TypeScript

https://www.typescriptlang.org/docs/

---

### Vídeos recomendados

Vite em 100 segundos (Fireship)

https://www.youtube.com/results?search_query=vite+fireship

React em 100 segundos (Fireship)

https://www.youtube.com/results?search_query=react+fireship

---

## Resumo

Neste módulo aprendemos:

- Por que o projeto usa Vite como ferramenta de desenvolvimento e build.
- O papel de cada script do `package.json`.
- Como os plugins do Vite (React e Tailwind) são configurados.
- Como o `index.html` e o `main.tsx` conectam o React à página.
- Por que existem três arquivos de configuração do TypeScript.

No próximo módulo iremos entender como as pastas do projeto (`src/http` e
`src/paginas`) são organizadas.
