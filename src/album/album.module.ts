import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { SongEntity } from './entities/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    TypeOrmModule.forFeature([SongEntity]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
