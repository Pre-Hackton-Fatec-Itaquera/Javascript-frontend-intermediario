# Módulo 06 - Composição da HomePage

## Objetivo do módulo

Neste módulo você irá aprender:

- Como `HomePage.tsx` compõe hooks e componentes menores numa única tela.
- Como a `ProfessorOverview` decide o que mostrar dependendo se há ou não
  um professor selecionado.
- Como os estados de carregando / erro / vazio / com dados são tratados na
  interface.
- Para que serve o `skeletonHomePage.tsx`.

---

## HomePage.tsx — o componente que só desenha

```tsx
export const HomePage = () => {
  const { professorId } = useParams<{ professorId?: string }>();
  const { handleSearch, selectProfessor, resetSearch, professores, isSearching, searchError, hasSearched } = useHomePage();
  const { isRatingModalOpen, toggleRatingModal } = useHomeModalsPage();

  return (
    <div>
      {/* Header + Hero (visual fixo) */}

      <SearchProfessorForm onSearch={handleSearch} />

      {hasSearched && (
        <div>
          {isSearching && <span>Buscando professores...</span>}
          {!isSearching && searchError && <span>Não foi possível buscar agora.</span>}
          {!isSearching && !searchError && professores.length === 0 && (
            <span>Nenhum professor encontrado com esse nome.</span>
          )}
          {!isSearching && !searchError && professores.length > 0 && (
            <ul>
              {professores.map((professor) => (
                <li key={professor.id}>
                  <button onClick={() => selectProfessor(professor.id)}>
                    {professor.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <ProfessorOverview professorId={professorId} onAvaliarClick={toggleRatingModal} />

      {isRatingModalOpen && (
        <div onClick={toggleRatingModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <RatingForm professorId={professorId} />
          </div>
        </div>
      )}
    </div>
  );
};
```

Note como as três primeiras linhas do componente já contam a história
inteira da tela, mesmo antes de qualquer JSX:

1. `professorId` vem da **URL** (Module-02).
2. Todo o resto do estado de busca vem de `useHomePage` (visto em
   `hooks-da-pagina.md`).
3. O estado do modal vem de `useHomeModalsPage`.

O corpo do componente, a partir daí, só faz uma coisa: decidir **o que
mostrar** com base nesses valores — sem chamar `fetch`, sem `useState`
próprio, sem `useEffect`.

### O padrão de renderização condicional em cascata

```tsx
{isSearching && <Loading />}
{!isSearching && searchError && <Error />}
{!isSearching && !searchError && professores.length === 0 && <Empty />}
{!isSearching && !searchError && professores.length > 0 && <Results />}
```

Essa sequência de condições cobre, em ordem, os **quatro estados
possíveis** de qualquer busca de dados: carregando, erro, vazio e com
resultado. Cada condição já nega explicitamente a anterior
(`!isSearching`, `!searchError`) para garantir que só um bloco apareça por
vez. Esse é o mesmo raciocínio que se repete em qualquer tela que consome
uma API — vale a pena reconhecer o padrão para reaproveitá-lo em novas
telas.

### O modal, sem biblioteca extra

```tsx
{isRatingModalOpen && (
  <div className="fixed inset-0 ..." onClick={toggleRatingModal}>
    <div onClick={(e) => e.stopPropagation()}>
      <RatingForm professorId={professorId} />
    </div>
  </div>
)}
```

O projeto não usa uma biblioteca de modal — o "modal" é só um `<div>`
posicionado por cima de tudo (`fixed inset-0`) que só é renderizado quando
`isRatingModalOpen` é verdadeiro. Clicar no fundo escurecido chama
`toggleRatingModal` (fecha); `e.stopPropagation()` no conteúdo interno
impede que um clique dentro do formulário feche o modal sem querer.

---

## ProfessorOverview — decidindo o que mostrar por tipo de estado

```tsx
export const ProfessorOverview = ({ professorId, onAvaliarClick }: ProfessorOverviewProps) => {
  if (!professorId) {
    return <EmptyState />;
  }
  return <ProfessorOverviewContent professorId={professorId} onAvaliarClick={onAvaliarClick} />;
};
```

