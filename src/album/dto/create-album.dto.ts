import { IsString, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  customer_info: string = 'Unknown';

  @IsOptional()
  @IsString()
  menu_info: string = 'Anonymous';
}
