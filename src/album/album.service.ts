import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create_album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';
import { SongEntity } from './entities/song.entity';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<any> {
    const album = new AlbumEntity();
    album.image_url = createAlbumDto.image_url;
    album.title = createAlbumDto.title;
    album.date = createAlbumDto.date;
    album.backgroundColor = createAlbumDto.backgroundColor;

    await this.albumRepository.save(album);

    const songPromises = createAlbumDto.songEntities.map(async (songData) => {
      const song = new SongEntity();
      song.image_url = songData.image_url;
      song.image_data = songData.image_data;
      song.title = songData.title;
      song.content = songData.content;
      song.score = songData.score;
      song.album = album;
      await this.songRepository.save(song);
      return song;
    });

    album.songEntities = await Promise.all(songPromises);

    return classToPlain(album);
  }

  async findAll() {
    return await this.albumRepository.find({
      relations: ['songEntities'],
      select: [
        'album_id',
        'image_url',
        'title',
        'date',
        'backgroundColor',
        'songEntities',
      ],
    });
  }

  async findAllPreviewIamge() {
    return await this.albumRepository.find({
      select: ['album_id', 'image_url'],
    });
  }

  async findAlbumById(album_id: number) {
    return await this.albumRepository.findOne({
      where: { album_id },
      relations: ['songEntities'],
      select: [
        'album_id',
        'image_url',
        'title',
        'date',
        'backgroundColor',
        'songEntities',
      ],
    });
  }

  async deleteAlbum(album_id: number) {
    const album = await this.albumRepository.findOne({
      where: { album_id },
      relations: ['songEntities'],
    });

    if (album) {
      await Promise.all(
        album.songEntities.map((song) => this.songRepository.remove(song)),
      );
    }

    return await this.albumRepository.delete(album_id);
  }
}