Esse componente usa um padrão simples e muito comum em React: um
componente "porteiro", que decide **qual versão** do componente renderizar
antes mesmo de buscar qualquer dado. Sem `professorId` (nenhum professor
selecionado ainda), nem faz sentido chamar os hooks de busca — por isso
`EmptyState` é retornado direto.

Dentro de `ProfessorOverviewContent`, os hooks de dados do Module-04 são
combinados:

```tsx
const { data: professor, isLoading: isLoadingProfessor } = useProfessor(professorId);
const { data: professorSubjects } = useProfessorSubjects(professorId);
const professorSubjectId = professorSubjects?.[0]?.id;
const { data: average } = useProfessorSubjectAverage(professorSubjectId);
const { data: ratings } = useRatings(professorSubjectId);
```

Repare na **dependência em cadeia**: só se sabe qual `professorSubjectId`
usar depois que `professorSubjects` chega — e só depois disso é que
`average` e `ratings` daquele vínculo específico são buscados. É por isso
que `useProfessorSubjectAverage` e `useRatings` recebem um id que pode ser
`undefined` no primeiro momento (e usam `enabled: !!id` internamente, como
visto no Module-04) — eles "esperam" o dado anterior chegar.

### Derivando estatísticas com useMemo

```tsx
const stats = useMemo(() => {
  const total = ratings?.length ?? 0;
  const commentsCount = ratings?.filter((r) => r.comment).length ?? 0;
  const recommendedCount = ratings?.filter((r) => r.value >= 4).length ?? 0;
  const recommendPct = total > 0 ? Math.round((recommendedCount / total) * 100) : 0;
  return [ /* ...cards de estatística... */ ];
}, [ratings, average]);
```

`stats` e `distribution` não vêm prontos da API — são **calculados no
frontend** a partir da lista de `ratings` já carregada. `useMemo` evita
refazer esse cálculo em toda renderização, refazendo-o só quando `ratings`
ou `average` mudam de fato.

---

## skeletonHomePage.tsx — pronto para uso, ainda não conectado

```tsx
export function SkeletonHomePage() {
  return (
    <div className="animate-pulse">
      {/* blocos cinza no formato da tela final */}
    </div>
  );
}
```

Um *skeleton* é um placeholder visual que imita o formato da tela enquanto
os dados reais ainda não chegaram — em vez de mostrar a tela em branco ou
um texto solto de "Carregando...", mostram-se blocos cinza pulsando
(`animate-pulse`, do Tailwind) no formato aproximado do conteúdo final.

Hoje, o carregamento do professor é tratado de forma simples dentro da
própria `ProfessorOverview`:

```tsx
if (isLoadingProfessor) {
  return <div>Carregando...</div>;
}
```

O `SkeletonHomePage` existe pronto no projeto para substituir esse
`"Carregando..."` por um placeholder mais elaborado, mas ainda não está
importado em nenhum lugar — é um candidato natural para ser conectado numa
próxima iteração da tela.

---

## Materiais complementares

### Documentações

React — Conditional Rendering

https://react.dev/learn/conditional-rendering

React — useMemo

https://react.dev/reference/react/useMemo

TanStack Query — Dependent Queries

https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries

---

### Vídeos recomendados

Loading skeletons em React

https://www.youtube.com/results?search_query=skeleton+loading+react

---

## Resumo

Neste módulo aprendemos:

- Como `HomePage.tsx` compõe hooks e componentes sem lógica própria.
- Como o padrão de renderização em cascata cobre carregando / erro / vazio
  / com dados.
- Como `ProfessorOverview` encadeia hooks de dados dependentes uns dos
  outros.
- Como `useMemo` deriva estatísticas a partir dos dados já carregados.
- Que o `SkeletonHomePage` já existe pronto, mas ainda não foi conectado à
  tela.

Este é o último módulo desta trilha inicial do frontend. A partir daqui, a
aplicação já é capaz de: navegar entre telas, buscar e exibir professores,
consumir a API do backend, validar formulários e enviar avaliações.
