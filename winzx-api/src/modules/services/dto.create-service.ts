import { IsInt, IsString, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  userId!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsInt()
  @Min(0)
  price!: number;

  @IsInt()
  @Min(15)
  durationMinutes!: number;
}
