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

// Busca com filtro por nome — usada pelo formulário de busca da Home.
// `enabled` evita disparar a requisição antes do usuário enviar o formulário.
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