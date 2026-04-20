import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateServiceDto } from './dto.create-service';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @Get('user/:userId')
  listByUserId(@Param('userId') userId: string) {
    return this.servicesService.listByUserId(userId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.servicesService.getById(id);
  }
}
