import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto.create-user';
import { UpdateUserDto } from './dto.update-user';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const username = dto.username.trim().toLowerCase();
    const email = dto.email?.trim().toLowerCase() || `${username}@winzx.local`;

    try {
      return await this.prisma.user.create({
        data: {
          name: dto.name.trim(),
          email,
          username,
          bio: dto.bio?.trim(),
        },
      });
    } catch {
      const existing = await this.prisma.user.findUnique({ where: { username } });
      if (existing) {
        return this.prisma.user.update({
          where: { id: existing.id },
          data: {
            name: dto.name.trim(),
            email,
            bio: dto.bio?.trim(),
          },
        });
      }

      throw new ConflictException('Email or username already exists');
    }
  }

  async getByUsername(username: string) {
    if (username === 'demo') {
      await this.ensureDemoProfile();
    }

    const user = await this.prisma.user.findUnique({
      where: { username: username.trim().toLowerCase() },
      include: { services: { orderBy: { createdAt: 'desc' } } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { services: { orderBy: { createdAt: 'desc' } } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const username = dto.username?.trim().toLowerCase();

    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...(dto.name ? { name: dto.name.trim() } : {}),
          ...(dto.email ? { email: dto.email.trim().toLowerCase() } : {}),
          ...(username ? { username } : {}),
          ...(dto.bio !== undefined ? { bio: dto.bio.trim() } : {}),
        },
        include: { services: { orderBy: { createdAt: 'desc' } } },
      });
    } catch {
      throw new ConflictException('Email or username already exists');
    }
  }

  private async ensureDemoProfile() {
    const demo = await this.prisma.user.upsert({
      where: { username: 'demo' },
      update: {
        name: 'Anika Sharma',
        bio: 'Product strategist helping founders turn scattered ideas into crisp launches, pricing, and growth systems.',
      },
      create: {
        name: 'Anika Sharma',
        email: 'demo@winzx.local',
        username: 'demo',
        bio: 'Product strategist helping founders turn scattered ideas into crisp launches, pricing, and growth systems.',
      },
    });

    const serviceCount = await this.prisma.service.count({ where: { userId: demo.id } });
    if (serviceCount > 0) return;

    await this.prisma.service.createMany({
      data: [
        {
          userId: demo.id,
          title: '1:1 Strategy Call',
          description: 'Get focused guidance on positioning, pricing, and your next highest-leverage move.',
          price: 999,
          durationMinutes: 30,
        },
        {
          userId: demo.id,
          title: 'Profile & Offer Review',
          description: 'A practical teardown of your creator profile, service copy, and booking flow.',
          price: 1499,
          durationMinutes: 45,
        },
      ],
    });
  }
}
