import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto.create-user';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data: dto });
    } catch {
      throw new ConflictException('Email or username already exists');
    }
  }

  async getByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { services: { orderBy: { createdAt: 'desc' } } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
