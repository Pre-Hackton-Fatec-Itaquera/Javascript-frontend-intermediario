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