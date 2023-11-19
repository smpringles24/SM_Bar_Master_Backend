import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create_album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get('/preview')
  findAllPreviewImage() {
    return this.albumService.findAllPreviewIamge();
  }

  @Get(':album_id')
  findOne(@Param('album_id') album_id: number) {
    return this.albumService.findAlbumById(album_id);
  }

  @Delete(':album_id')
  deleteAlbum(@Param('album_id') album_id: number) {
    return this.albumService.deleteAlbum(album_id);
  }
}
