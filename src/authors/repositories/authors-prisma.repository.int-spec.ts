import { Test, TestingModule } from '@nestjs/testing'
import { AuthorsPrismaRepository } from './authors-prisma.repository'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { NotFoundError } from '@/shared/errors/not-found-error'

describe('AuthorsPrismaRepository Integration Tests', () => {
  let module: TestingModule
  let repository: AuthorsPrismaRepository
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new AuthorsPrismaRepository(prisma as any)
  })

  beforeEach(async () => {
    await prisma.author.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should throws an error when the id is not found', async () => {
    await expect(
      repository.findById('796c5a25-1d3b-4228-9a75-06f416c6e218'),
    ).rejects.toThrow(
      new NotFoundError(
        'Author not found using ID 796c5a25-1d3b-4228-9a75-06f416c6e218',
      ),
    )
  })
})
