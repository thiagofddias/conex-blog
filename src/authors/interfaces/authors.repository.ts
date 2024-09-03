import { Author } from '../graphql/models/auth'
import { ICreateAuthor } from './create-author'

export type SearchParamns = {
  page?: number
  perPage?: number
  filter?: string
  sort?: string
  sortDir?: 'asc' | 'desc'
}

export type SearchResult = {
  items: Author[]
  currentPage: number
  perPage?: number
  lastPage: number
  total: number
}

export interface IAuthorsRepository {
  sortableFields: string[]

  create(data: ICreateAuthor): Promise<Author>
  update(author: Author): Promise<Author>
  delete(id: string): Promise<Author>
  findById(id: string): Promise<Author>
  findByEmail(email: string): Promise<Author>
  search(params: SearchParamns): Promise<SearchResult>
  get(id: string): Promise<Author>
}
