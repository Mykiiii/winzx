import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto.create-booking';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }

  @Get('service/:serviceId')
  listByService(@Param('serviceId') serviceId: string) {
    return this.bookingsService.listByService(serviceId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.bookingsService.cancel(id);
  }
}
