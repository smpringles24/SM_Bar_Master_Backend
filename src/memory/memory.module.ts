import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { MemoryController } from './memory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoryEntity } from './entities/memory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemoryEntity])],
  controllers: [MemoryController],
  providers: [MemoryService],
})
export class MemoryModule {}
