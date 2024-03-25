import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('magazine')
export class Magazine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'text' })
  @IsString()
  image: string;

  @Column({ type: 'int' })
  price: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  @DeleteDateColumn()
  @IsDate()
  deletedAt: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.magazine)
  subscription: Subscription[];
}
