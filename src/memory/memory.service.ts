import { Injectable } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MemoryEntity } from './entities/memory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(MemoryEntity)
    private readonly memoryRepository: Repository<MemoryEntity>,
  ) {}

  async create(createMemoryDto: CreateMemoryDto) {
    const newMemory: MemoryEntity =
      await this.memoryRepository.create(createMemoryDto);
    return await this.memoryRepository.save(newMemory);
  }

  async findAll() {
    return await this.memoryRepository.find();
  }

  async findById(id: number) {
    return await this.memoryRepository.findOne({ where: { memory_id: id } });
  }

  async update(id: number, updateMeomoryDto: UpdateMemoryDto) {
    if (updateMeomoryDto) {
      const targetMemory = await this.memoryRepository.findOne({
        where: { memory_id: id },
      });
      const updateMemory = {
        ...targetMemory,
        ...updateMeomoryDto,
      };

      await this.memoryRepository.remove(targetMemory);
      return await this.memoryRepository.save(updateMemory);
    } else {
      return '수정할 내용이 없습니다.';
    }
  }

  async remove(id: number) {
    return await this.memoryRepository.delete(id);
  }
}
