import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MemoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  memory_id: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column()
  customer_info: string; //객체로 변경

  @Column()
  menu_info: string; //객체 리스트로 변경

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
