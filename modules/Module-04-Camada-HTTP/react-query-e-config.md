# Módulo 04 - React Query e configuração da API

## Objetivo do módulo

Neste módulo você irá aprender:

- Por que usar o TanStack Query em vez de `fetch` + `useState` +
  `useEffect` "na mão".
- Como o `QueryClientProvider` é configurado no `App.tsx`.
- Como a URL base da API é centralizada em `config.ts`.

---

## O problema que o React Query resolve

Sem uma biblioteca de busca de dados, cada componente que precisa de dados
da API teria que repetir manualmente:

- Um `useState` para os dados.
- Um `useState` para "está carregando?".
- Um `useState` para "deu erro?".
- Um `useEffect` disparando o `fetch`.
- Lógica para não buscar de novo dados que já foram buscados há pouco
  (cache).
- Lógica para atualizar a tela quando os dados mudam em outro lugar.

O **TanStack Query** (também chamado de React Query) resolve tudo isso com
um único hook: `useQuery`. Ele guarda os dados em cache, sabe quando
re-buscar, e expõe o estado de carregamento/erro prontinho.

---

## QueryClientProvider

```tsx
// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* ...rotas... */}
    </QueryClientProvider>
  )
}
```

O `QueryClient` é o "banco de dados em memória" do React Query — é ele quem
guarda o cache de todas as requisições feitas pela aplicação.
`QueryClientProvider` disponibiliza esse cliente para **qualquer componente
abaixo dele na árvore**, através do Context API do React — por isso ele
envolve as rotas inteiras no `App.tsx`, e não cada página individualmente.

---

## config.ts — a URL da API num único lugar

```ts
export const API_URL = 'http://localhost:3333'
```

Simples assim — mas resolve um problema real: sem essa constante, a URL do
backend (`http://localhost:3333`) teria que ser repetida em todo hook que
faz uma requisição. Com ela centralizada, trocar de ambiente (local →
produção, por exemplo) significa mudar em um único lugar.

Todo hook de domínio (visto nos próximos arquivos deste módulo) importa essa
constante:

```ts
import { API_URL } from '../config'
```

---

## O padrão repetido em cada domínio

Antes de ver os hooks em detalhe (`hooks-de-leitura.md` e `mutations.md`),
vale notar o padrão que se repete em `professor/`, `subject/`,
`professor-subject/` e `ratings/`:

1. Uma função **assíncrona de baixo nível** (`fetchProfessors`,
   `fetchSubjects`...) que só sabe conversar com o `fetch` — monta a URL,
   confere `response.ok`, converte para JSON.
2. Um **hook público** (`useProfessor`, `useSubjects`...) que embrulha essa
   função com `useQuery`, e é isso que os componentes de tela realmente
   importam.

Essa divisão espelha o par `repository` (só sabe falar com o banco) /
`service` (decide como usar) do backend — aqui, a "função de fetch" faz o
papel do repository, e o hook (`useQuery`) faz o papel do service.

---

## Materiais complementares

### Documentações

TanStack Query — Overview

https://tanstack.com/query/latest/docs/framework/react/overview

TanStack Query — Important Defaults

https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults

MDN — Fetch API

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

### Vídeos recomendados

React Query explicado

https://www.youtube.com/results?search_query=react+query+tanstack+explicado

---

## Resumo

Neste módulo aprendemos:

- Por que o React Query substitui a busca de dados manual com
  `useState`/`useEffect`.
- Como o `QueryClientProvider` disponibiliza o cache para toda a aplicação.
- Como a URL da API é centralizada em `config.ts`.
- O padrão "função de fetch + hook público" repetido em cada domínio.

No próximo arquivo (`hooks-de-leitura.md`) veremos os hooks de consulta
(`useQuery`) de cada domínio em detalhe.
