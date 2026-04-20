import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookingDto } from './dto.create-booking';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
    const [user, service] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: dto.userId } }),
      this.prisma.service.findUnique({ where: { id: dto.serviceId } }),
    ]);

    if (!user) throw new NotFoundException('Buyer not found');
    if (!service) throw new NotFoundException('Service not found');

    const requestedTime = dto.timeSlot ?? dto.time;
    if (!requestedTime) {
      throw new BadRequestException('Time is required');
    }

    const slot = new Date(requestedTime);
    if (Number.isNaN(slot.getTime())) {
      throw new BadRequestException('Invalid time slot');
    }

    const conflict = await this.prisma.booking.findFirst({
      where: {
        serviceId: dto.serviceId,
        timeSlot: slot,
        status: { in: [BookingStatus.pending, BookingStatus.confirmed] },
      },
    });

    if (conflict) {
      throw new BadRequestException('Selected slot is already booked');
    }

    return this.prisma.booking.create({
      data: {
        userId: dto.userId,
        serviceId: dto.serviceId,
        timeSlot: slot,
        status: BookingStatus.confirmed,
      },
      include: { service: true, user: true },
    });
  }

  list(userId?: string) {
    return this.prisma.booking.findMany({
      where: userId
        ? {
            OR: [{ userId }, { service: { userId } }],
          }
        : undefined,
      include: { service: true, user: true },
      orderBy: { timeSlot: 'asc' },
    });
  }

  listByService(serviceId: string) {
    return this.prisma.booking.findMany({
      where: { serviceId },
      include: { service: true, user: true },
      orderBy: { timeSlot: 'asc' },
    });
  }

  async cancel(id: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');

    return this.prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.cancelled },
    });
  }
}
