import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  userId!: string;

  @IsString()
  serviceId!: string;

  @IsOptional()
  @IsDateString()
  timeSlot?: string;

  @IsOptional()
  @IsDateString()
  time?: string;
}
