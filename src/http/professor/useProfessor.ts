import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../config'
import type { Professor } from './types/professor.type'

async function fetchProfessors(): Promise<Professor[]> {
  const response = await fetch(`${API_URL}/professor`)
  if (!response.ok) throw new Error('Erro ao buscar professores')
  return response.json()
}

async function fetchProfessorById(id: string): Promise<Professor> {
  const response = await fetch(`${API_URL}/professor/${id}`)
  if (!response.ok) throw new Error('Erro ao buscar professor')
  return response.json()
}

export function useProfessors() {
  return useQuery({
    queryKey: ['professors'],
    queryFn: fetchProfessors,
  })
}

export function useProfessor(id: string | undefined) {
  return useQuery({
    queryKey: ['professor', id],
    queryFn: () => fetchProfessorById(id as string),
    enabled: !!id,
  })
}