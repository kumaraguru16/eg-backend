import { IsDate } from 'class-validator';
import { Magazine } from 'src/magazine/entities/magazine.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subscription')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.subscription)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Magazine, (magazine) => magazine.subscription)
  @JoinColumn({ name: 'magazineId' })
  magazine: Magazine;

  @Column({ type: 'timestamp' })
  @IsDate()
  subscriptionValid: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
