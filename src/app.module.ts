import { Module } from '@nestjs/common';
import { MemoryModule } from './memory/memory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), MemoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
