import {
  IsString,
  IsDate,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateSongDto } from './create_song_dto';
import { Type } from 'class-transformer';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  image_url: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSongDto)
  songEntities?: CreateSongDto[];
}
