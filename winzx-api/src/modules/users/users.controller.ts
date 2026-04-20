import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto.create-user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get('username/:username')
  getByUsername(@Param('username') username: string) {
    return this.usersService.getByUsername(username);
  }
}
