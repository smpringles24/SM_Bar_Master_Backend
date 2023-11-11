import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SongEntity } from './song.entity';

@Entity()
export class AlbumEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  album_id: number;

  @Column()
  image_url: string;

  @Column()
  title: string;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SongEntity, (songEntity) => songEntity.album)
  songEntitys: SongEntity[];
}
