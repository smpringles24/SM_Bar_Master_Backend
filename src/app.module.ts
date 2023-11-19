import { Module } from '@nestjs/common';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AlbumModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
