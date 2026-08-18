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