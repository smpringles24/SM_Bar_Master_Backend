import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: AlbumEntity =
      await this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(newAlbum);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findById(id: number) {
    return await this.albumRepository.findOne({ where: { album_id: id } });
  }

  async update(id: number, updateMeomoryDto: UpdateAlbumDto) {
    if (updateMeomoryDto) {
      const targetAlbum = await this.albumRepository.findOne({
        where: { album_id: id },
      });
      const updateAlbum = {
        ...targetAlbum,
        ...updateMeomoryDto,
      };

      await this.albumRepository.remove(targetAlbum);
      return await this.albumRepository.save(updateAlbum);
    } else {
      return '수정할 내용이 없습니다.';
    }
  }

  async remove(id: number) {
    return await this.albumRepository.delete(id);
  }
}
