import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create_album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';
import { SongEntity } from './entities/song.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album = new AlbumEntity();
    album.image_url = createAlbumDto.image_url;
    album.title = createAlbumDto.title;
    album.date = new Date(createAlbumDto.date);

    const songs = createAlbumDto.songEntities.map((songData) => {
      const song = new SongEntity();
      song.image_url = songData.image_url;
      song.image_data = songData.image_data;
      song.title = songData.title;
      song.content = songData.content;
      song.score = songData.score;
      return song;
    });

    album.songEntities = songs;
    await this.albumRepository.save(album);
    return album;
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findAllPreviewIamge() {
    return await this.albumRepository.find({
      select: ['album_id', 'image_url'],
    });
  }

  async deleteAlbum(album_id: number) {
    return await this.albumRepository.delete(album_id);
  }
}
