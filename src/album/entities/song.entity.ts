import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { AlbumEntity } from './album.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class SongEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  song_id: number;

  @Column()
  image_url: string;

  @Column()
  image_data: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  score: number;

  @ManyToOne(() => AlbumEntity, (album) => album.songEntities)
  @Exclude({ toPlainOnly: true })
  album: AlbumEntity;
}
