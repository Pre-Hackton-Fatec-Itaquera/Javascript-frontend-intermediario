# Módulo 04 - Mutations (enviando dados para a API)

## Objetivo do módulo

Neste módulo você irá aprender:

- A diferença entre `useQuery` (ler) e `useMutation` (escrever).
- Como criar uma avaliação (`rating`) usando `useMutation`.
- Como invalidar o cache para que a tela se atualize sozinha após uma
  escrita.

---

## ratings/useRatings.ts

```ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { API_URL } from '../config'
import type { CreateRatingPayload, Rating } from './types/ratings.type'

async function fetchRatings(professorSubjectId?: string): Promise<Rating[]> {
  const url = professorSubjectId
    ? `${API_URL}/ratings?professorSubjectId=${professorSubjectId}`
    : `${API_URL}/ratings`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Erro ao buscar avaliações')
  return response.json()
}

async function fetchRatingById(id: string): Promise<Rating> {
  const response = await fetch(`${API_URL}/ratings/${id}`)
  if (!response.ok) throw new Error('Erro ao buscar avaliação')
  return response.json()
}

async function createRating(payload: CreateRatingPayload): Promise<Rating> {
  const response = await fetch(`${API_URL}/ratings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('Erro ao criar avaliação')
  return response.json()
}

export function useRatings(professorSubjectId?: string) {
  return useQuery({
    queryKey: ['ratings', professorSubjectId],
    queryFn: () => fetchRatings(professorSubjectId),
  })
}

export function useRating(id: string | undefined) {
  return useQuery({
    queryKey: ['rating', id],
    queryFn: () => fetchRatingById(id as string),
    enabled: !!id,
  })
}

// Como avaliação é anônima e imutável após criada, só expomos criação — sem update/delete aqui.
export function useCreateRating() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createRating,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ratings', variables.professorSubjectId] })
    },
  })
}
```

Esse arquivo tem os dois hooks de leitura já vistos no módulo anterior
(`useRatings`, `useRating`) e **um hook novo**, de escrita:
`useCreateRating`.

---

## useQuery vs. useMutation

| | `useQuery` | `useMutation` |
|---|---|---|
| Quando roda | Automaticamente (ou quando `enabled` permite) | Só quando você chama `.mutate(...)` |
| Para que serve | Ler dados (GET) | Escrever dados (POST/PUT/DELETE) |
| Guarda cache do resultado? | Sim | Não (o resultado é só o retorno daquela ação) |

`createRating` é uma requisição `POST` — envia um corpo (`body`) em JSON e
espera a avaliação criada de volta. É exatamente o tipo de operação para a
qual `useMutation` foi desenhado.

---

## Invalidando o cache após escrever

```ts
export function useCreateRating() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createRating,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ratings', variables.professorSubjectId] })
    },
  })
}
```

Depois que uma avaliação é criada com sucesso, a lista de avaliações
daquele vínculo (`['ratings', professorSubjectId]`) fica **desatualizada**
no cache — ela não inclui a avaliação recém-criada. `invalidateQueries`
resolve isso: marca aquela `queryKey` como "precisa buscar de novo", e
qualquer componente que esteja usando `useRatings(professorSubjectId)`
refaz a busca automaticamente.

Isso é o que permite que, no Module-06, a `ProfessorOverview` (estatísticas,
distribuição de notas, lista de avaliações) se atualize sozinha assim que
uma nova avaliação é enviada pelo `RatingForm` (Module-05) — sem escrever
nenhum código extra de sincronização entre os dois componentes.

---

## Usando a mutation num componente

```tsx
const createRating = useCreateRating()

createRating.mutate(
  { value: 5, comment: "Ótimo professor", professorSubjectId },
  { onSuccess: () => reset({ value: 0, comment: "" }) }
)
```

`useMutation` expõe estados prontos, do mesmo jeito que `useQuery`:

- `createRating.isPending` — a requisição está em andamento.
- `createRating.isError` — a requisição falhou.
- `createRating.isSuccess` — a requisição deu certo.

O Module-05 mostra esses estados sendo usados na prática, para desabilitar
o botão de envio e exibir feedback visual ao usuário.

---

## Materiais complementares

### Documentações

TanStack Query — Mutations

https://tanstack.com/query/latest/docs/framework/react/guides/mutations

TanStack Query — Query Invalidation

https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation

---

### Vídeos recomendados

useMutation na prática

https://www.youtube.com/results?search_query=usemutation+tanstack+query+na+pratica

---

## Resumo

Neste módulo aprendemos:

- A diferença entre `useQuery` (leitura automática) e `useMutation`
  (escrita sob demanda).
- Como `createRating` envia um `POST` para a API.
- Como `invalidateQueries` atualiza o cache — e a tela — depois de uma
  escrita, sem código extra de sincronização.

No próximo módulo iremos estudar os formulários da aplicação, construídos
com `react-hook-form` e validados com `zod`.
