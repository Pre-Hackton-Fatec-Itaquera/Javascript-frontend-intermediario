# Módulo 01 - Arquitetura do projeto

## Objetivo do módulo

Neste módulo iremos entender:

- Como as pastas do frontend são organizadas.
- Por que existem duas divisões principais: `http/` e `paginas/`.
- Como essa organização se relaciona com a arquitetura por Features usada
  no backend.

---

## Duas perguntas, duas pastas

O frontend deste projeto responde a duas perguntas diferentes, e cada uma
delas vira uma pasta:

> "De onde vêm os dados?" → `src/http/`

> "O que a pessoa vê na tela?" → `src/paginas/`

```text
src/
├── http/         → comunicação com a API do backend
├── paginas/      → telas da aplicação
├── App.tsx        → rotas
├── main.tsx        → ponto de entrada
└── index.css       → estilos globais
```

---

## src/http — organizado por domínio (igual ao backend)

```text
http/
├── config.ts
├── professor/
│   ├── useProfessor.ts
│   └── types/professor.type.ts
├── subject/
│   ├── useSubject.ts
│   └── types/subject.type.ts
├── professor-subject/
│   ├── useProfessorSubject.ts
│   └── types/professor-subject.type.ts
└── ratings/
    ├── useRatings.ts
    └── types/ratings.type.ts
```

Repare que os nomes das pastas (`professor`, `subject`, `professor-subject`,
`ratings`) são **os mesmos domínios** já vistos no backend
(`Module-08-Camada-HTTP` do repositório de backend). Não é coincidência:

- No backend, cada domínio tem `route/`, `service/`, `repository/`,
  `schemas/`.
- No frontend, cada domínio tem um hook (`useProfessor.ts`, por exemplo) que
  concentra a busca de dados daquele domínio, e uma pasta `types/` com a
  forma dos dados (o equivalente ao `schemas/` do backend, mas para o lado
  do cliente).

Isso significa que, ao adicionar um domínio novo no backend, o caminho
natural no frontend é criar uma pasta espelhada dentro de `http/`.

---

## src/paginas — organizado por tela

```text
paginas/
├── startPage.tsx
├── notFoundPage.tsx
└── HomePage/
    ├── HomePage.tsx
    ├── useHomePage.tsx
    ├── useHomeModalsPage.tsx
    └── componentes/
        ├── ProfessorOverview.tsx
        ├── ratingForm.tsx
        ├── searchProfessorForm.tsx
        └── skeletonHomePage.tsx
```

Aqui a régua muda: não é mais "por domínio de dados", e sim **por tela**.

Uma página como `HomePage/` concentra tudo que só faz sentido para aquela
tela específica:

- O arquivo principal (`HomePage.tsx`) — só desenha a interface.
- Um ou mais hooks de página (`useHomePage.tsx`, `useHomeModalsPage.tsx`) —
  concentram o estado e a lógica daquela tela.
- Uma pasta `componentes/` — pedaços de interface usados só dentro daquela
  página (um formulário, um card, um skeleton de carregamento).

Esse padrão — separar "o que pensa" (hook) de "o que desenha" (componente)
— é o mesmo princípio do backend de separar rota (HTTP) de service (regra de
negócio), só que aplicado à interface. Você vai ver esse comentário se
repetindo no código real, por exemplo no topo do `useHomePage.tsx`:

```ts
// Concentra a lógica/estado da HomePage, deixando o HomePage.tsx focado
// só em desenhar a tela (mesmo princípio "rota não pensa, service não
// desenha" usado no backend).
```

---

## Onde entram as rotas?

O `App.tsx`, na raiz de `src/`, não pertence nem a `http/` nem a
`paginas/` — ele é o arquivo que **liga tudo**: decide qual página aparece
para cada URL. Isso é detalhado no Module-02.

---

## Materiais complementares

### Documentações

React — Pensando em componentes

https://react.dev/learn/thinking-in-react

TanStack Query — conceitos

https://tanstack.com/query/latest/docs/framework/react/overview

---

### Vídeos recomendados

Como organizar pastas em projetos React

https://www.youtube.com/results?search_query=organizar+pastas+projeto+react

---

## Resumo

Neste módulo aprendemos:

- Que o frontend se organiza em duas grandes divisões: `http/` (dados) e
  `paginas/` (telas).
- Que `http/` é organizado por domínio, espelhando os domínios do backend.
- Que `paginas/` é organizado por tela, e cada tela separa hook (lógica) de
  componente (interface).

No próximo módulo iremos estudar o `App.tsx` e entender como o roteamento
decide qual página mostrar.
