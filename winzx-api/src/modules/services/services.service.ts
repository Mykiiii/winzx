import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateServiceDto } from './dto.create-service';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('Creator not found');

    return this.prisma.service.create({ data: dto });
  }

  listByUserId(userId: string) {
    return this.prisma.service.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  getById(id: string) {
    return this.prisma.service.findUnique({ where: { id }, include: { user: true } });
  }
}
