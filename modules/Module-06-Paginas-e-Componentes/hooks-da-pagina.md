# Módulo 06 - Hooks de página

## Objetivo do módulo

Neste módulo você irá aprender:

- Por que a lógica de uma página fica separada num hook próprio.
- Como `useHomePage` concentra busca e seleção de professor.
- Como `useHomeModalsPage` concentra o estado de modais da tela.

---

## Por que um hook por página?

Já vimos no Module-01 o comentário que aparece no topo do código real:

```ts
// Concentra a lógica/estado da HomePage, deixando o HomePage.tsx focado
// só em desenhar a tela (mesmo princípio "rota não pensa, service não
// desenha" usado no backend).
```

Sem essa separação, o arquivo `HomePage.tsx` acumularia, ao mesmo tempo:
estado (`useState`), chamadas à API (`useQuery`), navegação
(`useNavigate`) **e** toda a árvore de JSX da tela. Isso tornaria o
componente difícil de ler e difícil de testar. Separando a lógica em hooks
próprios, o componente da página vira, essencialmente, uma função que só
decide "o que desenhar", lendo os valores prontos que os hooks entregam.

---

## useHomePage.tsx

```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfessorSearch } from "../../http/professor/useProfessor";

export function useHomePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const professorQuery = useProfessorSearch(searchTerm);

    function handleSearch(name: string) {
        setSearchTerm(name);
    }

    function selectProfessor(id: string) {
        navigate(`/Home/${id}`);
    }

    function resetSearch() {
        setSearchTerm("");
    }

    return {
        handleSearch,
        selectProfessor,
        resetSearch,
        professores: professorQuery.data ?? [],
        isSearching: professorQuery.isLoading,
        searchError: professorQuery.error,
        hasSearched: searchTerm.length > 0,
    };
}
```

Esse hook junta três peças já vistas em módulos anteriores:

- `useState` — guarda `searchTerm`, o termo **efetivamente** buscado (só
  muda quando o formulário é enviado, não a cada tecla digitada — assim
  não é disparada uma requisição por letra).
- `useProfessorSearch` (Module-04) — busca os professores que batem com
  `searchTerm`.
- `useNavigate` (Module-02) — ao escolher um professor da lista de
  resultados, navega para `/Home/:professorId`, que é a rota que faz a
  `ProfessorOverview` carregar os dados reais dele.

Repare que o hook **não devolve** o `professorQuery` inteiro — ele devolve
só os pedaços que a tela precisa (`professores`, `isSearching`,
`searchError`, `hasSearched`), já com nomes adaptados ao vocabulário da
tela. Isso é o que permite ao `HomePage.tsx` (visto em
`composicao-da-home.md`) não precisar saber nada sobre `useQuery` ou
`queryKey` — só sobre o que exibir.

---

## useHomeModalsPage.tsx

```tsx
import { useState } from "react";

export function useHomeModalsPage() {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  function toggleRatingModal() {
    setIsRatingModalOpen(prevOpen => !prevOpen);
  }

  return {
    isRatingModalOpen,
    toggleRatingModal
  };
}
```

Esse segundo hook existe separado do `useHomePage` por um motivo simples:
**modal é um assunto diferente de busca**. Se todo o estado de modais da
tela fosse colocado dentro de `useHomePage`, esse hook cresceria misturando
duas responsabilidades que não têm relação entre si. Ao crescer o projeto
(por exemplo, adicionando um segundo modal), a expectativa é que ele cresça
aqui dentro, sem tocar em `useHomePage`.

---

## Materiais complementares

### Documentações

React — Reusing Logic with Custom Hooks

https://react.dev/learn/reusing-logic-with-custom-hooks

React — useState

https://react.dev/reference/react/useState

---

### Vídeos recomendados

Custom hooks em React explicado

https://www.youtube.com/results?search_query=custom+hooks+react+explicado

---

## Resumo

Neste módulo aprendemos:

- Por que a lógica de uma página é extraída para um hook próprio.
- Como `useHomePage` junta busca (`useProfessorSearch`), estado local e
  navegação.
- Por que o estado de modais fica separado num hook próprio
  (`useHomeModalsPage`).

No próximo arquivo (`composicao-da-home.md`) veremos como esses hooks se
encontram com os componentes visuais para formar a tela completa.
