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