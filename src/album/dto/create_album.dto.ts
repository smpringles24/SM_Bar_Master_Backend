import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
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
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  backgroundColor: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSongDto)
  songEntities?: CreateSongDto[];
}
