# Módulo 04 - Hooks de leitura (useQuery por domínio)

## Objetivo do módulo

Neste módulo você irá aprender:

- Como cada domínio (`professor`, `subject`, `professor-subject`) expõe seus
  dados através de hooks baseados em `useQuery`.
- O que é uma `queryKey` e por que ela importa.
- Como a opção `enabled` evita disparar requisições antes da hora.

---

## professor/useProfessor.ts

```ts
import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../config'
import type { Professor } from './types/professor.type'

async function fetchProfessors(name?: string): Promise<Professor[]> {
  const query = name ? `?name=${encodeURIComponent(name)}` : ''
  const response = await fetch(`${API_URL}/professor${query}`)
  if (!response.ok) throw new Error('Erro ao buscar professores')
  return response.json()
}

async function fetchProfessorById(id: string): Promise<Professor> {
  const response = await fetch(`${API_URL}/professor/${id}`)
  if (!response.ok) throw new Error('Erro ao buscar professor')
  return response.json()
}

export function useProfessorSearch(name: string) {
  return useQuery({
    queryKey: ['professors', name],
    queryFn: () => fetchProfessors(name),
    enabled: name.length > 0,
  })
}

export function useProfessor(id: string | undefined) {
  return useQuery({
    queryKey: ['professor', id],
    queryFn: () => fetchProfessorById(id as string),
    enabled: !!id,
  })
}
```

Esse arquivo expõe **dois** hooks porque existem dois casos de uso
diferentes na tela: buscar uma lista de professores por nome
(`useProfessorSearch`) e buscar um único professor por id
(`useProfessor`) — usados, respectivamente, no formulário de busca e no
card de detalhes do professor selecionado (Module-05 e Module-06).

### O que é a `queryKey`?

```ts
queryKey: ['professor', id]
```

A `queryKey` é o "endereço" daquele dado dentro do cache do React Query.
Sempre que `id` muda, a `queryKey` muda junto — e o React Query entende
que precisa buscar (ou reaproveitar do cache) os dados daquele `id`
específico. Repare que o mesmo padrão aparece em todos os hooks deste
módulo: uma string fixa (`'professor'`) seguida da variável que identifica
"qual" registro.

### O que é `enabled`?

```ts
enabled: !!id
```

Por padrão, `useQuery` dispara a busca assim que o componente é montado.
A opção `enabled` permite **condicionar** esse disparo. Aqui, `!!id`
converte `id` para `true`/`false` — ou seja, só busca o professor quando
existe de fato um `id`. Sem isso, a aplicação tentaria buscar
`/professor/undefined` toda vez que nenhum professor estivesse selecionado.

O mesmo raciocínio aparece em `useProfessorSearch`, mas usando o
comprimento do texto (`name.length > 0`): não faz sentido buscar com um
termo vazio.

---

## subject/useSubject.ts

```ts
import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../config'
import type { Subject } from './types/subject.type'

async function fetchSubjects(): Promise<Subject[]> {
  const response = await fetch(`${API_URL}/subjects`)
  if (!response.ok) throw new Error('Erro ao buscar matérias')
  return response.json()
}

async function fetchSubjectById(id: string): Promise<Subject> {
  const response = await fetch(`${API_URL}/subjects/${id}`)
  if (!response.ok) throw new Error('Erro ao buscar matéria')
  return response.json()
}

export function useSubjects() {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
  })
}

export function useSubject(id: string | undefined) {
  return useQuery({
    queryKey: ['subject', id],
    queryFn: () => fetchSubjectById(id as string),
    enabled: !!id,
  })
}
```

Mesmo padrão de `professor/useProfessor.ts`: uma função de fetch por
operação, um hook por caso de uso. `useSubjects` (plural) não precisa de
`enabled` porque a lista completa de matérias não depende de nenhum
parâmetro — ela pode ser buscada assim que qualquer componente precisar
dela.

---

## professor-subject/useProfessorSubject.ts

```ts
import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../config'
import type { ProfessorSubject, ProfessorSubjectAverage } from './types/professor-subject.type'

async function fetchProfessorSubjects(professorId?: string): Promise<ProfessorSubject[]> {
  const url = professorId
    ? `${API_URL}/professor-subject?professorId=${professorId}`
    : `${API_URL}/professor-subject`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Erro ao buscar vínculos professor-matéria')
  return response.json()
}

async function fetchProfessorSubjectById(id: string): Promise<ProfessorSubject> {
  const response = await fetch(`${API_URL}/professor-subject/${id}`)
  if (!response.ok) throw new Error('Erro ao buscar vínculo professor-matéria')
  return response.json()
}

async function fetchProfessorSubjectAverage(id: string): Promise<ProfessorSubjectAverage> {
  const response = await fetch(`${API_URL}/professor-subject/${id}/average`)
  if (!response.ok) throw new Error('Erro ao buscar média do professor-matéria')
  return response.json()
}

export function useProfessorSubjects(professorId?: string) {
  return useQuery({
    queryKey: ['professor-subjects', professorId],
    queryFn: () => fetchProfessorSubjects(professorId),
  })
}

export function useProfessorSubject(id: string | undefined) {
  return useQuery({
    queryKey: ['professor-subject', id],
    queryFn: () => fetchProfessorSubjectById(id as string),
    enabled: !!id,
  })
}

export function useProfessorSubjectAverage(id: string | undefined) {
  return useQuery({
    queryKey: ['professor-subject-average', id],
    queryFn: () => fetchProfessorSubjectAverage(id as string),
    enabled: !!id,
  })
}
```

Esse é o domínio mais rico dos três: uma avaliação (`rating`) não pertence
diretamente a um professor, e sim a um **vínculo** entre professor e
matéria (`professor_subject`) — o mesmo relacionamento modelado no banco de
dados do backend. Por isso existem três hooks aqui:

- `useProfessorSubjects` — lista os vínculos de um professor.
- `useProfessorSubject` — busca um vínculo específico.
- `useProfessorSubjectAverage` — busca a média de notas daquele vínculo
  (um endpoint calculado, não um registro bruto).

Esses hooks são consumidos juntos pela `ProfessorOverview` (Module-06) para
montar as estatísticas do professor selecionado.

---

## Materiais complementares

### Documentações

TanStack Query — Query Keys

https://tanstack.com/query/latest/docs/framework/react/guides/query-keys

TanStack Query — Dependent Queries (base do `enabled`)

https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries

---

### Vídeos recomendados

TanStack Query na prática

https://www.youtube.com/results?search_query=tanstack+query+na+pratica

---

## Resumo

Neste módulo aprendemos:

- Como cada domínio expõe seus dados através de hooks baseados em
  `useQuery`.
- O papel da `queryKey` como "endereço" do dado no cache.
- Como `enabled` evita buscar dados antes de haver um parâmetro válido.
- Por que `professor-subject` existe como domínio próprio, ligando
  professor e matéria.

No próximo arquivo (`mutations.md`) veremos como o frontend **envia** dados
para a API, usando `useMutation`.
