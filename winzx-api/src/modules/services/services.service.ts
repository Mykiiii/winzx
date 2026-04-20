import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateServiceDto } from './dto.create-service';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('Creator not found');

    const durationMinutes = dto.durationMinutes ?? dto.duration;
    if (!durationMinutes) {
      throw new BadRequestException('Duration is required');
    }

    return this.prisma.service.create({
      data: {
        userId: dto.userId,
        title: dto.title.trim(),
        description: dto.description.trim(),
        price: dto.price,
        durationMinutes,
      },
    });
  }

  list(userId?: string) {
    return this.prisma.service.findMany({
      where: userId ? { userId } : undefined,
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
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
