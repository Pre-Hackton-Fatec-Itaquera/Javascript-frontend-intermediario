# Módulo 02 - Roteamento

## Objetivo do módulo

Neste módulo você irá aprender:

- O que é roteamento no frontend e por que ele é necessário numa SPA.
- Como o `react-router-dom` é configurado no `App.tsx`.
- Como funciona um parâmetro de rota opcional (`:professorId?`).
- Como as páginas `StartPage` e `NotFoundScreen` usam navegação
  programática.

---

## Por que precisamos de roteamento?

No `index.html` (Module-00) vimos que existe **uma única página HTML** para
todo o projeto. Então como a URL muda de `/` para `/Home` e a tela muda
junto?

Quem faz essa mágica é uma biblioteca de roteamento — aqui, o
`react-router-dom`. Ela:

- Observa a URL atual do navegador.
- Decide qual componente React deve ser desenhado para aquela URL.
- Permite navegar entre "páginas" sem recarregar o navegador (sem um novo
  `GET` de HTML).

---

## App.tsx — onde as rotas são declaradas

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './paginas/HomePage/HomePage';
import { StartPage } from './paginas/startPage';

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<StartPage />} path='/' />
          <Route path="/Home/:professorId?" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
```

Duas coisas acontecem aqui ao mesmo tempo — o `App.tsx` é o único lugar do
projeto onde elas se cruzam:

1. **Roteamento**: `BrowserRouter` habilita o roteamento baseado na URL do
   navegador; `Routes`/`Route` mapeiam cada caminho (`path`) para um
   componente (`element`).
2. **React Query**: `QueryClientProvider` disponibiliza o cliente de
   cache/requisições para toda a árvore de componentes abaixo dele — isso é
   aprofundado no Module-04.

---

## O parâmetro opcional `:professorId?`

```text
/Home/:professorId?
```

O `:professorId` é um **parâmetro de rota** — um pedaço variável da URL. O
`?` no final diz que ele é **opcional**. Isso significa que essa mesma rota
atende:

```text
/Home              → nenhum professor selecionado ainda
/Home/abc-123       → professor com id "abc-123" selecionado
```

Dentro da `HomePage`, esse valor é lido com o hook `useParams` do
`react-router-dom`:

```tsx
const { professorId } = useParams<{ professorId?: string }>();
```

Esse é o mesmo `professorId` que, quando presente, faz a `ProfessorOverview`
carregar os dados reais daquele professor (ver Module-06).

---

## Navegação programática: StartPage e NotFoundScreen

Além de declarar rotas, o `react-router-dom` oferece o hook `useNavigate`
para **trocar de rota a partir de código** (por exemplo, ao clicar num
botão).

`startPage.tsx`:

```tsx
const navigate = useNavigate();
// ...
<button onClick={() => navigate("/Home", { replace: true })}>
  Começar
</button>
```

`{ replace: true }` troca a entrada atual do histórico do navegador em vez
de empilhar uma nova — assim, ao clicar em "voltar" no navegador, a pessoa
não retorna para a tela inicial repetidamente.

`notFoundPage.tsx` segue o mesmo padrão, navegando de volta para `/` quando
a pessoa clica em "Voltar ao início". Note que esse componente hoje não está
registrado em nenhuma `<Route>` do `App.tsx` — ele existe pronto para ser
usado como tela de fallback (por exemplo, quando uma busca não encontra
nenhum professor), mas ainda não foi conectado a um caminho específico.

---

## Materiais complementares

### Documentações

React Router

https://reactrouter.com/en/main

TanStack Query — Quick Start

https://tanstack.com/query/latest/docs/framework/react/quick-start

---

### Vídeos recomendados

React Router explicado

https://www.youtube.com/results?search_query=react+router+dom+explicado

---

## Resumo

Neste módulo aprendemos:

- Por que uma SPA precisa de uma biblioteca de roteamento.
- Como `BrowserRouter`, `Routes` e `Route` declaram as rotas da aplicação.
- Como um parâmetro de rota opcional (`:professorId?`) funciona.
- Como `useNavigate` permite trocar de rota a partir de um clique.

No próximo módulo iremos estudar como o Tailwind CSS é usado para
estilizar as telas.
