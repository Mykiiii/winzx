import { IsDateString, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  userId!: string;

  @IsString()
  serviceId!: string;

  @IsDateString()
  timeSlot!: string;
}
