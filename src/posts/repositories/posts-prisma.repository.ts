import { PrismaService } from '@/database/prisma/prisma.service'
import { Post } from '../graphql/models/post'
import { NotFoundError } from '@/shared/errors/not-found-error'
import { PostsRepository } from '../graphql/interfaces/posts.repository'

export class PostsPrismaRepository implements PostsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Omit<Post, 'id'>): Promise<Post> {
    return await this.prismaService.post.create({ data })
  }

  async update(postParam: Post): Promise<Post> {
    await this.get(postParam.id)
    const post = await this.prismaService.post.update({
      data: postParam,
      where: {
        id: postParam.id,
      },
    })
    return post
  }

  async findById(id: string): Promise<Post> {
    return this.get(id)
  }

  async findBySlug(slug: string): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { slug },
    })
    return post
  }

  async get(id: string): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    })
    if (!post) {
      throw new NotFoundError(`Post not found using ID ${id}`)
    }
    return post
  }
}
