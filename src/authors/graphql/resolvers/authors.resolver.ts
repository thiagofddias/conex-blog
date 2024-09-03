import { PrismaService } from '@/database/prisma/prisma.service'
import { Query, Resolver } from '@nestjs/graphql'
import { Author } from '../models/auth'

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Author])
  authors() {
    return this.prisma.author.findMany()
  }
}
