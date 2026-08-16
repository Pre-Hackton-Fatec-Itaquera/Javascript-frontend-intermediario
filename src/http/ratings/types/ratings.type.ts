export interface Rating {
  id: string
  value: number
  comment: string | null
  professorSubjectId: string
  createdAt?: string
}

export interface CreateRatingPayload {
  value: number
  comment?: string
  professorSubjectId: string
}