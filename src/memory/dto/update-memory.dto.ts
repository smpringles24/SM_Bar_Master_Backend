import { IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateMemoryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsString()
  @IsOptional()
  customer_info?: string;

  @IsString()
  @IsOptional()
  menu_info?: string;
}
