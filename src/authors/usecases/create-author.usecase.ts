import { ConflictError } from '@/shared/errors/conflict-error'
import { AuthorsPrismaRepository } from '../repositories/authors-prisma.repository'
import { BadRequestError } from '@/shared/errors/bad-request-error'
import { AuthorOutput } from '../dto/author-output'

export namespace CreateAuthorUsecase {
  export type Input = {
    name: string
    email: string
  }

  export type Output = AuthorOutput

  export class Usecase {
    constructor(private authorsRepository: AuthorsPrismaRepository) {}

    async execute(input: Input): Promise<Output> {
      const { email, name } = input

      if (!name || !email) {
        throw new BadRequestError('Input data not provided')
      }

      const emailExists = await this.authorsRepository.findByEmail(email)
      if (emailExists) {
        throw new ConflictError('Email adress used by other author')
      }

      const author = await this.authorsRepository.create(input)

      return author
    }
  }
}
